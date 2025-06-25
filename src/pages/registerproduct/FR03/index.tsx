import {
  DeleteRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  MoreVert,
  Add,
  Edit,
  Clear,
  Check,
  CreateRounded,
} from "@mui/icons-material";
import { MaterialCardItem } from "../common/component/card";
import { ProcessStepper } from "../common/component/stepper";
import { FR03Summary } from "./summary";
import { FR03Form } from "./form";
import { Field } from "../../../component/input/field";
import { Formik } from "formik";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

import useViewModel from "./viewModel";
import { type ProcessType } from "../../../service/api/fr03/type";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";
import { useState } from "react";
import { Popup } from "../../../component/layout";
import FR03FormSchema from "./validation";
const FR03 = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { tab, handleTabChange, handelAddProcess } = useViewModel(id);
  const { processData } = useViewModel(id);
  const navigate = useNavigate();

  return (
    <div>
      <ProcessStepper isActive={1} id={id} />

      <div className="flex w-fit mx-auto text-xl font-medium text-gray-300">
        <p
          onClick={() => handleTabChange(1)}
          className={`${
            tab === 1
              ? "font-bold text-primary border-b-2 border-primary"
              : "border-b border-gray-300"
          } px-6 py-2`}
        >
          กรอกข้อมูล
        </p>
        <p
          onClick={() => handleTabChange(0)}
          className={`${
            tab === 0
              ? "font-bold text-primary border-b-2 border-primary"
              : "border-b border-gray-300"
          } px-6 py-2`}
        >
          สรุปผล
        </p>
      </div>
      {tab === 0 ? (
        <div>
          <FR03Summary />
        </div>
      ) : (
        <div>
          <DraggableList />
          <AddProcess
            processId={processData?.length ?? 0}
            handleAddProcess={handelAddProcess}
          />
        </div>
      )}

      <div className="w-1/4 mx-auto flex gap-4">
        <button className="transition-colors rounded-full w-full mt-6 px-10 py-2 bg-gray-400 hover:bg-gray-300 text-white font-semibold">
          กลับ FR 01
        </button>
        <button
          onClick={() => navigate(PROTECTED_PATH.REGISTER_PRODUCT_FR04_1)}
          type="submit"
          className="rounded-full w-full mt-6 px-10 py-2 bg-gradient-to-r from-[#2BCFF2] via-[#19C2E6] via-30% to-[#0190C3]  text-white font-semibold transition hover:opacity-80"
        >
          ไป FR 04.1
        </button>
      </div>
    </div>
  );
};
export default FR03;

