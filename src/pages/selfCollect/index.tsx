import { Navbar, BreadcrumbNav } from "../../component/layout";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";
import { SelfCollectService } from "../../service/api/selfcollect";
import { useState, useEffect } from "react";
import type { SelfCollectType } from "../../service/api/selfcollect/type";
const SelfCollect = () => {
  const navigate = useNavigate();
  const selfCollectService = new SelfCollectService();
  const [selfcollectList, setSelfCollectList] = useState<SelfCollectType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await selfCollectService.reqGetSelfCollectList(1005);
      setSelfCollectList(data);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <BreadcrumbNav step={"Self Collect"} />
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between mt-20">
          <h4 className="text-xl font-bold">ข้อมูลค่า EF ที่กำหนดเอง</h4>
          <button
            onClick={() => navigate(PROTECTED_PATH.CREATE_SELF_COLLECT)}
            className="primary-button px-6 py-1"
          >
            + เพิ่มข้อมูล Self Collect
          </button>
        </div>
        <table className="w-full my-10 text-left rounded-3xl">
          <thead className="bg-primary text-white font-bold rounded-3xl">
            <tr className="px-3 rounede-3xl">
              <th className="ps-3 py-2">ขื่อกระบวนการ</th>
              <th>ค่า EF (kgCO2 eq./หน่วย)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {selfcollectList.map((data) => (
              <tr key={data.self_collect_id}>
                <td className="ps-3 py-4">{data.self_collect_name}</td>
                <td>{data.self_collect_ef}</td>
                <td>
                  <div className="flex gap-3 justify-end mr-10">
                    <button
                      onClick={() =>
                        navigate(
                          PROTECTED_PATH.CREATE_SELF_COLLECT +
                            `?id=${data.self_collect_id}`
                        )
                      }
                    >
                      <Edit fontSize="small" />
                    </button>
                    <Delete fontSize="small" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SelfCollect;
