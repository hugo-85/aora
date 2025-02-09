import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@constants/images";
import { useForm } from "react-hook-form";
import FormField from "@components/customs/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInValidationSchema } from "./signInValidations";
import CustomButton from "@components/customs/CustomButton";
import { useState } from "react";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "lib/appwrite";
import { useGlobal } from "contexts/GlobalProvider";

export type FormSignType = {
  email: string;
  password: string;
};

const defaultValues: FormSignType = {
  email: "",
  password: "",
};

export default function SignInPage() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSignType>({
    defaultValues,
    resolver: yupResolver(signInValidationSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateIsLoggedIn, updateUser } = useGlobal();

  const submit = async (data: FormSignType) => {
    setIsSubmitting(true);

    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
      const currentUser = await getCurrentUser();
      updateUser(currentUser);
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
        <View className="w-full justify-center px-4 my-6 min-h-[85vh] gap-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-psemibold mt-10 ">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            name="email"
            control={control}
            error={errors?.email?.message}
          />
          <FormField
            title="Password"
            name="password"
            control={control}
            error={errors?.password?.message}
          />

          <CustomButton
            title="Sign In"
            containerStyles="mt-7"
            loading={isSubmitting}
            onPress={handleSubmit((data) => submit(data))}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg text-secondary-200 font-psemibold"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
