import { FR04Layout } from "../common/layout";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import { Field, AutoCompleteField } from "../../../component/input/field";
import { Save, Edit } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { ProcessStepper } from "../common/component/stepper";
import useViewModel from "./viewModel";
import { Accordion } from "../common/component/accordion";
import type {
  ProcessItemType,
  ItemProcessType,
} from "../../../service/api/fr04/type";
import { useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import type { TGOVehiclesWithEFType } from "../../../service/api/dropdown/type";
import { Fr04Service } from "../../../service/api/fr04";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";
const FR04_2 = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const {
    fr04Data,
    productInfo,
    tab,
    handleTabChange,
    handleNavigateto06_1,
    handleSetAddItem,
    fr04LifeCycleData,
  } = useViewModel(id);
  const navigate = useNavigate();
  console.log(fr04LifeCycleData);

  return (
    <div>
      <ProcessStepper isActive={3} id={id} />

      <FR04Layout
        handleSetItem={handleSetAddItem}
        isB2C={productInfo?.scope === "B2B" ? true : false}
        tabIndex={tab}
        handleTabChange={handleTabChange}
        isAddItem={false}
      >
        <div>
          {tab <= 2 &&
            fr04Data?.[tab - 1]?.processes.map((data, key) => (
              <div
                className="border-b border-gray-300 pb-10 mb-10"
                key={key + " " + tab}
              >
                <h3 className="font-semibold text-linear text-primary-linear text-3xl mb-5">
                  {data.process_name}
                </h3>

                {data.item?.map((product, index) => (
                  <div className="my-5" key={key + `${index}`}>
                    <Accordion title={product.item_name}>
                      <FR04_2Form
                        data={product}
                        id={id}
                        // processName={data.process_name}
                        processId={data.process_id}
                        lifePhase={tab}
                        // fu={fr04Data[tab - 1].FU || 0}
                      />
                    </Accordion>
                  </div>
                ))}
              </div>
            ))}
          {tab > 2 &&
            fr04LifeCycleData?.form42?.[tab - 1].process
              .find(
                (process) =>
                  process.process_name ===
                  fr04LifeCycleData.form42?.[tab - 1].life_cycle_phase_name
              )
              ?.product.map((data, index) => (
                <div className="my-5" key={`${index}`}>
                  <Accordion title={data.item_name}>
                    <FR04_2Form
                      data={{
                        item_id: data.item_id,
                        item_name: data.item_name,
                        item_unit: data.item_unit,
                        item_quantity: data.item_quantity,
                        chemical_reaction: 0,
                        input_title: "",
                        item_class: null,
                      }}
                      id={id}
                      // processName={data.process_name}
                      processId={data.process_id}
                      lifePhase={tab}
                      // fu={fr04Data[0].FU || 0}
                      isB2C={true}
                      // report_id={data.report_42_id}
                      // B2CData={data}
                    />
                  </Accordion>
                </div>
              ))}
        </div>
      </FR04Layout>
      <div className="w-1/3 mx-auto flex gap-4">
        <button
          onClick={() =>
            navigate(PROTECTED_PATH.REGISTER_PRODUCT_FR04_1 + `?id=${id}`)
          }
          type="button"
          className="transition-colors rounded-full w-full mt-6 px-10 py-2 bg-gray-400 hover:bg-gray-300 text-white font-semibold"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={() => handleNavigateto06_1()}
          type="submit"
          className="rounded-full w-full mt-6 px-10 py-2 bg-gradient-to-r from-[#2BCFF2] via-[#19C2E6] via-30% to-[#0190C3]  text-white font-semibold transition hover:opacity-80"
        >
          บันทึกและไปขั้นตอนถัดไป
        </button>
      </div>
    </div>
  );
};
export default FR04_2;

