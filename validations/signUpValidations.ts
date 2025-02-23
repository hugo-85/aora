import * as Yup from "yup";

export const signUpValidationSchema: Yup.ObjectSchema<any> = Yup.object().shape(
  {
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  }
);
