import { Navbar, BreadcrumbNav } from "../../../component/layout";
import useViewModel from "./viewModel";
import { useSearchParams } from "react-router-dom";

import { IOItem, SelfCollectTopic } from "./form";
import { useCallback, useState } from "react";
// import * as Yup from "yup";

const CreateSelfCollect = () => {
  const [searchParams] = useSearchParams();
  const self_collect_id = Number(searchParams.get("id"));
  const { selfcollectProcessItemList, handleFormSubmit } =
    useViewModel(self_collect_id);
  const [addItem, setAddItem] = useState({ input: false, output: false });
  const handleCancleAdd = useCallback((section: "input" | "output") => {
    setAddItem((prev) => ({
      ...prev,
      [section]: false,
    }));
  }, []);
  return (
    <div>
      <Navbar />
      <BreadcrumbNav step="create self collect" />
      <div className="max-w-4xl mx-auto mt-10">
        <h3 className="font-bold text-2xl mb-5">
          เพิ่มข้อมูลค่า EF ที่กำหนดเอง
        </h3>

        <SelfCollectTopic
          initialValue={{
            selfCollectName:
              selfcollectProcessItemList?.self_collect.self_collect_name || "",
          }}
          validation={{}}
          self_collect_id={
            selfcollectProcessItemList?.self_collect?.self_collect_id || 0
          }
          onSubmit={(values) => console.log(values)}
        />

        {(["input", "output"] as Array<"input" | "output">).map((section) => (
          <div>
            <p className="font-bold my-2 text-lg">{section}</p>
            {selfcollectProcessItemList?.items
              .filter((item) => item.item_type === section)
              .map((item, index) => (
                <div key={index}>
                  <IOItem
                    addItem={false}
                    item_type={item.item_type}
                    initialValue={{ processName: item.item_name || "" }}
                    validation={{}}
                    self_collect_topic_id={
                      selfcollectProcessItemList.self_collect.self_collect_id
                    }
                    item_id={item.cfp_report43_selfcollect_efs_id}
                    handleSubmit={(values, item_id) =>
                      handleFormSubmit(values, item_id)
                    }
                  />
                </div>
              ))}

            {addItem[section] && selfcollectProcessItemList ? (
              <div>
                <IOItem
                  addItem={true}
                  item_type={section}
                  validation={{}}
                  self_collect_topic_id={
                    selfcollectProcessItemList.self_collect.self_collect_id
                  }
                  handleSubmit={(values, _) => handleFormSubmit(values)}
                  handleCancleAdd={handleCancleAdd}
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setAddItem((prev) => ({
                    ...prev,
                    [section]: true,
                  }))
                }
                className="w-full border border-dashed border-primary rounded-full py-2 font-semibold text-primary hover:bg-primary/10 transition"
              >
                + เพิ่ม {section}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSelfCollect;

// const ioItemSchema = Yup.object().shape({
//   inputName: Yup.string().required("กรุณาระบุชื่อรายการ"),
//   unit: Yup.string().required("กรุณาระบุหน่วย"),
//   amount: Yup.string().required("กรุณาระบุปริมาณ"),
//   FU: Yup.string().required("กรุณาระบุปริมาณ/FU"),
//   FUsource: Yup.string().required("กรุณาระบุแหล่งที่มาของค่า LCI"),
//   source: Yup.string().required("กรุณาระบุที่มา"),
//   EFsource: Yup.string().required("กรุณาระบุแหล่งอ้างอิง EF"),
//   EF: Yup.string().required("กรุณาระบุค่า EF"),
// });

// const validationSchema = Yup.object().shape({
//   selfCollectName: Yup.string().required("กรุณาระบุชื่อหน่วย"),
//   input: Yup.array().of(ioItemSchema),
//   output: Yup.array().of(ioItemSchema),
// });
