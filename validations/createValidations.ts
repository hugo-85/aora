import * as Yup from "yup";

export const createValidationSchema: Yup.ObjectSchema<any> = Yup.object().shape(
  {
    title: Yup.string().required(),
    video: Yup.object().required(),
    thumbnail: Yup.object().required(),
    prompt: Yup.string().required(),
  }
);
