import { FC, useState } from "react";
import { Control, useController } from "react-hook-form";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import icons from "@constants/icons";

type FormFieldProps = {
  title: string;
  name: string;
  control: Control<any, any>;
  otherStyles?: string;
  placeholder?: string;
  error?: string;
};

const FormField: FC<FormFieldProps> = ({
  control,
  name,
  title,
  placeholder,
  otherStyles,
  error,
}) => {
  const { field } = useController({ control, defaultValue: "", name });
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${otherStyles}`}>
      <Text className="text-lg text-gray-100 font-pmedium mb-1">{title}</Text>
      <View
        className={`h-16 px-4 bg-black-100 
            rounded-2xl border-2 ${isFocused ? "border-secondary" : "border-black-200"}
            flex-row items-center gap-3 ${error ? "border-red-500" : ""}`}
      >
        <TextInput
          className="flex-1 text-white font-semibold text-base"
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          keyboardType={name === "email" ? "email-address" : "default"}
          value={field.value}
          onChangeText={field.onChange}
          secureTextEntry={name === "password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {name === "password" && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            testID="toggle-password-visibility"
          >
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </Pressable>
        )}
      </View>
      <View className="h-6 mt-1 pl-3">
        {error && <Text className="text-red-500 text-sm">{error}</Text>}
      </View>
    </View>
  );
};

export default FormField;
