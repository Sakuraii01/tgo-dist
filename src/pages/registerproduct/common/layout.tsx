export type FR04LayoutProps = {
  isB2B: boolean;
  children?: React.ReactNode;
  tabIndex: number;
  handleTabChange: (value: number) => void;
};

export const FR04Layout = (props: FR04LayoutProps) => {
  const subMethod = props.isB2B
    ? ["การได้มาของวัตถุดิบ", "การผลิต"]
    : [
        "การได้มาของวัตถุดิบ",
        "การผลิต",
        "การกระจายสินค้า",
        "การใช้งาน",
        "การจัดการซาก",
      ];
  return (
    <div className="max-w-7xl mx-auto">
      <div className="border-b border-gray-50 mb-3">
        <div className="w-fit mx-auto"></div>
      </div>{" "}
      <div className="flex">
        {" "}
        <div className="w-1/4">
          <ul className="flex flex-col gap-2 fixed">
            {subMethod.map((data, index) => (
              <li
                onClick={() => props.handleTabChange(index + 1)}
                key={index}
                className={`transition flex items-center gap-2 px-4 py-3 border-y border-primary-2/10  ${
                  index + 1 === props.tabIndex
                    ? "bg-white hover:bg-gray-100"
                    : "bg-stroke hover:bg-gray-400"
                }`}
              >
                <div
                  className={`rounded-full ${
                    index + 1 === props.tabIndex
                      ? "bg-primary/10 border border-primary text-primary"
                      : "border-2 border-gray-300 text-gray-300"
                  }  font-semibold text-sm w-8 h-8 mr-4 flex items-center justify-center`}
                >
                  {index + 1}
                </div>
                <p
                  className={`${
                    index + 1 === props.tabIndex
                      ? "text-primary"
                      : "text-gray-300"
                  } font-medium`}
                >
                  {data}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 px-4 mx-auto">
          {props.tabIndex !== 1 && props.tabIndex !== 2 && (
            <div className="px-4 mt-3 pb-3 mb-3 border-b border-stroke">
              <button className="text-white bg-primary-2 rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-2">
                + เพิ่มรายการ
              </button>
            </div>
          )}

          {props.children}
        </div>
      </div>
    </div>
  );
};
