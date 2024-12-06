"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";
import { Loader2 } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { cn } from "@/lib/utils";
import { useSubmitPostMutation } from "./mutations";

const PostEditor = () => {
  const { user } = useSession();

  const mutation = useSubmitPostMutation();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  function onSubmit() {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <div
          // {...rootProps}
          className="w-full"
        >
          <EditorContent
            editor={editor}
            className={cn(
              "max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
              //   isDragActive && "outline-dashed",
            )}
            // onPaste={onPaste}
          />
          {/* <input {...getInputProps()} /> */}
        </div>
      </div>
      {/* {!!attachments.length && (
        <AttachmentPreviews
          attachments={attachments}
          removeAttachment={removeAttachment}
        />
      )} */}
      <div className="flex items-center justify-end gap-3">
        {/* {isUploading && (
          <>
            <span className="text-sm">{uploadProgress ?? 0}%</span>
            <Loader2 className="size-5 animate-spin text-primary" />
          </>
        )} */}
        {/* <AddAttachmentsButton
          onFilesSelected={startUpload}
          disabled={isUploading || attachments.length >= 5}
        /> */}
        <LoadingButton
          onClick={onSubmit}
          loading={mutation.isPending}
            // disabled={!input.trim() || isUploading}
          className="min-w-20"
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
};

export default PostEditor;
