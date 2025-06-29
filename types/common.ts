import { Models } from "react-native-appwrite";

export interface VideoType extends Models.Document {
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  deleted: boolean;
}

export interface UserType extends Models.Document {
  accountId: string;
  avatar: string;
  email: string;
  username: string;
}

export interface UserLikesType extends Models.Document {
  videoId: string;
  userId: string;
}
