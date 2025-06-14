import { getLikedVideos } from "lib/appwrite";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { VideoType } from "types/common";

export default function useBookmarks(userId: string) {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideos = async () => {
    setIsLoading(true);

    try {
      const videosResult = await getLikedVideos(userId);
      setVideos(videosResult);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const refreshBookmarks = () => fetchVideos();

  return { videos, isLoading, refreshBookmarks };
}
