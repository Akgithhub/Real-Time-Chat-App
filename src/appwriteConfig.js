import { Client, Databases, Account } from "appwrite";
export const PROJECT_ID = "6640a623000f2554fb54";
export const DATABASE_ID = "6640a72b002f83b17ba0";
export const COLLECTION_ID_MESSAGES = "6640a73800393c13b016";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6640a623000f2554fb54");
export const databases = new Databases(client);
export const account = new Account(client);

export default client;
