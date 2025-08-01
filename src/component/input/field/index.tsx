import { useField, useFormikContext } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type RadioOption = {
  label: string;
  value: string;
  color: string;
};

type RadioFieldProps = {
  name: string;
  label: string;
  options: RadioOption[];
  row?: boolean;
};
export const RadioField = ({
  name,
  label,
  options,
  row = false,
}: RadioFieldProps) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl
      fullWidth
      component="fieldset"
      error={meta.touched && Boolean(meta.error)}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row={row}
        name={field.name}
        value={field.value}
        onChange={(e) => {
          helpers.setValue(e.target.value);
        }}
      >
        {options.map((option, key) => (
          <div
            key={key}
            className="border-2 rounded-full px-3 mr-2"
            style={{ color: option.color }}
          >
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={
                <Radio
                  size="small"
                  sx={{
                    color: option.color,
                    "&.Mui-checked": {
                      color: option.color,
                    },
                    height: "25px",
                    width: "25px",
                    marginLeft: "5px",
                  }}
                />
              }
              label={option.label}
            />
          </div>
        ))}
      </RadioGroup>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

type FieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "password";
  require?: boolean;
};

const Field = ({
  name,
  label,
  placeholder,
  type = "text",
  require = false,
}: FieldProps) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      margin="dense"
      type={type}
      fullWidth
      variant="outlined"
      size="small"
      label={label}
      placeholder={placeholder}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      {...field}
      required={require}
    />
  );
};

type AutoCompleteItem = {
  value: any;
  label: string;
};

type AutoCompleteProps = {
  label: string;
  items: AutoCompleteItem[];
  name: string;
  placeholder?: string;
  type?: "primary" | "secondary";
};

const AutoCompleteField = ({
  label,
  items,
  name,
  placeholder,
}: AutoCompleteProps) => {
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;
  const selectedOption =
    items.find((item) => item.value === field.value) || null;
  return (
    <Autocomplete
      fullWidth
      options={items}
      getOptionLabel={(option) => option.label}
      onBlur={() => setTouched(true)}
      onChange={(_: any, newValue: AutoCompleteItem | null) => {
        setValue(newValue?.value);
      }}
      value={selectedOption}
      renderOption={(props, option, { index }) => (
        <li
          {...props}
          key={index}
          style={{
            backgroundColor: index % 2 === 0 ? "white" : "#f7f7f7",
          }}
        >
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="dense"
          label={label}
          placeholder={placeholder}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          variant="outlined"
          size="small"
        />
      )}
    />
  );
};

type DatePickerFieldProps = {
  label: string;
  items: AutoCompleteItem[];
  name: string;
  placeholder?: string;
};
export const DatePickerField = ({
  label,
  name,
  placeholder,
}: DatePickerFieldProps) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField(name);

  return (
    <div className="my-2">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={field.value ? dayjs(field.value) : null}
          onChange={(date: Dayjs | null) => {
            setFieldValue(name, date ? date.toISOString() : "");
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              placeholder: placeholder,
              error: meta.touched && Boolean(meta.error),
              helperText: meta.touched && meta.error,
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};
type CheckboxFieldProps = {
  name: string;
  label: string;
  require?: boolean;
};
export const CheckboxField = ({
  name,
  label,
  require = false,
}: CheckboxFieldProps) => {
  const [field, meta, helpers] = useField({ name, type: "checkbox" });

  return (
    <FormControl error={meta.touched && Boolean(meta.error)} required={require}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={field.value}
              onChange={(e) => helpers.setValue(e.target.checked)}
            />
          }
          label={label}
        />
      </FormGroup>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};
export { Field, AutoCompleteField };
