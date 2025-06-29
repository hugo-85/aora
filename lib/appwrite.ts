import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Models,
  Query,
  Storage,
} from "react-native-appwrite";
import {
  REACT_APP_APPWRITE_ENDPOINT,
  REACT_APP_APPWRITE_PLATFORM,
  REACT_APP_APPWRITE_PROJECT_ID,
  REACT_APP_APPWRITE_DATABASE_ID,
  REACT_APP_APPWRITE_USER_COLLECTION_ID,
  REACT_APP_APPWRITE_VIDEO_COLLECTION_ID,
  REACT_APP_APPWRITE_LIKES_COLLECTION_ID,
  REACT_APP_APPWRITE_STORAGE_ID,
} from "@env";
import { UserLikesType, UserType, VideoType } from "types/common";
import { ImagePickerAsset } from "expo-image-picker";

const endpoint = REACT_APP_APPWRITE_ENDPOINT;
const platform = REACT_APP_APPWRITE_PLATFORM;
const projectId = REACT_APP_APPWRITE_PROJECT_ID;
const databaseId = REACT_APP_APPWRITE_DATABASE_ID;
const userCollectionId = REACT_APP_APPWRITE_USER_COLLECTION_ID;
const videoCollectionId = REACT_APP_APPWRITE_VIDEO_COLLECTION_ID;
const userLikesCollectionId = REACT_APP_APPWRITE_LIKES_COLLECTION_ID;
const storageId = REACT_APP_APPWRITE_STORAGE_ID;

// Init your React Native SDK
let client = null;

if (!client) {
  client = new Client();
}

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

let account = null;
let avatars = null;
let databases = null;
let storage = null;

if (!account) {
  account = new Account(client);
}

if (!avatars) {
  avatars = new Avatars(client);
}

if (!databases) {
  databases = new Databases(client);
}

if (!storage) {
  storage = new Storage(client);
}
export const createUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Failed to create user");

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (e: any) {
    console.log("CreateUser Error", e);
    throw new Error(e);
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    if (!session) throw new Error("Failed to sign in");

    return session;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!account) throw new Error("Failed to get account");

    const currentUser: Models.DocumentList<UserType> =
      await databases.listDocuments(databaseId, userCollectionId, [
        Query.equal("accountId", currentAccount.$id),
      ]);

    if (!currentUser) throw new Error("Failed to get user");

    return currentUser.documents[0];
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const getAllVideos = async (page?: number, size?: number) => {
  try {
    const queries = [
      Query.equal("deleted", false),
      Query.orderDesc("$createdAt"),
    ];

    if (typeof page === "number" && typeof size === "number") {
      queries.push(Query.limit(size));
      queries.push(Query.offset(page * size));
    }

    const videos: Models.DocumentList<VideoType> =
      await databases.listDocuments(databaseId, videoCollectionId, queries);

    if (!videos) throw new Error("Failed to get videos");

    return videos.documents;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const getLatestVideos = async () => {
  try {
    const videos: Models.DocumentList<VideoType> =
      await databases.listDocuments(databaseId, videoCollectionId, [
        Query.equal("deleted", false),
        Query.orderDesc("$createdAt"),
        Query.limit(10),
      ]);

    if (!videos) throw new Error("Failed to get latest videos");

    return videos.documents;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const searchVideos = async (query: string) => {
  try {
    const videos: Models.DocumentList<VideoType> =
      await databases.listDocuments(databaseId, videoCollectionId, [
        Query.equal("deleted", false),
        Query.search("title", query),
        Query.limit(10),
      ]);

    if (!videos) throw new Error("Failed to get videos");

    return videos.documents;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const getUserVideos = async (userId: string) => {
  try {
    const videos: Models.DocumentList<VideoType> =
      await databases.listDocuments(databaseId, videoCollectionId, [
        Query.equal("deleted", false),
        Query.equal("creator", userId),
        Query.orderDesc("$createdAt"),
      ]);

    if (!videos) throw new Error("Failed to get users videos");

    return videos.documents;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const logOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl = null;
  try {
    if (type === "image") {
      //getFilePreview is not longer supported in the free plan
      fileUrl = await storage.getFileView(storageId, fileId);
    } else if (type === "video") {
      fileUrl = await storage.getFileView(storageId, fileId);
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw new Error("Failed to get file preview");

    return fileUrl;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

const uploadFile = async (file: ImagePickerAsset, type: string) => {
  try {
    const name =
      file.fileName && file.fileName !== ""
        ? file.fileName
        : file.uri.split("/").pop() || ID.unique();
    const asset = {
      type: file.mimeType as string,
      size: file.fileSize as number,
      name,
      uri: file.uri as string,
    };

    try {
      const fileData = await storage.createFile(storageId, ID.unique(), asset);
      const fileUrl = await getFilePreview(fileData.$id, type);

      return fileUrl;
    } catch (e: any) {
      throw new Error(e);
    }
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const createVideo = async ({
  title,
  video,
  thumbnail,
  prompt,
  userId,
}: {
  title: string;
  video: ImagePickerAsset;
  thumbnail: ImagePickerAsset;
  prompt: string;
  userId: string;
}) => {
  try {
    const [videoUrl, thumbnailUrl] = await Promise.all([
      uploadFile(video, "video"),
      uploadFile(thumbnail, "image"),
    ]);

    const newVideo = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title,
        video: videoUrl,
        thumbnail: thumbnailUrl,
        prompt,
        creator: userId,
      }
    );

    return newVideo;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const likeVideo = async (userId: string, videoId: string) => {
  try {
    const like = await databases.createDocument(
      databaseId,
      userLikesCollectionId,
      ID.unique(),
      {
        userId,
        videoId,
      }
    );

    return like;
  } catch (e: any) {
    console.log("likeVideo Error", e);
    throw new Error(e);
  }
};

export const getLikedVideos = async (userId: string) => {
  try {
    const likes: Models.DocumentList<UserLikesType> =
      await databases.listDocuments(databaseId, userLikesCollectionId, [
        Query.equal("userId", userId),
      ]);

    if (!likes || likes.total === 0) return [];

    const videoIds = likes.documents.map((like) => like.videoId);

    const videos: Models.DocumentList<VideoType> =
      await databases.listDocuments(databaseId, videoCollectionId, [
        Query.equal("$id", videoIds),
        Query.equal("deleted", false),
      ]);

    return videos.documents;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const unlikeVideo = async (userId: string, videoId: string) => {
  try {
    const likes: Models.DocumentList<UserLikesType> =
      await databases.listDocuments(databaseId, userLikesCollectionId, [
        Query.equal("userId", userId),
        Query.equal("videoId", videoId),
      ]);

    if (!likes || likes.documents.length === 0) {
      throw new Error("Like not found");
    }

    const likeId = likes.documents[0].$id;

    await databases.deleteDocument(databaseId, userLikesCollectionId, likeId);

    return true;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const checkVideoIsLiked = async (userId: string, videoId: string) => {
  try {
    const likes: Models.DocumentList<UserLikesType> =
      await databases.listDocuments(databaseId, userLikesCollectionId, [
        Query.equal("userId", userId),
        Query.equal("videoId", videoId),
      ]);

    return likes.documents.length > 0;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const deleteVideo = async (videoId: string) => {
  try {
    const video = await databases.updateDocument(
      databaseId,
      videoCollectionId,
      videoId,
      { deleted: true }
    );

    return video;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};
