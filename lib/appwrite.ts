import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
import {
  REACT_APP_APPWRITE_ENDPOINT,
  REACT_APP_APPWRITE_PLATFORM,
  REACT_APP_APPWRITE_PROJECT_ID,
  REACT_APP_APPWRITE_DATABASE_ID,
  REACT_APP_APPWRITE_USER_COLLECTION_ID,
  REACT_APP_APPWRITE_VIDEO_COLLECTION_ID,
  REACT_APP_APPWRITE_STORAGE_ID,
} from "@env";

const endpoint = REACT_APP_APPWRITE_ENDPOINT;
const platform = REACT_APP_APPWRITE_PLATFORM;
const projectId = REACT_APP_APPWRITE_PROJECT_ID;
const databaseId = REACT_APP_APPWRITE_DATABASE_ID;
const userCollectionId = REACT_APP_APPWRITE_USER_COLLECTION_ID;
const videoCollectionId = REACT_APP_APPWRITE_VIDEO_COLLECTION_ID;
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

if (!account) {
  account = new Account(client);
}

if (!avatars) {
  avatars = new Avatars(client);
}

if (!databases) {
  databases = new Databases(client);
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

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error("Failed to get user");

    return currentUser.documents[0];
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const getAllVideos = async () => {
  try {
    const videos = await databases.listDocuments(databaseId, videoCollectionId);

    if (!videos) throw new Error("Failed to get videos");

    return videos.documents;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const getLatestVideos = async () => {
  try {
    const videos = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );

    if (!videos) throw new Error("Failed to get latest videos");

    return videos.documents;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};
