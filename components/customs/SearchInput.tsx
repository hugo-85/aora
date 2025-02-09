import { FC, useState } from "react";
import { View, TextInput, Pressable, Image } from "react-native";
import icons from "@constants/icons";

type SearchInputProps = {
  placeholder?: string;
};

const SearchInput: FC<SearchInputProps> = ({ placeholder }) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`h-16 px-4 bg-black-100 
            rounded-2xl border-2 ${isFocused ? "border-secondary" : "border-black-200"}
            flex-row items-center gap-3`}
    >
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        value={value}
        onChangeText={(text) => setValue(text)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Pressable>
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </Pressable>
    </View>
  );
};

export default SearchInput;
