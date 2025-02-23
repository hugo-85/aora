import { FlatList, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useSearch from "hooks/useSearch";
import { useEffect } from "react";
import EmptyVideos from "@components/EmptyVideos";
import VideoCard from "@components/VideoCard";
import SearchListHeader from "@components/search/SearchListHeader";
import SearchLoading from "@components/SearchLoading";

export default function SearchPage() {
  const { query } = useLocalSearchParams();
  const stringQuery = typeof query === "string" ? query : "";
  const { videos, isLoading, refreshVideos } = useSearch(stringQuery);

  useEffect(() => {
    // Refresh videos when query changes
    refreshVideos();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      {isLoading ? (
        <View>
          <SearchListHeader query={stringQuery} />
          <View className="flex-start justify-center items-center mt-10">
            <SearchLoading />
          </View>
        </View>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={<SearchListHeader query={stringQuery} />}
          ListEmptyComponent={() => (
            <EmptyVideos
              title="No Videos Found"
              subTitle="No videos found for the search query"
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
