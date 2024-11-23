
import { S3Client } from '@aws-sdk/client-s3'


export const clientS3 = new S3Client({
  forcePathStyle: true,
  region: import.meta.env.VITE_REGION,
  endpoint: import.meta.env.VITE_ENDPOINT,
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESSKEYID,
    secretAccessKey: import.meta.env.VITE_SECRETACCESSKEY,
  },
})
