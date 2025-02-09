import { FC } from "react";
import { Text, Pressable, PressableProps } from "react-native";

interface CustomButtonProps extends PressableProps {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  loading?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  title,
  containerStyles,
  textStyles,
  loading,
  ...props
}) => {
  return (
    <Pressable
      className={`bg-secondary rounded-xl min-h-[62px] 
            justify-center items-center
            active:opacity-50
          ${containerStyles}
          ${loading || props.disabled ? "opacity-50" : ""}
          `}
      disabled={loading || props.disabled}
      {...props}
    >
      <Text className={`text-primary font-pextrabold text-lg ${textStyles}`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
