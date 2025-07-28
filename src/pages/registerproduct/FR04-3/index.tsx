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
const FR04_3 = () => {
  const fr04Service = new Fr04Service();
  const [fr04data, setfr04data] = useState<FR04_3Type | null>(null);
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await fr04Service.reqGetFr04_3(id).then((data) => setfr04data(data));
      }
    };
    fetchData();
  }, [id]);
  return (
    <div>
      <ProcessStepper isActive={4} id={id} />
      <div className="max-w-4xl mx-auto">
        {fr04data?.processes.map((data, key) => (
          <div key={key} className="my-5">
            <h4 className="font-bold">{data.self_collect_name}</h4>
            <p>EF: {data.self_collect_ef}</p>

            <div>
              <div>
                <div className="border border-gray-300 p-5 rounded my-5">
                  <p>Input</p>
                  <div>
                    {data.input.map((item, index) => (
                      <ul key={index + `${key}`}>
                        <li>{item.item_name}</li>
                        <li>
                          ปริมาณ : {item.item_qty} {item.item_unit}
                        </li>
                        <li>FU : {item.item_fu_qty}</li>

                        <li>
                          ที่มา EF : {item.item_ef_source} EF : {item.item_ef}
                        </li>

                        <li>
                          ระยะทางขนส่ง :{item.type2_distance}{" "}
                          {item.type2_vehicle}
                        </li>
                        <li>
                          ภาระบรรทุกขาไป : {item.type2_outbound_load}{" "}
                          ภาระบรรทุกขากลับ : {item.type2_return_load}
                          แหล่งอ้างอิง : {item.type2_ef_source_ref}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
                <div className="border border-gray-300 p-5 rounded my-5">
                  <p>Output</p>
                  <div>
                    {data.output.map((item, index) => (
                      <ul key={index + `${key}`}>
                        <li>{item.item_name}</li>
                        <li>
                          ปริมาณ : {item.item_qty} {item.item_unit}
                        </li>
                        <li>FU : {item.item_fu_qty}</li>

                        <li>
                          ที่มา EF : {item.item_ef_source} EF : {item.item_ef}
                        </li>

                        <li>
                          ระยะทางขนส่ง :{item.type2_distance}{" "}
                          {item.type2_vehicle}
                        </li>
                        <li>
                          ภาระบรรทุกขาไป : {item.type2_outbound_load}{" "}
                          ภาระบรรทุกขากลับ : {item.type2_return_load}
                          แหล่งอ้างอิง : {item.type2_ef_source_ref}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <hr />
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
