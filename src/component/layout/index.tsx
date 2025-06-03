import {
  NotificationsRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowRightRounded,
  HomeRounded,
} from "@mui/icons-material";
export const Navbar = () => {
  return (
    <nav
      className="flex justify-between items-center w-full py-2 px-10 bg-white"
      style={{ boxShadow: "inset 0px -5px 16px rgba(0, 0, 0, 0.05)" }}
    >
      <img src="/icon.png" alt="Logo" className="w-5" />
      <div className="flex items-center gap-10">
        <NotificationsRounded fontSize="small" className="text-secondary-500" />
        <div className="flex items-center gap-2">
          <div>
            <p className="text-sm font-medium text-primary">Company Name</p>
            <p className="text-xs text-gray-200">สถานประกอบการ</p>
          </div>
          <KeyboardArrowDownRounded />
        </div>
      </div>
    </nav>
  );
};
export const BreadcrumbNav = () => {
  return (
    <div className="flex text-gray-300 w-full h-fit items-center gap-2 px-10 py-2 bg-white border-b border-gray-100 text-sm">
      <div className="flex items-center gap-2">
        <HomeRounded fontSize="small" />
        <p>Home</p>
      </div>
      <KeyboardArrowRightRounded className="text-gray-200" fontSize="small" />
      <div className="text-gray-500">
        <p>Add product</p>
      </div>
    </div>
  );
};

export const CreateProductNav = () => {
  return (
    <div>
      <h4 className="font-medium text-lg">เพิ่มการขึ้นทะเบียนผลิตภัณฑ์</h4>
    </div>
  );
};
