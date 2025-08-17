import { View, Pressable, Image } from "react-native";
import icons from "@constants/icons";
import { useGlobal } from "@contexts/GlobalProvider";
import InfoBox from "@components/infoBox/InfoBox";
import { FC } from "react";
import { logOut } from "@lib/appwrite";
import { router } from "expo-router";

type ProfileHeaderProps = {
  videosCount: number;
};

const ProfileHeader: FC<ProfileHeaderProps> = ({ videosCount }) => {
  const { user, updateUser, updateIsLoggedIn } = useGlobal();

  const logout = async () => {
    await logOut();
    updateUser(null);
    updateIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <View className="w-full justify-center items-center mt-2 mb-6 px-4">
      <Pressable
        className="w-full items-end mb-6"
        onPress={logout}
        testID="logout-button"
      >
        <Image source={icons.logout} className="w-6 h-6" resizeMode="contain" />
      </Pressable>
      <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
        <Image
          source={{ uri: user?.avatar }}
          className="w-[90%] h-[90%] rounded-lg"
          resizeMode="cover"
          testID="avatar"
        />
      </View>
      <InfoBox
        title={user?.username || ""}
        containerStyles="mt-3"
        titleStyles="text-lg text-white"
      />
      <View className="flex-row mt-1">
        <InfoBox
          title={videosCount.toString()}
          subTitle="Videos"
          containerStyles="mr-10"
          titleStyles="text-xl"
        />
        <InfoBox title={"1.5K"} subTitle="Followers" titleStyles="text-xl" />
      </View>
    </View>
  );
};

export default ProfileHeader;
