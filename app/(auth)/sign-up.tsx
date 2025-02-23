import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@constants/images";
import { useForm } from "react-hook-form";
import FormField from "@components/customs/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpValidationSchema } from "../../validations/signUpValidations";
import CustomButton from "@components/customs/CustomButton";
import { useState } from "react";
import { Link, router } from "expo-router";
import { createUser } from "lib/appwrite";
import { useGlobal } from "contexts/GlobalProvider";

export type FormSignType = {
  username: string;
  email: string;
  password: string;
};

const defaultValues: FormSignType = {
  username: "",
  email: "",
  password: "",
};

export default function SignUpPage() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSignType>({
    defaultValues,
    resolver: yupResolver(signUpValidationSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUser, updateIsLoggedIn } = useGlobal();

  const submit = async (data: FormSignType) => {
    setIsSubmitting(true);

    try {
      const newUser = await createUser({
        email: data.email,
        password: data.password,
        username: data.username,
      });
      updateUser(newUser);
      updateIsLoggedIn(true);

      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center px-4 my-6 min-h-[85vh] gap-2">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-psemibold mt-10 ">
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            name="username"
            control={control}
            error={errors.username?.message}
          />
          <FormField
            title="Email"
            name="email"
            control={control}
            error={errors.email?.message}
          />
          <FormField
            title="Password"
            name="password"
            control={control}
            error={errors.password?.message}
          />

          <CustomButton
            title="Sign Up"
            containerStyles="mt-7"
            disabled={Object.keys(errors).length > 0}
            loading={isSubmitting}
            onPress={handleSubmit((data) => submit(data))}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg text-secondary-200 font-psemibold"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
