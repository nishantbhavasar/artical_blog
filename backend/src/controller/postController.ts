import bcrypt from 'bcrypt';
import { createJwtToken } from '../helper/jwt';
import { LoginDto, PostDto, RegisterDto } from '../types/types';
import { UserModel } from '../models/UserModel';
import { PostModel } from '../models/PostModel';
import jwt_decode from "jwt-decode";

export class PostController {
  /**
   * @summary create New post 
   */
  async createPost(body: PostDto, token: string): Promise<any> {
    console.log("createPost entry");
    try {
      if (!body?.title?.trim?.() || !body?.description?.trim?.() || !body?.category?.trim?.()) {
        console.log("required fields are Missing");
        return {
          status: 400,
          message: "required fields are Missing",
          success: false
        }
      }
      const userData: any = jwt_decode(token)

      const newPost = {
        title: body.title,
        description: body.description,
        userID: userData.id,
        category:body.category
      }

      // //save in db
      await (await PostModel.create(newPost)).save();
      console.log('Post Creted Successfully')
      console.log("createPost exit");
      return {
        status: 200,
        message: "Post Created Successfully",
        success: true
      };
    } catch (error: any) {
      console.log(error?.message);
      return {
        status: error?.message?.includes('validation failed') ? 400 : error?.status || 500,
        message: error?.message || "Internal Server Error",
        success: false
      }
    }
  }

  /**
   * @summary deletePost
   */
  async deletePost(postId: string,token:string): Promise<any> {
    console.log('login entry');
    try {
      if (!postId?.trim?.()) {
        console.log('post id not provided');
        return {
          status: 400,
          message: "Post ID Invalid",
          success: false
        }
      }

      let post = await PostModel.findOne({ _id: postId });
      if (!post) {
        console.log("invalid Post id");
        return {
          status: 400,
          success: false,
          message: 'invalid post id'
        }
      }
      const {id}:any = jwt_decode(token);
      if(post.userID?.toString() !== id){
        console.log("User not allow to updated other user details")
        return {
          status: 403,
          message: "Unauthorisec Access Denied",
          success: false
        }
      }
      await post.deleteOne();
      return {
        status: 200,
        success: true,
        message: "Post Deleted Successfully"
      }
    } catch (error: any) {
      console.log(error?.message);
      return {
        status: error?.status || 500,
        message: error?.message || "Internal Server Error",
        success: false
      }
    }
  }
  /**
 * @summary get All Artical
 */
  async getArticalWithFilter(query:string): Promise<any> {
    console.log('getArticalWithFilter entry');
    try {
      let post = await PostModel.find({$or:[{title:new RegExp(query)},{description:new RegExp(query)}]}).sort({_id:-1}).exec();
      console.log('getArticalWithFilter exit');
      return {
        status: 200,
        success: true,
        data:post
      }
    } catch (error: any) {
      console.log(error?.message);
      return {
        status: error?.status || 500,
        message: error?.message || "Internal Server Error",
        success: false
      }
    }
  }
  /**
 * @summary get Artical
 */
  async getPost(id:string): Promise<any> {
    console.log('getAllArtical entry');
    try {
      if(!id) return {status:400,success:false,message:"Post Id required"}
      let post = await PostModel.findOne({_id:id}).exec();
      console.log('getAllArtical exit');
      if(!post) return {status:400,success:false,message:"Post Not Found With Provided Post ID"}
      return {
        status: 200,
        success: true,
        data:post
      }
    } catch (error: any) {
      console.log(error?.message);
      return {
        status: error?.status || 500,
        message: error?.message || "Internal Server Error",
        success: false
      }
    }
  }
  /**
 * @summary get All Artical
 */
  async getAllArtical(): Promise<any> {
    console.log('getAllArtical entry');
    try {
      let post = await PostModel.find({}).sort({_id:-1}).exec();
      console.log('getAllArtical exit');
      return {
        status: 200,
        success: true,
        data:post
      }
    } catch (error: any) {
      console.log(error?.message);
      return {
        status: error?.status || 500,
        message: error?.message || "Internal Server Error",
        success: false
      }
    }
  }
  /**
 * @summary get users Artical
 */
  async getUserPosts(id:string): Promise<any> {
    console.log('getUserPosts entry');
    try {
      let post = await PostModel.find({userID:id}).sort({_id:-1}).exec();
      console.log('getUserPosts exit');
      return {
        status: 200,
        success: true,
        data:post
      }
    } catch (error: any) {
      console.log(error?.message);
      return {
        status: error?.status || 500,
        message: error?.message || "Internal Server Error",
        success: false
      }
    }
  }
  /**
 * @summary Update Artical
 */
  async updatePost(body:any,postId:string,token:string): Promise<any> {
    console.log('updatePost entry');
    try {
      let post = await PostModel.findOne({_id:postId}).exec();
      if(!post){
        console.log("post not found with give post id");
        return {
          status: 400,
          message: "Invalid Post ID",
          success: false
        }
      }
      const {id}:any = jwt_decode(token);
      if(post.userID?.toString() !== id){
        console.log("User not allow to updated other user details")
        return {
          status: 403,
          message: "Unauthorisec Access Denied",
          success: false
        }
      }
      
      let updatedPost:PostDto = {
        category:body?.category || post.category,
        description:body?.description || post.description,
        title:body?.title || post.title,
      }
      await post.set(updatedPost).save()
      console.log('updatePost exit');
      return {
        status: 200,
        success: true,
        data:"Post Successfully Updated"
      }
    } catch (error: any) {
      console.log(error?.message);
      return {
        status: error?.status || 500,
        message: error?.message || "Internal Server Error",
        success: false
      }
    }
  }
}