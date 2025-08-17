import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getLatestVideos } from "@lib/appwrite";
import { VideoType } from "types/common";

export default function useLatestVideos() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideos = async () => {
    setIsLoading(true);

    try {
      const allVideos = await getLatestVideos();
      setVideos(allVideos);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const refreshVideos = () => fetchVideos();

  return { videos, isLoading, refreshVideos };
}
