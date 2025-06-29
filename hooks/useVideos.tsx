import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getAllVideos, getUserVideos } from "lib/appwrite";
import { VideoType } from "types/common";

export default function useVideos(userId?: string) {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchVideos = async () => {
    setIsLoading(true);

    try {
      const videosResult = userId
        ? await getUserVideos(userId)
        : await getAllVideos(page, 5);
      setVideos(videosResult);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page === 0) fetchVideos();
  }, [page]);

  const loadMoreVideos = async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    try {
      const newVideos = userId
        ? await getUserVideos(userId)
        : await getAllVideos(page + 1, 5);
      console.log({ count: newVideos.length, page: page + 1 });
      if (newVideos.length < 5) {
        setHasMore(false);
      }
      setVideos((prevVideos) => [...prevVideos, ...newVideos]);

      setPage((prevPage) => prevPage + 1);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshVideos = () => {
    setIsLoading(true);
    setVideos([]);
    setPage(0);
    setHasMore(true);
    setIsLoading(false);
  };

  return { videos, isLoading, refreshVideos, loadMoreVideos, hasMore };
}
