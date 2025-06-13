import { BreadcrumbNav, Navbar } from "../../component/layout";
import { EditRounded } from "@mui/icons-material";
const Product = () => {
  return (
    <div>
      <Navbar />
      <BreadcrumbNav step="View Product" />
      <div className="max-w-7xl mx-auto my-15">
        <h1 className="text-3xl font-medium mb-5 mt-10">รายละเอียดผลิตภัณฑ์</h1>
        <section>
          <div>
            <div className="flex gap-4">
              <div className="text-primary">
                <p className="text-xl text-gradient text-gradient-primary font-bold">
                  ชื่อผลิตภัณฑ์
                </p>
                <p>Product Name</p>
              </div>
              <p className="px-2 py-1 border-gray-300 border rounded-full h-fit text-xs font-semibold">
                รายการร่าง
              </p>
              <div className="ml-auto">
                <button className="bg-white font-semibold shadow px-4 py-1 rounded-full flex gap-1">
                  <EditRounded fontSize="small" />
                  <p>ดำเนินการต่อ</p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full rounded-xl bg-stroke py-4 px-6 my-4">
            <p className="text-xs font-semibold mb-1">คำอธิบาย</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
              vitae mattis tellus. Nullam quis{" "}
            </p>
          </div>
        </section>
        <section className="flex gap-10">
          <img src="/bottleex.png" className="w-80" />
          <table>
            <tbody>
              <tr>
                <td>ชื่อผลิตภัณฑ์ และรุ่น (TH)</td>
                <td>ชื่อผลิตภัณฑ์ และรุ่น (TH)</td>
              </tr>
              <tr>
                <td>ชื่อผลิตภัณฑ์ และรุ่น (EN)</td>
                <td>ชื่อผลิตภัณฑ์ และรุ่น (EN)</td>
              </tr>
              <tr>
                <td>ขอบเขตของการประเมิน</td>
                <td>B2B</td>
              </tr>
              <tr>
                <td>รอบขึ้นทะเบียน</td>
                <td>1/2568</td>
              </tr>
              <tr>
                <td>วันที่ขอขึ้นทะเบียน</td>
                <td>20/01/68</td>
              </tr>
            </tbody>
          </table>
          <div className="flex">
            <table>
              <tbody>
                <tr>
                  <td>ตรวจสอบโดย</td>
                  <td>ชื่อผู้ตรวจสอบ</td>
                </tr>
                <tr>
                  <td>วันที่ตรวจสอบ</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <td>วันที่ขึ้นทะเบียน</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Product;
