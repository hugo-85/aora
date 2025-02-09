import { View, Text, Image } from "react-native";
import images from "@constants/images";
import SearchInput from "@components/customs/SearchInput";
import TrendingVideos from "@components/home/TrendingVideos";
import { VideoType } from "types/common";

type HomeListHeaderProps = {
  videos: VideoType[];
};

const HomeListHeader = () => {
  return (
    <View className="my-6 px-4 space-y-2">
      <View className="flex-row justify-between items-start">
        <View className="justify-between items-start mb-6">
          <Text className="font-pmedium text-sm text-gray-100">
            Welcome back
          </Text>
          <Text className="text-2xl font-psemibold text-white">Mario</Text>
        </View>
        <View>
          <Image
            source={images.logoSmall}
            className="w-9 h-10"
            resizeMode="contain"
          />
        </View>
      </View>

      <SearchInput placeholder="Search for a video topic" />

      <View className="w-full flex-1 pt-5 pb-8">
        <Text className="text-gray-100 text-lg font-pregular mb-3">
          Latest Videos
        </Text>
        <TrendingVideos posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
      </View>
    </View>
  );
};

export default HomeListHeader;
