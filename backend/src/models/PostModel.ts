import mongoose from ".";
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    min:[2,"Title must containe more text"]
  },
  description: {
    type: String,
    required: true,
    min:[2,"discription must containe more text"]
  },
  userID:{
    type:Schema.Types.ObjectId,
    ref:'USER'
  },
  category:{
    type:String,
    require:true,
    enum:['Food', 'Educations', 'Businessmen', 'Positions']
  }
});

export const PostModel = mongoose.model("Post", postSchema);