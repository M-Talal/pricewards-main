"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { uploadImage } from "@/server-actions/file-upload";
import { Loader2, UploadCloud, X } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useToast } from "../ui/use-toast";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="">
      {!pending ? (
        <>
          <UploadCloud className="h-5 w-5 mr-2" /> Upload
        </>
      ) : (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      )}
    </Button>
  );
}

export default function SingleImageUpload({
  imageUrl,
  setImageUlr,
  imageFolder,
  fileName,
  setImageFileName,
}: {
  imageUrl?: string;
  setImageUlr?: (url: string) => void;
  imageFolder?: string;
  fileName?: string;
  setImageFileName?: (name: string) => void;
}) {
  const [state, formAction] = useFormState(uploadImage, null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [uploadImageUrl, setUploadImageUrl] = useState<string>("");
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state?.secure_url) {
      setUploadImageUrl(state.secure_url);
      setPreviewImageUrl(null);
      setImageUlr?.(state.secure_url);
      const fullPublicId = state.public_id.split("/").pop();
      const publicId = fullPublicId.split(".").shift();
      setImageFileName?.(publicId);
      toast({
        description: "Image uploaded successfully",
      });
    }
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: state.error,
      });
      setPreviewImageUrl(null);
    }
  }, [state]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImageUrl(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("image", file);
      formData.append("imageFolder", imageFolder || "");
      formData.append("fileName", fileName || "");

      startTransition(() => {
        formAction(formData);
      });
    }
  };

  const handleRemoveImage = () => {
    setUploadImageUrl("");
    setPreviewImageUrl(null);
  };

  return (
    <div>
      <Label
        htmlFor="input-file"
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center"
      >
        <div className="space-y-1 text-center cursor-pointer">
          <input
            id="input-file"
            type="file"
            accept="image/jpeg, image/png"
            name="image"
            hidden
            onChange={handleFileChange}
          />
          <input name="imageUrl" hidden value={uploadImageUrl} />

          <h1 className="text-lg font-bold">Drop or Select image</h1>
          <p className="text-gray-700 mt-4">
            Drop files here or click{" "}
            <span className="text-teal underline">browse</span> through your
            machine
          </p>
        </div>
        <p className="text-gray-500 text-xs mt-2">
          Image should be in <span className="text-teal">jpeg, png</span> and
          less than 5 MB
        </p>
      </Label>

      <div className="flex space-x-2 my-6">
        {uploadImageUrl && (
          <div className="">
            <div className="relative">
              <button
                className="absolute right-1 top-1"
                onClick={handleRemoveImage}
              >
                <X className="h-5 w-5 text-white bg-[#161c247a] rounded-full" />
              </button>
              <Image
                src={uploadImageUrl}
                alt="uploaded image"
                className="h-24 w-24 rounded-lg object-cover"
                height={96}
                width={96}
              />
            </div>
          </div>
        )}
        {previewImageUrl && (
          <div className="relative h-[96px] w-[96px]">
            <Image
              src={previewImageUrl}
              alt="preview image"
              height={96}
              width={96}
              className="rounded-md h-full w-full grayscale"
            />
            {isPending && (
              <div className="absolute top-1 left-1 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
