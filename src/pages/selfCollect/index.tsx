import { Navbar, BreadcrumbNav } from "../../component/layout";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";
const SelfCollect = () => {
  const navigate = useNavigate();
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
              <th className="ps-6 py-3 rounede-3xl">แหล่งที่มา</th>
              <th>ขื่อกระบวนการ</th>
              <th>ค่า EF (kgCO2 eq./หน่วย)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="ps-6 py-3">Self Collect</td>
              <td>การบำบัดน้ำเสีย</td>
              <td>8.4819</td>
              <td>
                <div className="flex gap-3 justify-end mr-10">
                  <Edit fontSize="small" />
                  <Delete fontSize="small" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SelfCollect;
