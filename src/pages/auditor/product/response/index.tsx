import React from "react";
import { BreadcrumbNav, Navbar } from "../../../../component/layout";

import useViewModel from "../viewModel";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../../constants/path.route";

const Response: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { productDetail, loading, error } = useViewModel(Number(id));

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

  return (
    <div>
      <Navbar />
      <BreadcrumbNav step="View Product" />
      <div className="max-w-7xl mx-auto my-15 ">
        <h1 className="text-3xl font-medium mb-5 mt-10">รายละเอียดผลิตภัณฑ์</h1>

        {/* Existing Comments Section - แสดงเสมอ */}
        {productDetail.comments && productDetail.comments.length > 1 && (
          <div className="mt-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r text-black px-6 py-4 rounded-t-xl">
                <h3 className="text-lg font-semibold">
                  ประเด็นที่แสดงความคิดเห็นแล้ว
                </h3>
              </div>
              <div className="p-5 space-y-4 ">
                {productDetail.comments.map((commentItem) => (
                  <div
                    key={commentItem.comments_id}
                    className="border-r-4 border-blue-400 pl-4 py-2 bg-gray-50 rounded-l-lg"
                  >
                    <p className="text-gray-800">{commentItem.comment}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      วันที่:{" "}
                      {new Date(commentItem.created_at).toLocaleDateString(
                        "th-TH"
                      )}{" "}
                      เวลา:{" "}
                      {new Date(commentItem.created_at).toLocaleTimeString(
                        "th-TH"
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      <div className="mt-10 flex justify-end">
      {/* Back to List Button */}
        <button
          type="button"
          onClick={() => navigate(`/product_adetail?id=${id}`)}
          className=" bg-gray-600 text-white font-semibold shadow px-4 py-2 rounded-full hover:bg-gray-700 transition-colors ml-auto "
        >
          กลับไปรายละเอียดผลิตภัณฑ์
        </button>
    </div>
        
      </div>

    </div>
  );
};

export default Response;
