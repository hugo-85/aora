import { Tabs } from "expo-router";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import icons from "@constants/icons";

export default function TabsLayout() {
  const TabIcon = ({
    icon,
    color,
  }: {
    icon: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
  }) => {
    return (
      <View className="items-center justify-center">
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className="w-6 h-6"
        />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarItemStyle: {
            height: 60,
          },
          tabBarLabel: ({ color, focused }) => (
            <Text
              className={`${focused ? "font-psemibold" : "font-pregular"} flex-1`}
              style={{ color }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          headerShown: false,
          tabBarItemStyle: {
            height: 60,
          },
          tabBarLabel: ({ color, focused }) => (
            <Text
              className={`${focused ? "font-psemibold" : "font-pregular"} flex-1`}
              style={{ color }}
            >
              Bookmarks
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name="Bookmarks"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          tabBarItemStyle: {
            height: 60,
          },
          tabBarLabel: ({ color, focused }) => (
            <Text
              className={`${focused ? "font-psemibold" : "font-pregular"} flex-1`}
              style={{ color }}
            >
              Create
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name="Create"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarItemStyle: {
            height: 60,
          },
          tabBarLabel: ({ color, focused }) => (
            <Text
              className={`${focused ? "font-psemibold" : "font-pregular"} flex-1`}
              style={{ color }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
