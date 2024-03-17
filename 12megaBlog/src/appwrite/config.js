import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('65df494754660374a44e');
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                "65df4a4f204b8f7dc1e6",
                "65df4aa3b0fa79e90808",
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost() :: ", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                "65df4a4f204b8f7dc1e6",
                "65df4aa3b0fa79e90808",
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost() :: ", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                "65df4a4f204b8f7dc1e6",
                "65df4aa3b0fa79e90808",
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost() :: ", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                "65df4a4f204b8f7dc1e6",
                "65df4aa3b0fa79e90808",
                slug
            
            )
        } catch (error) {
            console.log("Appwrite service :: getPost() ::", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                "65df4a4f204b8f7dc1e6",
                "65df4aa3b0fa79e90808",
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite service :: getPosts() :: ", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                "65df4d541b3d384f3592",
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile() ::", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                "65df4d541b3d384f3592",
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile() :: ", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            "65df4d541b3d384f3592",
            fileId
        )
    }
}


const service = new Service()
export default service