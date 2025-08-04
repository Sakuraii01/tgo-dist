import { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import { Save, Edit } from "@mui/icons-material";
import { Accordion } from "../common/component/accordion";
import { ProcessStepper } from "../common/component/stepper";
import { FR04Layout } from "../common/layout";

import useViewModel from "./viewModel";
import type {
  ProcessItemType,
  // FR04_1ItemInfoType,
} from "../../../service/api/fr04/type";

import { Formik, Form } from "formik";
import { Field, AutoCompleteField } from "../../../component/input/field";
import { Fr04Service } from "../../../service/api/fr04";
const FR04_1 = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const {
    fr04Data,
    tab,
    handleTabChange,
    handleNavigateto04_2,
    handleNavigateto03,
  } = useViewModel(id);
  return (
    <div>
      <ProcessStepper isActive={2} id={id} />

      <FR04Layout
        isB2B={false}
        tabIndex={tab}
        handleTabChange={handleTabChange}
      >
        <div>
          {fr04Data?.[tab - 1]?.processes.map((data, key) => (
            <div className="border-b border-gray-300 pb-10 mb-10" key={key}>
              <h3 className="font-semibold text-linear text-primary-linear text-3xl mb-5">
                {data.process_name}
              </h3>
              {/* <h4>สารขาเข้า</h4> */}
              {data.item?.map((product, index) => (
                <div className="my-5" key={key + `${index}`}>
                  <Accordion title={product.item_name}>
                    <FR04_1Form
                      data={product}
                      id={id}
                      processName={data.process_name}
                      processId={data.process_id}
                      lifePhase={tab}
                      fu={fr04Data[tab - 1].FU || 0}
                    />
                  </Accordion>
                </div>
              ))}
            </div>
          ))}
        </div>
      </FR04Layout>
      <div className="w-1/3 mx-auto flex gap-4">
        <button
          onClick={() => handleNavigateto03()}
          type="button"
          className="transition-colors rounded-full w-full mt-6 px-10 py-2 bg-gray-400 hover:bg-gray-300 text-white font-semibold"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={() => handleNavigateto04_2()}
          type="button"
          className="rounded-full w-full mt-6 px-10 py-2 bg-gradient-to-r from-[#2BCFF2] via-[#19C2E6] via-30% to-[#0190C3]  text-white font-semibold transition hover:opacity-80"
        >
          บันทึกและไปขั้นตอนถัดไป
        </button>
      </div>
    </div>
  );
};
export default FR04_1;

