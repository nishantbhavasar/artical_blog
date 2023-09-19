export interface LoginDto {
    email_id:string,
    password:string
} 
export interface RegisterDto {
    email_id:string,
    password:string
} 
export interface JwtPayload {
  id:string
  email_id:string
}
export interface PostDto {
  title:string
  description:string
  category:'Food'| 'Educations'|'Businessmen'|'Positions'
}