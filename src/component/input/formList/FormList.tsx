import { Formik, FieldArray, Form } from "formik";
import { Add } from "@mui/icons-material";
type FormListProps<T> = {
  name: string;
  initialSchema: T;
  validationSchema: any;
  handleOnSubmit: (data: { [name: string]: T[] }) => void;
  componentForItem: (item: T, index: number) => React.ReactNode;
};
export const FormList = <T,>({
  name,
  initialSchema,
  validationSchema,
  handleOnSubmit,
  componentForItem,
}: FormListProps<T>) => {
  return (
    <Formik
      initialValues={{ [name]: [] }}
      onSubmit={(value, { resetForm }) => {
        handleOnSubmit(value);
        resetForm();
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values }) => (
        <Form onSubmit={handleSubmit}>
          <FieldArray
            name={name}
            render={({ remove, push }) => (
              <div>
                {values[name].map((item: T, index: number) => {
                  return (
                    <div key={index} className="flex gap-2 mb-3">
                      {componentForItem(item, index)}
                      <div className="my-auto">
                        <button
                          onClick={() => remove(index)}
                          className="font-semibold secondary-button px-5 py-2 h-fit mt-auto"
                        >
                          ลบ
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => push(initialSchema)}
                            className="font-semibold primary-button px-6 py-2 flex"
                          >
                            <Add fontSize="small" className="my-auto mr-1" />
                            <p>เพิ่มรายการ</p>
                          </button>
                          {values[name].length > 0 ? (
                            <></>
                          ) : (
                            <button type="submit">Submit</button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          />
        </Form>
      )}
    </Formik>
  );
};
