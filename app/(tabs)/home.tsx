import { useEffect } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyVideos from "@components/EmptyVideos";
import useVideos from "hooks/useVideos";
import HomeListHeader from "@components/home/HomeListHeader";
import VideoCard from "@components/VideoCard";
import {
  notifyObservers,
  NotifyObserversType,
  subscribe,
  unsubscribe,
} from "lib/observable";

export default function HomePage() {
  const { isLoading, videos, refreshVideos, loadMoreVideos, hasMore } =
    useVideos();

  const onRefresh = async () => {
    await refreshVideos();
  };

  const refreshHome = async ({ key, paths }: NotifyObserversType) => {
    if (key !== "REFRESH" || !paths?.includes("HOME")) return;

    await refreshVideos();
  };

  useEffect(() => {
    subscribe(refreshHome);

    return () => {
      unsubscribe(refreshHome);
    };
  }, []);

  const sendRefresh = async () => {
    notifyObservers({
      key: "REFRESH",
      paths: ["BOOKMARKS"],
    });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            refreshCallback={sendRefresh}
            refreshVideos={refreshVideos}
          />
        )}
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
        onEndReached={() => {
          if (hasMore && !isLoading) loadMoreVideos();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasMore && isLoading ? <ActivityIndicator size="large" /> : null
        }
      />
    </SafeAreaView>
  );
}
