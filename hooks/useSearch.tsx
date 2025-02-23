import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { searchVideos } from "lib/appwrite";
import { VideoType } from "types/common";

export default function useSearch(query: string) {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideos = async () => {
    setIsLoading(true);

    try {
      const searchResults = await searchVideos(query);
      setVideos(searchResults);
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
