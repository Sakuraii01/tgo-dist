import { BreadcrumbNav, Navbar } from "../../../component/layout";
import { FileOpen } from "@mui/icons-material";
import useViewModel from "./viewModel";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";
import { PROTECTED_PATH as API_PATH } from "../../../constants/api.route";
import { CompanyService } from "../../../service/api/company";
import React, { useState } from "react";

const CProduct: React.FC = () => {
  const navigate = useNavigate();
  const auditorId = 1;
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const {
    productData: individualProduct,
    fetchGenExcel,
    fetchUploadExcel,
    excelLink,
    productDetail,
    loading,
    error,
    refetch,
  } = useViewModel(auditorId, Number(id));

  const productId = productDetail?.product?.[0]?.product_id;
  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // const token = JSON.parse(localStorage.getItem("token") || "{}");
  const companyService = new CompanyService();
  const [uploading, setUploading] = useState(false);
  const [uploadError] = useState<string | null>(null);
  const [isCfpFormConfirmed, setIsCfpFormConfirmed] = useState(false);

  const callExcelApi = async () => {
    try {
      setUploading(true);

      await fetch(
        `http://178.128.123.212:5000/api/v1${API_PATH.EXCEL_GEN_TO_AUDITOR}/${auditorId}/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเรียก API:", error);
      alert("เกิดข้อผิดพลาดในการเรียก API");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveComment = async () => {
    if (!comment.trim() || !productDetail) return;
    try {
      setSubmitting(true);

      await companyService.reqUpdateCommentCompany(
        productDetail?.comments[0]?.comments_id || 0,
        comment.trim()
      );

      setComment("");
      setShowCommentBox(false);
      await refetch();
      alert("บันทึกความคิดเห็นเรียบร้อยแล้ว");
      navigate(`${PROTECTED_PATH.DASHBOARD}`);
    } catch (error) {
      console.error("Error saving comment:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกความคิดเห็น");
    } finally {
      setSubmitting(false);
    }
  };

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
    const verifyStatus = productDetail?.product?.[0]?.verify_status;
    switch (verifyStatus) {
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
                  {individualProduct?.product_name_th}
                </p>
                <p>{individualProduct?.product_name_en}</p>
              </div>
              <p className="px-2 py-1 border-gray-300 border rounded-full h-fit text-xs font-semibold my-auto">
                {statusInfo.text}
              </p>
            </div>
          </div>
          <div className="w-full rounded-xl bg-stroke py-4 px-6 my-4">
            <p className="text-xs font-semibold mb-1">คำอธิบาย</p>
            {individualProduct?.product_techinfo && (
              <div>
                {typeof individualProduct.product_techinfo === "string" ? (
                  (() => {
                    try {
                      return JSON.parse(individualProduct.product_techinfo).map(
                        (data: string, index: number) => (
                          <p key={index}>{data}</p>
                        )
                      );
                    } catch {
                      return <p>{individualProduct.product_techinfo}</p>;
                    }
                  })()
                ) : (
                  <p>{individualProduct.product_techinfo}</p>
                )}
              </div>
            )}
          </div>
        </section>
        <section className="flex gap-5">
          {(() => {
            let photoSrc: string = "/";
            if (typeof individualProduct?.product_photo === "string") {
              photoSrc =
                "http://178.128.123.212:5000" + individualProduct.photo_path;
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
                    {individualProduct?.product_name_th}
                  </td>
                </tr>
                <tr>
                  <td className="bg-primary-3 ps-3 text-white font-bold border-b border-white">
                    ชื่อผลิตภัณฑ์ และรุ่น (EN)
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-stroke">
                    {individualProduct?.product_name_en}
                  </td>
                </tr>
                <tr>
                  <td className="bg-primary ps-3 text-white font-bold border-b border-white">
                    ขอบเขตของการประเมิน
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-[#FAFAFA]">
                    {individualProduct?.scope}
                  </td>
                </tr>
                <tr>
                  <td className="bg-primary ps-3 text-white font-bold border-b border-white">
                    รอบขึ้นทะเบียน
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-stroke">
                    {individualProduct?.submitted_round ?? "-"}
                  </td>
                </tr>
                <tr className="rounded-bl-2xl">
                  <td className="bg-primary-3 ps-3 text-white font-bold border-b border-white">
                    วันที่ขอขึ้นทะเบียน
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4 bg-[#FAFAFA]">
                    {individualProduct?.submitted_date
                      ? new Date(
                          individualProduct.submitted_date
                        ).toLocaleDateString("th-TH")
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
                      {individualProduct?.updated_date
                        ? new Date(
                            individualProduct.updated_date
                          ).toLocaleDateString("th-TH")
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
                        {individualProduct?.created_date
                          ? new Date(
                              individualProduct.created_date
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
        {productDetail?.comments?.length > 0 && (
          <div>
            <div className="mt-8">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-5 rounded-t-xl flex justify-between items-center">
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
                  <div className="ml-auto mr-4">
                    <button
                      onClick={async () => {
                        await fetchUploadExcel();
                        window.open(
                          "http://178.128.123.212:5000" + excelLink,
                          "_blank"
                        );
                      }}
                      type="button"
                      className="border border-green-500 shadow px-4 py-1 rounded-full flex gap-1 hover:bg-green-50 hover:opacity-90 transition-colors"
                    >
                      <FileOpen fontSize="small" color="success" />
                      <p>ดาวน์โหลดเอกสาร(เวอร์ชันที่ถูกส่งให้กับผู้ทวนสอบ)</p>
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      navigate(
                        `${PROTECTED_PATH.COMPANY_COMMENT_HISTORY}?id=${id}`
                      )
                    }
                    className="px-2 py-1 border-gray-300 border rounded-full h-fit font-semibold my-auto"
                  >
                    ประวัติการรายงาน
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-700">
                      <div className="overflow-y-auto whitespace-pre-wrap break-words">
                        {productDetail.comments[0].comment}
                      </div>
                    </span>
                  </div>
                  <div className="flex gap-3 mt-4 flex-wrap justify-end">
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
                              onClick={async () => {
                                await fetchGenExcel();
                                window.open(
                                  "http://178.128.123.212:5000" + excelLink,
                                  "_blank"
                                );
                              }}
                              type="button"
                              className="bg-green-500 text-white font-semibold shadow px-4 py-2 rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <p>ดาวน์โหลดแบบฟอร์มที่ได้รับการแก้ไขแล้ว</p>
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          disabled={submitting}
                          className="primary-button font-semibold shadow px-4 py-2 rounded-full flex gap-1 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed "
                          onClick={toggleCommentBox}
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
        )}

        {!productDetail?.comments?.length && !showCommentBox && (
          <div className="mt-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-5 rounded-t-xl flex justify-between items-center"></div>

              <div className="p-5">
                <div className="flex justify-end gap-3">
                  {/* ปุ่มดำเนินการเมื่อไม่มีความคิดเห็น แสดงเฉพาะเมื่อ status = 0,1,2 */}
                  {(productDetail?.status?.status === 0 ||
                    productDetail?.status?.status === 1 ||
                    productDetail?.status?.status === 2) &&
                    productDetail?.comments?.length > 0 && (
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
                          className="primary-button font-semibold shadow px-4 py-2 rounded-full flex gap-1 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={toggleCommentBox}
                        >
                          {submitting
                            ? "กำลังดำเนินการ..."
                            : "เพิ่มความคิดเห็น"}
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
        )}

        {/* New Comment Box Section - แสดงเฉพาะเมื่อ status = 0,1,2 และกดปุ่มเพิ่มความคิดเห็น */}
        {showCommentBox &&
          (productDetail?.status?.status === 0 ||
            productDetail?.status?.status === 1 ||
            productDetail?.status?.status === 2) && (
            <div className="mt-8 animate-fade-in">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-r text-black px-6 py-4 rounded-t-xl">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">เพิ่มประเด็นใหม่</h3>
                    <div className="space-y-2">
                      {/* checkbox สำหรับยืนยันแบบฟอร์ม CFP */}
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="cfp-form-check"
                              type="checkbox"
                              checked={isCfpFormConfirmed}
                              onChange={(e) =>
                                setIsCfpFormConfirmed(e.target.checked)
                              }
                              disabled={submitting}
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="cfp-form-check"
                              className="font-medium text-gray-700"
                            >
                              แนบแบบฟอร์ม CFP (เวอร์ชันที่ได้ทำการแก้ไข)
                            </label>
                          </div>
                        </div>

                        {!isCfpFormConfirmed && (
                          <div className="flex justify-end text-xs text-orange-500 items-center">
                            <span>กรุณาแก้ไขกดแนบแบบฟอร์มการแก้ไข</span>
                          </div>
                        )}
                      </div>

                      {/* แสดงข้อผิดพลาดถ้ามี */}
                      {uploadError && (
                        <p className="text-red-500 text-sm">{uploadError}</p>
                      )}
                    </div>
                  </div>
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
                      onClick={() => {
                        handleSaveComment();
                        callExcelApi();
                      }}
                      disabled={!comment.trim() || submitting || uploading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                    >
                      บันทึกและอัปโหลด
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
