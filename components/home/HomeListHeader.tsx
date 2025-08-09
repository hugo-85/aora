import { View, Text } from "react-native";
import SearchInput from "@components/customs/SearchInput";
import TrendingVideos from "@components/home/TrendingVideos";
import UserHeader from "@components/userHeader/UserHeader";

const HomeListHeader = () => {
  return (
    <View className="my-6 px-4 space-y-2">
      <UserHeader />

      <SearchInput placeholder="Search for a video topic" />

      <View className="w-full flex-1 pt-5 pb-8">
        <Text className="text-gray-100 text-lg font-pregular mb-3">
          Latest Videos
        </Text>
        <TrendingVideos />
      </View>
    </View>
  );
};

export default HomeListHeader;
