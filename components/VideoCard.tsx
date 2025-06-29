import { FC, useEffect, useState } from "react";
import { View, Text, Image, Pressable, Alert } from "react-native";
import { VideoType } from "types/common";
import icons from "@constants/icons";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  checkVideoIsLiked,
  deleteVideo,
  likeVideo,
  unlikeVideo,
} from "lib/appwrite";
import { useGlobal } from "contexts/GlobalProvider";

type VideoCardMenuProps = {
  videoId: string;
  refreshVideos: () => void;
};

const VideoCardMenu: FC<VideoCardMenuProps> = ({ videoId, refreshVideos }) => {
  const handleDelete = async () => {
    try {
      await deleteVideo(videoId);
      Alert.alert("Success", "Video deleted successfully");
      refreshVideos(); //mirar no se actualiza la lista de videos, quizas deba usar el refreshCallback
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <Menu>
      <MenuTrigger>
        <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: "#1c1c1e",
            borderRadius: 10,
            padding: 10,
            marginTop: 25,
            width: 120,
            alignItems: "flex-start",
          },
        }}
      >
        <MenuOption onSelect={handleDelete}>
          <View className="flex-row gap-2 items-center">
            <AntDesign name="delete" size={18} color="white" />
            <Text className="text-white font-psemibold text-sm">Delete</Text>
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

type VideoCardProps = {
  video: VideoType;
  refreshVideos: () => void;
  refreshCallback?: () => void;
};

const VideoCard: FC<VideoCardProps> = ({
  video,
  refreshVideos,
  refreshCallback,
}) => {
  const {
    $id,
    title,
    thumbnail,
    video: videoUrl,
    creator: { username, avatar },
  } = video;
  const { user } = useGlobal();
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer({ uri: videoUrl }, (player) => {
    player.loop = false;
    // player.play();
  });
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });
  const [isLiked, setIsLiked] = useState(false);
  // const { refreshVideos } = useVideos();

  useEffect(() => {
    const checkIsLiked = async () => {
      if (!user) return;
      const isLiked = await checkVideoIsLiked(user?.$id, $id);

      setIsLiked(isLiked);
    };

    checkIsLiked();
  }, [video]);

  const handleOnPress = () => {
    if (isPlaying) {
      setPlay(false);
      player.pause();
    } else {
      setPlay(true);
      player.play();
    }
  };

  const handleOnPressLike = async () => {
    try {
      if (!isLiked) await likeVideo(user?.$id as string, $id);
      else await unlikeVideo(user?.$id as string, $id);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }

    setIsLiked(!isLiked);

    if (refreshCallback) refreshCallback();
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
            <View className="flex-row gap-2 items-center">
              <Text
                className="text-white font-psemibold text-sm"
                numberOfLines={1}
              >
                {title}
              </Text>
              <Pressable onPress={handleOnPressLike}>
                {isLiked && (
                  <Ionicons name="bookmark" size={18} color="#ff9500" />
                )}
                {!isLiked && (
                  <Ionicons name="bookmark-outline" size={18} color="white" />
                )}
              </Pressable>
            </View>
            <Text className="text-xs text-gray-100 font-pregular">
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <VideoCardMenu videoId={video.$id} refreshVideos={refreshVideos} />
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
