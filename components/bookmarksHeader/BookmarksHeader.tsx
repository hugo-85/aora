import { View, Text, Image } from "react-native";
import images from "@constants/images";
import { useGlobal } from "contexts/GlobalProvider";

const BookmarksHeader = () => {
  const { user } = useGlobal();
  return (
    <View className="flex-row justify-between items-center px-4 mb-5">
      <Text className="text-2xl font-psemibold text-white">BOOKMARKS</Text>
      <Image
        source={images.logoSmall}
        className="w-9 h-10"
        resizeMode="contain"
      />
    </View>
  );
};

export default BookmarksHeader;
