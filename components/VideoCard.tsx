import { FC, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { VideoType } from "types/common";
import icons from "@constants/icons";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

type VideoCardProps = {
  video: VideoType;
};

const VideoCard: FC<VideoCardProps> = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer({ uri: video }, (player) => {
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
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p.0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular">
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <View className="w-full h-60 max-h-60 rounded-xl mt-3 relative justify-center items-center">
          <VideoView
            style={{
              width: 400,
              maxWidth: "100%",
              height: 200,
              borderRadius: 15,
            }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            nativeControls
            contentFit="fill"
          />
        </View>
      ) : (
        <Pressable
          onPress={handleOnPress}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center
          active:opacity-40"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-16 h-16 absolute"
            resizeMode="contain"
          />
        </Pressable>
      )}
    </View>
  );
};

export default VideoCard;
