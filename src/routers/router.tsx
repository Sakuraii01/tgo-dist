import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { PROTECTED_PATH } from "../constants/path.route";
import Dashboard from "../pages/dashboard";
import RegisterProduct from "../pages/registerproduct";
import CreateProduct from "../pages/registerproduct/create";
import Product from "../pages/product";
import FR03 from "../pages/registerproduct/FR03";
import FR04_1 from "../pages/registerproduct/FR04-1";
import FR04_2 from "../pages/registerproduct/FR04-2";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PROTECTED_PATH.DASHBOARD} element={<Dashboard />} />
        <Route path={PROTECTED_PATH.PRODUCT_DETAIL} element={<Product />} />
        <Route element={<Outlet />}>
          <Route
            path={PROTECTED_PATH.REGISTER_PRODUCT}
            element={<RegisterProduct />}
          >
            <Route
              path={PROTECTED_PATH.REGISTER_PRODUCT_CREATE}
              element={<CreateProduct />}
            />
            <Route
              path={PROTECTED_PATH.REGISTER_PRODUCT_FR03}
              element={<FR03 />}
            />
            <Route
              path={PROTECTED_PATH.REGISTER_PRODUCT_FR04_1}
              element={<FR04_1 />}
            />
            <Route
              path={PROTECTED_PATH.REGISTER_PRODUCT_FR04_2}
              element={<FR04_2 />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
