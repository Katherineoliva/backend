import { cloudinary } from "../configs/cloundinary.config.js";
import { ServiceError } from "./serviceError.js";
import { fileTypeFromBuffer } from "file-type";

export const saveImages = async (image, folder)=>{
    
    const imageBase64 = image.split(",")[1];
    
    const buffer = Buffer.from(imageBase64, "base64");

    const fileTypeResult = await fileTypeFromBuffer(buffer);
    if (!fileTypeResult || !fileTypeResult.mime.startsWith("image/")) {
        throw new ServiceError("El archivo no es una imagen válida", 400);
    }


    const res = await new Promise ((resolve, reject)=>{
        cloudinary.uploader.upload_stream({
            folder: folder,
            stream: image,
            resource_type: 'auto',
            public_id: `folder/${Date.now()}`,
            encoding: 'base64'
        },
        (error, result)=>{
            if (error) reject(new ServiceError(error.message, 500));
            resolve(result.secure_url);
        }).end(image);
    })

    return res;
}