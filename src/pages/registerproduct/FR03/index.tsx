import { TextField } from "@mui/material";
import { useEffect } from "react";
import {
  DeleteRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { MaterialCardItem } from "../common/component/card";
import { useState } from "react";
import { ProcessStepper } from "../common/layout";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import FormDialog from "../common/component/dialog";
const FR03 = () => {
  return (
    <div>
      <div className="max-w-xl mx-auto">
        <ProcessStepper isActive={0} />
      </div>
      <DraggableList />
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
  order: number;
  isOpen: boolean;
  onToggle: () => void;
  dragHandleProps?: React.HTMLAttributes<any>;
};
const FR03Item = (props: FR03ItemProps) => {
  const { isOpen, onToggle } = props;

  return (
    <div className="flex max-w-5xl mx-auto my-3 bg-white">
      <div className="rounded-full bg-primary/10 border border-primary text-primary font-semibold text-sm flex items-center justify-center w-8 h-8 mr-4">
        <p>{props.order}</p>
      </div>
      <div className="border border-gray-400 rounded-md pt-3 w-full">
        <div
          className={`flex ${
            isOpen ? "border-b" : ""
          } border-gray-400 pb-4 px-6`}
        >
          <div className="w-1/2">
            <TextField
              label="ชื่อกระบวนการ"
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
            />
          </div>
          <button className="border border-red-700 rounded-full text-red-700 font-semibold text-sm flex items-center gap-2 h-fit mt-4.5 px-4 py-1 ml-4">
            <DeleteRounded />
            <p>ลบกระบวนการ</p>
          </button>
          <div
            onClick={onToggle}
            // {...dragHandleProps}
            className="ml-auto my-auto"
          >
            {isOpen ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
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
                    <MaterialCardItem
                      title="Ammonium Nitrate"
                      unit="kg"
                      amount={100}
                      type="Material (M)"
                    />
                  </div>
                  <div>
                    <div className="w-full rounded bg-stroke px-3 my-2">
                      <p>ทรัพยากร และวัสดุช่วยการผลิต</p>
                    </div>
                    <MaterialCardItem
                      title="Ammonium Nitrate"
                      unit="kg"
                      amount={100}
                      type="Material (M)"
                    />
                    <div className="my-2">
                      <MaterialCardItem
                        title="Ammonium Nitrate"
                        unit="kg"
                        amount={100}
                        type="Material (M)"
                      />
                    </div>
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
                  <div className="font-medium flex flex-col gap-2">
                    <MaterialCardItem
                      title="Ammonium Nitrate"
                      unit="kg"
                      amount={100}
                    />
                    <MaterialCardItem
                      title="Ammonium Nitrate"
                      unit="kg"
                      amount={100}
                    />
                    <div className="my-2">
                      <MaterialCardItem
                        title="Ammonium Nitrate"
                        unit="kg"
                        amount={100}
                      />
                    </div>
                  </div>
                </div>
                <div className="rounded-md bg-white border border-gray-400 p-4">
                  <div>
                    <h5 className="text-black font-medium text-lg mb-4">
                      ของเสีย/สารขาออก
                    </h5>
                  </div>
                  <div className="font-medium">
                    <p className="ms-3">-</p>
                  </div>
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
  index,
  isOpen,
  onToggle,
}: {
  id: string;
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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FR03Item order={index + 1} isOpen={isOpen} onToggle={onToggle} />
    </div>
  );
};

export function DraggableList() {
  const [items, setItems] = useState(["item-1", "item-2", "item-3"]);
  const [expandedItems, setExpandedItems] = useState<string[]>(["item-1"]);
  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const isExpanded = prev.includes(id);
      return isExpanded
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];
    });
  };
  useEffect(() => {
    console.log("Expanded items changed:", expandedItems);
  }, [expandedItems]);

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          const oldIndex = items.indexOf(String(active.id));
          const newIndex = items.indexOf(String(over.id));
          setItems(arrayMove(items, oldIndex, newIndex));
        }
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id, index) => (
          <SortableItem
            key={id}
            id={id}
            index={index}
            isOpen={expandedItems.includes(id)}
            onToggle={() => toggleExpanded(id)}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
