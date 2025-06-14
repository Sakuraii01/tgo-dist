import { Navbar } from "../../component/layout";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";
import useViewModel from "./viewModel";
const Dashboard = () => {
  const { productList, tab, companyData, handleTabChange } = useViewModel();
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-15">
        <section>
          <h1 className="text-4xl font-medium mb-5 mt-10">
            ยินดีต้อนรับ{" "}
            <span className="font-bold text-linear text-primary-linear">
              {companyData?.name}
            </span>
          </h1>
          <div className="flex gap-5">
            <div className="w-[700px] p-5 rounded-3xl bg-stroke">
              <p>{companyData?.address}</p>
            </div>
            <div className="bg-gradient-to-b from-[#F4F8F3] to-[#F2F7F1] p-5 rounded-3xl text-center w-1/4">
              <p className="text-[#193F4F]">สถานประกอบการ</p>
              <p className="text-linear text-secondary-linear text-xl font-bold">
                {companyData?.industrial_id}
              </p>
            </div>
            <div className="bg-gradient-to-b from-[#F4F8F3] to-[#F2F7F1] p-5 rounded-3xl text-center w-1/4">
              <p className="text-[#193F4F]">ผู้ตรวจสอบ</p>
              <p className="text-[#5BAD46] text-xl font-bold">-</p>
            </div>
            <div className="bg-gradient-to-b from-[#F4F8F3] to-[#F2F7F1] p-5 rounded-3xl text-center w-1/4">
              <p className="text-[#193F4F]">ที่ปรึกษา</p>
              <p className="text-[#5BAD46] text-xl font-bold">-</p>
            </div>
          </div>
        </section>
        <section className="flex mt-15 my-5 justify-between">
          <div className="font-medium">
            <h4 className="text-4xl mb-3 mt-10">รายการผลิตภัณฑ์</h4>
            <p className="text-lg">
              จำนวนผลิตภัณฑ์ทั้งหมด{" "}
              <span className="text-primary-2">{productList.length}</span>{" "}
              รายการ
            </p>
          </div>
          <div className="flex gap-5">
            <div className="bg-gradient-to-b from-[#F1FCFF] to-[#E2F7FB] rounded-3xl w-fit px-10 text-center py-9">
              <p className="text-sm mb-3">ค่า EF แบบกำหนดเอง</p>
              <button
                onClick={() => navigate(PROTECTED_PATH.SELF_COLLECT)}
                className="text-primary w-fit bg-white rounded-full py-2 px-8 shadow-md font-bold"
              >
                <p>ดูข้อมูลค่า EF</p>
              </button>
            </div>

            <div className="bg-gradient-to-b from-[#F1FCFF] to-[#E2F7FB] rounded-3xl w-fit px-2 pb-2 pt-4 text-center">
              <p className="text-sm">รอบขึ้นทะเบียนปัจจุบัน</p>
              <p className="font-bold text-primary text-3xl">1 / 2568</p>
              <p className="bg-white rounded-full font-bold text-xs w-fit px-2 mx-auto my-2">
                01/01/2568 - 31/03/2568
              </p>
              <button
                onClick={() => navigate(PROTECTED_PATH.REGISTER_PRODUCT_CREATE)}
                className="text-white bg-gradient-to-r from-[#5EDCF5] via-20% via-[#5EDCF5] to-[#008FC3] w-fit bg-white rounded-full py-2 px-8 shadow-md font-bold"
              >
                <p>เพิ่มการขึ้นทะเบียนผลิตภัณฑ์</p>
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className="flex border-b border-gray-300 my-4">
            <div
              onClick={() => handleTabChange(0)}
              className={`${
                tab === 0 ? "border-b-2 border-gray-300" : ""
              } font-bold flex gap-5 align-middle justify-center py-4 w-full`}
            >
              <p className="font-medium text-xl">รายการร่าง</p>
              <p className="border rounded-full border-gray-300 text-center px-3 text-gray-300 text-xs h-fit py-1 my-auto">
                {
                  productList.filter((data) => data.verify_status === "draft")
                    .length
                }{" "}
                รายการ
              </p>
            </div>
            <div
              onClick={() => handleTabChange(1)}
              className={`${
                tab === 1 ? "border-b-2 border-warn" : ""
              } font-bold flex gap-5 align-middle justify-center py-4 w-full`}
            >
              <p
                className={`${
                  tab === 1 ? "font-medium" : "font-normal"
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
              onClick={() => handleTabChange(2)}
              className={`${
                tab === 2 ? "border-b-2 border-error" : ""
              } font-bold flex gap-5 align-middle justify-center py-4 w-full`}
            >
              <p
                className={`${
                  tab === 2 ? "font-medium" : "font-normal"
                }  text-lg`}
              >
                รอการแก้ไข
              </p>
              <p className="border rounded-full border-error text-center px-3 text-error text-xs h-fit py-1 my-auto">
                0 รายการ
              </p>
            </div>
            <div
              onClick={() => handleTabChange(3)}
              className={`${
                tab === 3 ? "border-b-2 border-success" : ""
              } font-bold flex gap-5 align-middle justify-center py-4 w-full`}
            >
              <p
                className={`${
                  tab === 3 ? "font-medium" : "font-normal"
                }  text-lg`}
              >
                ขึ้นทะเบียนสำเร็จ
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

          <table className="table-auto w-full rounded-t-xl">
            <thead>
              <tr className="text-white font-bold bg-gray-300 rounded-t-xl">
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
                            PROTECTED_PATH.PRODUCT_DETAIL +
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
export default Dashboard;
