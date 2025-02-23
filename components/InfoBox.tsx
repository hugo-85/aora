import React, { FC } from "react";
import { View, Text } from "react-native";

type InfoBoxProps = {
  title: string;
  subTitle?: string;
  containerStyles?: string;
  titleStyles?: string;
};

const InfoBox: FC<InfoBoxProps> = ({
  title,
  containerStyles,
  titleStyles,
  subTitle,
}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subTitle}
      </Text>
    </View>
  );
};

export default InfoBox;
