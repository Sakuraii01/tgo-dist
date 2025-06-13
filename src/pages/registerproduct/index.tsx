import { Outlet } from "react-router-dom";
import { Navbar, BreadcrumbNav } from "../../component/layout";
const RegisterProduct = () => {
  return (
    <div>
      <div className="sticky top-0 left-0 z-50">
        <Navbar />
        <BreadcrumbNav step="Add Product" />
      </div>
      <div className="my-10">
        <Outlet />
      </div>
    </div>
  );
};

export default RegisterProduct;
