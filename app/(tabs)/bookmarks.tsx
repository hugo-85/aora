import { useEffect } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import EmptyBookmarks from "@components/EmptyBookmarks";
import VideoCard from "@components/VideoCard";
import { useGlobal } from "contexts/GlobalProvider";
import useBookmarks from "hooks/useBookmarks";
import {
  notifyObservers,
  NotifyObserversType,
  subscribe,
  unsubscribe,
} from "lib/observable";
import { SafeAreaView } from "react-native-safe-area-context";
import BookmarksHeader from "@components/BookmarksHeader";
import SearchLoading from "@components/SearchLoading";

export default function BookmarksPage() {
  const { user } = useGlobal();
  const { videos, isLoading, refreshBookmarks } = useBookmarks(
    user?.$id as string
  );

  const refreshBookmarksHandler = async ({
    key,
    paths,
  }: NotifyObserversType) => {
    if (key !== "REFRESH" || !paths?.includes("BOOKMARKS")) return;

    await refreshBookmarks();
  };

  useEffect(() => {
    notifyObservers({
      key: "REFRESH",
      paths: ["BOOKMARKS"],
    });
    subscribe(refreshBookmarksHandler);

    return () => {
      unsubscribe(refreshBookmarksHandler);
    };
  }, []);

  const onRefresh = async () => {
    await refreshBookmarks();
  };

  const sendRefresh = async () => {
    notifyObservers({
      key: "REFRESH",
      paths: ["HOME"],
    });

    await refreshBookmarks();
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {isLoading ? (
        <View>
          <View className="flex-start justify-center items-center mt-10">
            <SearchLoading />
          </View>
        </View>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <VideoCard
              video={item}
              refreshCallback={sendRefresh}
              refreshVideos={refreshBookmarks}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyBookmarks
              title="No Videos Found"
              subTitle="Go to explore and find awesome videos"
            />
          )}
          ListHeaderComponent={() => <BookmarksHeader />}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}
