import { Navbar } from "../../component/layout";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATH } from "../../constants/path.route";
const SelectPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mt-20 mx-auto">
        <div
          className="bg-primary/20 rounded-3xl px-8 hover:bg-primary/30 transition w-fit mx-auto flex gap-3 my-10 cursor-pointer"
          onClick={() => navigate(PROTECTED_PATH.DASHBOARD)}
        >
          <img src="/World-bro.svg" className="w-60" />
          <div className="mt-auto mb-9">
            <p className="text-2xl font-bold mt-5 mb-3 text-primary">
              เข้าสู่หน้าหลัก CFP
            </p>
            <p className="w-72 text-sm">
              วัดปริมาณก๊าซเรือนกระจกที่ปล่อยออกมาตลอดวงจรชีวิตของผลิตภัณฑ์
              ตั้งแต่กระบวนการผลิต วัตถุดิบ การขนส่ง การใช้งาน
              ไปจนถึงการกำจัดทิ้ง
            </p>
          </div>
        </div>{" "}
        <div
          className="bg-secondary-500/20 rounded-3xl px-8 hover:bg-secondary-500/30  transition flex mx-auto w-fit gap-3 cursor-pointer"
          onClick={() => navigate(PROTECTED_PATH.CBAM)}
        >
          <img src="/Container ship-rafiki.svg" className="w-60" />
          <div className="mt-auto mb-9">
            <p className="text-2xl font-bold mt-5 mb-3 text-secondary-500">
              เข้าสู่หน้าหลัก CBAM
            </p>
            <p className="w-72 text-sm">
              วางแผนสนับสนุนและสนับสนุนกระบวนการเปลี่ยนแปลง เช่น
              เทคโนโลยีหรือแนวทางการสอนใหม่ ไปใช้ในสถานศึกษา
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPage;
