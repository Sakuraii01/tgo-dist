import { useEffect, useMemo, useState } from "react";
import { commafy } from "../../../../utils/comma";
import { Formik, Form } from "formik";
import {
  Field,
  AutoCompleteField,
  CheckboxField,
} from "../../../../component/input/field";
import type { SelfCollectProcessItemType } from "../../../../service/api/selfcollect/type";
import { SelfCollectService } from "../../../../service/api/selfcollect";
import { getDropdowns } from "../hooks/dropdown";
import { EF_SOURCE_OPTIONS, VEHICLE_EF_OPTIONS } from "../constants";
import {
  computeItemEmission,
  computeItemFUQty,
  computeTransportEmissions,
  resolveItemEf,
  resolveVehicleEfRef,
} from "../utils/emission";
import { fmt } from "../utils/number";

export type IOItemProps = {
  initialValue?: { processName: string };
  validation?: any;
  self_collect_topic_id: number;
  last_prod_value: number;
  fu: number; // ton/FU

  item_id?: number;
  item_type: "input" | "output";
  addItem: boolean;
  handleCancleAdd?: (item: "input" | "output") => void;
  handleSubmit: (values: any, item_id?: number) => void;
  handleDelete: (item_id: number) => void;
};
const defaultValues: SelfCollectProcessItemType = {
  self_collect_id: 0,
  item_name: "",
  item_type: "input",
  item_unit: "",
  item_qty: "",
  item_fu_qty: "",
  item_source: "",
  item_ef: "",
  item_ef_source: "",
  item_ef_source_ref: "",
  type2_distance: "",
  type2_outbound_load: "",
  type2_return_load: "",
  type2_vehicle: "",
  type2_vehicle_return: "",
  type2_outbound_load_percent: "",
  type2_return_load_percent: "",
  type2_outbound_ef: "",
  type2_return_ef: "",
  type2_ef_source: "",
  type2_ef_source_ref: "",
  transport_emission: 0,
  total_emission: 0,
  proportion: null,
  ratio: 0,
  cut_off: 0,
  type1_gas: null,
  type1_gas_unit: null,
  type1_gas_qty: null,
  type1_ef: null,
  type1_ef_source: null,
  item_emission: "",
  transport_type: "",
  add_on_detail: "",
  type2_FU: "",
  finish_output: 0,
};
export const IOItem = (props: IOItemProps) => {
  const selfCollectService = useMemo(() => new SelfCollectService(), []);
  const [dropdowns, setDropdowns] = useState<any>({
    tgoEfDropdown: [],
    tgoVehicles: [],
    vehiclesDropdown: [],
    unitsDropdown: [],
    selfCollectDropdown: [],
  });

  useEffect(() => {
    (async () => {
      const result = await getDropdowns();
      setDropdowns(result);
    })();
  }, []);

  const {
    tgoEfDropdown,
    tgoVehicles,
    vehiclesDropdown,
    unitsDropdown,
    selfCollectDropdown,
  } = dropdowns;

  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(props.addItem);
  const [initialValues, setInitialValues] =
    useState<SelfCollectProcessItemType>({
      ...defaultValues,
      item_type: props.item_type,
    });

  const fetchItemData = async () => {
    if (!props.item_id) return;
    try {
      const data = await selfCollectService.reqGetSelfCollectProcessPerItem(
        props.item_id
      );
      setInitialValues({
        ...defaultValues,
        ...data,
        item_name: data.item_name || "",
        item_type: (data.item_type as any) || props.item_type,
        type2_ef_source: data.type2_ef_source || "NA",
        finish_output: data.finish_output,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (open || isEdit) fetchItemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isEdit, props.item_id]);
  const onSubmit = (
    values: SelfCollectProcessItemType,
    resetForm: () => void
  ) => {
    const itemEf = resolveItemEf(
      {
        source: values.item_ef_source as any,
        sourceRef: values.item_ef_source_ref,
        explicitEf: values.item_ef as any,
      },
      tgoEfDropdown,
      selfCollectDropdown
    );

    const transport = computeTransportEmissions(
      {
        efSource: values.type2_ef_source as any,
        distanceKm: values.type2_distance,
        fuTonPerFU: values.type2_FU,
        outbound: {
          vehicleId: values.type2_vehicle,
          explicitEf: values.type2_outbound_ef,
          explicitLoadTkm: values.type2_outbound_load,
        },
        returning: {
          vehicleId: values.type2_vehicle_return,
          explicitEf: values.type2_return_ef,
          explicitLoadKm: values.type2_return_load,
        },
      },
      tgoVehicles
    );

    const itemFuQty = computeItemFUQty(
      values.item_qty,
      props.fu,
      props.last_prod_value
    );
    const itemEmission = computeItemEmission(itemFuQty, itemEf);

    const payload = {
      ...values,
      transport_emission: transport.totalTransportEmission,
      item_emission: itemEmission,
      total_emission: transport.totalTransportEmission + itemEmission,
      item_ef: itemEf,
      type2_ef_source:
        values.type2_ef_source !== "TG_ef" &&
        values.type2_ef_source !== "Int_DB"
          ? "NA"
          : values.type2_ef_source,
      type2_ef_source_ref:
        values.type2_ef_source === "TG_ef"
          ? resolveVehicleEfRef(tgoVehicles, values.type2_vehicle)
          : values.type2_ef_source_ref,
      type2_outbound_ef: transport.outboundEf,
      type2_outbound_load:
        values.type2_ef_source === "TG_ef"
          ? computeItemFUQty(values.type2_distance, values.type2_FU, 1)
          : values.type2_outbound_load,
      type2_return_ef: transport.returnEf,
      type2_return_load:
        values.type2_ef_source === "TG_ef"
          ? transport.returnLoadKm
          : values.type2_return_load,
      finish_output: values.finish_output ? 1 : 0,
    } as any;

    props.handleSubmit(payload, props.item_id);
    props.handleCancleAdd?.(props.item_type);
    resetForm();
    setIsEdit(false);
  };
  return (
    <div className="border border-gray-200/30 px-5 py-3 rounded mb-5">
      <Formik<SelfCollectProcessItemType>
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(vals, helpers) => onSubmit(vals, () => helpers.resetForm())}
      >
        {({ handleSubmit, values }) => {
          const itemEf = resolveItemEf(
            {
              source: values.item_ef_source as any,
              sourceRef: values.item_ef_source_ref,
              explicitEf: values.item_ef as any,
            },
            tgoEfDropdown,
            selfCollectDropdown
          );

          const itemFuQty = computeItemFUQty(
            values.item_qty,
            props.fu,
            props.last_prod_value
          );
          const itemEmission = computeItemEmission(itemFuQty, itemEf);

          const isTG = values.type2_ef_source === "TG_ef";

          return (
            <Form onSubmit={handleSubmit}>
              <div>
                <div
                  className={` flex justify-between ${
                    open ? "border-b border-gray-200/30 pb-3" : ""
                  }`}
                >
                  {!isEdit ? (
                    <div className="flex">
                      <p className="text-primary font-semibold text-xl my-1.5">
                        {props?.initialValue?.processName}
                      </p>
                    </div>
                  ) : (
                    <div className="w-80">
                      <Field name="item_name" label="ชื่อรายการ" />
                      {props.item_type === "output" && (
                        <CheckboxField
                          name="finish_output"
                          label="เป็นผลิตภัณฑ์สุดท้ายหรือไม่"
                        />
                      )}
                    </div>
                  )}

                  <div className="my-auto h-fit">
                    <button type="button" onClick={() => setOpen((v) => !v)}>
                      {open ? (
                        <span className="text-primary">ปิด</span>
                      ) : (
                        <span className="text-gray-600">เปิด</span>
                      )}
                    </button>
                  </div>
                </div>
                {open &&
                  (isEdit ? (
                    <div className="mt-5">
                      {/* LCI */}
                      <section className="p-6 mb-4 border border-stroke bg-white shadow-inner rounded-lg">
                        <p className="font-semibold mb-6 text-lg text-primary">
                          การประเมินการปล่อยก๊าซเรือนกระจกจากวัตถุดิบ
                        </p>
                        <div id="lci">
                          <p className="font-semibold mb-2 text-lg text-primary">
                            LCI
                          </p>
                          <div className="flex gap-4 mb-4">
                            <Field
                              name="item_qty"
                              placeholder="ปริมาณ"
                              label="ปริมาณ"
                              type="number"
                            />
                            <AutoCompleteField
                              items={unitsDropdown.map((u: any) => ({
                                label: u.label,
                                value: u.values,
                              }))}
                              name="item_unit"
                              placeholder="หน่วย"
                              label="หน่วย"
                            />
                            <div className="w-full">
                              <p className="text-sm text-gray-300">ปริมาณ/FU</p>
                              <p>{commafy(fmt(itemFuQty, 4))}</p>
                            </div>
                            <Field
                              name="item_source"
                              placeholder="แหล่งที่มาของ LCI"
                              label="แหล่งที่มาของ LCI"
                            />
                          </div>
                        </div>
                        {/* EF */}
                        <div id="ef">
                          <p className="font-semibold mb-2 text-lg text-primary">
                            EF (kgCO2eq./หน่วย)
                          </p>
                          <div className="flex gap-4 mb-4">
                            <div className="w-40">
                              <AutoCompleteField
                                items={EF_SOURCE_OPTIONS as any}
                                name="item_ef_source"
                                label="ที่มาของค่า EF"
                              />
                            </div>
                            <div className="w-80">
                              {values.item_ef_source === "TGO EF" ? (
                                <AutoCompleteField
                                  name="item_ef_source_ref"
                                  label="แหล่งอ้างอิง EF"
                                  placeholder="แหล่งอ้างอิง EF"
                                  items={(tgoEfDropdown || []).map(
                                    (it: any) => ({
                                      label: `${it.item}${it.item_detail} (EF = ${it.ef})`,
                                      value: it.ef_id,
                                    })
                                  )}
                                />
                              ) : values.item_ef_source === "Self collect" ? (
                                <AutoCompleteField
                                  name="item_ef_source_ref"
                                  label="แหล่งอ้างอิง EF"
                                  placeholder="แหล่งอ้างอิง EF"
                                  items={(selfCollectDropdown || []).map(
                                    (it: any) => ({
                                      label: `${it.self_collect_name} (EF = ${it.self_collect_ef})`,
                                      value: it.self_collect_id,
                                    })
                                  )}
                                />
                              ) : (
                                <Field
                                  name="item_ef_source_ref"
                                  label="แหล่งอ้างอิง EF"
                                  placeholder="แหล่งอ้างอิง EF"
                                />
                              )}
                            </div>
                            <div>
                              {values.item_ef_source === "TGO EF" ? (
                                <div>
                                  <p className="text-sm text-gray-300">
                                    ค่า EF (kgCO2eq./หน่วย)
                                  </p>
                                  <p>
                                    {(tgoEfDropdown || []).find(
                                      (d: any) =>
                                        d.ef_id ===
                                        Number(values.item_ef_source_ref)
                                    )?.ef ?? "-"}
                                  </p>
                                </div>
                              ) : values.item_ef_source === "Self collect" ? (
                                <div>
                                  <p className="text-sm text-gray-300">
                                    ค่า EF (kgCO2eq./หน่วย)
                                  </p>
                                  <p>
                                    {(selfCollectDropdown || []).find(
                                      (d: any) =>
                                        d.self_collect_id ===
                                        Number(values.item_ef_source_ref)
                                    )?.self_collect_ef ?? "-"}
                                  </p>
                                </div>
                              ) : (
                                <Field
                                  name="item_ef"
                                  label="ค่า EF (kgCO2eq./หน่วย)"
                                  placeholder="ค่า EF (kgCO2eq./หน่วย)"
                                  type="number"
                                />
                              )}
                            </div>
                          </div>
                          <div className="p-4 rounded-xl shadow-lg">
                            <p>การปล่อยก๊าซเรือนกระจกจากวัตถุดิบ(kgCO2eq.)</p>
                            <p className="text-primary">
                              {fmt(itemEmission, 4)}
                            </p>
                          </div>
                        </div>
                      </section>
                      {/* Transportation */}
                      <section className="p-6 mb-4 border border-stroke bg-white shadow-inner rounded-lg">
                        <div id="transportation">
                          <p className="font-semibold text-lg text-primary">
                            การประเมินการปล่อยก๊าซเรือนกระจกจากการขนส่ง
                          </p>
                          <p className="mb-6 italic text-gray-300">
                            การขนส่ง แบบการใช้ระยะทาง
                          </p>

                          <div className="flex gap-3">
                            <div className="w-52">
                              <Field
                                name="type2_FU"
                                placeholder="ปริมาณ ton/FU"
                                label="ปริมาณ ton/FU"
                              />
                            </div>
                            <div className="w-52">
                              <Field
                                name="type2_distance"
                                placeholder="ระยะทาง (km)"
                                label="ระยะทาง (km)"
                                type="number"
                              />
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="w-40">
                              <AutoCompleteField
                                items={VEHICLE_EF_OPTIONS as any}
                                name="type2_ef_source"
                                label="ที่มาของค่า EF"
                              />
                            </div>
                            <div className="w-80">
                              {isTG ? (
                                <AutoCompleteField
                                  items={tgoVehicles.map((d: any) => ({
                                    label: d.item,
                                    value: d.ef_id,
                                  }))}
                                  name="type2_vehicle"
                                  label="ประเภทพาหนะเที่ยวไป"
                                  placeholder="ประเภทพาหนะเที่ยวไป"
                                />
                              ) : (
                                <Field
                                  name="type2_vehicle"
                                  label="ประเภทพาหนะเที่ยวไป"
                                  placeholder="ประเภทพาหนะเที่ยวไป"
                                />
                              )}
                            </div>
                            <div className="w-80">
                              {isTG ? (
                                <AutoCompleteField
                                  items={tgoVehicles.map((d: any) => ({
                                    label: d.item,
                                    value: d.ef_id,
                                  }))}
                                  name="type2_vehicle_return"
                                  label="ประเภทพาหนะเที่ยวกลับ"
                                  placeholder="ประเภทพาหนะเที่ยวกลับ"
                                />
                              ) : (
                                <Field
                                  name="type2_vehicle_return"
                                  label="ประเภทพาหนะเที่ยวกลับ"
                                  placeholder="ประเภทพาหนะเที่ยวกลับ"
                                />
                              )}
                            </div>
                          </div>
                          <div className="flex gap-3 w-2/3">
                            {isTG ? (
                              <div>
                                <p>ภาระบรรทุกเที่ยวไป (tkm)</p>
                                <p>
                                  {commafy(
                                    fmt(
                                      Number(values.type2_distance) *
                                        Number(values.type2_FU),
                                      3
                                    )
                                  )}
                                </p>
                              </div>
                            ) : (
                              <Field
                                name="type2_outbound_load"
                                label="ภาระบรรทุกเที่ยวไป (tkm)"
                                placeholder="ภาระบรรทุกเที่ยวไป (tkm)"
                              />
                            )}

                            {isTG ? (
                              <div>
                                <p>ภาระบรรทุกเที่ยวกลับ (km)</p>
                                <p>
                                  {/* shown on read-only summary; here keep derived via submit util */}
                                  {/* We mirror original UI behavior -> compute at submit time */}
                                  -
                                </p>
                              </div>
                            ) : (
                              <Field
                                name="type2_return_load"
                                label="ภาระบรรทุกเที่ยวกลับ (km)"
                                placeholder="ภาระบรรทุกเที่ยวกลับ (km)"
                              />
                            )}
                          </div>
                          <div className="flex gap-4">
                            <div className="w-80">
                              {isTG ? (
                                <div>
                                  <p className="text-sm text-gray-300">
                                    แหล่งอ้างอิง EF
                                  </p>
                                  <p>
                                    {resolveVehicleEfRef(
                                      tgoVehicles,
                                      values.type2_vehicle
                                    )}
                                  </p>
                                </div>
                              ) : (
                                <Field
                                  name="type2_ef_source_ref"
                                  label="แหล่งอ้างอิง EF"
                                  placeholder="แหล่งอ้างอิง EF"
                                />
                              )}
                            </div>
                            <div className="w-40">
                              {isTG ? (
                                <div>
                                  <p className="text-sm text-gray-300">
                                    ค่า EF เที่ยวไป
                                    <br /> (kgCO2eq./หน่วย)
                                  </p>
                                  <p>
                                    {commafy(
                                      fmt(
                                        tgoVehicles.find(
                                          (v: any) =>
                                            v.ef_id ===
                                            Number(values.type2_vehicle)
                                        )?.ef as any,
                                        4
                                      )
                                    )}
                                  </p>
                                </div>
                              ) : (
                                <Field
                                  label="ค่า EF เที่ยวไป (kgCO2eq./หน่วย)"
                                  placeholder="ค่า EF เที่ยวไป"
                                  name="type2_outbound_ef"
                                  type="number"
                                />
                              )}
                            </div>
                            <div className="w-40">
                              {isTG ? (
                                <div>
                                  <p className="text-sm text-gray-300">
                                    ค่า EF เที่ยวกลับ
                                    <br /> (kgCO2eq./หน่วย)
                                  </p>
                                  <p>
                                    {commafy(
                                      fmt(
                                        tgoVehicles.find(
                                          (v: any) =>
                                            v.ef_id ===
                                            Number(values.type2_vehicle_return)
                                        )?.ef as any,
                                        4
                                      )
                                    )}
                                  </p>
                                </div>
                              ) : (
                                <Field
                                  label="ค่า EF เที่ยวกลับ (kgCO2eq./หน่วย)"
                                  placeholder="ค่า EF เที่ยวกลับ"
                                  name="type2_return_ef"
                                  type="number"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </section>
                      <div className="mt-5 my-2 ml-auto w-fit flex gap-3 h-fit">
                        <button
                          className="secondary-button px-6 py-2"
                          type="button"
                          onClick={() =>
                            props.addItem
                              ? props.handleCancleAdd?.(props.item_type)
                              : setIsEdit(false)
                          }
                        >
                          ยกเลิก
                        </button>
                        <button
                          className="primary-button px-6 py-2"
                          type="submit"
                        >
                          ยืนยัน
                        </button>
                      </div>
                    </div>
                  ) : (
                    // READ-ONLY SUMMARY
                    <div className="mt-5 font-medium">
                      <section className="p-6 mb-4 border border-stroke bg-white shadow-inner rounded-lg">
                        <p className="font-semibold mb-6 text-lg text-primary">
                          การประเมินการปล่อยก๊าซเรือนกระจกจากวัตถุดิบ
                        </p>
                        <div className="flex gap-10">
                          <div>
                            <p className="text-sm text-gray-300">ปริมาณ</p>
                            <p>{fmt(initialValues.item_qty, 4)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">หน่วย</p>
                            <p>{initialValues.item_unit || "-"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">ปริมาณ/FU</p>
                            <p>
                              {fmt(
                                computeItemFUQty(
                                  initialValues.item_qty,
                                  props.fu,
                                  props.last_prod_value
                                ),
                                4
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">
                              แหล่งที่มาของ LCI
                            </p>
                            <p>{initialValues.item_source || "-"}</p>
                          </div>
                        </div>
                        <div className="flex gap-10 mt-5">
                          <div>
                            <p className="text-sm text-gray-300">
                              ที่มาของค่า EF
                            </p>
                            <p>{initialValues.item_ef_source || "-"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">
                              แหล่งอ้างอิง EF
                            </p>
                            <p>
                              {(tgoEfDropdown || []).find(
                                (d: any) =>
                                  d.ef_id ===
                                  Number(initialValues.item_ef_source_ref)
                              )?.item || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">
                              EF (kgCO2eq./หน่วย)
                            </p>
                            <p>{commafy(fmt(initialValues.item_ef))}</p>
                          </div>
                        </div>
                      </section>
                      <section className="p-6 mb-4 border border-stroke bg-white shadow-inner rounded-lg">
                        <p className="font-semibold text-lg text-primary">
                          การประเมินการปล่อยก๊าซเรือนกระจกจากการขนส่ง
                        </p>
                        <p className="mb-6 italic text-gray-300">
                          การขนส่ง แบบการใช้ระยะทาง
                        </p>
                        <div className="flex gap-10 mt-5 ">
                          <div>
                            <p className="text-sm text-gray-300">
                              ระยะทาง (km)
                            </p>
                            <p>{fmt(initialValues.type2_distance)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">
                              ที่มาของค่า EF
                            </p>
                            <p>
                              {VEHICLE_EF_OPTIONS.find(
                                (d) => initialValues.type2_ef_source === d.value
                              )?.label || "-"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-10 mt-5">
                          <div>
                            <p className="text-sm text-gray-300">
                              ประเภทพาหนะเที่ยวไป
                            </p>
                            <p>
                              {vehiclesDropdown.find(
                                (d: any) =>
                                  d.ef_id ===
                                  Number(initialValues.type2_vehicle)
                              )?.item || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">
                              ประเภทพาหนะเที่ยวกลับ
                            </p>
                            <p>
                              {vehiclesDropdown.find(
                                (d: any) =>
                                  d.ef_id ===
                                  Number(initialValues.type2_vehicle_return)
                              )?.item || "-"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-10 mt-5">
                          <div>
                            <p className="text-sm text-gray-300">
                              ภาระบรรทุกเที่ยวไป (tkm)
                            </p>
                            <p>{fmt(initialValues.type2_outbound_load, 2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">
                              ภาระบรรทุกเที่ยวกลับ (km)
                            </p>
                            <p>{fmt(initialValues.type2_return_load, 2)}</p>
                          </div>
                        </div>
                        <div className="flex gap-10 mt-5">
                          <div>
                            <p className="text-sm text-gray-300">
                              ค่า EF เที่ยวไป <br />
                              (kgCO2eq./หน่วย)
                            </p>
                            <p>
                              {commafy(fmt(initialValues.type2_outbound_ef))}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">
                              ค่า EF เที่ยวกลับ <br />
                              (kgCO2eq./หน่วย)
                            </p>
                            <p>{commafy(fmt(initialValues.type2_return_ef))}</p>
                          </div>
                          <div className="w-1/2">
                            <p className="text-sm text-gray-300 ">
                              แหล่งอ้างอิง EF
                            </p>
                            <p>{initialValues.type2_ef_source_ref || "-"}</p>
                          </div>
                        </div>
                      </section>
                      <div className="mt-5 my-2 ml-auto w-fit flex gap-3 h-fit">
                        <button
                          className="primary-button px-6 py-2"
                          type="button"
                          onClick={() => setIsEdit(true)}
                        >
                          แก้ไข
                        </button>
                        <button
                          className="secondary-button px-6 py-2"
                          type="button"
                          onClick={() =>
                            props.item_id
                              ? props.handleDelete(props.item_id)
                              : undefined
                          }
                        >
                          ลบรายการ
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
