import * as Yup from "yup";

export const signInValidationSchema: Yup.ObjectSchema<any> = Yup.object().shape(
  {
    email: Yup.string().required(),
    password: Yup.string().required(),
  }
);
