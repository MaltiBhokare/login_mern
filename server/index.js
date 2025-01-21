

// // Load environment variables from .env file
// require("dotenv").config(); // Load environment variables
// console.log("Environment Variables:", process.env); // Debugging output

// // Cloudinary Configuration with Debugging
// console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME); // Debugging output
// if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
//   console.error("Cloudinary configuration is incomplete in .env file.");
//   process.exit(1);
// }

// // MongoDB Configuration Debugging
// console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging output
// if (!process.env.MONGO_URI) {
//   console.error("MONGO_URI is not defined in .env file.");
//   process.exit(1);
// }

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const bcrypt = require("bcryptjs");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Correct key
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Check if Cloudinary configuration is valid
// if (
//   !cloudinary.config().cloud_name ||
//   !cloudinary.config().api_key ||
//   !cloudinary.config().api_secret
// ) {
//   console.error("Cloudinary is not properly configured.");
//   process.exit(1);
// }

// // Set up multer storage using Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "user_images", // Cloudinary folder to store images
//     allowed_formats: ["jpg", "jpeg", "png"], // Allowed formats
//   },
// });

// // Initialize multer with the Cloudinary storage
// const upload = multer({ storage });

// // MongoDB connection setup
// const MONGO_URI = process.env.MONGO_URI; // MongoDB URI from .env
// mongoose.connect(MONGO_URI)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((error) => {
//     console.error("MongoDB connection error:", error.message);
//     process.exit(1);
//   });

// // User Schema (for saving user info)
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   image: { type: String, required: true }, // Store Cloudinary image URL
// });

// const User = mongoose.model("User", userSchema);





// // API route to handle login
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password." });
//     }

//     // Check if the password matches
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password." });
//     }

//     // If login is successful, you can send a success response
//     res.status(200).json({
//       message: "Login successful!",
//       userId: user._id,
//       // Include any additional info you want to send back
//     });
//   } catch (error) {
//     console.error("Error during login:", error.message);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// });

// // API route to handle signup
// app.post("/signup", upload.single("image"), async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword } = req.body;

//     // Ensure the image was uploaded
//     if (!req.file) {
//       console.error("No image uploaded.");  // More detailed error logging
//       return res.status(400).json({ message: "Image upload is required" });
//     }

//     const imageUrl = req.file.path; // Cloudinary image URL
//     console.log("Uploaded Image URL:", imageUrl); // Debugging the image URL

//     // Validate passwords match
//     if (password !== confirmPassword) {
//       console.error("Passwords do not match");  // More detailed error logging
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     // Validate password length (at least 8 characters)
//     if (password.length < 8) {
//       console.error("Password too short");  // More detailed error logging
//       return res.status(400).json({
//         message: "Password must be at least 8 characters long",
//       });
//     }

//     // Check if the email already exists in the database
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.error("Email already in use:", email); // More detailed error logging
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     // Hash the password before storing it in the database
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("Password hashed successfully"); // Debugging password hashing without logging the password

//     // Save user to MongoDB
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword, // Store hashed password
//       image: imageUrl, // Store the image URL from Cloudinary
//     });

//     await newUser.save();
//     console.log("User created successfully:", newUser); // Debugging the user creation

//     // Successful signup response
//     res.status(201).json({
//       message: "User created successfully!",
//       redirectToLogin: true, // Indicating frontend to redirect to login
//     });
//   } catch (error) {
//     console.error("Error during signup:", error.message); // More detailed error logging
//     if (error.message.includes("duplicate key error")) {
//       return res.status(400).json({ message: "Email already in use" });
//     }
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// });

// // Root route for handling the base URL
// app.get("/", (req, res) => {
//   res.send("Welcome to the API! Server is running.");
// });

// // Start the server
// const PORT = process.env.PORT || 3001; // Use PORT from .env or default to 3001
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




// Load environment variables from .env file
require("dotenv").config(); // Load environment variables
console.log("Environment Variables:", process.env); // Debugging output

// Cloudinary Configuration with Debugging
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME); // Debugging output
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("Cloudinary configuration is incomplete in .env file.");
  process.exit(1);
}

// MongoDB Configuration Debugging
console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging output
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file.");
  process.exit(1);
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Check if Cloudinary configuration is valid
if (
  !cloudinary.config().cloud_name ||
  !cloudinary.config().api_key ||
  !cloudinary.config().api_secret
) {
  console.error("Cloudinary is not properly configured.");
  process.exit(1);
}

// Set up multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_images", // Cloudinary folder to store images
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed formats
  },
});

// Initialize multer with the Cloudinary storage
const upload = multer({ storage });

// MongoDB connection setup with retry mechanism
const MONGO_URI = process.env.MONGO_URI; 
const connectWithRetry = () => {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => {
      console.error("MongoDB connection error:", error.message);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};
connectWithRetry();

// User Schema (for saving user info)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true }, // Store Cloudinary image URL
});

const User = mongoose.model("User", userSchema);

// API route to handle login
// API route to handle login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    console.log("Entered password:", password);  // Log the entered password
    console.log("Stored password hash:", user.password);  // Log the stored password hash

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch); // Debugging the password comparison

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // If login is successful, return the user info
    res.status(200).json({
      message: "Login successful!",
      userId: user._id,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});



// API route to handle signup
app.post("/signup", upload.single("image"), async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Ensure the image was uploaded
    if (!req.file) {
      console.error("No image uploaded."); 
      return res.status(400).json({ message: "Image upload is required" });
    }

    // Validate file type (Only image files allowed)
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: "Invalid file type. Only jpg, jpeg, or png images are allowed." });
    }

    const imageUrl = req.file.path; // Cloudinary image URL
    console.log("Uploaded Image URL:", imageUrl); 

    // Validate passwords match
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Validate password length (at least 8 characters)
    if (password.length < 8) {
      console.error("Password too short");
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("Email already in use:", email); 
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password before storing it in the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Password hashed successfully");

    // Save user to MongoDB
    const newUser = new User({
      name,
      email,
      password: hashedPassword, 
      image: imageUrl, 
    });

    await newUser.save();
    console.log("User created successfully:", newUser); 

    // Successful signup response
    res.status(201).json({
      message: "User created successfully!",
      redirectToLogin: true, 
    });
  } catch (error) {
    console.error("Error during signup:", error.message); 
    if (error.message.includes("duplicate key error")) {
      return res.status(400).json({ message: "Email already in use" });
    }
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Root route for handling the base URL
app.get("/", (req, res) => {
  res.send("Welcome to the API! Server is running.");
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
