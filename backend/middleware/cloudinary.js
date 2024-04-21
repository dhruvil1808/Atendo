import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";
import path from "path";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(imageName) {
  let imagePath = path.join(`./public/uploads/${imageName}`);
  const result = await cloudinary.uploader.upload(imagePath);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  fs.unlink(`./public/uploads/${imageName}`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  return result.url;
}

export default uploadImage;
