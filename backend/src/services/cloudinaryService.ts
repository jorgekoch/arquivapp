import cloudinary from "../config/cloudinary";

type UploadResult = {
  secure_url: string;
  public_id: string;
};

export function uploadBufferToCloudinary(
  buffer: Buffer,
  originalname: string
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "music-teacher-files",
        use_filename: true,
        unique_filename: true,
        filename_override: originalname,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed"));
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    stream.end(buffer);
  });
}

export function deleteFromCloudinary(publicId: string) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: "raw",
  });
}