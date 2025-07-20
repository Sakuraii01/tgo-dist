import { ANavbar } from "./layout";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";
import useViewModel from "./viewModel";
import { useAuth } from "../../auth/useAuth";

const Auditor = () => {
  const {
    auditorData,
    productList,
    tab,
    companyData,
    handleTabChange,
    loading,
    error,
  } = useViewModel();
  const navigate = useNavigate();
  const auth = useAuth();

  if (loading) {
    return (
      <div>
        <ANavbar />
        <div className="max-w-7xl mx-auto my-15">
          <div className="flex justify-center items-center h-64">
            <p>กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ANavbar />
        <div className="max-w-7xl mx-auto my-15">
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">เกิดข้อผิดพลาด: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ANavbar />
      <div className="max-w-7xl mx-auto my-15">
        <section>
          <h1 className="text-4xl font-medium mb-5 mt-10">
            ยินดีต้อนรับ{" "}
            <span className="font-bold text-linear text-primary-linear">
              {auditorData?.name || auth?.user?.user?.name}
            </span>
          </h1>
          <div className="flex gap-5">
            <div className="w-[450px] p-5 rounded-3xl bg-stroke">
              <p>{companyData?.address}</p>
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
                รอการพิจารณา
              </p>
              <p className="border rounded-full border-warn text-center px-3 text-warn text-xs h-fit py-1 my-auto">
                {
                  productList.filter((data) => (data.products_status === 1 || data.products_status === 0))
                    .length
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
                อยู่ระหว่างพิจารณา
              </p>
              <p className="border rounded-full border-yellow-500 text-center px-3 text-yellow-500 text-xs h-fit py-1 my-auto">
                {
                  productList.filter((data) => data.products_status === 2)
                    .length
                }{" "}
                รายการ
              </p>
            </div>

            <div
              onClick={() => handleTabChange(2)}
              className={`${
                tab === 2 ? "border-b-2 border-[#07b8dd]" : ""
              } font-bold flex gap-5 items-center justify-center py-4 w-80 cursor-pointer transition-colors hover:bg-gray-50`}
            >
              <p
                className={`${
                  tab === 2 ? "font-medium" : "font-normal"
                }  text-lg`}
              >
                พิจารณาเสร็จสิ้น
              </p>
              <p className="border rounded-full border-success text-center px-3 text-success text-xs h-fit py-1 my-auto">
                {
                  productList.filter(
                    (data) =>
                      data.products_status === 3 ||
                      data.products_status === 4
                  ).length
                }{" "}
                รายการ
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full rounded-t-xl min-w-[800px]">
              <thead>
                <tr className="bg-[#07b8dd] text-white">
                  <th className="w-20 py-4 rounded-tl-xl">รหัส</th>
                  <th className="text-start px-4">ชื่อผลิตภัณฑ์ (TH)</th>
                  <th className="text-start px-4">ชื่อผลิตภัณฑ์ (EN)</th>
                  <th className="text-start px-4">ขอบเขตการประเมิน</th>
                  <th className="text-start px-4">วันที่ขอขึ้นทะเบียน</th>
                  <th className="text-start px-4">รอบขึ้นทะเบียน</th>
                  <th className="text-start px-4">สถานะ</th>
                  <th className="rounded-tr-xl px-4">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {productList
                  .filter((data) => {
                    if (tab === 0)
                      return (data.products_status === 1 || data.products_status === 0); 
                    else if (tab === 1)
                      return data.products_status === 2; 
                    else if (tab === 2)
                      return (
                        data.products_status === 3 ||
                        data.products_status === 4
                      );
                    else return true;
                  })
                  ?.map((data, key) => (
                    <tr
                      key={data.product_id}
                      className={`${
                        key % 2 === 0 ? "" : "bg-stroke"
                      } border-b border-gray-200 hover:bg-gray-50 transition-colors`}
                    >
                      <td className="text-center py-5">{key + 1}</td>
                      <td className="px-4 py-5">{data.product_name_th}</td>
                      <td className="px-4 py-5">{data.product_name_en}</td>
                      <td className="px-4 py-5">{data.scope}</td>
                      <td className="px-4 py-5">
                        {data?.submitted_date
                          ? new Date(data.submitted_date).toLocaleDateString(
                              "th-TH"
                            )
                          : "-"}
                      </td>
                      <td className="px-4 py-5">
                        {data.submitted_round ?? "-"}
                      </td>
                      <td className="px-4 py-5">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            data.products_status === 3
                              ? "bg-green-100 text-green-800"
                              : data.products_status === 4
                              ? "bg-red-100 text-red-800"
                              : data.products_status === 2
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {data.products_status === 3
                            ? "อนุมัติ"
                            : data.products_status === 4
                            ? "ปฏิเสธ"
                            : data.products_status === 2
                            ? "อยู่ระหว่างการพิจารณา"
                            : "รอการพิจารณา"}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <button
                          onClick={() =>
                            navigate(
                              PROTECTED_PATH.PRODUCT_DETAIL_AUDITOR +
                                `?id=${data.product_id}`
                            )
                          }
                          className="px-3 py-1 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors"
                        >
                          ดูรายละเอียด
                        </button>
                      </td>
                    </tr>
                  ))}
                {productList.filter((data) => {
                  if (tab === 0) return (data.products_status === 1 || data.products_status === 0);
                  else if (tab === 1) return data.products_status === 2;
                  else if (tab === 2)
                    return (
                      data.products_status === 3 ||
                      data.products_status === 4
                    );
                  else return true;
                }).length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-500">
                      ไม่พบข้อมูลผลิตภัณฑ์
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Auditor;
