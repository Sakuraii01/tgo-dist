import { Navbar, BreadcrumbNav } from "../../component/layout";
const SelfCollect = () => {
  return (
    <div>
      <Navbar />
      <BreadcrumbNav step={"Self Collect"} />
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between mt-20">
          <h4 className="text-xl font-bold">ข้อมูลค่า EF ที่กำหนดเอง</h4>
          <button className="primary-button px-6 py-1">
            + เพิ่มข้อมูล Self Collect
          </button>
        </div>
        <table>
          <thead className="bg-primary text-white font-bold">
            <tr className="px-3">
              <th>แหล่งที่มา</th>
              <th>ขื่อกระบวนการ</th>
              <th>ค่า EF (kgCO2 eq./หน่วย)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Self Collect</td>
              <td>การบำบัดน้ำเสีย</td>
              <td>8.4819</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SelfCollect;
