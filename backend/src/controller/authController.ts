import bcrypt from 'bcrypt';
import { createJwtToken } from '../helper/jwt';
import { LoginDto, RegisterDto } from '../types/types';
import { UserModel } from '../models/UserModel';


export class AuthController {
    /**
     * @summary New Registeration of User
     */
    async register(body: RegisterDto):Promise<any> {
    console.log("register entry");
      try {
        if(!body?.email_id?.trim?.() || !body?.password?.trim?.()){
          console.log("required fields are Missing");
          return {
            status: 400,
            message: "required fields are Missing",
            success:false
          }
        }
        // checking if user is available not register again
        let user = await UserModel.findOne({email_id:body?.email_id}).exec();
        if(user) {
        console.log("User Already Exists With This EmailId");
          return{
            status:422,
            message:"User Already Exists With Same EmailID",
            success:false
          }
        }
  
        //create hashed password to store in db
        const password = body?.password?.trim?.();
        if(!password) {
        console.log("password Missing");
          return {
            status: 400,
            message: "Password Missing",
            success:false
          }
        }
        let bcryptPassword = await bcrypt.hash(password,10);
        body.password = bcryptPassword;
  
        let newUser:RegisterDto = {
          email_id:body.email_id,
          password:body.password
        }
        //save in db
        await (await UserModel.create(newUser)).save();
        console.log('User Register Successfully')
        console.log("register exit");
        return {
          status:200,
          message:"User Register Successfully",
          success:true
        };
      } catch (error: any) {
        console.log(error?.message);
        return {
          status:error?.message?.includes('validation failed') ? 400 : error?.status || 500,
          message:error?.message || "Internal Server Error",
          success:false
        }
      }
    }
  
    /**
     * @summary login with valid credentials
     */
    async login(body: LoginDto):Promise<any>{
      console.log('login entry');
      try {
        if(!body?.email_id?.trim?.() || !body?.password?.trim?.()) {
          console.log('Required Fields Are Missing')
          return{
            status:400,
            message:"Bad Request Required Fields Are Missing",
            success:false
          }
        }
        let user = await UserModel.findOne({email_id:body?.email_id}).exec();
        if(!user) {
        console.log("User Not Found With This Email")
          return {
            status:404,
            message:"User Not Found With This ",
            success:false
          }
        }
        else{
          let encryptedPassword = user?.password;
          let validatePassword = await bcrypt.compare(body?.password,encryptedPassword);
          if(!validatePassword){
            console.log('Password Not Valid')
            return {
              status:404,
              message:"User Not Found With This ",
              success:false
            }
          }
          else{
            let token = createJwtToken({
              id:user?.id,
              email_id:user?.email_id,
            });
            if(!token){
              console.log("Token Not Generated");
              return{
                status:500,
                message:"Internal Server Error",
                success:false
              }
            }
            console.log('Login Successfully')
            console.log("login exit")
            return {
              status:200,
              message:"User Successfully Login",
              success:true,
              token:token
            }
          }
        }
      } catch (error:any) {
        console.log(error?.message);
        return {
          status:error?.status || 500,
          message:error?.message || "Internal Server Error",
          success:false
        }
      }
    }
}