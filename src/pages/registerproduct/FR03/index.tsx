import { TextField } from "@mui/material";
import {
  DeleteRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  MoreVert,
  Add,
} from "@mui/icons-material";
import { MaterialCardItem } from "../common/component/card";
import { ProcessStepper } from "../common/layout";
import { FR03Summary } from "./component";
import FormDialog from "../common/component/dialog";

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
const FR03 = () => {
  const { tab, handleTabChange } = useViewModel();
  return (
    <div>
      <div className="max-w-xl mx-auto">
        <ProcessStepper isActive={0} />
      </div>
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
          <div className="flex max-w-5xl mx-auto my-5 bg-white">
            <div className="rounded-full bg-primary/10 border border-primary text-primary font-semibold text-sm flex items-center justify-center w-8 h-8 mr-4 my-auto">
              <Add fontSize="small" />
            </div>
            <button
              className={`border border-dashed border-primary-2 text-primary-2 text-start rounded-full w-full py-4 px-10 
            hover:bg-primary-2/10 transition-colors`}
            >
              <p>เพิ่มกระบวนการ</p>
            </button>
          </div>
        </div>
      )}

      <div className="w-1/4 mx-auto">
        <button
          type="submit"
          className="rounded-full w-full mt-6 px-10 py-2 bg-gradient-to-r from-[#2BCFF2] via-[#19C2E6] via-30% to-[#0190C3]  text-white font-semibold"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};
export default FR03;

type FR03ItemProps = {
  data: ProcessType;
  order: number;
  isOpen: boolean;
  onToggle: () => void;
  dragHandleProps?: React.HTMLAttributes<any>;
};
const FR03Item = (props: FR03ItemProps) => {
  const { isOpen, onToggle } = props;

  return (
    <div className="flex max-w-5xl mx-auto my-3 bg-white">
      {/* want to drag here */}
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
        <div
          className={`flex ${
            isOpen ? "border-b" : ""
          } border-gray-400 pb-4 px-6`}
        >
          <div className="my-auto h-fit">
            {props.data.process_name ? (
              <p className="text-xl pt-1">{props.data.process_name}</p>
            ) : (
              <div className="w-1/2">
                <TextField
                  label="ชื่อกระบวนการ"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  fullWidth
                />
              </div>
            )}
          </div>

          <div onClick={onToggle} className="flex ml-auto my-auto gap-10">
            <button className="border border-red-700 rounded-full text-red-700 font-semibold text-sm flex items-center gap-2 h-fit my-3 px-4 py-1 transform translate-y-1">
              <DeleteRounded />
              <p>ลบกระบวนการ</p>
            </button>
            <div className="my-auto">
              {isOpen ? (
                <KeyboardArrowUpRounded />
              ) : (
                <KeyboardArrowDownRounded />
              )}
            </div>
          </div>
        </div>
        {isOpen && (
          <>
            <div className="px-6 py-4">
              <FormDialog />
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
                    {props.data.input
                      .filter((data) => data.input_title_id === 1)
                      .map((data, index) => (
                        <MaterialCardItem
                          key={index}
                          title={data.input_name}
                          unit={data.input_unit}
                          amount={data.input_quantity}
                          type={data.input_cat_name_TH}
                        />
                      ))}
                  </div>
                  <div>
                    <div className="w-full rounded bg-stroke px-3 my-2">
                      <p>พลังงาน และเชื้อเพลิง</p>
                    </div>
                    {props.data.input
                      .filter((data) => data.input_title_id === 2)
                      .map((data, index) => (
                        <MaterialCardItem
                          key={index}
                          title={data.input_name}
                          unit={data.input_unit}
                          amount={data.input_quantity}
                          type={data.input_cat_name_TH}
                        />
                      ))}
                  </div>
                  <div>
                    <div className="w-full rounded bg-stroke px-3 my-2">
                      <p>ทรัพยากร และวัสดุช่วยการผลิต</p>
                    </div>
                    {props.data.input
                      .filter((data) => data.input_title_id === 3)
                      .map((data, index) => (
                        <MaterialCardItem
                          key={index}
                          title={data.input_name}
                          unit={data.input_unit}
                          amount={data.input_quantity}
                          type={data.input_cat_name_TH}
                        />
                      ))}
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
                  {props.data.output.map((data, index) => (
                    <MaterialCardItem
                      key={index}
                      title={data.output_name}
                      unit={data.output_unit}
                      amount={data.output_quantity}
                      type={data.output_cat_name}
                    />
                  ))}
                </div>
                <div className="rounded-md bg-white border border-gray-400 p-4">
                  <div>
                    <h5 className="text-black font-medium text-lg mb-4">
                      ของเสีย/สารขาออก
                    </h5>
                  </div>
                  {props.data.waste.map((data, index) => (
                    <MaterialCardItem
                      key={index}
                      title={data.waste_name}
                      unit={data.waste_unit}
                      amount={data.waste_quantity}
                      type={data.waste_cat_name}
                    />
                  ))}
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
  const {
    processData,
    processId,
    expandedItems,
    toggleExpanded,
    handleChangeOrder,
  } = useViewModel();

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
