import { Image, ScrollView, Text, View } from "react-native";

import images from "@constants/images";
import CustomButton from "@components/customs/CustomButton";
import { router } from "expo-router";

export default function Welcome() {
  return (
    <ScrollView
      contentContainerStyle={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <View className="w-full items-center justify-center px-4">
        <Image
          source={images.logo}
          resizeMode="contain"
          className="w-[130px] h-[84px]"
        />
        <Image
          source={images.cards}
          resizeMode="contain"
          className="max-w-[340px] w-full h-[340px]"
        />
      </View>
      <View className="relative mt-5 justify-center items-center">
        <Text className="text-3xl text-white font-bold text-center">
          Discover Endless
        </Text>
        <Text className="text-3xl text-white font-bold text-center">
          Possibilities with{" "}
        </Text>
        <Text className="text-secondary-200 text-5xl font-bold">Aora</Text>
        <Image
          source={images.path}
          className="w-[100px] h-[15px] absolute -bottom-1 -right-50"
        />
      </View>
      <Text className="text-sm font-pregular text-gray-100 text-center mt-5">
        Where creativity meets innovation: embark on a journey of limitless
        exploration with Aora.
      </Text>
      <CustomButton
        title="Continue with email"
        containerStyles="p-4 w-full mt-7"
        onPress={() => {
          router.push("sign-in");
        }}
      />
    </ScrollView>
  );
}