const AddProcess = ({
  processId,
  handleAddProcess,
}: {
  processId: number;
  handleAddProcess: (id: number, processName: string) => void;
}) => {
  const { AddProcessValidationSchema } = FR03FormSchema();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex max-w-5xl mx-auto my-5 bg-white">
      <div className="rounded-full bg-primary/10 border border-primary text-primary font-semibold text-sm flex items-center justify-center w-8 h-8 mr-4 my-auto">
        <Add fontSize="small" />
      </div>
      <button
        onClick={() => setShowForm(true)}
        className={`border border-dashed border-primary-2 text-primary-2 text-start rounded-full w-full py-4 px-10 
            hover:bg-primary-2/10 transition-colors`}
      >
        <p>เพิ่มกระบวนการ</p>
      </button>
      {showForm && (
        <Popup>
          <Formik
            initialValues={{ process_name: "" }}
            validationSchema={AddProcessValidationSchema}
            onSubmit={(values) => {
              handleAddProcess(processId + 1, values.process_name);
              setShowForm(false);
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="w-full">
                <h1 className="text-primary font-bold text-2xl my-2">
                  เพิ่มกระบวนการ
                </h1>
                <div className="flex flex-col gap-4">
                  <Field
                    name="process_name"
                    label="ชื่อกระบวนการ"
                    placeholder="ระบุชื่อกระบวนการ"
                  />
                  <div className="flex gap-4 justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                      }}
                      className="border border-gray-200 rounded-full text-gray-200 hover:bg-gray-200/10 transition font-semibold text-sm flex items-center gap-2 h-fit my-3 px-3 py-1 transform"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="border border-primary rounded-full text-primary hover:bg-primary/10 transition font-semibold text-sm flex items-center gap-2 h-fit my-3 px-3 py-1 transform"
                    >
                      + เพิ่มกระบวนการ
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </Popup>
      )}
    </div>
  );
};
type FR03ItemProps = {
  data: ProcessType;
  order: number;
  isOpen: boolean;
  onToggle: () => void;
  dragHandleProps?: React.HTMLAttributes<any>;
};
const FR03Item = (props: FR03ItemProps) => {
  const { handleDeleteProcess, handleUpdateProcess, handleOnSubmitFR03Item } =
    useViewModel(props.data.product_id);
  const { AddProcessValidationSchema } = FR03FormSchema();
  const { isOpen, onToggle } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [showform, setShowform] = useState(false);

  const [editIsOpen, setEditIsOpen] = useState("open");

  const cardButtonRender = (
    process_id: number,
    item_id: number,
    type: string
  ) => {
    return (
      <div className="flex gap-2 my-auto">
        <button
          onClick={() => setEditIsOpen(`open-${type}-${process_id}-${item_id}`)}
        >
          <CreateRounded sx={{ fontSize: "16px" }} className="text-primary" />
        </button>
        <button onClick={() => console.log(type, process_id, item_id)}>
          <DeleteRounded sx={{ fontSize: "16px" }} className="text-error" />
        </button>
      </div>
    );
  };
  return (
    <div className="flex max-w-5xl mx-auto my-3 bg-white">
      <div className="rounded-full bg-primary/10 border border-primary text-primary font-semibold text-sm flex items-center justify-center w-8 h-8 mr-4">
        <p>{props.order}</p>
      </div>
      <div
        {...props.dragHandleProps}
        className="bg-stroke rounded-l-md border border-gray-400 relative w-7"
      >
        <div className="absolute text-gray-300 transform -translate-y-1/2 top-1/2">
          <MoreVert />
        </div>
      </div>
      <div className="border border-gray-400 rounded-r-md pt-3 w-full">
        <Formik
          initialValues={{ process_name: props.data.process_name ?? "" }}
          enableReinitialize
          validationSchema={AddProcessValidationSchema}
          onSubmit={async (values) => {
            handleUpdateProcess(props.data.process_id, values.process_name);
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="w-full">
              <div
                className={`flex ${
                  isOpen ? "border-b" : ""
                } border-gray-400 pb-4 px-6 justify-between`}
              >
                <div className="my-auto h-fit">
                  {!isEdit ? (
                    <p className="text-xl pt-1">{props.data.process_name}</p>
                  ) : (
                    <div className="w-96">
                      <Field
                        name="process_name"
                        label="ชื่อกระบวนการ"
                        placeholder="ระบุชื่อกระบวนการ"
                      />
                    </div>
                  )}
                </div>

                <div className="flex my-auto gap-2">
                  {!isEdit ? (
                    <>
                      <button
                        className="border border-primary rounded-full text-primary hover:bg-primary/10 transition font-semibold text-sm flex items-center gap-2 h-fit my-3 px-3 py-1 transform"
                        onClick={() => setIsEdit(true)}
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteProcess(props.data.process_id);
                        }}
                        type="button"
                        className="border border-red-700 rounded-full text-red-700 hover:bg-red-50 transition font-semibold text-sm flex items-center gap-2 h-fit my-3 px-3 py-1 transform"
                      >
                        <DeleteRounded />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="border border-gray-200 rounded-full text-gray-200 hover:bg-gray-200/10 transition font-semibold text-sm flex items-center gap-2 h-fit my-3 px-3 py-1 transform"
                        onClick={() => setIsEdit(false)}
                      >
                        <Clear />
                      </button>
                      <button
                        type="submit"
                        className="border border-primary rounded-full text-primary hover:bg-primary/10 transition font-semibold text-sm flex items-center gap-2 h-fit my-3 px-3 py-1 transform"
                      >
                        <Check />
                      </button>
                    </>
                  )}
                  <div className="my-auto" onClick={onToggle}>
                    {isOpen ? (
                      <KeyboardArrowUpRounded />
                    ) : (
                      <KeyboardArrowDownRounded />
                    )}
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
        {isOpen && (
          <>
            <div className="px-6 py-4">
              <button
                onClick={() => setShowform(true)}
                className={`text-white bg-primary-2 rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-2 
                    transition-colors hover:bg-primary-2/80`}
              >
                <p>+ เพิ่มรายการ</p>
              </button>
              <FR03Form
                showForm={showform}
                initialValues={{
                  type: "input",
                  itemName: "",
                  materialType: "",
                  unit: "",
                  amount: 0,
                  chemical_reaction: 11,
                  isLastProduct: false,
                  sumPackage: false,
                }}
                handleOnClose={() => setShowform(false)}
                handleOnSubmit={(data, type) =>
                  handleOnSubmitFR03Item(data, type, props.data.process_id)
                }
              />
            </div>
            <div className="border-t border-gray-400 bg-gray-100 flex gap-2 px-5 py-4">
              <div className="rounded-md bg-white border border-gray-400 p-4 w-full">
                <div>
                  <h5 className="text-black font-medium text-lg mb-4">
                    สารขาเข้า
                  </h5>
                </div>
                <div className="font-medium">
                  <div className="mb-6">
                    <div className="w-full rounded bg-stroke px-3 my-2">
                      <p>วัตถุดิบ</p>
                    </div>
                    {props?.data?.input?.filter(
                      (data) => data.input_cat_id === 8
                    )[0] ? (
                      props?.data?.input
                        ?.filter((data) => data.input_cat_id === 8)
                        ?.map((data, index) => {
                          console.log(data);
                          return (
                            <>
                              <FR03Form
                                initialValues={{
                                  type: "input",
                                  itemName: data.input_name,
                                  materialType: data.input_cat_id,
                                  unit: data.input_unit,
                                  amount: Number(data.input_quantity),
                                }}
                                handleOnClose={() => setEditIsOpen("close")}
                                handleOnSubmit={(
                                  formData,
                                  type,
                                  process_id
                                ) => {
                                  handleOnSubmitFR03Item(
                                    formData,
                                    type,
                                    Number(process_id),
                                    data.input_process_id,
                                    true
                                  );
                                  console.log(formData, type, process_id);
                                }}
                                showForm={
                                  editIsOpen ===
                                  `open-input-${data.process_id}-${
                                    data?.input_process_id || 0
                                  }`
                                }
                                isUpdate
                              />
                              <MaterialCardItem
                                key={index}
                                title={data.input_name}
                                unit={data.input_unit}
                                amount={data.input_quantity}
                                type={data.input_cat_name_TH}
                                button={cardButtonRender(
                                  data.process_id,
                                  data?.input_process_id || 0,
                                  "input"
                                )}
                              />
                            </>
                          );
                        })
                    ) : (
                      <p className="text-gray-300 text-sm italic mt-4 ml-3">
                        ไม่มีวัตถุดิบ
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <div className="w-full rounded bg-stroke px-3 my-2">
                      <p>พลังงาน และเชื้อเพลิง</p>
                    </div>
                    {props?.data?.input?.filter(
                      (data) => data.input_cat_id === 9
                    )[0] ? (
                      props?.data?.input
                        ?.filter((data) => data.input_cat_id === 9)
                        ?.map((data, index) => (
                          <>
                            <FR03Form
                              initialValues={{
                                type: "input",
                                itemName: data.input_name,
                                materialType: data.input_cat_id,
                                unit: data.input_unit,
                                amount: Number(data.input_quantity),
                              }}
                              handleOnClose={() => setEditIsOpen("close")}
                              handleOnSubmit={(formData, type, process_id) => {
                                console.log(formData, type, process_id);
                                handleOnSubmitFR03Item(
                                  formData,
                                  type,
                                  Number(process_id),
                                  data.input_process_id,
                                  true
                                );
                              }}
                              showForm={
                                editIsOpen ===
                                `open-input-${data.process_id}-${
                                  data?.input_process_id || 0
                                }`
                              }
                              isUpdate
                            />
                            <MaterialCardItem
                              key={index}
                              title={data.input_name}
                              unit={data.input_unit}
                              amount={data.input_quantity}
                              type={data.input_cat_name_TH}
                              button={cardButtonRender(
                                data.process_id,
                                data?.input_process_id || 0,
                                "input"
                              )}
                            />
                          </>
                        ))
                    ) : (
                      <p className="text-gray-300 text-sm italic mt-4 ml-3">
                        ไม่มีพลังงาน และเชื้อเพลิง
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <div className="w-full rounded bg-stroke px-3 my-2">
                      <p>ทรัพยากร และวัสดุช่วยการผลิต</p>
                    </div>
                    {props?.data?.input?.filter(
                      (data) => data.input_cat_id === 7
                    )[0] ? (
                      props?.data?.input
                        ?.filter((data) => data.input_cat_id === 7)
                        ?.map((data, index) => (
                          <>
                            <FR03Form
                              initialValues={{
                                type: "input",
                                itemName: data.input_name,
                                materialType: data.input_cat_id,
                                unit: data.input_unit,
                                amount: Number(data.input_quantity),
                              }}
                              handleOnClose={() => setEditIsOpen("close")}
                              handleOnSubmit={(formData, type, process_id) => {
                                console.log(formData, type, process_id);
                                handleOnSubmitFR03Item(
                                  formData,
                                  type,
                                  Number(process_id),
                                  data.input_process_id,
                                  true
                                );
                              }}
                              showForm={
                                editIsOpen ===
                                `open-input-${data.process_id}-${
                                  data?.input_process_id || 0
                                }`
                              }
                              isUpdate
                            />
                            <MaterialCardItem
                              key={index}
                              title={data.input_name}
                              unit={data.input_unit}
                              amount={data.input_quantity}
                              type={data.input_cat_name_TH}
                              button={cardButtonRender(
                                data.process_id,
                                data?.input_process_id || 0,
                                "input"
                              )}
                            />
                          </>
                        ))
                    ) : (
                      <p className="text-gray-300 text-sm italic mt-4 ml-3">
                        ไม่มีทรัพยากร และวัสดุช่วยการผลิต
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="rounded-md bg-white border border-gray-400 p-4">
                  <div>
                    <h5 className="text-black font-medium text-lg mb-4">
                      ผลิตภัณฑ์ระหว่างทาง
                    </h5>
                  </div>
                  {props?.data?.output[0] ? (
                    props?.data?.output?.map((data, index) => (
                      <>
                        <FR03Form
                          initialValues={{
                            type: "intermediate",
                            itemName: data.output_name,
                            materialType: data.output_cat_id,
                            unit: data.output_unit,
                            amount: Number(data.output_quantity),
                            isLastProduct: data.finish_output,
                            sumPackage: data.packaging_output,
                          }}
                          handleOnClose={() => setEditIsOpen("close")}
                          handleOnSubmit={(formData, type, process_id) => {
                            console.log(formData, type, process_id);
                            handleOnSubmitFR03Item(
                              formData,
                              type,
                              Number(process_id),
                              data.output_process_id,
                              true
                            );
                          }}
                          showForm={
                            editIsOpen ===
                            `open-intermediate-${data.process_id}-${
                              data?.output_process_id || 0
                            }`
                          }
                          isUpdate
                        />
                        <MaterialCardItem
                          key={index}
                          title={data.output_name}
                          unit={data.output_unit}
                          amount={data.output_quantity}
                          type={data.output_cat_name}
                          button={cardButtonRender(
                            data.process_id,
                            data?.output_process_id || 0,
                            "intermediate"
                          )}
                        />
                      </>
                    ))
                  ) : (
                    <p className="text-gray-300 text-sm italic">
                      ไม่มีผลิตภัณฑ์ระหว่างทาง
                    </p>
                  )}
                </div>
                <div className="rounded-md bg-white border border-gray-400 p-4">
                  <div>
                    <h5 className="text-black font-medium text-lg mb-4">
                      ของเสีย/สารขาออก
                    </h5>
                  </div>
                  {props?.data?.waste[0] ? (
                    props?.data?.waste?.map((data, index) => (
                      <>
                        <FR03Form
                          initialValues={{
                            type: "waste",
                            itemName: data.waste_name,
                            materialType: data.waste_cat_id,
                            unit: data.waste_unit,
                            amount: Number(data.waste_qty),
                          }}
                          handleOnClose={() => setEditIsOpen("close")}
                          handleOnSubmit={(formData, type, process_id) => {
                            console.log(formData, type, process_id);
                            handleOnSubmitFR03Item(
                              formData,
                              type,
                              Number(process_id),
                              Number(data.waste_process_id),
                              true
                            );
                          }}
                          showForm={
                            editIsOpen ===
                            `open-waste-${data.process_id}-${
                              data?.waste_process_id || 0
                            }`
                          }
                          isUpdate
                        />
                        <MaterialCardItem
                          key={index}
                          title={data.waste_name}
                          unit={data.waste_unit}
                          amount={data?.waste_qty || 0}
                          type={data.waste_cat_name}
                          button={cardButtonRender(
                            data.process_id,
                            data?.waste_process_id || 0,
                            "waste"
                          )}
                        />
                      </>
                    ))
                  ) : (
                    <p className="text-gray-300 text-sm italic">
                      ไม่มีของเสีย/สารขาออก
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SortableItem = ({
  id,
  data,
  index,
  isOpen,
  onToggle,
}: {
  id: string;
  data: ProcessType;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <FR03Item
        data={data}
        order={index + 1}
        isOpen={isOpen}
        onToggle={onToggle}
        dragHandleProps={listeners}
      />
    </div>
  );
};

export function DraggableList() {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const {
    processData,
    processId,
    expandedItems,
    toggleExpanded,
    handleChangeOrder,
  } = useViewModel(id);

  return (
    <div>
      {processData && (
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={({ active, over }) => {
            if (over && active.id !== over.id) {
              const oldIndex = processId.indexOf(String(active.id));
              const newIndex = processId.indexOf(String(over.id));
              handleChangeOrder(arrayMove(processId, oldIndex, newIndex));
            }
          }}
        >
          <SortableContext
            items={processId.map((item) => item)}
            strategy={verticalListSortingStrategy}
          >
            {processId?.map((item, index) => (
              <div key={item}>
                <SortableItem
                  id={item}
                  data={processData[index]}
                  index={index}
                  isOpen={expandedItems.includes(item)}
                  onToggle={() => toggleExpanded(item)}
                />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
