import React from "react";
import { BreadcrumbNav, Navbar } from "../../../component/layout";
import { FileDownloadRounded } from "@mui/icons-material";
import useViewModel from "./viewModel";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH as API_PATH } from "../../../constants/api.route";
import { PROTECTED_PATH } from "../../../constants/path.route";
import { useState } from "react";
// import { ProductService } from "../../../service/api/auditor/product";
import { CompanyService } from "../../../service/api/company";

// import { useAuth } from "../../../auth/useAuth";

const CProduct: React.FC = () => {
  const navigate = useNavigate();
  const auditorId = 1;
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { productDetail, loading, error, refetch } = useViewModel(
    Number(id),
    auditorId
  );
  const productId = productDetail?.product?.product_id;
  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const companyService = new CompanyService();
  // const auth = useAuth();

  const handleSaveComment = async () => {
    if (!comment.trim() || !productDetail) return;
    try {
      setSubmitting(true);

      const payload = {
        auditor_id: auditorId,
        company_id: productDetail.product.company_id,
        product_id: productDetail.product.product_id,
        comment: comment.trim(), 
      };

      console.log("Comment payload:", payload);

      // เพิ่ม comment ก่อน
      await companyService.reqAddComment({
        auditor_id: auditorId,
        company_id: productDetail.product.company_id,
        product_id: productDetail.product.product_id,
        comment: comment.trim(),
      });

      // Reset comment and refetch data
      setComment("");
      setShowCommentBox(false); // Hide comment box after submission
      await refetch();
      alert("บันทึกความคิดเห็นเรียบร้อยแล้ว");
      navigate("/auditor");
    } catch (error) {
      console.error("Error saving comment:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกความคิดเห็น");
      // navigate("/auditor");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to get status display based on API response
  const getStatusDisplay = () => {
    // Check the status object first for detailed status
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

    // Fall back to verify_status from product
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

  if (!productDetail) {
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

  const toggleCommentBox = () => {
    setShowCommentBox((prev) => !prev);
  };

  const productData = productDetail.product;
  const statusInfo = getStatusDisplay();

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
                {statusInfo.text}
              </p>
            </div>
          </div>

          <div className="w-full rounded-xl bg-stroke py-4 px-6 my-4">
            <p className="text-xs font-semibold mb-1">คำอธิบาย</p>
            {productData?.product_techinfo && (
              <div>
                {typeof productData.product_techinfo === "string" ? (
                  (() => {
                    try {
                      return JSON.parse(productData.product_techinfo).map(
                        (data: string, index: number) => (
                          <p key={index}>{data}</p>
                        )
                      );
                    } catch {
                      return <p>{productData.product_techinfo}</p>;
                    }
                  })()
                ) : (
                  <p>{productData.product_techinfo}</p>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="flex gap-5">
          {(() => {
            let photoSrc: string = "/placeholder-image.png";
            if (productData?.product_photo) {
              photoSrc =
                "http://178.128.123.212:5000/" + productData.product_photo;
            }
            return (
              <img
                src={photoSrc}
                alt="Product"
                className="w-80 object-cover rounded-lg"
              />
            );
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
                    {productData?.submitted_date
                      ? new Date(productData.submitted_date).toLocaleDateString(
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
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
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
                    ความคิดเห็นล่าสุด
                  </h3>
                  <span className="text-xs text-gray-500 mt-1 ml-7">
                    {new Date(
                      productDetail.comments[0].created_at
                    ).toLocaleDateString("th-TH")}
                  </span>
                </div>
                <div className="ml-auto mr-2">
                  <button
                    onClick={() =>
                      window.open(
                        `http://178.128.123.212:5000/api/v1/excel/${productData?.company_id}/${productData?.product_id}`,
                        "_blank"
                      )
                    }
                    type="button"
                    className="primary-button font-semibold shadow px-4 py-1 rounded-full flex gap-1 hover:opacity-90"
                  >
                    <FileDownloadRounded fontSize="small" />
                    <p>ดาวน์โหลดเอกสาร (เวอร์ชันล่าสุด)</p>
                  </button>
                </div>

                <button
                  onClick={() => navigate(`/response?id=${id}`)}
                  className="px-2 py-1 border-gray-300 border rounded-full h-fit font-semibold my-auto"
                >
                  ประวัติการรายงาน
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700">
                    {" "}
                    <div className=" overflow-y-auto whitespace-pre-wrap break-words">
                      {productDetail.comments[0].comment}
                    </div>
                  </span>
                </div>

                <div className="flex gap-3 mt-4 flex-wrap justify-end">
                  {/* ปุ่มอนุมัติ/ปฏิเสธ - แสดงเฉพาะเมื่อ status = 1,2 และไม่ได้อยู่ในโหมดแก้ไข */}
                  {(productDetail?.status?.status === 0 ||
                    productDetail?.status?.status === 1 ||
                    productDetail?.status?.status === 2) && (
                    <>
                      {!showCommentBox && (
                        <>
                          <button
                            type="button"
                            disabled={submitting}
                            className="bg-pink-300 text-white font-semibold shadow px-4 py-2 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() =>
                              navigate(
                                `${PROTECTED_PATH.REGISTER_PRODUCT_FR03}?id=${id}`
                              )
                            }
                          >
                            {submitting ? "กำลังดำเนินการ..." : "แก้ไขฟอร์ม"}
                          </button>
                          <button
                            type="button"
                            disabled={submitting}
                            className="bg-green-500 text-white font-semibold shadow px-4 py-2 rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={async () => {
                              try {
                                window.open(
                                  `http://178.128.123.212:5000/api/v1/excel/auditor/${auditorId}/${productId}`,
                                  "_blank"
                                );
                              } catch (error) {
                                console.error("Error generating Excel:", error);
                                alert("ไม่สามารถสร้างไฟล์ Excel ได้");
                              }
                            }}
                          >
                            {submitting
                              ? "กำลังดำเนินการ..."
                              : "Generate Excel File"}
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        disabled={submitting}
                        className="primary-button font-semibold shadow px-4 py-2 rounded-full flex gap-1 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed "
                        onClick={toggleCommentBox} // Toggle comment box visibility
                      >
                        {submitting
                          ? "กำลังดำเนินการ..."
                          : showCommentBox
                          ? "ยกเลิกการตอบกลับ"
                          : "ตอบกลับความคิดเห็น"}
                      </button>
                    </>
                  )}

                  {/* แสดงข้อความเมื่อไม่สามารถแก้ไขได้ */}
                  {(productDetail?.status?.status === 3 ||
                    productDetail?.status?.status === 4) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 w-full">
                      <p className="text-blue-800 text-sm">
                        <span className="font-semibold">หมายเหตุ:</span>{" "}
                        ผลิตภัณฑ์นี้อยู่ในสถานะ "{statusInfo.text}"
                        {productDetail?.status?.status === 3 &&
                          " - การพิจารณาเสร็จสิ้นแล้ว"}
                        {productDetail?.status?.status === 4 &&
                          " - การพิจารณาเสร็จสิ้นแล้ว"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Comment Box Section - แสดงเฉพาะเมื่อ status = 1,2*/}
        {showCommentBox &&
          (productDetail?.status?.status === 0 ||
            productDetail?.status?.status === 1 ||
            productDetail?.status?.status === 2) && (
            <div className="mt-8">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-r text-black px-6 py-4 rounded-t-xl">
                  <h3 className="text-lg font-semibold">เพิ่มประเด็นใหม่</h3>
                </div>
                {/* Content */}
                <div className="p-5">
                  <textarea
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="กรอกประเด็นที่ต้องการแสดงความคิดเห็น..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    disabled={submitting}
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setComment("")}
                      disabled={submitting}
                      className="px-4 py-2 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ล้างข้อความ
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveComment}
                      disabled={!comment.trim() || submitting}
                      className="primary-button font-semibold shadow px-4 py-2 rounded-full flex gap-1 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "กำลังบันทึก..." : "บันทึกความคิดเห็น"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Back to List Button */}
        <button
          type="button"
          onClick={() => navigate(PROTECTED_PATH.DASHBOARD)}
          className="bg-gray-600 text-white font-semibold shadow px-4 py-2 mt-10 rounded-full hover:bg-gray-700 transition-colors ml-auto justify-end flex"
        >
          กลับไปรายการผลิตภัณฑ์
        </button>
      </div>
    </div>
  );
};

export default CProduct;
