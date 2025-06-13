import * as React from "react";
import { Add } from "@mui/icons-material";
import {
  TextField,
  Radio,
  RadioGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [itemNum, setItemNum] = React.useState(1);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddItem = () => {
    setItemNum((prev) => prev + 1);
  };

  const handleDelItem = () => {
    setItemNum((prev) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <React.Fragment>
      <button
        onClick={handleClickOpen}
        className={`text-white bg-primary-2 rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-2 
                    transition-colors hover:bg-primary-2/80`}
      >
        <p>+ เพิ่มรายการ</p>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          <p className="text-center">{"เพิ่มข้อมูล"}</p>
        </DialogTitle>
        <DialogContent>
          {new Array(itemNum).fill(null).map((_, index) => (
            <FR03AddData
              key={index}
              item={itemNum}
              addItem={handleAddItem}
              delItem={handleDelItem}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <div className="flex gap-4 justify-center w-full my-5">
            <button
              onClick={handleClose}
              className="font-semibold secondary-button px-4 py-2"
            >
              <p> ยกเลิก</p>
            </button>
            <button
              onClick={handleClose}
              className="font-semibold primary-button px-6 py-2"
            >
              <p>ยืนยัน</p>
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function CustomRadioGroup() {
  const [value, setValue] = React.useState("สารขาเข้า");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: value === item,
    onChange: handleChange,
    value: item,
    name: "custom-radio-group",
    inputProps: { "aria-label": item },
    id: `radio-${item}`,
  });

  return (
    <RadioGroup row value={value} onChange={handleChange}>
      {/* สารขาเข้า */}
      <label htmlFor="radio-สารขาเข้า" className="cursor-pointer h-fit">
        <Radio {...controlProps("สารขาเข้า")} className="invisible" />
        <div
          className={`mr-4 flex gap-2 items-center ${
            value === "สารขาเข้า"
              ? "border-2 font-semibold text-success"
              : "border"
          } border-success rounded-full px-4 py-1 bg-success/10`}
        >
          <div className="bg-gradient-to-tl from-[#42A12C] to-[#87AD0A] w-3 h-3 rounded-full" />
          <p>สารขาเข้า</p>
        </div>
      </label>

      {/* ผลิตภัณฑ์ระหว่างทาง */}
      <label htmlFor="radio-ผลิตภัณฑ์ระหว่างทาง" className="cursor-pointer">
        <Radio {...controlProps("ผลิตภัณฑ์ระหว่างทาง")} className="invisible" />
        <div
          className={`mr-4 flex gap-2 items-center ${
            value === "ผลิตภัณฑ์ระหว่างทาง"
              ? "border-2 font-semibold text-warn"
              : "border"
          } border-warn rounded-full px-4 py-1 bg-warn/10`}
        >
          <div className="bg-gradient-to-tl from-[#EA800E] to-[#FAB431] w-3 h-3 rounded-full" />
          <p>ผลิตภัณฑ์ระหว่างทาง</p>
        </div>
      </label>

      {/* ของเสีย/สารขาออก */}
      <label htmlFor="radio-ของเสีย/สารขาออก" className="cursor-pointer">
        <Radio {...controlProps("ของเสีย/สารขาออก")} className="invisible" />
        <div
          className={`mr-4 flex gap-2 items-center ${
            value === "ของเสีย/สารขาออก"
              ? "border-2 font-semibold text-error"
              : "border"
          } border-error rounded-full px-4 py-1 bg-error/10`}
        >
          <div className="bg-gradient-to-tl from-[#C01515] to-[#EE5F5F] w-3 h-3 rounded-full" />
          <p>ของเสีย/สารขาออก</p>
        </div>
      </label>
    </RadioGroup>
  );
}
type AddDataType = {
  item: number;
  key: number;
  addItem: () => void;
  delItem: () => void;
};
const FR03AddData = (props: AddDataType) => {
  return (
    <div key={props.key}>
      <div>
        <CustomRadioGroup />
      </div>
      <div className="my-5 flex gap-5">
        <TextField
          name="itemName"
          label="ชื่อรายการ"
          className="w-96"
          size="small"
        />
        <TextField
          name="materialType"
          label="ประเภท"
          className="w-40"
          size="small"
        />
        <TextField name="unit" label="หน่วย" className="w-40" size="small" />
        <TextField name="amount" label="ปริมาณ" className="w-40" size="small" />
        {props.item > 1 && (
          <button
            onClick={props.delItem}
            className="font-semibold secondary-button px-4 py-2"
          >
            ลบ
          </button>
        )}
      </div>
      <div className="w-fit ml-auto">
        <button
          onClick={props.addItem}
          className="font-semibold primary-button px-6 py-2 flex"
        >
          <Add fontSize="small" className="my-auto mr-1" />
          <p>เพิ่มรายการ</p>
        </button>
      </div>
    </div>
  );
};
