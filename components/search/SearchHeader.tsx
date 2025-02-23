import { FC } from "react";
import { View, Text, Image } from "react-native";

type SearchHeaderProps = {
  query: string;
};

const SearchHeader: FC<SearchHeaderProps> = ({ query }) => {
  return (
    <View className="flex-row justify-between items-start">
      <View className="justify-between items-start mb-6">
        <Text className="font-pmedium text-sm text-gray-100">
          Search results
        </Text>
        <Text className="text-2xl font-psemibold text-white">{query}</Text>
      </View>
    </View>
  );
};

export default SearchHeader;
