import { FC, useState } from "react";
import { Pressable, ImageBackground, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { VideoType } from "types/common";
import icons from "@constants/icons";
import { Models } from "react-native-appwrite";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

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
  const player = useVideoPlayer(video.video, (player) => {
    player.loop = false;
    // player.play();
  });
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handleOnPress = () => {
    if (isPlaying) {
      setPlay(false);
      player.pause();
    } else {
      setPlay(true);
      player.play();
    }
  };

  return (
    <Animatable.View
      className="mr-5"
      animation={activeVideo?.$id === video.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <VideoView
          style={{
            width: 200,
            height: 300,
            marginTop: 3,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 35,
          }}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          nativeControls
          contentFit="contain"
        />
      ) : (
        <Pressable
          onPress={handleOnPress}
          className="relative justify-center items-center active:opacity-70"
        >
          <ImageBackground
            source={{ uri: video.thumbnail }}
            className="overflow-hidden shadow-lg shadow-black/40"
            style={{
              width: 200,
              height: 300,
              borderRadius: 35,
              marginTop: 3,
            }}
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

export default TrendingVideo;