const FR04_2Form = (props: {
  data: ProcessItemType;
  id: number;
  lifePhase: number;
  processId: number;
  isB2C?: boolean;
  report_id?: number;
  B2CData?: ItemProcessType;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [trafficType, setTrafficType] = useState("b");
  const { tgoVehicles } = useViewModel(props.id);
  const handleTrafficTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTrafficType((event.target as HTMLInputElement).value);
  };
  const handleSetEdit = useCallback((editProps: boolean) => {
    setIsEdit(editProps);
  }, []);

  return (
    <div className="flex flex-col gap-4 font-medium">
      <div>
        <p className="font-semibold text-primary">การขนส่ง</p>
        <div className="flex gap-2">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="a"
            name="radio-buttons-group"
            row
            value={trafficType}
            onChange={handleTrafficTypeChange}
          >
            <FormControlLabel
              value="a"
              control={<Radio />}
              label="ก.แบบการใช้เชื้อเพลิง"
              disabled
            />
            <FormControlLabel
              value="b"
              control={<Radio />}
              label="ข.แบบการใช้ระยะทาง"
            />
          </RadioGroup>
        </div>
      </div>
      {trafficType === "b" ? (
        <div>
          <FormTypeB
            isEdit={isEdit}
            id={props.id}
            data={props.data}
            tgoVehicles={tgoVehicles}
            handleIsEdit={(value) => handleSetEdit(value)}
            lifePhase={props.lifePhase}
            process_id={props.processId}
          />
        </div>
      ) : (
        <div>
          <FormTypeA
            isEdit={isEdit}
            data={props.data}
            handleIsEdit={(value) => handleSetEdit(value)}
          />
        </div>
      )}
    </div>
  );
};