const FR04_1Form = (props: {
  data: ProcessItemType;
  id: number;
  processName: string;
  processId: number;
  lifePhase: number;
  fu?: number;
}) => {
  const {
    tgoEfDropdown,
    selfCollectDropdown,
    fetchTGOEFDropdown,
    handleSubmit,
  } = useViewModel(props.id);
  const fr04Service = new Fr04Service();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    lci_source_period: "",
    ef_source: "",
    ef_source_ref: "",
    ef: "",
    ratio: "",
    description: "",
  });
  const [fr4_1ReportId, setFr4_1ReportId] = useState<number>(0);
  // const [fr04Item, setFr04Item] = useState<FR04_1ItemInfoType | null>(null);
  const handleSetInitialValues = async (
    life_cycle_phase: number,
    product_id: number,
    class_type: string,
    item_id: number
  ) => {
    setLoading(true);
    await fr04Service
      .reqGetFR04Item(life_cycle_phase, product_id, class_type, item_id)
      .then(
        (data) => (
          setInitialValues({
            lci_source_period: data?.itemInfo[0].lci_source_period ?? "",
            ef_source: data?.itemInfo[0].ef_source ?? "",
            ef_source_ref: data?.itemInfo[0].ef_source_ref,
            ef: String(data?.itemInfo[0].ef) ?? "",
            ratio: String(data?.itemInfo[0].ratio) ?? "",
            description: data.itemInfo[0].description,
          }),
          setFr4_1ReportId(data.itemInfo[0].report_41_id)
          // setFr04Item(data)
        )
      )
      .catch((err) => console.log(err));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };
  useEffect(() => {
    handleSetInitialValues(
      props.lifePhase,
      props.id,
      props.data.item_class,
      props.data.item_id
    );
  }, [isEdit]);

  return (
    <>
      {!loading ? (
        <Formik
          initialValues={initialValues}
          enableReinitialize
          // validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(
              fr4_1ReportId === 0 ||
                fr4_1ReportId === undefined ||
                fr4_1ReportId === null
                ? "POST"
                : "PUT",
              {
                company_id: 0,
                product_id: props.id,
                process_id: props.processId,
                item_process_id: props.data.item_id,
                life_cycle_phase: props.lifePhase,
                production_class: props.data.item_class,
                item_name: props.data.item_name,
                item_unit: props.data.item_unit,
                item_quantity: props.data.item_quantity,
                lci_source_period: values.lci_source_period,
                ef:
                  values.ef_source === "TGO EF"
                    ? Number(
                        tgoEfDropdown?.find(
                          (data) => data.ef_id === Number(values.ef_source_ref)
                        )?.ef
                      )
                    : values.ef_source === "Self collect"
                    ? Number(
                        selfCollectDropdown?.find(
                          (data) =>
                            data.self_collect_id ===
                            Number(values.ef_source_ref)
                        )?.self_collect_ef
                      )
                    : Number(values.ef),
                ef_source: values.ef_source,
                ef_source_ref: values.ef_source_ref,
                ratio: Number(values.ratio),
                ghg_emission: 0,
                cut_off: 0,
                description: values.description,
                transport_type: "type2",
                ghg_emission_proportion: 0,
              },
              fr4_1ReportId
            );
            setIsEdit(false);
          }}
        >
          {({ handleSubmit, values }) => {
            useEffect(() => {
              if (values.ef_source === "TGO EF") {
                fetchTGOEFDropdown();
              }
            }, [values.ef_source]);
            return (
              <Form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 font-medium">
                  <div>
                    <p className="font-semibold text-primary">LCI</p>
                    <div className="flex gap-8">
                      <div>
                        <p className="text-sm text-gray-300">หน่วย</p>
                        <p>{props.data.item_unit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">ปริมาณ</p>
                        <p>{props.data.item_quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">ปริมาณ/FU</p>
                        <p>
                          {props.fu
                            ? (props.data.item_quantity / props.fu).toFixed(4)
                            : "-"}
                        </p>
                      </div>
                      <div className="mt-auto w-64">
                        {isEdit ? (
                          <Field
                            name="lci_source_period"
                            label="ที่มาของค่า LCI"
                            placeholder="ที่มาของค่า LCI"
                            require
                          />
                        ) : (
                          <div>
                            <p className="text-sm text-gray-300">
                              ที่มาของค่า LCI
                            </p>
                            <p>{initialValues?.lci_source_period || "-"}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">EF</p>
                    {isEdit ? (
                      <div>
                        <div className="flex gap-x-4 gap-y-2">
                          <div className="w-40">
                            <AutoCompleteField
                              name="ef_source"
                              label="ที่มาของค่า EF"
                              placeholder="ที่มาของค่า EF"
                              items={EF.map((item) => ({
                                label: item.label,
                                value: item.value,
                              }))}
                            />
                          </div>

                          <div className="w-full">
                            {tgoEfDropdown && values.ef_source === "TGO EF" ? (
                              <AutoCompleteField
                                name="ef_source_ref"
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
                              values.ef_source === "Self collect" ? (
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
                                name="ef_source_ref"
                                label="แหล่งอ้างอิง EF"
                                placeholder="แหล่งอ้างอิง EF"
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          {values.ef_source === "TGO EF" ? (
                            <div>
                              <p className="text-sm text-gray-300">ค่า EF</p>
                              <p>
                                {tgoEfDropdown?.find(
                                  (data) =>
                                    data.ef_id === Number(values.ef_source_ref)
                                )?.ef || "-"}
                              </p>
                            </div>
                          ) : values.ef_source === "Self collect" ? (
                            <div>
                              <p className="text-sm text-gray-300">ค่า EF</p>
                              <p>
                                {selfCollectDropdown?.find(
                                  (data) =>
                                    data.self_collect_id ===
                                    Number(values.ef_source_ref)
                                )?.self_collect_ef || "-"}
                              </p>
                            </div>
                          ) : (
                            <Field
                              name="ef"
                              label="ค่า EF"
                              placeholder="ค่า EF"
                              type="number"
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-x-8">
                        <div>
                          <label className="text-sm text-gray-300">
                            ที่มาของค่า EF
                          </label>
                          <p className="w-fit">
                            {initialValues?.ef_source || "-"}
                          </p>
                        </div>

                        <div>
                          <label className="text-sm text-gray-300">
                            แหล่งอ้างอิง EF
                          </label>
                          <p className="w-fit">
                            {(initialValues.ef_source === "TGO EF"
                              ? tgoEfDropdown?.find(
                                  (data) =>
                                    data.ef_id ===
                                    Number(initialValues.ef_source_ref)
                                )?.item
                              : initialValues.ef_source === "Self collect"
                              ? selfCollectDropdown.find(
                                  (data) =>
                                    data.self_collect_id ===
                                    Number(initialValues.ef_source_ref)
                                )?.self_collect_name
                              : initialValues.ef_source_ref) || "-"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-300">
                            ค่า EF
                          </label>
                          <p>{initialValues.ef || "-"}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {isEdit ? (
                      <div className="flex gap-8 mt-5">
                        <div className="w-64">
                          <Field
                            name="ratio"
                            label="สัดส่วนการปันส่วน"
                            placeholder="สัดส่วนการปันส่วน"
                            type="number"
                            require
                          />
                        </div>
                        <Field
                          name="description"
                          label="หมายเหตุ / คำอธิบายเพิ่มเติม"
                          placeholder="หมายเหตุ / คำอธิบายเพิ่มเติม"
                          require
                        />
                      </div>
                    ) : (
                      <div className="flex gap-8 mt-5">
                        <div>
                          <p className="text-sm text-gray-300">การปันส่วน %</p>
                          <p className="w-fit">{initialValues?.ratio || "-"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">
                            หมายเหตุ / คำอธิบายเพิ่มเติม
                          </p>
                          <p>{initialValues?.description || "-"}</p>
                        </div>
                      </div>
                    )}
                  </div>

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
        <div>Loading ...</div>
      )}
      {!isEdit && (
        <div className="w-fit ml-auto">
          <button
            type="button"
            onClick={() => setIsEdit(true)}
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
  { label: "Self collect", value: "Self collect" },
  { label: "Supplier", value: "Supplier" },
  { label: "PCR Gen.", value: "PCR Gen" },
  { label: "TGO EF", value: "TGO EF" },
  { label: "Int. DB", value: "Int. DB" },
  { label: "Others", value: "Other" },
];

// import * as Yup from "yup";

// const validationSchema = Yup.object({
//   LCISource: Yup.string().required("กรุณาระบุที่มาของค่า LCI"),
//   EFSource: Yup.string().required("กรุณาเลือกที่มาของค่า EF"),
//   EFSourceRef: Yup.string().required("กรุณาเลือกที่มาของค่า EF"),
//   ratio: Yup.number().required("กรุณาระบุสัดส่วนการปันส่วน"),
// });
