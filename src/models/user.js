import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.models.user || mongoose.model("user", UserSchema);
