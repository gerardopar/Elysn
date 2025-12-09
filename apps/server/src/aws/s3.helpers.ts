import { s3 } from "./s3.js";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getProfileUploadUrl = async (
  userId: string,
  contentType: string,
  fileExtension: string
) => {
  const fileKey = `profile-pictures/${userId}/profile.${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileKey,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(
    s3,
    command,
    { expiresIn: 300 } // 5min
  );

  return {
    uploadUrl,
    fileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`,
  };
};
