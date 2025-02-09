import { FC } from "react";

import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MainProps {}

const Main: FC<MainProps> = () => {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View
      className="bg-blue-500 flex-1"
      style={{
        paddingTop: top,
        paddingBottom: bottom,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        <Text className="font-black">
          Open up App.tsx to start working on your app!!
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Main;
