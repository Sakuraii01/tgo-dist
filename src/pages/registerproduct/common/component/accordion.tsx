import { useState } from "react";
import { ExpandCircleDownOutlined } from "@mui/icons-material";
export type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  additionalHeader?: React.ReactNode;
};
export const Accordion = (props: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="accordion w-full" data-accordion="collapse">
      <div
        className={`flex justify-between p-4 border border-gray-400 ${
          isOpen ? "bg-primary/10" : "bg-white"
        }`}
      >
        <div className="flex">
          <h3 className="text-primary font-semibold text-lg">{props.title}</h3>
          {props.additionalHeader}
        </div>
        <div className="my-auto h-fit">
          <button>
            {isOpen ? (
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
      {isOpen && (
        <div className="p-5 border-x border-b border-gray-400 ">
          {props?.children}
        </div>
      )}
    </div>
  );
};

export const AccordionFR03Item = () => {};
export const AccordionFR04_1Item = () => {};
export const AccordionFR04_2Item = () => {};
