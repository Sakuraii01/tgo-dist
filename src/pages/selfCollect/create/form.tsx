import { useState, useEffect } from "react";
import {
  TGOEFDropdownService,
  UnitsDropdownService,
  TGOVehiclesService,
} from "../../../service/api/dropdown";
import type {
  TGOVehiclesWithEFType,
  TGOEFDropdownType,
} from "../../../service/api/dropdown/type";
import type { SelfCollectProcessItemType } from "../../../service/api/selfcollect/type";
import { SelfCollectService } from "../../../service/api/selfcollect";
import { ExpandCircleDownOutlined } from "@mui/icons-material";

import { Edit } from "@mui/icons-material";

import { Formik, Form } from "formik";
import { Field, AutoCompleteField } from "../../../component/input/field";
type selfCollectTopicType = {
  initialValue: {
    selfCollectName: string;
  };
  validation: any;
  self_collect_id: number;
  onSubmit: (values: any) => void;
};
export const SelfCollectTopic = (props: selfCollectTopicType) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <>
      {!isEdit ? (
        <div className="w-fit">
          <p className="my-auto">
            ชื่อหน่วยสนับสนุนการผลิตหรือชื่อระบบผลิตภัณฑ์ที่เกี่ยวข้อง
          </p>
          <div className="flex w-full gap-2 text-primary">
            <p className="font-semibold text-3xl my-auto">
              {props.initialValue.selfCollectName}
            </p>
            <button
              className="px-6 py-2"
              type="button"
              onClick={() => setIsEdit(true)}
            >
              <Edit fontSize="small" />
            </button>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
            selfCollectName: props.initialValue.selfCollectName || "",
          }}
          onSubmit={(values) => props.onSubmit(values)}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex justify-between gap-2">
                <div className="w-full">
                  <Field
                    name="selfCollectName"
                    label="ชื่อหน่วยสนับสนุนการผลิตหรือชื่อระบบผลิตภัณฑ์ที่เกี่ยวข้อง"
                  />
                </div>
                <div className="my-auto mx-auto w-fit flex gap-3 h-fit">
                  <button
                    className="secondary-button px-6 py-2"
                    type="button"
                    onClick={() => setIsEdit(false)}
                  >
                    ยกเลิก
                  </button>
                  <button className="primary-button px-6 py-2" type="submit">
                    ยืนยัน
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

type processItemType = {
  initialValue?: {
    processName: string;
  };
  validation: any;
  self_collect_topic_id: number;

  item_id?: number;
  item_type: "input" | "output";
  addItem: boolean;
  handleCancleAdd?: (item: "input" | "output") => void;
  handleSubmit: (values: any, item_id?: number) => void;
};

