import { FC, useEffect, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import useLatestVideos from "hooks/useLatestVideos";
import { VideoType } from "types/common";
import TrendingVideo from "./TrendingVideo";

type TrendingVideosProps = {};

const TrendingVideos: FC<TrendingVideosProps> = () => {
  const { videos, isLoading } = useLatestVideos();
  const [activeVideo, setActiveVideo] = useState<VideoType | null>(null);

  useEffect(() => {
    if (!isLoading && videos.length > 1) setActiveVideo(videos[1]);
  }, [videos, isLoading]);

  if (isLoading || videos.length === 0) {
    return null;
  }

  const handleViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<VideoType>[];
    changed: ViewToken<VideoType>[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveVideo(viewableItems[0].item);
    }
  };

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingVideo activeVideo={activeVideo} video={item} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 90,
      }}
      contentOffset={{ x: 20, y: 0 }}
    />
  );
};

export default TrendingVideos;
