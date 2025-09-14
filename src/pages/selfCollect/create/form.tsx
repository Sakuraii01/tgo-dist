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
import type { SelfCollectListType } from "../../../service/api/selfcollect/type";
import type { SelfCollectProcessItemType } from "../../../service/api/selfcollect/type";
import { SelfCollectService } from "../../../service/api/selfcollect";
import { ExpandCircleDownOutlined } from "@mui/icons-material";

import { Edit } from "@mui/icons-material";

import { Formik, Form } from "formik";
import {
  Field,
  AutoCompleteField,
  CheckboxField,
} from "../../../component/input/field";

type selfCollectTopicType = {
  initialValue: {
    selfCollectName: string;
    fu: string;
    unit: number;
  };
  validation: any;
  self_collect_id: number;
  onSubmit: (values: any) => void;
};
export const SelfCollectTopic = (props: selfCollectTopicType) => {
  const { unitsDropdown } = dropdown();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <>
      {!isEdit ? (
        <div className="w-fit">
          <p className="my-auto">
            ชื่อหน่วยสนับสนุนการผลิตหรือชื่อระบบผลิตภัณฑ์ที่เกี่ยวข้อง
          </p>
          <div className="flex w-full gap-2 text-primary">
            <div>
              <p className="font-semibold text-3xl my-auto">
                {props.initialValue.selfCollectName}
              </p>

              <p className="font-semibold my-auto">
                ค่าหน่วยการทำงาน {props.initialValue.fu}{" "}
                {
                  unitsDropdown.find(
                    (data) => Number(data.values) === props.initialValue.unit
                  )?.label
                }
              </p>
            </div>
            <div className="my-auto ml-10">
              <button
                className="px-2 pb-2 pt-1 bg-primary-2/5 rounded-full"
                type="button"
                onClick={() => setIsEdit(true)}
              >
                <Edit fontSize="small" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
            selfCollectName: props.initialValue.selfCollectName || "",
            functionalValue: props.initialValue.fu || "",
            functionalUnit: props.initialValue.unit || "",
          }}
          enableReinitialize
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
                  <div className="flex gap-2">
                    <div className="w-1/3">
                      <Field
                        name="functionalValue"
                        placeholder="ค่าหน่วยการทำงาน"
                        label="ค่าหน่วยการทำงาน"
                        require
                        type="number"
                      />
                    </div>
                    <div className="w-full">
                      <AutoCompleteField
                        name={`functionalUnit`}
                        label="หน่วยการทำงาน"
                        items={unitsDropdown.map((item) => ({
                          label: item.label,
                          value: Number(item.values),
                        }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-auto mx-auto w-fit flex gap-3 h-fit">
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
  last_prod_value: number;
  fu: number;

  item_id?: number;
  item_type: "input" | "output";
  addItem: boolean;
  handleCancleAdd?: (item: "input" | "output") => void;
  handleSubmit: (values: any, item_id?: number) => void;
  handleDelete: (item_id: number) => void;
};

export const IOItem = (props: processItemType) => {
  const {
    tgoEfDropdown,
    tgoVehicles,
    vehiclesDropdown,
    unitsDropdown,
    selfCollectDropdown,
  } = dropdown();

  const selfCollectService = new SelfCollectService();
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(props.addItem);
  const [initialValues, setInitialValues] =
    useState<SelfCollectProcessItemType>({
      cfp_report43_selfcollect_efs_id: 0,
      self_collect_id: 0,
      item_name: "",
      item_type: props.item_type,
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
            type2_ef_source: data.type2_ef_source || "NA",
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
            type2_FU: data.type2_FU,
            finish_output: data.finish_output,
          });
        })
        .catch((err) => console.log(err));
    }
  };
  const toggleAccordion = () => {
    setOpen(!open);
  };
  useEffect(() => {
    fetchItemData();
  }, [open, isEdit]);
  return (
    <div className="border border-gray-200/30 px-5 py-3 rounded mb-5">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          const ef =
            values.item_ef_source === "TGO EF"
              ? tgoEfDropdown?.find(
                  (data) => data.ef_id === Number(values.item_ef_source_ref)
                )?.ef
              : values.item_ef_source === "Self collect"
              ? selfCollectDropdown?.find(
                  (data) =>
                    data.self_collect_id === Number(values.item_ef_source_ref)
                )?.self_collect_ef
              : values.item_ef;

          const transport_outboune_ef =
            values.type2_ef_source === "TG_ef"
              ? tgoVehicles.find(
                  (vehicles) => vehicles.ef_id === Number(values.type2_vehicle)
                )?.ef
              : values.type2_outbound_ef;
          const transport_return_ef =
            values.type2_ef_source === "TG_ef"
              ? tgoVehicles.find(
                  (vehicles) =>
                    vehicles.ef_id === Number(values.type2_vehicle_return)
                )?.ef
              : values.type2_return_ef;

          const item_e =
            ((Number(values.item_qty) * props.fu) / props.last_prod_value) *
            Number(ef);
          const transport_e =
            Number(transport_outboune_ef) * Number(values.type2_outbound_load) +
            (Number(transport_return_ef) + Number(values.type2_return_load));

          props.handleSubmit(
            {
              ...values,
              transport_emission: transport_e,
              item_emission: item_e,
              total_emission: transport_e + item_e,
              item_ef: ef,
              type2_ef_source:
                values.type2_ef_source !== "TG_ef" &&
                values.type2_ef_source !== "Int_DB"
                  ? "NA"
                  : values.type2_ef_source,

              type2_ef_source_ref:
                values.type2_ef_source === "TG_ef"
                  ? tgoVehicles.find(
                      (vehicles) =>
                        vehicles.ef_id === Number(values.type2_vehicle)
                    )?.ef_source_ref
                  : values.type2_ef_source_ref,

              type2_outbound_ef: transport_outboune_ef,
              type2_outbound_load:
                values.type2_ef_source === "TG_ef"
                  ? Math.round(
                      Number(values.type2_distance) *
                        Number(values.type2_FU) *
                        1000
                    )
                  : values.type2_outbound_load,
              type2_return_ef: transport_return_ef,
              type2_return_load:
                values.type2_ef_source === "TG_ef"
                  ? (() => {
                      const itemDetail =
                        vehiclesDropdown.find(
                          (data) =>
                            String(data.ef_id) ===
                            String(values.type2_vehicle_return)
                        )?.item_detail ?? "";
                      const weight = extractWeightFromDetail(itemDetail) ?? 0;
                      const tkm = Math.round(
                        Number(values.type2_distance) *
                          Number(values.type2_FU) *
                          1000
                      );
                      return weight !== null ? tkm / weight : "-";
                    })()
                  : values.type2_return_load,
              finish_output: values.finish_output ? 1 : 0,
            },
            props.item_id
          );
          resetForm();
          setIsEdit(false);
        }}
      >
        {({ handleSubmit, values }) => {
          const ef =
            values.item_ef_source === "TGO EF"
              ? tgoEfDropdown?.find(
                  (data) => data.ef_id === Number(values.item_ef_source_ref)
                )?.ef
              : values.item_ef_source === "Self collect"
              ? selfCollectDropdown?.find(
                  (data) =>
                    data.self_collect_id === Number(values.item_ef_source_ref)
                )?.self_collect_ef
              : values.item_ef;

          const transport_outboune_ef =
            values.type2_ef_source === "TG_ef"
              ? tgoVehicles.find(
                  (vehicles) => vehicles.ef_id === Number(values.type2_vehicle)
                )?.ef
              : values.type2_outbound_ef;
          const transport_return_ef =
            values.type2_ef_source === "TG_ef"
              ? tgoVehicles.find(
                  (vehicles) =>
                    vehicles.ef_id === Number(values.type2_vehicle_return)
                )?.ef
              : values.type2_return_ef;

          const item_e = Number(values.item_fu_qty) * Number(ef);

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
                      <section className="p-6 mb-4 border border-stroke bg-white shadow-inner rounded-lg">
                        <div>
                          <p className="font-semibold mb-6 text-lg text-primary">
                            การประเมินการปล่อยก๊าซเรือนกระจกจากวัตถุดิบ
                          </p>
                          <div id="lci">
                            <p className="font-semibold mb-2 text-lg text-primary">
                              LCI
                            </p>
                            <div className="flex gap-4 mb-4">
                              <Field
                                name={`item_qty`}
                                placeholder={"ปริมาณ"}
                                label={"ปริมาณ"}
                                type="number"
                              />
                              <AutoCompleteField
                                items={unitsDropdown.map((units) => ({
                                  label: units.label,
                                  value: units.values,
                                }))}
                                name={`item_unit`}
                                placeholder={"หน่วย"}
                                label={"หน่วย"}
                              />
                              <div className="w-full">
                                <p className="text-sm text-gray-300">
                                  ปริมาณ/FU
                                </p>
                                <p>
                                  {(Number(values.item_qty) * props.fu) /
                                    props.last_prod_value}
                                </p>
                              </div>
                              {/* <Field
                                name={`item_fu_qty`}
                                placeholder={"ปริมาณ ton/FU"}
                                label={"ปริมาณ ton/FU"}
                              /> */}
                              <Field
                                name={`item_source`}
                                placeholder={"แหล่งที่มาของ LCI"}
                                label={"แหล่งที่มาของ LCI"}
                              />
                            </div>
                          </div>
                          <div id="ef">
                            <p className="font-semibold mb-2 text-lg text-primary">
                              EF (kgCO2eq./หน่วย)
                            </p>
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
                                      label:
                                        item.item +
                                        item.item_detail +
                                        " (EF = " +
                                        item.ef +
                                        ")",
                                      value: item.ef_id,
                                    }))}
                                  />
                                ) : selfCollectDropdown &&
                                  values.item_ef_source === "Self collect" ? (
                                  <AutoCompleteField
                                    name="ef_source_ref"
                                    label="แหล่งอ้างอิง EF"
                                    placeholder="แหล่งอ้างอิง EF"
                                    items={selfCollectDropdown.map((item) => ({
                                      label:
                                        item.self_collect_name +
                                        " (EF = " +
                                        item.self_collect_ef +
                                        ")",
                                      value: item.self_collect_id,
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
                                    <p className="text-sm text-gray-300">
                                      ค่า EF (kgCO2eq./หน่วย)
                                    </p>
                                    <p>
                                      {tgoEfDropdown?.find(
                                        (data) =>
                                          data.ef_id ===
                                          Number(values.item_ef_source_ref)
                                      )?.ef || "-"}
                                    </p>
                                  </div>
                                ) : values.item_ef_source === "Self collect" ? (
                                  <div>
                                    <p className="text-sm text-gray-300">
                                      ค่า EF (kgCO2eq./หน่วย)
                                    </p>
                                    <p>
                                      {selfCollectDropdown?.find(
                                        (data) =>
                                          data.self_collect_id ===
                                          Number(values.item_ef_source_ref)
                                      )?.self_collect_ef || "-"}
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
                              <p>การปล่อยก๊าซเรือนกระจกจากวัตถุดิบ(kgCO2e)</p>
                              <p className="text-primary">
                                {item_e.toFixed(4)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section className="p-6 mb-4 border border-stroke bg-white shadow-inner rounded-lg">
                        <div id="transportation">
                          <p className="font-semibold text-lg text-primary">
                            การประเมินการปล่อยก๊าซเรือนกระจกจากการขนส่ง
                          </p>
                          <p className="mb-6 italic text-gray-300">
                            การขนส่ง แบบการใช้ระยะทาง
                          </p>
                          <div>
                            <div className="flex gap-3">
                              <div className="w-52">
                                <Field
                                  name={`type2_FU`}
                                  placeholder={"ปริมาณ ton/FU"}
                                  label={"ปริมาณ ton/FU"}
                                />
                              </div>
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
                            <div className="flex gap-3 w-2/3">
                              {values.type2_ef_source === "TG_ef" ? (
                                <div>
                                  <p>ภาระบรรทุกเที่ยวไป (tkm)</p>
                                  <p>
                                    {Math.round(
                                      Number(values.type2_distance) *
                                        Number(values.type2_FU) *
                                        1000
                                    ) / 1000}
                                  </p>
                                </div>
                              ) : (
                                <Field
                                  name="type2_outbound_load"
                                  label="ภาระบรรทุกเที่ยวไป (tkm)"
                                  placeholder="ภาระบรรทุกเที่ยวไป (tkm)"
                                />
                              )}
                              {values.type2_ef_source === "TG_ef" ? (
                                <div>
                                  <p>ภาระบรรทุกเที่ยวกลับ (km)</p>
                                  <p>
                                    {(() => {
                                      const itemDetail =
                                        vehiclesDropdown.find(
                                          (data) =>
                                            String(data.ef_id) ===
                                            String(values.type2_vehicle_return)
                                        )?.item_detail ?? "";
                                      const weight =
                                        extractWeightFromDetail(itemDetail) ??
                                        0;
                                      const tkm =
                                        Math.round(
                                          Number(values.type2_distance) *
                                            Number(values.type2_FU) *
                                            1000
                                        ) / 1000;
                                      return weight !== null
                                        ? tkm / weight
                                        : "-";
                                    })()}
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
                                {values.type2_ef_source === "TG_ef" ? (
                                  <div>
                                    <p className="text-sm text-gray-300">
                                      แหล่งอ้างอิง EF
                                    </p>
                                    <p>
                                      {tgoVehicles.find(
                                        (vehicles) =>
                                          vehicles.ef_id ===
                                          Number(values.type2_vehicle)
                                      )?.ef_source_ref || "-"}
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
                                      ค่า EF เที่ยวไป (kgCO2eq./หน่วย)
                                    </p>
                                    <p>
                                      {tgoVehicles.find(
                                        (vehicles) =>
                                          vehicles.ef_id ===
                                          Number(values.type2_vehicle)
                                      )?.ef || "-"}
                                    </p>
                                  </div>
                                ) : (
                                  <Field
                                    label="ค่า EF เที่ยวไป (kgCO2eq./หน่วย)"
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
                                      ค่า EF เที่ยวกลับ (kgCO2eq./หน่วย)
                                    </p>
                                    <p>
                                      {tgoVehicles.find(
                                        (vehicles) =>
                                          vehicles.ef_id ===
                                          Number(values.type2_vehicle_return)
                                      )?.ef || "-"}
                                    </p>
                                  </div>
                                ) : (
                                  <Field
                                    label="ค่า EF เที่ยวกลับ (kgCO2eq./หน่วย)"
                                    placeholder="ค่า EF เที่ยวกลับ"
                                    name={`type2_return_ef`}
                                    type="number"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="flex gap-10 mt-5">
                              <div className="p-4 rounded-xl shadow-lg">
                                <p className="text-sm">
                                  การปล่อยก๊าซเรือนกระจกจากการขนส่งเที่ยวไป
                                  (kgCO2e)
                                </p>
                                <p className="text-primary">
                                  {(
                                    (Math.round(
                                      Number(values.type2_distance) *
                                        Number(values.type2_FU) *
                                        1000
                                    ) /
                                      1000) *
                                    Number(transport_outboune_ef)
                                  ).toFixed(4)}
                                </p>
                              </div>
                              <div className="p-4 rounded-xl shadow-lg">
                                <p className="text-sm">
                                  การปล่อยก๊าซเรือนกระจกจากการขนส่งเที่ยวกลับ
                                  (kgCO2e)
                                </p>
                                <p className="text-primary">
                                  {(() => {
                                    const itemDetail =
                                      vehiclesDropdown.find(
                                        (data) =>
                                          String(data.ef_id) ===
                                          String(values.type2_vehicle_return)
                                      )?.item_detail ?? "";

                                    const weight =
                                      extractWeightFromDetail(itemDetail) ?? 0;
                                    const tkm = Math.round(
                                      Number(values.type2_distance) *
                                        Number(values.type2_FU)
                                    );

                                    if (!weight) return "-";

                                    return (
                                      (tkm / weight) *
                                      Number(transport_return_ef)
                                    ).toFixed(4);
                                  })()}
                                </p>
                              </div>
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
                    <div className="mt-5 font-medium">
                      <section className="p-6 mb-4 border border-stroke bg-white shadow-inner rounded-lg">
                        <p className="font-semibold mb-6 text-lg text-primary">
                          การประเมินการปล่อยก๊าซเรือนกระจกจากวัตถุดิบ
                        </p>
                        <div className="flex gap-10">
                          <div>
                            <p className="text-sm text-gray-300">ปริมาณ</p>
                            <p>
                              {Number(initialValues.item_qty).toFixed(4) || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">หน่วย</p>
                            <p>{initialValues.item_unit || "-"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">ปริมาณ/FU</p>
                            <p>
                              {(Number(initialValues.item_qty) * props.fu) /
                                props.last_prod_value}
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
                              {tgoEfDropdown?.find(
                                (data) =>
                                  data.ef_id ===
                                  Number(initialValues.item_ef_source_ref)
                              )?.item || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">
                              EF (kgCO2eq./หน่วย)
                            </p>
                            <p>
                              {Number(initialValues.item_ef).toFixed(4) || "-"}
                            </p>
                          </div>
                        </div>
                      </section>
                      <section className="p-6 mb-4 border border-stroke bg-white shadow-inner rounded-lg">
                        <p className="font-semibold  text-lg text-primary">
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
                            <p>
                              {Number(initialValues.type2_distance).toFixed(
                                4
                              ) || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">
                              ที่มาของค่า EF
                            </p>
                            <p>
                              {VehicalsEF.find(
                                (data) =>
                                  initialValues.type2_ef_source === data.value
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
                              {vehiclesDropdown?.find(
                                (data) =>
                                  data.ef_id ===
                                  Number(initialValues.type2_vehicle)
                              )?.item || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">
                              ประเภทพาหนะเที่ยวกลับ
                            </p>
                            <p>
                              {vehiclesDropdown?.find(
                                (data) =>
                                  data.ef_id ===
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
                            <p>
                              {Number(
                                initialValues.type2_outbound_load
                              ).toFixed(2) || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">
                              ภาระบรรทุกเที่ยวกลับ (km)
                            </p>
                            <p>
                              {Number(initialValues.type2_return_load).toFixed(
                                2
                              ) || "-"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-10 mt-5">
                          <div>
                            <p className="text-sm text-gray-300">
                              ค่า EF เที่ยวไป (kgCO2eq./หน่วย)
                            </p>
                            <p>
                              {Number(initialValues.type2_outbound_ef).toFixed(
                                4
                              ) || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">
                              ค่า EF เที่ยวกลับ (kgCO2eq./หน่วย)
                            </p>
                            <p>
                              {Number(initialValues.type2_return_ef).toFixed(
                                4
                              ) || "-"}
                            </p>
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
                              : ""
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

const dropdown = () => {
  const tGOVehiclesService = new TGOVehiclesService();
  const tGOEFDropdownService = new TGOEFDropdownService();
  const unitsDropdownService = new UnitsDropdownService();
  const vehiclesDropdownService = new TGOVehiclesService();
  const selfCollectService = new SelfCollectService();

  const [tgoEfDropdown, setTgoEfDropdown] = useState<
    TGOEFDropdownType[] | null
  >([]);
  const [tgoVehicles, setTgoVehicles] = useState<TGOVehiclesWithEFType[]>([]);
  const [unitsDropdown, setUnitsDropdown] = useState<
    { label: string; values: string }[]
  >([]);
  const [vehiclesDropdown, setVehiclesDropdown] = useState<
    TGOVehiclesWithEFType[]
  >([]);
  const [selfCollectDropdown, setSelfCollectDropdown] = useState<
    SelfCollectListType[]
  >([]);

  const fetchUnitsDropdown = async () => {
    const data = await unitsDropdownService.reqGetUnits();
    setUnitsDropdown(
      data.map((unit) => {
        return {
          label: unit.product_unit_name_en,
          values: String(unit.product_unit_id),
        };
      })
    );
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
    selfCollectService
      .reqGetSelfCollectList()
      .then((res) => setSelfCollectDropdown(res))
      .catch((err) => console.log(err));
  }, []);

  return {
    tgoEfDropdown,
    tgoVehicles,
    vehiclesDropdown,
    unitsDropdown,
    selfCollectDropdown,
  };
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
