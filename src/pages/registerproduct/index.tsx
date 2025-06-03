import { Outlet } from "react-router-dom";
import { Navbar, BreadcrumbNav } from "../../component/layout";
const RegisterProduct = () => {
  return (
    <div>
      <Navbar />
      <BreadcrumbNav />
      <div className="my-10">
        <Outlet />
      </div>
    </div>
  );
};

export default RegisterProduct;
