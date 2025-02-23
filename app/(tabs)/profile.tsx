import EmptyVideos from "@components/EmptyVideos";
import ProfileHeader from "@components/profile/ProfileHeader";
import SearchLoading from "@components/SearchLoading";
import VideoCard from "@components/VideoCard";
import { useGlobal } from "contexts/GlobalProvider";
import useVideos from "hooks/useVideos";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilePage() {
  const { user } = useGlobal();
  const { isLoading, videos, refreshVideos } = useVideos(user?.$id);

  const onRefresh = async () => {
    await refreshVideos();
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {isLoading ? (
        <View>
          <ProfileHeader videosCount={videos?.length || 0} />
          <View className="flex-start justify-center items-center mt-10">
            <SearchLoading />
          </View>
        </View>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={
            <ProfileHeader videosCount={videos?.length || 0} />
          }
          ListEmptyComponent={() => (
            <EmptyVideos
              title="No Videos Found"
              subTitle="No videos found for the search query"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}
