// import { FR04Layout } from "../common/layout";
import { ProcessStepper } from "../common/component/stepper";

// import { Accordion } from "../common/component/accordion";
// import { type ItemTransportType } from "../../../service/api/fr04/type";
import { useSearchParams } from "react-router-dom";
import { Fr04Service } from "../../../service/api/fr04";
import { useEffect, useState } from "react";
import type { FR04_3Type } from "../../../service/api/fr04/type";
import { PROTECTED_PATH } from "../../../constants/path.route";
import { useNavigate } from "react-router-dom";
import { ExpandCircleDownOutlined } from "@mui/icons-material";
const FR04_3 = () => {
  const fr04Service = new Fr04Service();
  const [fr04data, setfr04data] = useState<FR04_3Type | null>(null);
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await fr04Service.reqGetFr04_3(id).then((data) => setfr04data(data));
      }
    };
    fetchData();
  }, [id]);
  const toggleAccordion = () => {
    setOpen(!open);
  };
  return (
    <div>
      <ProcessStepper isActive={4} id={id} />
      <div className="max-w-4xl mx-auto">
        {fr04data?.processes.map((data, key) => (
          <div key={key} className="my-5 border border-gray-200/30 p-4 rounded">
            <div className="flex justify-between">
              <div>
                <h4 className="font-bold text-xl text-primary">
                  {data.self_collect_name}
                </h4>
                <p className="font-semibold">
                  EF: {Number(data.self_collect_ef).toFixed(4)}
                </p>
              </div>
              <div className="my-auto h-fit">
                <button>
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

            {open && (
              <div>
                <div>
                  <div className="border-2 border-gray-200/30 p-5 rounded-xl my-5">
                    <p className="font-bold text-primary text-xl mb-4">Input</p>
                    <div>
                      {data.input.map((item, index) => (
                        <section
                          key={index + `${key}`}
                          className="p-6 mb-4 border border-stroke bg-white shadow-inner rounded-lg"
                        >
                          <div>
                            <div className="flex gap-3 font-semibold mb-3 text-xl">
                              <p>ชื่อรายการ :</p>
                              <p>{item.item_name}</p>
                            </div>
                            <p className="font-semibold text-primary">
                              การประเมินการปล่อยก๊าซเรือนกระจกจากวัตถุดิบ
                            </p>
                            <div className="flex gap-10 my-2">
                              <div>
                                <p className="text-sm text-gray-300">ปริมาณ</p>
                                <p>{item.item_qty}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">หน่วย</p>
                                <p>{item.item_unit}</p>
                              </div>{" "}
                              <div>
                                <p className="text-sm text-gray-300">FU </p>
                                <p>{item.item_fu_qty}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  แหล่งที่มาของ LCI
                                </p>
                                <p>{item.item_source}</p>
                              </div>
                            </div>
                            <div className="flex gap-10 my-2">
                              <div>
                                <p className="text-sm text-gray-300">
                                  ที่มา EF
                                </p>
                                {item.item_ef_source}
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  แหล่งอ้างอิง EF
                                </p>
                                <p>{item.item_ef_source_ref}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">EF</p>
                                <p>{item.item_ef}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-primary">
                              การประเมินการปล่อยก๊าซเรือนกระจกจากการขนส่ง
                            </p>
                            <p className="italic text-gray-300">
                              การขนส่ง แบบการใช้ระยะทาง
                            </p>
                            <div className="flex gap-10 my-2">
                              <div>
                                <p className="text-sm text-gray-300">
                                  ระยะทางขนส่ง
                                </p>
                                <p>{item.type2_distance}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  ที่มาของค่า EF
                                </p>
                                <p>
                                  {VehicalsEF.find(
                                    (data) =>
                                      item.type2_ef_source === data.value
                                  )?.label || "-"}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-10 my-2">
                              <div>
                                <p className="text-sm text-gray-300">
                                  ประเภทพาหนะ
                                </p>
                                <p>{item.type2_vehicle}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  ภาระบรรทุกขาไป
                                </p>
                                <p>{item.type2_outbound_load}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  ภาระบรรทุกขากลับ
                                </p>
                                <p>{item.type2_return_load}</p>
                              </div>
                            </div>
                            <div className="flex gap-10 my-2">
                              <div className="w-80">
                                <p className="text-sm text-gray-300">
                                  แหล่งอ้างอิง
                                </p>
                                <p>{item.type2_ef_source_ref}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  ค่า EF เที่ยวไป
                                </p>
                                <p>{item.type2_outbound_ef}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  ค่า EF เที่ยวกลับ
                                </p>
                                <p>{item.type2_return_ef}</p>
                              </div>
                            </div>
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                  <div
                    key={key}
                    className="my-5 border-2 border-gray-200/30 p-5 rounded-xl"
                  >
                    <p className="font-bold text-primary text-xl mb-4">
                      Output
                    </p>
                    <div>
                      {data.output.map((item, index) => (
                        <section
                          key={index + `${key}`}
                          className="p-6 mb-4 border border-stroke bg-white shadow-inner rounded-lg"
                        >
                          <div>
                            {" "}
                            <div className="flex gap-3 font-semibold mb-3 text-xl">
                              <p>ชื่อรายการ :</p>
                              <p>{item.item_name}</p>
                            </div>
                            <p className="font-semibold text-primary">
                              การประเมินการปล่อยก๊าซเรือนกระจกจากวัตถุดิบ
                            </p>
                            <div className="flex gap-10 my-2">
                              <div>
                                <p className="text-sm text-gray-300">ปริมาณ</p>
                                <p>{item.item_qty}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">หน่วย</p>
                                <p>{item.item_unit}</p>
                              </div>{" "}
                              <div>
                                <p className="text-sm text-gray-300">FU </p>
                                <p>{item.item_fu_qty}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  แหล่งที่มาของ LCI
                                </p>
                                <p>{item.item_source}</p>
                              </div>
                            </div>
                            <div className="flex gap-10 my-2">
                              <div>
                                <p className="text-sm text-gray-300">
                                  ที่มา EF
                                </p>
                                {item.item_ef_source}
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  แหล่งอ้างอิง EF
                                </p>
                                <p>{item.item_ef_source_ref}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">EF</p>
                                <p>{item.item_ef}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-primary">
                              การประเมินการปล่อยก๊าซเรือนกระจกจากการขนส่ง
                            </p>
                            <p className="italic text-gray-300">
                              การขนส่ง แบบการใช้ระยะทาง
                            </p>
                            <div className="flex gap-10 my-2">
                              <div>
                                <p className="text-sm text-gray-300">
                                  ระยะทางขนส่ง
                                </p>
                                <p>{item.type2_distance}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  ที่มาของค่า EF
                                </p>
                                <p>
                                  {VehicalsEF.find(
                                    (data) =>
                                      item.type2_ef_source === data.value
                                  )?.label || "-"}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-10 my-2">
                              <div>
                                <p className="text-sm text-gray-300">
                                  ประเภทพาหนะ
                                </p>
                                <p>{item.type2_vehicle}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  ภาระบรรทุกขาไป
                                </p>
                                <p>{item.type2_outbound_load}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  ภาระบรรทุกขากลับ
                                </p>
                                <p>{item.type2_return_load}</p>
                              </div>
                            </div>
                            <div className="flex gap-10 my-2">
                              <div className="w-80">
                                <p className="text-sm text-gray-300">
                                  แหล่งอ้างอิง
                                </p>
                                <p>{item.type2_ef_source_ref}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  ค่า EF เที่ยวไป
                                </p>
                                <p>{item.type2_outbound_ef}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">
                                  ค่า EF เที่ยวกลับ
                                </p>
                                <p>{item.type2_return_ef}</p>
                              </div>
                            </div>
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-1/3 mx-auto flex gap-4">
        <button
          onClick={() =>
            navigate(PROTECTED_PATH.REGISTER_PRODUCT_FR04_2 + `?id=${id}`)
          }
          type="button"
          className="transition-colors rounded-full w-full mt-6 px-10 py-2 bg-gray-400 hover:bg-gray-300 text-white font-semibold"
        >
          กลับ FR 04.2
        </button>
        <button
          onClick={() =>
            navigate(PROTECTED_PATH.REGISTER_PRODUCT_FR06_1 + `?id=${id}`)
          }
          type="submit"
          className="rounded-full w-full mt-6 px-10 py-2 bg-gradient-to-r from-[#2BCFF2] via-[#19C2E6] via-30% to-[#0190C3]  text-white font-semibold transition hover:opacity-80"
        >
          บันทึกและไป FR 06.1
        </button>
      </div>
    </div>
  );
};
export default FR04_3;
const VehicalsEF = [
  { label: "TGO EF", value: "TG_ef" },
  { label: "Int. DB", value: "Int_DB" },
];
