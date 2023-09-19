import mongoose from 'mongoose';
export default mongoose;
export const connectToDb = () =>{
    const mongo_uri:string = process.env.MONGO_URI as string
    if(!mongo_uri) {console.log(`Database Connection Url Not Found`); return;}
    mongoose.connect(mongo_uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as any).then(()=>console.log(`DB Connected`)).catch((error)=>{console.log(error.message)});
}