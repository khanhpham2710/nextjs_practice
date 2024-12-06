import { validateRequest } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ourFileRouter = {
  avatar: f({
    image: {
      maxFileSize: "512KB",
    },
  })
    .middleware(async ({ req }) => {
      const user = await validateRequest()
      
      if (!user) throw new UploadThingError("Unauthorized");
      
      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.user);
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.user.user?.id };
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;