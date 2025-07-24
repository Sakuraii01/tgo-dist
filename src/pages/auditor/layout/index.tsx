import {
  NotificationsRounded,
  KeyboardArrowRightRounded,
  HomeRounded,
  LogoutRounded,
} from "@mui/icons-material";

import { Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../../constants/path.route";
import { clearToken, useToken } from "../../../utils/localStorage";
import { useState, useEffect } from "react";
import axios from "axios";

export const ANavbar = () => {
  const navigate = useNavigate();
  const userData = useToken();
  const auditorId = 1;

  const [count, setCount] = useState<number>(0);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const navigateToLoginPage = async () => {
    await clearToken();
    window.location.reload();
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `http://178.128.123.212:5000/api/v1/notifications/auditor/${auditorId}`
      );
      const unread = res.data.filter((n: any) => n.is_read === 0);
      setNotifications(res.data);
      setCount(unread.length);
      console.log("Fetched notifications:", unread.length);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const markAsRead = async () => {
    if (!auditorId) return;
    try {
      await axios.put(
        `http://178.128.123.212:5000/api/v1/notifications/auditor/read/${auditorId}`
      );
      setCount(0);
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      markAsRead();
    }
  };

  return (
    <nav
      className="flex justify-between items-center w-full py-2 px-10 bg-white sticky top-0 left-0 z-10"
      style={{ boxShadow: "inset 0px -5px 16px rgba(0, 0, 0, 0.05)" }}
    >
      <img
        src={`/cfp/icon.png`}
        alt="Logo"
        className="w-5 cursor-pointer"
        onClick={() => navigate(PROTECTED_PATH.DASHBOARD)}
      />
      <div className="flex items-center gap-10">
        <div className="relative flex items-center gap-2 ">
          <Badge
            badgeContent={count}
            color="error"
            className="cursor-pointer mr-8"
            onClick={handleNotificationClick}
          >
            <NotificationsRounded color="success" />
          </Badge>

          {showNotifications && (
            <div className="absolute right-0 top-6 mt-2 w-80 bg-white shadow-md rounded-md z-50 max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-gray-400 text-center">
                  ไม่มีการแจ้งเตือน
                </p>
              ) : (
                notifications.map((n, i) => (
                  <div
                    key={i}
                    className={`p-4 border-b text-sm ${
                      n.is_read ? "text-gray-500" : "text-black font-semibold"
                    }`}
                  >
                    {n.message_alert}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-primary">
              {userData?.user?.name}
            </p>
            <p className="text-xs text-gray-600">ผู้ทวนสอบ</p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="text-error mx-5 cursor-pointer hover:bg-error/10 p-2 rounded-full"
              onClick={navigateToLoginPage}
            >
              <LogoutRounded />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const BreadcrumbNav = ({ step }: { step: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex text-gray-300 w-full h-fit items-center gap-2 px-10 py-2 bg-white border-b border-gray-100 text-sm">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(PROTECTED_PATH.DASHBOARD)}
      >
        <HomeRounded fontSize="small" />
        <p>Home</p>
      </div>
      <KeyboardArrowRightRounded className="text-gray-200" fontSize="small" />
      <div className="text-gray-500">
        <p>{step}</p>
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

export const Popup = (props: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000] backdrop-blur-xs">
      <div className="bg-white py-4 px-10 rounded-md w-3/4">
        {props.children}
      </div>
    </div>
  );
};
