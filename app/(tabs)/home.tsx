import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyVideos from "@components/EmptyVideos";
import useVideos from "hooks/useVideos";
import HomeListHeader from "@components/home/HomeListHeader";
import VideoCard from "@components/VideoCard";

export default function HomePage() {
  const { isLoading, videos, refreshVideos } = useVideos();

  const onRefresh = async () => {
    await refreshVideos();
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={<HomeListHeader />}
        ListEmptyComponent={() => (
          <EmptyVideos
            title="No Videos Found"
            subTitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
