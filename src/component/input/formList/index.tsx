import { Formik, Form } from "formik";
type FormProps<T> = {
  children: React.ReactNode;
  initialSchema: any;
  validationSchema: any;
  handleOnSubmit: (data: T) => void;
};

export const RenderForm = <T,>(props: FormProps<T>) => {
  return (
    <Formik
      initialValues={props.initialSchema}
      onSubmit={(data, { resetForm }) => {
        props.handleOnSubmit(data);
        resetForm();
      }}
      validationSchema={props.validationSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>{props.children}</Form>
      )}
    </Formik>
  );
};
