const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true }, // Store Cloudinary image URL
  });
  
  const User = mongoose.model("User", userSchema); // Collection name will be 'users' by default in MongoDB
  