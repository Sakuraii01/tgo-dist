import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { PROTECTED_PATH, UNPROTECTED_PATH } from "../constants/path.route";

import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import SelfCollect from "../pages/selfCollect";
import CreateSelfCollect from "../pages/selfCollect/create";
import RegisterProduct from "../pages/registerproduct";
import CreateProduct from "../pages/registerproduct/create";
import Product from "../pages/product";
import FR03 from "../pages/registerproduct/FR03";
import FR04_1 from "../pages/registerproduct/FR04-1";
import FR04_2 from "../pages/registerproduct/FR04-2";
import FR04_3 from "../pages/registerproduct/FR04-3";
import FR06_1 from "../pages/registerproduct/FR06_1";
import FR06_2 from "../pages/registerproduct/FR06_2";
import SelectPage from "../pages/selected";

import { useAuth } from "../auth/useAuth";

import { useLocation } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter basename="/cfp">
      <Routes>
        <Route element={<UnRequireAuth />}>
          <Route path={UNPROTECTED_PATH.LOGIN} element={<Login />} />
          <Route path={UNPROTECTED_PATH.REGISTER} element={<Register />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path={PROTECTED_PATH.SELF_COLLECT} element={<SelfCollect />} />
          <Route
            path={PROTECTED_PATH.CREATE_SELF_COLLECT}
            element={<CreateSelfCollect />}
          />
          <Route path={PROTECTED_PATH.DASHBOARD} element={<Dashboard />} />
          <Route
            path={PROTECTED_PATH.SELECT_CBAM_CFP}
            element={<SelectPage />}
          />
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
              <Route
                path={PROTECTED_PATH.REGISTER_PRODUCT_FR04_3}
                element={<FR04_3 />}
              />
              <Route
                path={PROTECTED_PATH.REGISTER_PRODUCT_FR06_1}
                element={<FR06_1 />}
              />
              <Route
                path={PROTECTED_PATH.REGISTER_PRODUCT_FR06_2}
                element={<FR06_2 />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;

function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.user?.user.name) {
    return (
      <Navigate
        to={UNPROTECTED_PATH.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
}

function UnRequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (auth?.user?.user.name) {
    return (
      <Navigate
        to={PROTECTED_PATH.SELECT_CBAM_CFP}
        state={{ from: location }}
        replace
      />
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
}
