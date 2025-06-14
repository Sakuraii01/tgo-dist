import { BreadcrumbNav, Navbar } from "../../component/layout";
import { EditRounded } from "@mui/icons-material";
import useViewModel from "./viewModel";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";
const Product = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { productData } = useViewModel(Number(id));
  console.log(id);

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
                  {productData?.product_name_th}
                </p>
                <p>{productData?.product_name_en}</p>
              </div>
              <p className="px-2 py-1 border-gray-300 border rounded-full h-fit text-xs font-semibold my-auto">
                รายการร่าง
              </p>
              <div className="ml-auto">
                <button
                  onClick={() => navigate(PROTECTED_PATH.REGISTER_PRODUCT_FR03)}
                  className="bg-white font-semibold shadow px-4 py-1 rounded-full flex gap-1"
                >
                  <EditRounded fontSize="small" />
                  <p>ดำเนินการต่อ</p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full rounded-xl bg-stroke py-4 px-6 my-4">
            <p className="text-xs font-semibold mb-1">คำอธิบาย</p>
            <p>{productData?.product_techinfo}</p>
          </div>
        </section>
        <section className="flex gap-10">
          <img
            src={
              typeof productData?.product_photo === "string"
                ? productData.product_photo
                : ""
            }
            className="w-80"
          />
          <div className="w-full ">
            <table className="rounded-2xl w-full mb-10">
              <tbody>
                <tr className="rounded-tl-2xl">
                  <td className="pr-5 ps-3 bg-primary text-white font-bold border-b border-white w-60">
                    ชื่อผลิตภัณฑ์ และรุ่น (TH)
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-[#FAFAFA]">
                    {productData?.product_name_th}
                  </td>
                </tr>
                <tr>
                  <td className="bg-primary-3 ps-3 text-white font-bold border-b border-white">
                    ชื่อผลิตภัณฑ์ และรุ่น (EN)
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-stroke">
                    {productData?.product_name_en}
                  </td>
                </tr>
                <tr>
                  <td className="bg-primary ps-3 text-white font-bold border-b border-white">
                    ขอบเขตของการประเมิน
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-[#FAFAFA]">
                    {productData?.scope}
                  </td>
                </tr>
                <tr>
                  <td className="bg-primary ps-3 text-white font-bold border-b border-white">
                    รอบขึ้นทะเบียน
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-stroke">
                    {productData?.submitted_round ?? "-"}
                  </td>
                </tr>
                <tr className="rounded-bl-2xl">
                  <td className="bg-primary-3 ps-3 text-white font-bold border-b border-white">
                    วันที่ขอขึ้นทะเบียน
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-[#FAFAFA]">
                    {productData?.submitted_date instanceof Date
                      ? productData.submitted_date.toLocaleDateString()
                      : productData?.submitted_date ?? "-"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex gap-10">
              <table>
                <tbody>
                  <tr>
                    <td className="bg-[#36449A] text-white font-bold pr-5 ps-3 border-b border-white w-60">
                      ตรวจสอบโดย
                    </td>
                    <td className="border-b border-gray-300 py-2 px-4 bg-stroke w-72">
                      -
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#36449A] text-white font-bold pr-5 ps-3 border-b border-white w-60">
                      วันที่ตรวจสอบ
                    </td>
                    <td className="border-b border-stroke py-2 px-4 bg-stroke w-72">
                      -
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td className="bg-[#609951] text-white font-bold pr-5 ps-3 border-b border-white w-60">
                        วันที่ขึ้นทะเบียน
                      </td>
                      <td className="border-b border-stroke py-2 px-4 bg-stroke w-72">
                        -
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Product;