export const IOItem = (props: processItemType) => {
  const { tgoEfDropdown, tgoVehicles, vehiclesDropdown, unitsDropdown } =
    dropdown();
  const selfCollectService = new SelfCollectService();
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(props.addItem);
  const [initialValues, setInitialValues] =
    useState<SelfCollectProcessItemType>({
      cfp_report43_selfcollect_efs_id: 0,
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
    });
  const fetchItemData = async () => {
    if (props.item_id) {
      await selfCollectService
        .reqGetSelfCollectProcessPerItem(props.item_id)
        .then((data) => {
          setInitialValues({
            cfp_report43_selfcollect_efs_id:
              data.cfp_report43_selfcollect_efs_id,
            self_collect_id: data.self_collect_id,
            item_name: data.item_name || "",
            item_type: data.item_type || "",
            item_unit: data.item_unit,
            item_qty: data.item_qty,
            item_fu_qty: data.item_fu_qty,
            item_source: data.item_source,
            item_ef: data.item_ef || 0,
            item_ef_source: data.item_ef_source || "",
            item_ef_source_ref: data.item_ef_source_ref || "",
            type2_distance: data.type2_distance || 0,
            type2_outbound_load: data.type2_outbound_load || "",
            type2_return_load: data.type2_return_load || "",
            type2_vehicle: data.type2_vehicle || "",
            type2_vehicle_return: data.type2_vehicle_return || "",
            type2_outbound_load_percent: data.type2_outbound_load_percent || "",
            type2_return_load_percent: data.type2_return_load_percent || "",
            type2_outbound_ef: data.type2_outbound_ef || "",
            type2_return_ef: data.type2_return_ef || "",
            type2_ef_source: data.type2_ef_source || "",
            type2_ef_source_ref: data.type2_ef_source_ref || "",
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
          });
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };
  const toggleAccordion = () => {
    setOpen(!open);
  };
  useEffect(() => {
    fetchItemData();
  }, [open]);
  return (
    <div className="border px-5 py-3 rounded mb-5">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => props.handleSubmit(values, props.item_id)}
      >
        {({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <div
                className={`flex justify-between ${
                  open ? "border-b pb-3" : ""
                }`}
              >
                {!isEdit ? (
                  <div className="flex">
                    <p className="font-semibold text-lg my-auto">
                      {props?.initialValue?.processName}
                    </p>
                  </div>
                ) : (
                  <div className="w-80">
                    <Field name="item_name" label="ชื่อรายการ" />
                  </div>
                )}

                <div className="my-auto h-fit">
                  <button type="button">
                    {open ? (
                      <ExpandCircleDownOutlined
                        className="text-primary transform rotate-180"
                        onClick={toggleAccordion}
                      />
                    ) : (
                      <ExpandCircleDownOutlined
                        className="text-gray-600"
                        onClick={toggleAccordion}
                      />
                    )}
                  </button>
                </div>
              </div>
              {open &&
                (isEdit ? (
                  <div className="mt-5">
                    <div>
                      <p className="font-semibold mb-2 text-lg">
                        การประเมินการปล่อยก๊าซเรือนกระจกจากวัตถุดิบ
                      </p>
                      <div id="lci">
                        <p>LCI</p>
                        <div className="flex gap-4 mb-4">
                          <Field
                            name={`item_qty`}
                            placeholder={"ปริมาณ"}
                            label={"ปริมาณ"}
                            type="number"
                          />
                          <AutoCompleteField
                            items={unitsDropdown.map((units) => ({
                              label: units,
                              value: units,
                            }))}
                            name={`item_unit`}
                            placeholder={"หน่วย"}
                            label={"หน่วย"}
                          />
                          <Field
                            name={`item_fu_qty`}
                            placeholder={"ปริมาณ ton/FU"}
                            label={"ปริมาณ ton/FU"}
                          />
                          <Field
                            name={`item_source`}
                            placeholder={"แหล่งที่มาของ LCI"}
                            label={"แหล่งที่มาของ LCI"}
                          />
                        </div>
                      </div>
                      <div id="ef">
                        <p>EF</p>
                        <div className="flex gap-4 mb-4">
                          <div className="w-40">
                            <AutoCompleteField
                              items={EF}
                              name={`item_ef_source`}
                              label="ที่มาของค่า EF"
                            />
                          </div>
                          <div className="w-80">
                            {tgoEfDropdown &&
                            values.item_ef_source === "TGO EF" ? (
                              <AutoCompleteField
                                name={`item_ef_source_ref`}
                                label="แหล่งอ้างอิง EF"
                                placeholder="แหล่งอ้างอิง EF"
                                items={tgoEfDropdown.map((item) => ({
                                  label: item.item_detail,
                                  value: item.ef_id,
                                }))}
                              />
                            ) : (
                              <Field
                                name={`item_ef_source_ref`}
                                label="แหล่งอ้างอิง EF"
                                placeholder="แหล่งอ้างอิง EF"
                              />
                            )}
                          </div>

                          <div>
                            {values.item_ef_source === "TGO EF" ? (
                              <div>
                                <p className="text-sm text-gray-300">ค่า EF</p>
                                <p>
                                  {tgoEfDropdown?.find(
                                    (data) =>
                                      data.ef_id ===
                                      Number(values.item_ef_source_ref)
                                  )?.ef ?? "-"}
                                </p>
                              </div>
                            ) : (
                              <Field
                                name="item_ef"
                                label="ค่า EF"
                                placeholder="ค่า EF"
                                type="number"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="transportation">
                      <p className="font-semibold mb-2 text-lg">
                        การประเมินการปล่อยก๊าซเรือนกระจกจากการขนส่ง
                      </p>
                      <p>การขนส่ง แบบการใช้ระยะทาง</p>
                      <div>
                        <div className="flex gap-3">
                          <div className="w-52">
                            <Field
                              name={`type2_distance`}
                              placeholder={"ระยะทาง (km)"}
                              label={"ระยะทาง (km)"}
                              type="number"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="w-40">
                            <AutoCompleteField
                              items={VehicalsEF}
                              name="type2_ef_source"
                              label="ที่มาของค่า EF"
                            />
                          </div>
                          <div className="w-80">
                            {tgoVehicles &&
                            values.type2_ef_source === "TG_ef" ? (
                              <AutoCompleteField
                                items={tgoVehicles.map((data) => {
                                  return {
                                    label: data.item,
                                    value: data.ef_id,
                                  };
                                })}
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
                            {tgoVehicles &&
                            values.type2_ef_source === "TG_ef" ? (
                              <AutoCompleteField
                                items={tgoVehicles.map((data) => {
                                  return {
                                    label: data.item,
                                    value: data.ef_id,
                                  };
                                })}
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
                        <div className="flex gap-3">
                          <div>
                            <p>ภาระบรรทุกขาไป (tkm)</p>
                            <p>
                              {Math.round(
                                Number(values.type2_distance) *
                                  Number(values.item_fu_qty) *
                                  10000
                              ) / 10000}
                            </p>
                          </div>
                          <div>
                            <p>ภาระบรรทุกขากลับ (tkm)</p>
                            <p>
                              {(() => {
                                const itemDetail =
                                  vehiclesDropdown.find(
                                    (data) =>
                                      String(data.ef_id) ===
                                      String(values.type2_vehicle_return)
                                  )?.item_detail ?? "";
                                const weight =
                                  extractWeightFromDetail(itemDetail) ?? 0;
                                const tkm =
                                  Math.round(
                                    Number(values.type2_distance) *
                                      Number(values.item_fu_qty) *
                                      10000
                                  ) / 10000;
                                return weight !== null ? weight * tkm : "-";
                              })()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-80">
                            {values.type2_ef_source === "TG_ef" ? (
                              <div>
                                <p className="text-sm text-gray-300">
                                  แหล่งอ้างอิง EF
                                </p>
                                <p>
                                  {
                                    tgoVehicles.find(
                                      (vehicles) =>
                                        vehicles.ef_id ===
                                        Number(values.type2_vehicle)
                                    )?.ef_source_ref
                                  }
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
                            {values.type2_ef_source === "TG_ef" ? (
                              <div>
                                <p className="text-sm text-gray-300">
                                  ค่า EF เที่ยวไป
                                </p>
                                <p>
                                  {
                                    tgoVehicles.find(
                                      (vehicles) =>
                                        vehicles.ef_id ===
                                        Number(values.type2_vehicle)
                                    )?.ef
                                  }
                                </p>
                              </div>
                            ) : (
                              <Field
                                label="ค่า EF เที่ยวไป"
                                placeholder="ค่า EF เที่ยวไป"
                                name={`type2_outbound_ef`}
                                type="number"
                              />
                            )}
                          </div>
                          <div className="w-40">
                            {values.type2_ef_source === "TG_ef" ? (
                              <div>
                                <p className="text-sm text-gray-300">
                                  ค่า EF เที่ยวกลับ
                                </p>
                                <p>
                                  {
                                    tgoVehicles.find(
                                      (vehicles) =>
                                        vehicles.ef_id ===
                                        Number(values.type2_vehicle_return)
                                    )?.ef
                                  }
                                </p>
                              </div>
                            ) : (
                              <Field
                                label="ค่า EF เที่ยวกลับ"
                                placeholder="ค่า EF เที่ยวกลับ"
                                name={`type2_return_ef`}
                                type="number"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 my-2 ml-auto w-fit flex gap-3 h-fit">
                      <button
                        className="secondary-button px-6 py-2"
                        type="button"
                        onClick={() =>
                          props.addItem
                            ? props.handleCancleAdd &&
                              props.handleCancleAdd(props.item_type)
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
                  <div className="mt-5 ">
                    <div className="flex gap-10">
                      <div>
                        <p>ปริมาณ</p>
                        <p>{initialValues.item_qty}</p>
                      </div>
                      <div>
                        <p>หน่วย</p>
                        <p>{initialValues.item_unit}</p>
                      </div>
                      <div>
                        <p>ปริมาณ ton/FU</p>
                        <p>{initialValues.item_fu_qty}</p>
                      </div>
                      <div>
                        <p>แหล่งที่มาของ LCI</p>
                        <p>{initialValues.item_source}</p>
                      </div>
                    </div>
                    <div className="flex gap-10 mt-5">
                      <div>
                        <p>ที่มาของค่า EF</p>
                        <p>{initialValues.item_ef_source}</p>
                      </div>
                      <div>
                        <p>แหล่งอ้างอิง EF</p>
                        <p>{initialValues.item_ef_source_ref}</p>
                      </div>
                      <div>
                        <p>EF</p>
                        <p>{initialValues.item_ef}</p>
                      </div>
                    </div>
                    <p className="font-semibold mb-2 text-lg mt-5">
                      การประเมินการปล่อยก๊าซเรือนกระจกจากการขนส่ง
                    </p>
                    <p>การขนส่ง แบบการใช้ระยะทาง</p>
                    <div className="flex gap-10 mt-5">
                      <div>
                        <p>ระยะทาง (km)</p>
                        <p>{initialValues.type2_distance}</p>
                      </div>
                      <div>
                        <p>ที่มาของค่า EF</p>
                        <p>{initialValues.type2_ef_source}</p>
                      </div>
                    </div>
                    <div className="flex gap-10 mt-5">
                      <div>
                        <p>ประเภทพาหนะเที่ยวไป</p>
                        <p>{initialValues.type2_vehicle}</p>
                      </div>
                      <div>
                        <p>ประเภทพาหนะเที่ยวกลับ</p>
                        <p>{initialValues.type2_vehicle_return}</p>
                      </div>
                    </div>
                    <div className="flex gap-10 mt-5">
                      <div>
                        <p>ภาระบรรทุกขาไป (tkm)</p>
                        <p>{initialValues.type2_outbound_load}</p>
                      </div>
                      <div>
                        <p>ภาระบรรทุกขากลับ (km)</p>
                        <p>{initialValues.type2_return_load}</p>
                      </div>
                      <div>
                        <p>% เที่ยวไป</p>
                        <p>{initialValues.type2_outbound_load_percent}</p>
                      </div>
                      <div>
                        <p>% เที่ยวกลับ</p>
                        <p>{initialValues.type2_return_load_percent}</p>
                      </div>
                    </div>{" "}
                    <div className="flex gap-10 mt-5">
                      <div>
                        <p>แหล่งอ้างอิง EF</p>
                        <p>{initialValues.type2_ef_source_ref}</p>
                      </div>
                      <div>
                        <p>ค่า EF เที่ยวไป</p>
                        <p>{initialValues.type2_outbound_ef}</p>
                      </div>
                      <div>
                        <p>ค่า EF เที่ยวกลับ</p>
                        <p>{initialValues.type2_return_ef}</p>
                      </div>
                    </div>
                    <div className="mt-5 my-2 ml-auto w-fit flex gap-3 h-fit">
                      <button
                        className="secondary-button px-6 py-2"
                        type="button"
                        //   onClick={() => setIsEditProcess(false)}
                      >
                        ลบรายการ
                      </button>
                      <button
                        className="primary-button px-6 py-2"
                        type="button"
                        onClick={() => setIsEdit(true)}
                      >
                        แก้ไข
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const dropdown = () => {
  const tGOVehiclesService = new TGOVehiclesService();
  const tGOEFDropdownService = new TGOEFDropdownService();
  const unitsDropdownService = new UnitsDropdownService();
  const vehiclesDropdownService = new TGOVehiclesService();

  const [tgoEfDropdown, setTgoEfDropdown] = useState<
    TGOEFDropdownType[] | null
  >([]);
  const [tgoVehicles, setTgoVehicles] = useState<TGOVehiclesWithEFType[]>([]);
  const [unitsDropdown, setUnitsDropdown] = useState<string[]>([]);
  const [vehiclesDropdown, setVehiclesDropdown] = useState<
    TGOVehiclesWithEFType[]
  >([]);

  const fetchUnitsDropdown = async () => {
    const data = await unitsDropdownService.reqGetUnits();
    setUnitsDropdown(data.map((unit) => unit.product_unit_abbr_eng));
  };
  const fetchVehiclesDropdown = async () => {
    const data = await vehiclesDropdownService.reqGetTGOVehiclesWithEF();
    setVehiclesDropdown(data);
  };
  useEffect(() => {
    fetchVehiclesDropdown();
    fetchUnitsDropdown();
    tGOVehiclesService
      .reqGetTGOVehiclesWithEF()
      .then((res) => {
        setTgoVehicles(res);
      })
      .catch((error) => {
        console.log(error);
      });
    tGOEFDropdownService
      .reqGetTGOEF()
      .then((res) => {
        setTgoEfDropdown(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { tgoEfDropdown, tgoVehicles, vehiclesDropdown, unitsDropdown };
};
const VehicalsEF = [
  { label: "TGO EF", value: "TG_ef" },
  { label: "Int. DB", value: "Int_DB" },
];
const EF = [
  { label: "Self collect", value: "Self collect" },
  { label: "Supplier", value: "Supplier" },
  { label: "PCR Gen.", value: "PCR Gen" },
  { label: "TGO EF", value: "TGO EF" },
  { label: "Int. DB", value: "Int. DB" },
  { label: "Others", value: "Other" },
];
const extractWeightFromDetail = (item_detail: string) => {
  const match = item_detail.match(/น้ำหนักบรรทุกสูงสุด\s+(\d+(\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
};
