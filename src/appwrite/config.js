import conf from "../conf/conf.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class AppwriteService {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.database = new Databases(this.client);

    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createDocument({
        databaseId: conf.appWriteDatabaseId,
        collectionId: conf.appWriteCollectionId,
        documentId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: createPost :: error ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument({
        databaseId: conf.appWriteDatabaseId,
        collectionId: conf.appWriteCollectionId,
        documentId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument({
        databaseId: conf.appWriteDatabaseId,
        collectionId: conf.appWriteCollectionId,
        documentId: slug,
      });

      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);

      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument({
        databaseId: conf.appWriteDatabaseId,
        collectionId: conf.appWriteCollectionId,
        documentId: slug,
      });
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);

      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments({
        databaseId: conf.appWriteDatabaseId,
        collectionId: conf.appWriteCollectionId,
        queries,
      });
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error ", error);

      return false;
    }
  }

  // file upload

  async uplaoadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appWriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("Appwrite service :: uplaoadFile :: error ", error);

      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appWriteBucketId,
        fileId,
      });

      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error ", error);

      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFileView({
        bucketId: conf.appWriteBucketId,
        fileId,
      });
    } catch (error) {
      console.log("Appwrite service :: getFilePreview :: error ", error);
    }
  }
}

export const appwriteService = new AppwriteService();

export default appwriteService;
