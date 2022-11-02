import { v2 as cloudinary } from "cloudinary";
import config from "./config";
cloudinary.config({
  cloud_name: `${config.cloud_name}`,
  api_key: `${config.api_key}`,
  api_secret: `${config.api_secret}`,
  secure: true,
});

export async function uploadImage(fliePath: any) {
  return await cloudinary.uploader.upload(fliePath);
}