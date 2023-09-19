import mongoose from ".";
const { Schema } = mongoose;

const userSchema = new Schema({
  email_id: {
    type: String,
    required: true,
    min:[2,"First Name Must Be More Then 5 Alfabe"]
  },
  password: {
    type: String,
    required: true,
    min:[2,"First Name Must Be More Then 8 Alfabet"]
  }
});

export const UserModel = mongoose.model("USER", userSchema);