import { FC, useState } from "react";
import { View, TextInput, Pressable, Image, Text } from "react-native";
import icons from "@constants/icons";
import { router, usePathname } from "expo-router";

type SearchInputProps = {
  placeholder?: string;
  initialQuery?: string;
};

const SearchInput: FC<SearchInputProps> = ({ placeholder, initialQuery }) => {
  const [value, setValue] = useState(initialQuery || "");
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();

  const handleOnPress = () => {
    if (!value || value.length < 3) return;

    if (pathname.startsWith("/search")) {
      router.setParams({ query: value });
    } else {
      router.push(`/search/${value}`);
    }
  };

  return (
    <View>
      <View
        className={`h-16 px-4 bg-black-100 
            rounded-2xl border-2 ${isFocused ? "border-secondary" : "border-black-200"}
            flex-row items-center gap-3`}
      >
        <TextInput
          className="flex-1 text-white font-pregular text-base mt-0.5"
          placeholder={placeholder}
          placeholderTextColor="#cdcde0"
          value={value}
          onChangeText={(text) => setValue(text)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Pressable onPress={handleOnPress} testID="search-button">
          <Image
            source={icons.search}
            className={`w-6 h-6 ${value === "" || value.length < 3 ? "opacity-10" : "opacity-100"}`}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <View className="mt-1 pl-2">
        <Text className="text-red-800 font-plight">
          {value.length < 3 &&
            value.length > 1 &&
            "Write at least 3 characters"}
        </Text>
      </View>
    </View>
  );
};

export default SearchInput;
