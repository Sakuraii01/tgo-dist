import React from "react";
import { BreadcrumbNav} from "../../../../component/layout";
import { ANavbar } from "../../layout";

import useViewModel from "../viewModel";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../../constants/path.route";

const Response: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const auditorId = 1; // Assuming auditorId is 1 for this example
  const { productDetail, loading, error } = useViewModel(Number(id), auditorId);

  if (loading) {
    return (
      <div>
        < ANavbar />
        <BreadcrumbNav step="View Product" />
        <div className="max-w-7xl mx-auto my-15">
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        < ANavbar />
        <BreadcrumbNav step="View Product" />
        <div className="max-w-7xl mx-auto my-15">
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!productDetail) {
    return (
      <div>
        < ANavbar />
        <BreadcrumbNav step="View Product" />
        <div className="max-w-7xl mx-auto my-15">
          <div className="flex justify-center items-center h-64">
            <p>No product data available</p>
          </div>
        </div>
      </div>
    );
  }

  // เรียงข้อมูล comments จากเก่าไปใหม่
  const sortedComments = [...productDetail.comments].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div>
      < ANavbar />
      <BreadcrumbNav step="View Product" />
      <div className="max-w-7xl mx-auto my-15">
        <h1 className="text-3xl font-medium mb-5 mt-10">
          รายละเอียดผลิตภัณฑ์และการตรวจสอบ
        </h1>

        {/* ข้อมูลพื้นฐานของผลิตภัณฑ์ */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">รหัสผลิตภัณฑ์</p>
              <p className="font-medium">{productDetail.product?.product_id}</p>
            </div>
            <div>
              <p className="text-gray-600">ชื่อผลิตภัณฑ์</p>
              <p className="font-medium">
                {productDetail.product?.product_name_th}
              </p>
            </div>
            <div>
              <p className="text-gray-600">บริษัท</p>
              <p className="font-medium">
                รหัสบริษัท: {productDetail.product?.company_id}
              </p>
            </div>
            <div>
              <p className="text-gray-600">สถานะการตรวจสอบ</p>
              <p className="font-medium">
                {productDetail.product?.verify_status === "Under"
                  ? "อยู่ระหว่างตรวจสอบ"
                  : productDetail.product?.verify_status === "Approved"
                  ? "ได้รับการอนุมัติ"
                  : productDetail.product?.verify_status === "Rejected"
                  ? "ถูกปฏิเสธ"
                  : "รอการตรวจสอบ"}
              </p>
            </div>
          </div>
        </div>

        {/* ตารางประวัติการแสดงความคิดเห็น */}
        <div className="mt-6">
          <h2 className="text-xl font-medium mb-3">
            ประวัติการแสดงความคิดเห็นและการตรวจสอบ
          </h2>

          {productDetail.comments && productDetail.comments.length > 0 ? (
            <div className="overflow-x-auto">
              <table
                className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg"
                style={{ tableLayout: "fixed" }}
              >
                <colgroup>
                  <col style={{ width: "30px" }} /> {/* ลำดับ */}
                  <col style={{ width: "100px" }} />
                  {/* วันที่แสดงความคิดเห็น */}
                  <col style={{ width: "300px" }} /> {/* ความคิดเห็น */}
                  <col style={{ width: "100px" }} /> {/* วันที่บริษัทตอบกลับ */}
                  <col style={{ width: "300px" }} /> {/* การตอบกลับของบริษัท */}
                  <col style={{ width: "100px" }} /> {/* ไฟล์แนบ */}
                  <col style={{ width: "110px" }} /> {/* สถานะ */}
                </colgroup>

                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left border-b border-r border-gray-200">
                      ลำดับ
                    </th>
                    <th className="py-3 px-4 text-left border-b border-r border-gray-200">
                      วันที่แสดงความคิดเห็น
                    </th>
                    <th className="py-3 px-4 text-left border-b border-r border-gray-200">
                      ความคิดเห็น
                    </th>
                    <th className="py-3 px-4 text-left border-b border-r border-gray-200">
                      วันที่บริษัทตอบกลับ
                    </th>
                    <th className="py-3 px-4 text-left border-b border-r border-gray-200">
                      การตอบกลับของบริษัท
                    </th>
                    <th className="py-3 px-4 text-left border-b border-r border-gray-200">
                      ไฟล์แนบ
                    </th>
                    <th className="py-3 px-4 text-left border-b border-gray-200">
                      สถานะ
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sortedComments.map((comment, index) => (
                    <tr
                      key={comment.comments_id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-3 px-4 border-b border-r border-gray-200">
                        {sortedComments.length - index}
                      </td>
                      <td className="py-3 px-4 border-b border-r border-gray-200">
                        {new Date(comment.created_at).toLocaleDateString(
                          "th-TH"
                        )}
                      </td>
                      <td className="py-3 px-4 border-b border-r border-gray-200">
                        <div className="max-h-100 max-w-100 overflow-y-auto whitespace-pre-wrap break-words">
                          {comment.comment}
                          
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b border-r border-gray-200">
                        {/* {comment.created_at_company} */}
                        {"ยังไม่มีข้อมูล"}
                      </td>
                      <td className="py-3 px-4 border-b border-r border-gray-200">
                        <div className="max-h-100 max-w-100 overflow-y-auto whitespace-pre-wrap break-words">
                          {/* {comment.comment_company} */}
                          {"ยังไม่มีข้อมูล"}
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b border-r border-gray-200">
                        {"ไม่มีไฟล์"}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            index === 0 && productDetail.status.status !== 3
                              ? "bg-yellow-100 text-yellow-800"
                              : index === 0 && productDetail.status.status === 3
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {index === 0 && productDetail.status.status !== 3
                            ? "รอดำเนินการ"
                            : index === 0 && productDetail.status.status === 3
                            ? "อนุมัติแล้ว"
                            : "ปฏิเสธ"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">
                ยังไม่มีประวัติการตรวจสอบสำหรับผลิตภัณฑ์นี้
              </p>
            </div>
          )}
        </div>

        {/* ปุ่มกลับไปหน้าผลิตภัณฑ์ */}
        <div className="mt-10 flex justify-end">
          <button
            type="button"
            // onClick={() => navigate(`/product_adetail?id=${id}`)}
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white font-semibold shadow px-6 py-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            กลับไปรายละเอียดผลิตภัณฑ์
          </button>
        </div>
      </div>
    </div>
  );
};

export default Response;
