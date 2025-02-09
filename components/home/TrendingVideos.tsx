import { FC, useEffect, useState } from "react";
import {
  Text,
  FlatList,
  Pressable,
  ImageBackground,
  Image,
  ViewToken,
} from "react-native";
import useLatestVideos from "hooks/useLatestVideos";
import * as Animatable from "react-native-animatable";
import { VideoType } from "types/common";
import icons from "@constants/icons";
import { Models } from "react-native-appwrite";

const zoomIn = {
  0: {
    scale: 0.9,
    opacity: 1,
  },
  0.5: {
    scale: 0.95,
    opacity: 1,
  },
  1: {
    scale: 1,
    opacity: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
    opacity: 1,
  },
  0.5: {
    scale: 0.95,
    opacity: 1,
  },
  1: {
    scale: 0.9,
    opacity: 1,
  },
};

type TrendingVideoProps = {
  activeVideo: VideoType | null;
  video: VideoType;
};

const TrendingVideo: FC<TrendingVideoProps> = ({ activeVideo, video }) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeVideo?.$id === video.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        // <Video
        //   source={{ uri: video.video }}
        //   className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
        //   resizeMode={ResizeMode.CONTAIN}
        //   useNativeControls
        //   shouldPlay
        //   onPlaybackStatusUpdate={(status: any) => {
        //     if (status.didJustFinish) {
        //       setPlay(false);
        //     }
        //   }}
        // />
        <Text>algo</Text>
      ) : (
        <Pressable
          onPress={() => setPlay(true)}
          className="relative justify-center items-center active:opacity-70"
        >
          <ImageBackground
            source={{ uri: video.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </Pressable>
      )}
    </Animatable.View>
  );
};

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
    viewableItems: ViewToken<Models.Document>[];
    changed: ViewToken<Models.Document>[];
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
