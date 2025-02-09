import { getAllVideos } from "lib/appwrite";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

export default function useVideos(userId?: string) {
  const [videos, setVideos] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideos = async () => {
    setIsLoading(true);

    try {
      const allVideos = await getAllVideos();
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
