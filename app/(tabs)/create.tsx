import { useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { useForm, useWatch } from "react-hook-form";
import { View, Text, ScrollView, Pressable, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@components/customs/FormField";
import icons from "@constants/icons";
import CustomButton from "@components/customs/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useGlobal } from "contexts/GlobalProvider";
import { createVideo } from "lib/appwrite";
import { yupResolver } from "@hookform/resolvers/yup";
import { createValidationSchema } from "validations/createValidations";

type FormCreateType = {
  title: string;
  video?: ImagePicker.ImagePickerAsset;
  thumbnail?: ImagePicker.ImagePickerAsset;
  prompt: string;
};

const defaultValues: FormCreateType = {
  title: "",
  prompt: "",
};

export default function CreatePage() {
  const [uploading, setUploading] = useState(false);
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    reset,
  } = useForm<FormCreateType>({
    defaultValues,
    resolver: yupResolver(createValidationSchema),
    mode: "onChange",
  });
  const { video, thumbnail } = useWatch({ control });
  const { user } = useGlobal();

  const player = useVideoPlayer(video?.uri || "", (player) => {
    player.loop = false;
    // player.play();
  });

  const openPicker = async (type: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === "video" ? ["videos"] : ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      if (type === "video") {
        setValue("video", result.assets[0]);
      } else {
        setValue("thumbnail", result.assets[0]);
      }
    }
  };

  const submit = async (data: FormCreateType) => {
    try {
      setUploading(true);
      console.log(data);

      const newVideo = await createVideo({
        title: data.title,
        video: data.video!,
        thumbnail: data.thumbnail!,
        prompt: data.prompt,
        userId: user?.$id || "",
      });
      reset(defaultValues);
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-3">
        <Text className="text-2xl font-psemibold text-white">Upload Video</Text>
        <FormField
          title="Video Title"
          control={control}
          placeholder="Give your video a nice title"
          name="title"
          otherStyles="mt-6"
          error={errors.title?.message}
        />
        <View className="my-2 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <Pressable onPress={() => openPicker("video")}>
            {video ? (
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
                contentFit="fill"
              />
            ) : (
              <View
                className="w-full rounded-xl px-4 mt-2
               justify-center items-center bg-black-100"
                style={{ height: 200 }}
              >
                <View
                  className="w-14 h-14 border border-dashed border-secondary-100
                justify-center items-center"
                >
                  <Image
                    source={icons.upload}
                    className="w-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </Pressable>
        </View>

        <View className="mt-4 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <Pressable onPress={() => openPicker("image")}>
            {thumbnail ? (
              <Image
                source={thumbnail}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View
                className="w-full h-16 rounded-xl px-4 mt-2
               justify-center items-center bg-black-100
               border-2 border-black-200 flex-row gap-3"
              >
                <Image
                  source={icons.upload}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-gray-100 font-pmedium text-sm">
                  Choose a file
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        <FormField
          title="AI Prompt"
          control={control}
          placeholder="The prompt used with the AI to generate the video"
          name="prompt"
          otherStyles="mt-4"
          error={errors.prompt?.message}
        />

        <CustomButton
          title="Upload Video"
          onPress={handleSubmit((data) => submit(data))}
          containerStyles="mt-3"
          disabled={uploading || !isValid}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
