import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getAllVideos, getUserVideos } from "lib/appwrite";
import { VideoType } from "types/common";

export default function useVideos(userId?: string) {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideos = async () => {
    setIsLoading(true);

    try {
      const videosResult = userId
        ? await getUserVideos(userId)
        : await getAllVideos();
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

  const refreshVideos = () => {
    setIsLoading(true);
    fetchVideos();
    setIsLoading(false);
  };

  return { videos, isLoading, refreshVideos };
}
