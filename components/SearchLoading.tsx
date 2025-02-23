import { Image, Text } from "react-native";
import images from "@constants/images";
import * as Animatable from "react-native-animatable";

const zoom = {
  0: {
    scale: 0.5,
    opacity: 1,
  },
  0.5: {
    scale: 0.7,
    opacity: 1,
  },
  1: {
    scale: 1.3,
    opacity: 1,
  },
};

export default function SearchLoading() {
  return (
    <>
      <Animatable.View
        className="justify-center items-center px-4"
        animation={zoom}
        duration={1000}
        direction="alternate"
        iterationCount="infinite"
      >
        <Image
          source={images.empty}
          className="w-56 h-56"
          resizeMode="contain"
        />
      </Animatable.View>
      <Text className="text-3xl font-psemibold text-yellow-700 tracking-[8px]">
        Searching
      </Text>
    </>
  );
}
