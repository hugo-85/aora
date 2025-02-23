import { View, Text } from "react-native";
import SearchInput from "@components/customs/SearchInput";
import SearchHeader from "./SearchHeader";
import { FC } from "react";

type SearchListHeaderProps = {
  query: string;
};

const SearchListHeader: FC<SearchListHeaderProps> = ({ query }) => {
  return (
    <View className="my-4 px-4">
      <Text className="font-pmedium text-sm text-gray-100">Search results</Text>
      <Text className="text-2xl font-psemibold text-white">{query}</Text>
      <View className="mt-6 mb-4">
        <SearchInput
          placeholder="Search for a video topic"
          initialQuery={query}
        />
      </View>
    </View>
  );
};

export default SearchListHeader;
