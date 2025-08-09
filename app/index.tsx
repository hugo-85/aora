import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Redirect } from "expo-router";
import { useGlobal } from "contexts/GlobalProvider";
import Welcome from "@components/welcome/Welcome";

export default function index() {
  const { isLoading, isLoggedIn } = useGlobal();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <Welcome />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
