import { View, Text, Image } from "react-native";
import images from "@constants/images";
import { useGlobal } from "@contexts/GlobalProvider";

const UserHeader = () => {
  const { user } = useGlobal();
  return (
    <View className="flex-row justify-between items-start">
      <View className="justify-between items-start mb-6">
        <Text className="font-pmedium text-sm text-gray-100">Welcome back</Text>
        <Text className="text-2xl font-psemibold text-white">
          {user?.username || ""}
        </Text>
      </View>
      <View>
        <Image
          source={images.logoSmall}
          className="w-9 h-10"
          resizeMode="contain"
          testID="avatar"
        />
      </View>
    </View>
  );
};

export default UserHeader;
