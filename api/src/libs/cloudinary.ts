import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: `dxzm2vv32`,
  api_key: `646267217767253`,
  api_secret: `sgOvQRlNzsXlPFCe45QIAzCpDEQ`,
  secure: true,
});

export async function uploadImage(fliePath: any) {
  return await cloudinary.uploader.upload(fliePath);
}
