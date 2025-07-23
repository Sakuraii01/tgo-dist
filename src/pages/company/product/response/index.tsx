import React, { useState } from "react";
import { FileOpen, ExpandMore, ExpandLess } from "@mui/icons-material";
import { BreadcrumbNav } from "../../../../component/layout";
import { Navbar } from "../../../../component/layout";
import useViewModel from "../viewModel";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../../constants/path.route";

const Response: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const companyId = 1005; // Assuming companyId is 1 for this example
  const auditorId = 1; // Assuming auditorId is 1 for this example

  // สร้าง state สำหรับเก็บสถานะการเปิด/ปิด ของแต่ละความคิดเห็น
  const [expandedComments, setExpandedComments] = useState<{
    [key: number]: boolean;
  }>({ 0: true });

  // Rename productData to individualProduct to avoid conflicts
  const {
    productData: individualProduct,
    productDetail,
    loading,
    error,
    excelList,
    errorExcel,
  } = useViewModel(auditorId, Number(id), companyId);

  // ฟังก์ชั่นสำหรับสลับการแสดง/ซ่อนความคิดเห็น
  const toggleComment = (index: number) => {
    setExpandedComments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) {
    return (
      <div>
        <Navbar />
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
        <Navbar />
        <BreadcrumbNav step="View Product" />
        <div className="max-w-7xl mx-auto my-15">
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!productDetail || !individualProduct) {
    return (
      <div>
        <Navbar />
        <BreadcrumbNav step="View Product" />
        <div className="max-w-7xl mx-auto my-15">
          <div className="flex justify-center items-center h-64">
            <p>No product data available</p>
          </div>
        </div>
      </div>
    );
  }

  // Sort comments from newest to oldest if they exist
  const sortedComments =
    productDetail.comments && productDetail.comments.length > 0
      ? [...productDetail.comments].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      : [];

  return (
    <div>
      <Navbar />
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
              <p className="font-medium">{individualProduct.product_id}</p>
            </div>
            <div>
              <p className="text-gray-600">ชื่อผลิตภัณฑ์</p>
              <p className="font-medium">{individualProduct.product_name_th}</p>
            </div>
            <div>
              <p className="text-gray-600">บริษัท</p>
              <p className="font-medium">
                รหัสบริษัท: {individualProduct.company_id}
              </p>
            </div>
            <div>
              <p className="text-gray-600">สถานะการตรวจสอบ</p>
              <p className="font-medium">
                {individualProduct.verify_status === "Under"
                  ? "อยู่ระหว่างตรวจสอบ"
                  : individualProduct.verify_status === "Approved"
                  ? "ได้รับการอนุมัติ"
                  : individualProduct.verify_status === "Rejected"
                  ? "ถูกปฏิเสธ"
                  : "รอการตรวจสอบ"}
              </p>
            </div>
          </div>
        </div>

        {/* ตารางประวัติการแสดงความคิดเห็น */}
        <div>
          <div className="mt-6 mb-3 relative flex items-center justify-between">
            <h2 className="text-xl font-medium">
              ประวัติการแสดงความคิดเห็นและการตรวจสอบ
            </h2>
            {/* ปุ่มกลับไปหน้าผลิตภัณฑ์ */}
            <div className="justify-end">
              <button
                type="button"
                onClick={() => navigate(`/product_cdetail?id=${id}`)}
                className="bg-gray-600 text-white font-semibold shadow px-6 py-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                กลับไปรายละเอียดผลิตภัณฑ์
              </button>
            </div>
          </div>
          {sortedComments.length > 0 ? (
            <div className="space-y-4">
              {sortedComments.map((comment, index) => (
                <div
                  key={comment.comment_id || index}
                  className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden"
                >
                  <div
                    className="bg-gray-100 p-3 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleComment(index)}
                  >
                    <div className="flex items-center">
                      <span className="font-medium mr-2">
                        ลำดับที่: {sortedComments.length - index}
                      </span>
                      {index !== 0 &&
                        (expandedComments[index] ? (
                          <ExpandLess className="text-gray-600" />
                        ) : (
                          <ExpandMore className="text-gray-600" />
                        ))}
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          index === 0 && productDetail.status?.status !== 3
                            ? "bg-yellow-100 text-yellow-800"
                            : index === 0 && productDetail.status?.status === 3
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {index === 0 && productDetail.status?.status !== 3
                          ? "รอดำเนินการ"
                          : index === 0 && productDetail.status?.status === 3
                          ? "อนุมัติแล้ว"
                          : "ปฏิเสธ"}
                      </span>
                    </div>
                  </div>

                  {/* แสดงเนื้อหาเฉพาะเมื่อกดเปิด หรือเป็นรายการแรก */}
                  {(expandedComments[index] || index === 0) && (
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ส่วนความเห็นของผู้ตรวจสอบ */}
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-medium text-gray-700">
                              วันที่แสดงความคิดเห็น
                            </h3>
                            <p>
                              {new Date(comment.created_at).toLocaleDateString(
                                "th-TH"
                              )}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-700">
                              ความคิดเห็น
                            </h3>
                            <p className="whitespace-pre-wrap break-words bg-gray-50 p-3 rounded border border-gray-200 min-h-[100px]">
                              {comment.comment}
                            </p>
                          </div>
                        </div>

                        {/* ส่วนการตอบกลับของบริษัท */}
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-medium text-gray-700">
                              วันที่บริษัทตอบกลับ
                            </h3>
                            <p>
                              {new Date(
                                comment.created_at_company
                              ).toLocaleDateString("th-TH")}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-700">
                              การตอบกลับของบริษัท
                            </h3>
                            <p className="whitespace-pre-wrap break-words bg-gray-50 p-3 rounded border border-gray-200 min-h-[100px]">
                              {comment.comment_company}
                            </p>
                          </div>

                          <div className="mt-4 border-t border-gray-200 pt-4">
                            <h3 className="font-medium text-gray-700 mb-3">
                              ไฟล์แนบ
                            </h3>

                            {errorExcel && (
                              <p className="text-red-500">{errorExcel}</p>
                            )}

                            <div className="space-y-2">
                              {index < excelList.length ? (
                                <button
                                  onClick={() =>
                                    window.open(
                                      `http://178.128.123.212:5000${
                                        excelList[excelList.length - index - 1]
                                          .path_excel
                                      }`,
                                      "_blank"
                                    )
                                  }
                                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full text-left flex items-center"
                                >
                                  <FileOpen className="mr-2" />
                                  รายงานไฟล์เวอร์ชัน{" "}
                                  {
                                    excelList[excelList.length - index - 1]
                                    .version
                                  }{" "}
                                  -{" "}
                                  {new Date(
                                    excelList[
                                      excelList.length - index - 1
                                    ].created_at
                                  ).toLocaleDateString("th-TH")}
                                </button>
                              ) : (
                                <p className="text-gray-500 italic">
                                  ไม่มีรายงานในระบบสำหรับความคิดเห็นนี้
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">
                ยังไม่มีประวัติการตรวจสอบสำหรับผลิตภัณฑ์นี้
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Response;