const FormTypeA = ({
  isEdit,
  data,
  handleIsEdit,
}: {
  isEdit: boolean;
  data: any;
  handleIsEdit: (value: boolean) => void;
}) => {
  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={(values) => (console.log(values), handleIsEdit(false))}
      >
        {({ handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div>
                <p>แบบการใช้เชื้อเพลิง</p>
                <div>
                  {isEdit ? (
                    <div>
                      <div className="flex gap-4 mt-auto w-full mb-3">
                        <div className="w-80">
                          <Field label="ปริมาณ Ton/FU" name="asdf" />
                        </div>
                        <div className="w-80">
                          <Field label="ระยะทาง km" name="distance" />
                        </div>
                        <Field
                          label="แหล่งที่มาของข้อมูลการขนส่ง"
                          name="distance_ref"
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="w-40">
                          <Field
                            name="gas_type"
                            label="ชนิดเชื้อเพลิง"
                            placeholder="ชนิดเชื้อเพลิง"
                          />
                        </div>
                        <div className="w-40">
                          <Field
                            name="gas_quantity"
                            label="ปริมาณ"
                            placeholder="ปริมาณ"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-40">
                          <AutoCompleteField
                            items={EF}
                            name="EF_source"
                            label="ที่มาของค่า EF"
                            placeholder="ที่มาของค่า EF"
                          />
                        </div>
                        <div className="w-40">
                          {
                            <Field
                              name="EF"
                              label="ค่า EF"
                              placeholder="ค่า EF"
                            />
                          }
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-8">
                        <div>
                          <label className="text-sm text-gray-300">
                            ปริมาณ Ton/FU
                          </label>
                          <p>{"-"}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-300">
                            ระยะทาง (km)
                          </label>
                          <p>{"-"}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-300">
                            แหล่งที่มาของข้อมูลการขนส่ง
                          </label>
                          <p>{"-"}</p>
                        </div>
                      </div>
                      <div className="flex gap-8">
                        <div>
                          <label className="text-sm text-gray-300">
                            ปริมาณ
                          </label>
                          <p>{data.type1_gas_unit ?? "-"}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-300">
                            ที่มาของค่า EF
                          </label>
                          <p>{data.type1_ef_source ?? "-"}</p>
                        </div>
                        <div className="w-40">
                          <label className="text-sm text-gray-300">
                            ค่า EF
                          </label>
                          <p>{data.type1_ef ?? "-"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-8 justify-end">
                <div className="ml-auto">
                  {isEdit && (
                    <div className="mt-4.5">
                      <button
                        type="submit"
                        className="border border-primary rounded-full text-primary text-sm flex items-center gap-2 h-fit  px-4 py-1 ml-auto"
                      >
                        <Save />
                        <p>บันทึก</p>
                      </button>
                      <label className="text-red-500 text-end">
                        กรุณากดบันทึกก่อนดำเนินการต่อ
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

      {!isEdit && (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => handleIsEdit(true)}
            className="border border-primary rounded-full text-primary text-sm flex items-center gap-2 h-fit mt-4.5 px-4 py-1 ml-4"
          >
            <Edit />
            <p>แก้ไข</p>
          </button>
        </div>
      )}
    </>
  );
};
const FormTypeB = ({
  lifePhase,
  process_id,
  isEdit,
  data,
  tgoVehicles,
  id,
  handleIsEdit,
  // B2CData,
  isB2C,
}: // report_id,
{
  lifePhase: number;
  process_id: number;
  isEdit: boolean;
  data: ProcessItemType;
  tgoVehicles: TGOVehiclesWithEFType[];
  id: number;
  handleIsEdit: (value: boolean) => void;
  isB2C?: boolean;
  report_id?: number;
  B2CData?: ItemProcessType;
}) => {
  const fr04Service = new Fr04Service();
  const { handleSubmit } = useViewModel(id);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    item_name: "",
    item_unit: "",
    item_fu_qty: 0,
    distance: 0,
    distance_source: "",
    calculate_type: "",
    type1_gas: 0,
    type1_gas_unit: "",
    type1_gas_qty: 0,
    type1_ef: 0,
    type1_ef_source: "",
    type2_outbound_load: 0,
    type2_return_load: 0,
    type2_vehicle_outbound: "",
    type2_vehicle_return: "",
    type2_ef_source_ref: "",
    type2_outbound_load_percent: 0,
    type2_return_load_percent: 0,
    type2_outbound_ef: 0,
    type2_return_ef: 0,
    type2_ef_source: "",
  });
  const [fr4_2ReportId, setFr4_2ReportId] = useState<number>(0);
  const handleSetInitialValue = async (
    life_cycle_phase: number,
    product_id: number,
    class_type: string,
    item_id: number
  ) => {
    setLoading(true);
    if (isB2C) {
      // setInitialValues({
      //   item_name: B2CData?.item_name || "",
      //   item_unit: B2CData?.item_unit || "",
      //   item_fu_qty: B2CData?.item_fu_qty || "",
      //   distance: B2CData?.distance || "",
      //   distance_source: B2CData?.distance_source || "",
      //   calculate_type: B2CData?.calculate_type || "",
      //   type1_gas: B2CData?.type1_gas || 0,
      //   type1_gas_unit: B2CData?.type1_gas_unit || "",
      //   type1_gas_qty: B2CData?.type1_gas_qty || 0,
      //   type1_ef: B2CData?.type1_ef || 0,
      //   type1_ef_source: B2CData?.type1_ef_source || "",
      //   type2_outbound_load: B2CData?.type2_outbound_load || 0,
      //   type2_return_load: B2CData?.type2_return_load || 0,
      //   type2_vehicle_outbound: B2CData?.type2_vehicle_outbound || "",
      //   type2_vehicle_return: B2CData?.type2_vehicle_return || "",
      //   type2_ef_source_ref: B2CData?.type2_ef_source_ref || "",
      //   type2_outbound_load_percent: B2CData?.type2_outbound_load_percent || 0,
      //   type2_return_load_percent: B2CData?.type2_return_load_percent || 0,
      //   type2_outbound_ef: B2CData?.type2_outbound_ef || 0,
      //   type2_return_ef: B2CData?.type2_return_ef || 0,
      //   type2_ef_source: B2CData?.type2_ef_source || "",
      // });
    } else {
      await fr04Service
        .reqGetFr04_2Item(life_cycle_phase, product_id, class_type, item_id)
        .then((data) => {
          const itemInfo = data.itemInfo;
          setInitialValues({
            item_name: itemInfo.item_name,
            item_unit: itemInfo.item_unit,
            item_fu_qty: itemInfo.item_fu_qty,
            distance: itemInfo.distance,
            distance_source: itemInfo.distance_source,
            calculate_type: itemInfo.calculate_type,
            type1_gas: itemInfo.type1_gas || 0,
            type1_gas_unit: itemInfo.type1_gas_unit || "",
            type1_gas_qty: itemInfo.type1_gas_qty || 0,
            type1_ef: itemInfo.type1_ef || 0,
            type1_ef_source: itemInfo.type1_ef_source || "",
            type2_outbound_load: itemInfo.type2_outbound_load || 0,
            type2_return_load: itemInfo.type2_return_load || 0,
            type2_vehicle_outbound: itemInfo.type2_vehicle_outbound || "",
            type2_vehicle_return: itemInfo.type2_vehicle_return || "",
            type2_ef_source_ref: itemInfo.type2_ef_source_ref || "",
            type2_outbound_load_percent:
              itemInfo.type2_outbound_load_percent || 0,
            type2_return_load_percent: itemInfo.type2_return_load_percent || 0,
            type2_outbound_ef: itemInfo.type2_outbound_ef || 0,
            type2_return_ef: itemInfo.type2_return_ef || 0,
            type2_ef_source: itemInfo.type2_ef_source || "",
          });
          setFr4_2ReportId(data.itemInfo.report_42_id || 0);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          new Promise((resolve) => setTimeout(resolve, 1000));
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    (async () => {
      await handleSetInitialValue(
        lifePhase,
        id,
        data.item_class || "",
        data.item_id
      );
    })();
  }, []);

  return (
    <>
      {!loading ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) =>
            handleSubmit(
              fr4_2ReportId === 0 ||
                fr4_2ReportId === undefined ||
                fr4_2ReportId === null
                ? "POST"
                : "PUT",
              {
                company_id: 1005,
                product_id: id,
                process_id: process_id,
                life_cycle_phase: lifePhase,
                production_class: data.item_class || "input",
                item_process_id: data.item_id,
                item_name: data.item_name,
                item_fu_qty: values.item_fu_qty,
                item_unit: "",
                type1_gas_unit: null,
                type1_ef_source: null,
                type1_ef: null,
                type2_vehicle_outbound: values.type2_vehicle_outbound,
                type2_vehicle_return: values.type2_vehicle_return,
                type2_outbound_load:
                  Math.round(
                    Number(values.distance) * Number(values.item_fu_qty) * 1000
                  ) / 1000 || 0,
                type2_return_load:
                  values.type2_ef_source === "TGO_ef"
                    ? (() => {
                        const itemDetail =
                          tgoVehicles.find(
                            (data) =>
                              String(data.ef_id) ===
                              String(values.type2_vehicle_return)
                          )?.item_detail ?? "";

                        const weight = extractWeightFromDetail(itemDetail) ?? 0;

                        const tkm =
                          Math.round(
                            Number(values.distance) *
                              Number(values.item_fu_qty) *
                              10000
                          ) / 10000;

                        return weight !== null ? tkm / weight : 0;
                      })()
                    : values.type2_return_load,
                type2_ef_source: values.type2_ef_source,
                type2_ef_source_ref:
                  values.type2_ef_source === "TGO_ef"
                    ? String(
                        tgoVehicles.find(
                          (data) =>
                            data.ef_id === Number(values.type2_vehicle_outbound)
                        )?.ef_id
                      )
                    : values.type2_ef_source_ref,
                type2_outbound_ef:
                  values.type2_ef_source === "TGO_ef"
                    ? Number(
                        tgoVehicles.find(
                          (vehicles) =>
                            vehicles.ef_id ===
                            Number(values.type2_vehicle_outbound)
                        )?.ef
                      )
                    : Number(values.type2_outbound_ef),
                type2_return_ef:
                  values.type2_ef_source === "TGO_ef"
                    ? Number(
                        tgoVehicles.find(
                          (vehicles) =>
                            vehicles.ef_id ===
                            Number(values.type2_vehicle_return)
                        )?.ef
                      )
                    : Number(values.type2_return_ef),
                type1_gas_qty: 0,
                type2_outbound_load_percent: 0,
                type2_return_load_percent: 0,
                distance: values.distance,
                distance_source: values.distance_source,
                calculate_type: "",
                type1_gas: 0,
                ratio: 0,
                transport_emission: 0,
                cut_off: 0,
                add_on_detail: "",
              },
              fr4_2ReportId
            )
          }
        >
          {({ handleSubmit, values }) => {
            const transport_outboune_ef =
              values.type2_ef_source === "TG_ef"
                ? tgoVehicles.find(
                    (vehicles) =>
                      vehicles.ef_id === Number(values.type2_vehicle_outbound)
                  )?.ef
                : values.type2_outbound_ef;
            const transport_return_ef =
              values.type2_ef_source === "TG_ef"
                ? tgoVehicles.find(
                    (vehicles) =>
                      vehicles.ef_id === Number(values.type2_vehicle_return)
                  )?.ef
                : values.type2_return_ef;
            return (
              <Form onSubmit={handleSubmit}>
                <div>
                  {isEdit ? (
                    <div className="flex gap-4 mt-auto w-full mb-3">
                      <div className="w-80">
                        <Field
                          label="ปริมาณ Ton/FU"
                          name="item_fu_qty"
                          type="number"
                        />
                      </div>
                      <div className="w-80">
                        <Field
                          label="ระยะทาง km"
                          name="distance"
                          type="number"
                        />
                      </div>
                      <Field
                        label="แหล่งที่มาของข้อมูลการขนส่ง"
                        name="distance_source"
                      />
                    </div>
                  ) : (
                    <div className="flex gap-8">
                      <div>
                        <label className="text-sm text-gray-300">
                          ปริมาณ Ton/FU
                        </label>
                        <p>{initialValues.item_fu_qty || "-"}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-300">
                          ระยะทาง (km)
                        </label>
                        <p>{initialValues.distance || "-"}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-300">
                          แหล่งที่มาของข้อมูลการขนส่ง
                        </label>
                        <p>{initialValues.distance_source || "-"}</p>
                      </div>
                    </div>
                  )}
                  <div className="mt-3">
                    <p className="font-semibold text-primary">
                      แบบการใช้ระยะทาง
                    </p>

                    {isEdit ? (
                      <div className="flex flex-wrap gap-x-4">
                        <div className="w-40">
                          <AutoCompleteField
                            items={EF}
                            name="type2_ef_source"
                            label="ที่มาของค่า EF"
                          />
                        </div>
                        <div className="w-80">
                          {tgoVehicles &&
                          values.type2_ef_source === "TGO_ef" ? (
                            <AutoCompleteField
                              items={tgoVehicles.map((data) => {
                                return {
                                  label: data.item + ` (EF : ${data.ef})`,
                                  value: data.ef_id,
                                };
                              })}
                              name="type2_vehicle_outbound"
                              label="ประเภทพาหนะเที่ยวไป"
                              placeholder="ประเภทพาหนะเที่ยวไป"
                            />
                          ) : (
                            <Field
                              name="type2_vehicle_outbound"
                              label="ประเภทพาหนะเที่ยวไป"
                              placeholder="ประเภทพาหนะเที่ยวไป"
                            />
                          )}
                        </div>
                        <div className="w-80">
                          {tgoVehicles &&
                          values.type2_ef_source === "TGO_ef" ? (
                            <AutoCompleteField
                              items={tgoVehicles.map((data) => {
                                return {
                                  label: data.item + `(EF : ${data.ef})`,
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
                    ) : (
                      <div>
                        <label className="text-sm text-gray-300">
                          ประเภทพาหนะ
                        </label>
                        <p>
                          {initialValues.type2_ef_source === "TGO_ef"
                            ? tgoVehicles.find(
                                (data) =>
                                  data.ef_id ===
                                  Number(initialValues.type2_vehicle_outbound)
                              )?.item || "-"
                            : initialValues.type2_vehicle_outbound}
                        </p>
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-x-4">
                      <div>
                        {isEdit ? (
                          <p className="text-sm text-gray-300">
                            ภาระบรรทุกเที่ยวไป (tkm)
                          </p>
                        ) : (
                          ""
                        )}

                        <p>
                          {isEdit ? (
                            Math.round(
                              Number(values.distance) *
                                Number(values.item_fu_qty) *
                                1000
                            ) / 1000
                          ) : (
                            <>
                              <p className="text-sm text-gray-300">
                                ภาระบรรทุกเที่ยวไป (tkm)
                              </p>
                              {values.type2_outbound_load || "-"}
                            </>
                          )}
                        </p>
                      </div>

                      <div>
                        {isEdit && values.type2_ef_source === "TGO_ef" ? (
                          <p className="text-sm text-gray-300">
                            ภาระบรรทุกเที่ยวกลับ (km)
                          </p>
                        ) : (
                          ""
                        )}
                        <>
                          {isEdit ? (
                            values.type2_ef_source === "TGO_ef" ? (
                              (() => {
                                const itemDetail =
                                  tgoVehicles.find(
                                    (data) =>
                                      String(data.ef_id) ===
                                      String(values.type2_vehicle_return)
                                  )?.item_detail ?? "";
                                const weight =
                                  extractWeightFromDetail(itemDetail) ?? 0;
                                const tkm =
                                  Math.round(
                                    Number(values.distance) *
                                      Number(values.item_fu_qty) *
                                      10000
                                  ) / 10000;
                                return weight !== null ? tkm / weight : "-";
                              })()
                            ) : (
                              <Field
                                name="type2_return_load"
                                label="ภาระบรรทุกเที่ยวกลับ (km)"
                                placeholder="ภาระบรรทุกเที่ยวกลับ (km)"
                              />
                            )
                          ) : (
                            <>
                              <p className="text-sm text-gray-300">
                                ภาระบรรทุกเที่ยวกลับ (km)
                              </p>
                              {values.type2_return_load || "-"}
                            </>
                          )}
                        </>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="mt-4 flex flex-wrap gap-x-4">
                      <div>
                        <p className="text-sm text-gray-300">
                          การปล่อยก๊าซเรือนกระจกจากการขนส่งเที่ยวไป (kgCO2eq.)
                        </p>
                        <p>
                          {(
                            (Math.round(
                              Number(values.distance) *
                                Number(values.item_fu_qty) *
                                1000
                            ) /
                              1000) *
                            Number(transport_outboune_ef)
                          ).toFixed(4) || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">
                          การปล่อยก๊าซเรือนกระจกจากการขนส่งเที่ยวกลับ (kgCO2eq.)
                        </p>
                        <p>
                          {(() => {
                            const itemDetail =
                              tgoVehicles.find(
                                (data) =>
                                  String(data.ef_id) ===
                                  String(values.type2_vehicle_return)
                              )?.item_detail ?? "";

                            const weight =
                              extractWeightFromDetail(itemDetail) ?? 0;
                            const tkm = Math.round(
                              Number(values.distance) *
                                Number(values.item_fu_qty)
                            );

                            if (!weight && values.type2_ef_source === "TG_ef")
                              return "-";

                            return (
                              (values.type2_ef_source === "TG_ef"
                                ? tkm / weight
                                : values.type2_return_load) *
                              Number(transport_return_ef)
                            ).toFixed(4);
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      {isEdit ? (
                        <div className="flex gap-4">
                          <div className="w-80">
                            {values.type2_ef_source === "TGO_ef" ? (
                              <div>
                                <p className="text-sm text-gray-300">
                                  แหล่งอ้างอิง EF
                                </p>
                                <p>
                                  {
                                    tgoVehicles.find(
                                      (vehicles) =>
                                        vehicles.ef_id ===
                                        Number(values.type2_vehicle_outbound)
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
                            {values.type2_ef_source === "TGO_ef" ? (
                              <div>
                                <p className="text-sm text-gray-300">
                                  ค่า EF เที่ยวไป (kgCO2eq./หน่วย)
                                </p>
                                <p>
                                  {Number(
                                    tgoVehicles.find(
                                      (vehicles) =>
                                        vehicles.ef_id ===
                                        Number(values.type2_vehicle_outbound)
                                    )?.ef
                                  ).toFixed(4)}
                                </p>
                              </div>
                            ) : (
                              <Field
                                label="ค่า EF เที่ยวไป (kgCO2eq.)"
                                placeholder="ค่า EF เที่ยวไป (kgCO2eq.)"
                                name="type2_outbound_ef"
                                type="number"
                              />
                            )}
                          </div>
                          <div className="w-40">
                            {values.type2_ef_source === "TGO_ef" ? (
                              <div>
                                <p className="text-sm text-gray-300">
                                  ค่า EF เที่ยวกลับ (kgCO2eq./หน่วย)
                                </p>
                                <p>
                                  {Number(
                                    tgoVehicles.find(
                                      (vehicles) =>
                                        vehicles.ef_id ===
                                        Number(values.type2_vehicle_return)
                                    )?.ef
                                  ).toFixed(4)}
                                </p>
                              </div>
                            ) : (
                              <Field
                                label="ค่า EF เที่ยวกลับ (kgCO2eq.)"
                                placeholder="ค่า EF เที่ยวกลับ (kgCO2eq.)"
                                name="type2_return_ef"
                                type="number"
                              />
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-8">
                          <div>
                            <label className="text-sm text-gray-300">
                              ที่มาของค่า EF
                            </label>
                            <p>{values.type2_return_ef || "-"}</p>
                          </div>
                          <div className="w-1/3">
                            <label className="text-sm text-gray-300">
                              แหล่งอ้างอิง EF
                            </label>
                            <p>
                              {initialValues.type2_ef_source === "TGO_ef"
                                ? tgoVehicles.find(
                                    (data) =>
                                      data.ef_id ===
                                      Number(
                                        initialValues.type2_vehicle_outbound
                                      )
                                  )?.ef_source_ref || "-"
                                : initialValues.type2_vehicle_outbound}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-300">
                              ค่า EF เที่ยวไป (kgCO2eq./หน่วย)
                            </label>
                            <p>{values.type2_outbound_ef.toFixed(4) || "-"}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-300">
                              ค่า EF เที่ยวกลับ (kgCO2eq./หน่วย)
                            </label>
                            <p>{values.type2_return_ef.toFixed(4) || "-"}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-8 justify-end">
                  <div className="ml-auto">
                    {isEdit && (
                      <div className="mt-4.5">
                        <button
                          type="submit"
                          className="border border-primary rounded-full text-primary text-sm flex items-center gap-2 h-fit  px-4 py-1 ml-auto"
                        >
                          <Save />
                          <p>บันทึก</p>
                        </button>
                        <label className="text-red-500 text-end">
                          กรุณากดบันทึกก่อนดำเนินการต่อ
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <div className="w-fit mx-auto my-10">
          <CircularProgress />
        </div>
      )}
      {!isEdit && (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => handleIsEdit(true)}
            className="border border-primary rounded-full text-primary text-sm flex items-center gap-2 h-fit mt-4.5 px-4 py-1 ml-4"
          >
            <Edit />
            <p>แก้ไข</p>
          </button>
        </div>
      )}
    </>
  );
};

const EF = [
  { label: "TGO EF", value: "TGO_ef" },
  { label: "Int. DB", value: "Int_DB" },
];
function extractWeightFromDetail(item_detail: string) {
  const match = item_detail.match(/น้ำหนักบรรทุกสูงสุด\s+(\d+(\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
}
