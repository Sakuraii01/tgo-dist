import { BreadcrumbNav, Navbar } from "../../component/layout";
import { EditRounded, FileDownloadRounded } from "@mui/icons-material";
import useViewModel from "./viewModel";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";
import BarChart from "../../component/chart/barChart";
import Swal from "sweetalert2";
const Product = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { fr06Sum4142, productData, fetchGenExcel, sendExcelToAuditor } =
    useViewModel(Number(id));
  const data = {
    labels: [
      "การได้มาของวัตถุดิบ",
      "การผลิต",
      "การกระจายสินค้า",
      "การใช้งาน",
      "การจัดการซาก",
    ],
    datasets: [
      {
        label: "Min",
        data: [
          fr06Sum4142?.sum_lc1_emission || 0,
          fr06Sum4142?.sum_lc2_emission || 0,
          fr06Sum4142?.sum_lc3_emission || 0,
          fr06Sum4142?.sum_lc4_emission || 0,
          fr06Sum4142?.sum_lc5_emission || 0,
        ],
        backgroundColor: "#5B4C97",
        borderRadius: 5,
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <BreadcrumbNav step="View Product" />
      <div className="max-w-7xl mx-auto my-15">
        <h1 className="text-3xl font-medium mb-5 mt-10">รายละเอียดผลิตภัณฑ์</h1>
        <section>
          <div>
            <div className="flex gap-4">
              <div className="flex gap-4 h-fit my-auto">
                <div className="text-primary">
                  <p className="text-xl text-gradient text-gradient-primary font-bold">
                    {productData?.product_name_th}
                  </p>
                  <p>{productData?.product_name_en}</p>
                </div>
                <p className="px-2 py-1 border-gray-300 border rounded-full h-fit text-xs font-semibold my-auto">
                  รายการร่าง
                </p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() =>
                    navigate(
                      PROTECTED_PATH.REGISTER_PRODUCT_CREATE + `?id=${id}`
                    )
                  }
                  type="button"
                  className="bg-white font-semibold shadow px-4 py-1 rounded-full flex gap-1 ml-auto mb-4"
                >
                  <EditRounded fontSize="small" />
                  <p>ดำเนินการต่อ</p>
                </button>
                <button
                  onClick={async () => {
                    const data = await fetchGenExcel();

                    if (data === null) {
                      Swal.fire({
                        title: "ไม่สามารถดาวน์โหลดเอกสารได้",
                        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                        icon: "warning",
                        confirmButtonText: "ปิด",
                        confirmButtonColor: "#0190c3",
                        customClass: {
                          title: "swal-title-custom",
                          htmlContainer: "swal-text-custom",
                        },
                      });
                    } else {
                      window.open(
                        import.meta.env.VITE_APP_API_V1 + "/" + data || "",
                        "_blank"
                      );
                    }
                  }}
                  type="button"
                  className="primary-button font-semibold shadow px-4 py-1 rounded-full flex gap-1 ml-auto hover:opacity-90 mb-4"
                >
                  <FileDownloadRounded fontSize="small" />
                  <p>ดาวน์โหลดเอกสาร</p>
                </button>
                <button
                  onClick={async () => {
                    await sendExcelToAuditor();
                  }}
                  className="bg-white font-semibold shadow px-4 py-1 rounded-full flex gap-1 ml-auto "
                >
                  <p>ยืนยันการส่งให้ผู้ทวนสอบ</p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full rounded-xl bg-stroke py-4 px-6 my-4">
            <p className="text-xs font-semibold mb-1">คำอธิบาย</p>
            {productData?.product_techinfo_array?.map((data) => (
              <p>{data}</p>
            ))}
          </div>
        </section>
        <section className="flex gap-5">
          {(() => {
            let photoSrc: string = "/";
            if (typeof productData?.product_photo === "string") {
              photoSrc =
                import.meta.env.VITE_APP_API_V1 + "/" + productData.photo_path;
            }
            return <img src={photoSrc} className="w-80" />;
          })()}
          <div className="w-full">
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
                      ทวนสอบโดย
                    </td>
                    <td className="border-b border-gray-300 py-2 px-4 bg-stroke w-72">
                      {productData?.editor_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#36449A] text-white font-bold pr-5 ps-3 border-b border-white w-60">
                      วันที่ทวนสอบ
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
        <section>
          <div className="flex gap-10">
            <div className="my-auto">
              <img src="./co2.png" className="h-38" />
              <div className="text-center my-5 text-primary font-semibold text-lg">
                <p className="text-xl">
                  {(
                    (Number(fr06Sum4142?.sum_lc1_emission) || 0) +
                    (Number(fr06Sum4142?.sum_lc2_emission) || 0) +
                    (Number(fr06Sum4142?.sum_lc3_emission) || 0) +
                    (Number(fr06Sum4142?.sum_lc4_emission) || 0) +
                    (Number(fr06Sum4142?.sum_lc5_emission) || 0)
                  ).toFixed(4)}{" "}
                </p>
                <p>kgCO2 eq.</p>
              </div>
            </div>
            <BarChart data={data} />
          </div>
        </section>
      </div>
    </div>
  );
};
export default Product;
