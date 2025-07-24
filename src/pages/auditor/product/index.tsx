import React from "react";
import { BreadcrumbNav } from "../../../component/layout";
import { ANavbar } from "../layout";
import { FileOpen } from "@mui/icons-material";
import useViewModel from "./viewModel";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";
import { useState } from "react";
import { ProductService } from "../../../service/api/auditor/product";

const AProduct: React.FC = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const auditorId = 1;

  const { productData, productDetail, loading, error, refetch,excelLink, fetchLatestExcel} =
    useViewModel(auditorId, Number(id));

  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const productService = new ProductService();

  const handleSaveComment = async () => {
    if (!comment.trim() || !productDetail) return;
    try {
      setSubmitting(true);
      await productService.reqAddComment({
        auditor_id: auditorId,
        company_id: productInfo.company_id,
        product_id: productInfo.product_id,
        comment: comment.trim(),
      });

      // อัพเดทสถานะเป็น 2 (ระหว่างพิจารณา) หลังจากเพิ่ม comment
      if (
        productDetail?.status?.status === 0 ||
        productDetail?.status?.status === 1
      ) {
        await productService.reqUpdateProductStatus(
          auditorId,
          productInfo.product_id,
          productDetail?.status?.status_id,
          2
        );
      }

      // Reset comment and refetch data
      setComment("");
      setShowCommentBox(false); // Hide comment box after submission
      await refetch();
      alert("บันทึกความคิดเห็นเรียบร้อยแล้ว");
      navigate("/auditor");
    } catch (error) {
      console.error("Error saving comment:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกความคิดเห็น");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusDisplay = () => {
    if (productDetail?.status?.status === 4) {
      return { text: "ปฏิเสธ", class: "bg-red-100 text-red-800" };
    } else if (productDetail?.status?.status === 3) {
      return { text: "อนุมัติ", class: "bg-green-100 text-green-800" };
    } else if (productDetail?.status?.status === 2) {
      return {
        text: "อยู่ระหว่างการพิจารณา",
        class: "bg-yellow-100 text-yellow-800",
      };
    } else if (
      productDetail?.status?.status === 0 ||
      productDetail?.status?.status === 1
    ) {
      return { text: "รอการพิจารณา", class: "bg-gray-100 text-gray-800" };
    }

    switch (productData?.verify_status) {
      case "Rejected":
        return { text: "ปฏิเสธ", class: "bg-red-100 text-red-800" };
      case "Approved":
        return { text: "อนุมัติ", class: "bg-green-100 text-green-800" };
      case "Under":
        return {
          text: "อยู่ระหว่างการพิจารณา",
          class: "bg-yellow-100 text-yellow-800",
        };
      default:
        return { text: "รอการพิจารณา", class: "bg-gray-100 text-gray-800" };
    }
  };

  const handleUpdateStatus = async (newStatus: 3 | 4) => {
    if (!productDetail?.product?.[0] || !productDetail?.status) return;

    try {
      setSubmitting(true);

      await productService.reqUpdateProductStatus(
        auditorId,
        productDetail.product[0].product_id,
        productDetail.status.status_id,
        newStatus
      );

      await refetch();

      const statusText = newStatus === 3 ? "อนุมัติ" : "ปฏิเสธ";
      alert(`${statusText}ผลิตภัณฑ์เรียบร้อยแล้ว`);
      navigate("/auditor");
    } catch (error) {
      console.error("Error updating status:", error);
      alert(
        `เกิดข้อผิดพลาดในการอัพเดทสถานะ: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <ANavbar />
        <BreadcrumbNav step="View Product" />
        <div className="max-w-7xl mx-auto my-15">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p>กำลังโหลดข้อมูล...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <ANavbar />
        <BreadcrumbNav step="View Product" />
        <div className="max-w-7xl mx-auto my-15">
          <div className="flex justify-center items-center h-64">
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg max-w-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                เกิดข้อผิดพลาด
              </h3>
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => refetch()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                ลองใหม่อีกครั้ง
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!productDetail || !productData) {
    return (
      <div>
        <ANavbar />
        <BreadcrumbNav step="View Product" />
        <div className="max-w-7xl mx-auto my-15">
          <div className="flex justify-center items-center h-64">
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg max-w-lg">
              <h3 className="text-lg font-medium text-amber-800 mb-2">
                ข้อมูลผลิตภัณฑ์ไม่พร้อมใช้งาน
              </h3>
              <p className="text-amber-700">
                ไม่พบข้อมูลผลิตภัณฑ์หรือข้อมูลไม่ครบถ้วน
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                >
                  ลองใหม่อีกครั้ง
                </button>
                <button
                  onClick={() => navigate(PROTECTED_PATH.AUDITOR)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  กลับไปหน้ารายการ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const toggleCommentBox = () => {
    setShowCommentBox((prev) => !prev);
  };

  const statusInfo = getStatusDisplay();

  // Get the product from the productDetail
  const productInfo = productDetail.product[0];

  return (
    <div>
      <ANavbar />
      <BreadcrumbNav step="View Product" />
      <div className="max-w-7xl mx-auto my-15">
        <h1 className="text-3xl font-medium mb-5 mt-10">รายละเอียดผลิตภัณฑ์</h1>
        <section>
          <div>
            <div className="flex gap-4">
              <div className="text-primary">
                <p className="text-xl text-gradient text-gradient-primary font-bold">
                  {productData.product_name_th || "ไม่ระบุชื่อภาษาไทย"}
                </p>
                <p>
                  {productData.product_name_en || "Product name not specified"}
                </p>
              </div>
              <p className="px-2 py-1 border-gray-300 border rounded-full h-fit text-xs my-auto">
                {statusInfo.text}
              </p>
            </div>
          </div>
          <div className="w-full rounded-xl bg-stroke py-4 px-6 my-4">
            <p className="text-xs mb-1">คำอธิบาย</p>
            {(() => {
              try {
                // Parse the product_techinfo JSON string
                const techInfoArray = JSON.parse(
                  productInfo.product_techinfo || "[]"
                );

                return techInfoArray.length > 0 ? (
                  techInfoArray.map((data: string, index: number) => (
                    <p key={index} className="mb-1">
                      {data}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">ไม่มีข้อมูลทางเทคนิค</p>
                );
              } catch (error) {
                console.error("Error parsing product_techinfo:", error);
                return (
                  <p className="text-amber-600">ไม่สามารถแสดงข้อมูลเทคนิคได้</p>
                );
              }
            })()}
          </div>
        </section>
        <section className="flex gap-5">
          {(() => {
            let photoSrc: string = "/";
            if (typeof productData?.product_photo === "string") {
              photoSrc = "http://178.128.123.212:5000" + productData.photo_path;
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
                    {productInfo.product_name_th || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="bg-primary-3 ps-3 text-white font-bold border-b border-white">
                    ชื่อผลิตภัณฑ์ และรุ่น (EN)
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-stroke">
                    {productInfo.product_name_en || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="bg-primary ps-3 text-white font-bold border-b border-white">
                    ขอบเขตของการประเมิน
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-[#FAFAFA]">
                    {productInfo.scope || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="bg-primary ps-3 text-white font-bold border-b border-white">
                    รอบขึ้นทะเบียน
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-stroke">
                    {productInfo.submitted_round || "-"}
                  </td>
                </tr>
                <tr className="rounded-bl-2xl">
                  <td className="bg-primary-3 ps-3 text-white font-bold border-b border-white">
                    วันที่ขอขึ้นทะเบียน
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-[#FAFAFA]">
                    {productInfo.submitted_date
                      ? new Date(productInfo.submitted_date).toLocaleDateString(
                          "th-TH"
                        )
                      : "-"}
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
                      {productDetail?.auditor?.name || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#36449A] text-white font-bold pr-5 ps-3 border-b border-white w-60">
                      วันที่ตรวจสอบ
                    </td>
                    <td className="border-b border-stroke py-2 px-4 bg-stroke w-72">
                      {productData?.updated_date
                        ? new Date(productData.updated_date).toLocaleDateString(
                            "th-TH"
                          )
                        : "-"}
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
                        {productData?.created_date
                          ? new Date(
                              productData.created_date
                            ).toLocaleDateString("th-TH")
                          : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Status Update Section - แสดงเสมอ */}
        <div>
          <div className="mt-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-5 rounded-t-xl flex justify-between items-center">
                {/* Left side title */}
                <h3 className="text-lg text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  สถานะการตรวจสอบ
                </h3>

                {/* Download button */}
                <div className="ml-auto mr-4">
                  <button
                    onClick={async () => {
                    await fetchLatestExcel();
                    console.log(excelLink);
                    window.open(
                      "http://178.128.123.212:5000" + excelLink,
                      "_blank"
                    );
                  }}
                    type="button"
                    className="border border-green-500 shadow px-4 py-1 rounded-full flex gap-1 hover:bg-green-50 hover:opacity-90 transition-colors"
                  >
                    <FileOpen fontSize="small" color="success" />
                    <p>ดาวน์โหลดเอกสาร</p>
                  </button>
                </div>

                {/* History button */}
                <button
                  onClick={() =>
                    navigate(
                      `${PROTECTED_PATH.AUDITOR_COMMENT_HISTORY}?id=${id}`
                    )
                  }
                  className="px-3 py-1 border-gray-300 border rounded-full h-fit my-auto hover:bg-gray-50 transition-colors"
                >
                  ประวัติการรายงาน
                </button>
              </div>

              <div className="p-5">
                {/* Current status */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gray-700 font-medium">
                    สถานะปัจจุบัน:
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${statusInfo.class}`}
                  >
                    {statusInfo.text}
                  </span>
                </div>

                {/* Action buttons or status message */}
                <div className="flex gap-3 mt-5 flex-wrap">
                  {/* Show action buttons only for pending or in-progress statuses */}
                  {(productDetail?.status?.status === 0 ||
                    productDetail?.status?.status === 1 ||
                    productDetail?.status?.status === 2) && (
                    <>
                      <button
                        type="button"
                        disabled={submitting}
                        className="primary-button shadow px-4 py-2 rounded-full flex gap-1 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={toggleCommentBox}
                      >
                        {submitting
                          ? "กำลังดำเนินการ..."
                          : showCommentBox
                          ? "ยกเลิกการเพิ่มประเด็น"
                          : "เพิ่มประเด็นที่ต้องปรับปรุง"}
                      </button>

                      {/* Show approve/reject buttons only when comment box is hidden */}
                      {!showCommentBox && (
                        <>
                          <button
                            type="button"
                            disabled={submitting}
                            className="bg-green-600 text-white shadow px-4 py-2 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleUpdateStatus(3)}
                          >
                            {submitting ? "กำลังดำเนินการ..." : "อนุมัติ"}
                          </button>
                          <button
                            type="button"
                            disabled={submitting}
                            className="bg-red-600 text-white shadow px-4 py-2 rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleUpdateStatus(4)}
                          >
                            {submitting ? "กำลังดำเนินการ..." : "ปฏิเสธ"}
                          </button>
                        </>
                      )}
                    </>
                  )}

                  {/* Message when status is finalized */}
                  {(productDetail?.status?.status === 3 ||
                    productDetail?.status?.status === 4) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 w-full">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-blue-800 text-sm">
                          <span className="font-medium">หมายเหตุ:</span>{" "}
                          ผลิตภัณฑ์นี้อยู่ในสถานะ "{statusInfo.text}"
                          {productDetail?.status?.status === 3 &&
                            " - การพิจารณาเสร็จสิ้นแล้ว"}
                          {productDetail?.status?.status === 4 &&
                            " - การพิจารณาเสร็จสิ้นแล้ว"}
                        </p>
                      </div>

                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          ไม่สามารถแก้ไขสถานะหรือเพิ่มความคิดเห็นได้อีก
                          หากต้องการเปลี่ยนแปลงกรุณาติดต่อผู้ดูแลระบบ
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Comment Box Section - แสดงเฉพาะเมื่อ status = 0,1,2 และกดเพิ่มความคิดเห็น */}
        {showCommentBox &&
          (productDetail?.status?.status === 0 ||
            productDetail?.status?.status === 1 ||
            productDetail?.status?.status === 2) && (
            <div className="mt-8 animate-fade-in">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 text-black px-6 py-4 rounded-t-xl">
                  <h3 className="text-lg font-medium flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-amber-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    เพิ่มประเด็นที่ต้องปรับปรุง
                  </h3>
                  <p className="text-xs text-amber-700 ml-7">
                    ความคิดเห็นนี้จะถูกส่งไปยังผู้ประกอบการเพื่อดำเนินการปรับปรุงและแก้ไข
                  </p>
                </div>

                {/* Content */}
                <div className="p-5">
                  <textarea
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="ระบุประเด็นที่ต้องการให้ผู้ประกอบการแก้ไขหรือข้อเท็จจริงที่พบ..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={6}
                    disabled={submitting}
                    style={{ whiteSpace: "pre-wrap" }}
                  />

                  {/* Character count */}
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">
                      {comment.length} ตัวอักษร
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setComment("")}
                      disabled={submitting || !comment.trim()}
                      className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      ล้างข้อความ
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveComment}
                      disabled={!comment.trim() || submitting}
                      className="primary-button shadow px-4 py-2 rounded-full flex gap-1 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          กำลังบันทึก...
                        </>
                      ) : (
                        "บันทึกความคิดเห็น"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Back to List Button */}
        <button
          type="button"
          onClick={() => navigate(PROTECTED_PATH.AUDITOR)}
          className="flex 
              bg-gray-600 text-white  shadow px-4 py-2 rounded-full hover:bg-gray-700 transition-colors ml-auto justify-end mt-4"
        >
          กลับไปรายการผลิตภัณฑ์
        </button>
      </div>
    </div>
  );
};

export default AProduct;
