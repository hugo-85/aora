import { FC } from "react";
import { View, Text, Image } from "react-native";
import images from "@constants/images";
import CustomButton from "./customs/CustomButton";
import { router } from "expo-router";

type EmptyBookmarksProps = {
  title: string;
  subTitle: string;
};

const EmptyBookmarks: FC<EmptyBookmarksProps> = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-56 h-56" resizeMode="contain" />
      <Text className="text-2xl font-psemibold text-white">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>
    </View>
  );
};

export default EmptyBookmarks;
