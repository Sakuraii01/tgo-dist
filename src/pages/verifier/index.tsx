import { Navbar } from "../../component/layout";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";
import useViewModel from "./viewModel";
import { useAuth } from "../../auth/useAuth";
const Verifier = () => {
  const { productList, tab, companyData, handleTabChange } = useViewModel();
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-15">
        <section>
          <h1 className="text-4xl font-medium mb-5 mt-10">
            ยินดีต้อนรับ{" "}
            <span className="font-bold text-linear text-primary-linear">
              {auth?.user?.user?.name}
            </span>
          </h1>
          <div className="flex gap-5">
            <div className="w-[700px] p-5 rounded-3xl bg-stroke">
              <p>{companyData?.address}</p>
            </div>
          </div>
        </section>
        <section className="flex mt-15 my-5 justify-between">
          <div className="font-medium">
            <h4 className="text-4xl mb-3 mt-10">รายการผลิตภัณฑ์</h4>
            <p className="text-lg">
              จำนวนผลิตภัณฑ์ทั้งหมด
              <span className="text-primary-2">{productList.length}</span>{" "}
              รายการ
            </p>
          </div>
        </section>
        <section>
          <div className="flex border-b border-gray-300 my-4">
            <div
              onClick={() => handleTabChange(0)}
              className={`${
               tab === 0 ? "border-b-2 border-[#07b8dd]" : ""
              } font-bold flex gap-5 items-center justify-center py-4 w-80 cursor-pointer transition-colors hover:bg-gray-50`}
            >
              <p
                className={`${
                  tab === 0 ? "font-medium" : "font-normal"
                }  text-lg`}
              >
                รอการตรวจสอบ
              </p>
              <p className="border rounded-full border-warn text-center px-3 text-warn text-xs h-fit py-1 my-auto">
                {
                  productList.filter(
                    (data) => data.verify_status === "unverified"
                  ).length
                }{" "}
                รายการ
              </p>
            </div>
            <div
              onClick={() => handleTabChange(1)}
              className={`${
                tab === 1 ? "border-b-2 border-[#07b8dd]" : ""
              } font-bold flex gap-5 items-center justify-center py-4 w-80 cursor-pointer transition-colors hover:bg-gray-50`}
            >
              <p
                className={`${
                  tab === 1 ? "font-medium" : "font-normal"
                }  text-lg`}
              >
                ตรวจสอบเสร็จสิ้น
              </p>
              <p className="border rounded-full border-success text-center px-3 text-success text-xs h-fit py-1 my-auto">
                {
                  productList.filter(
                    (data) => data.verify_status === "verified"
                  ).length
                }{" "}
                รายการ
              </p>
            </div>
          </div>

          <table className="table-auto w-full rounded-t-xl" >
            <thead>
              <tr className="bg-[#07b8dd] text-white">
                <th className="w-20 py-4 rounded-tl-xl">รหัส</th>
                <th className="text-start">ชื่อผลิตภัณฑ์ (TH)</th>
                <th className="text-start">ชื่อผลิตภัณฑ์ (EN)</th>
                <th className="text-start">ขอบเขตการประเมิน</th>
                <th className="text-start">วันที่ขอขึ้นทะเบียน</th>
                <th className="text-start">รอบขึ้นทะเบียน</th>
                <th className="rounded-tr-xl"></th>
              </tr>
            </thead>
            {productList
              .filter((data) => {
                if (tab === 0) return data.verify_status === "draft";
                else if (tab === 1) return data.verify_status === "unverified";
                else return;
              })
              ?.map((data, key) => (
                <tbody key={key}>
                  <tr
                    className={`${
                      key % 2 === 0 ? "" : "bg-stroke"
                    } border-b border-gray-200`}
                  >
                    <td className="text-center py-5">{key + 1}</td>
                    <td>{data.product_name_th}</td>
                    <td>{data.product_name_en}</td>
                    <td>{data.scope}</td>
                    <td>
                      {typeof data?.submitted_date === "string"
                        ? new Date(data?.submitted_date)?.toISOString()
                        : data?.submitted_date
                        ? data.submitted_date.toString()
                        : "-"}
                    </td>
                    <td>{data.submitted_round ?? "-"}</td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(
                            PROTECTED_PATH.PRODUCT_DETAIL_VERIFIER +
                              `?id=${data.product_id}`
                          )
                        }
                        className="px-2 py-1 border border-gray-300 rounded-full font-medium"
                      >
                        ดูรายละเอียด
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </section>
      </div>
    </div>
  );
};
export default Verifier;
