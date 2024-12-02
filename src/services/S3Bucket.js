import { clientS3 } from "@/s3Client";

export const uploadFile = async (file) => {
  try {
    const params = {
      Bucket: import.meta.env.VITE_BUCKET,
      Key: file.name,
      Body: file.data,
    };
    const data = await clientS3.upload(params).promise();
    console.log('File uploaded successfully: ', data);
    return data.Location;
  } catch (error) {
    console.error('Error uploading file: ', error);
  }
}
