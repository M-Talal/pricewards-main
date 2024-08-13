"use client";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud } from "lucide-react";
import React, { use, useEffect, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/server-actions/file-upload";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="w-full">
      {!pending ? (
        <>
          <UploadCloud className="mr-2 h-4 w-4" /> Upload
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

export default function UploadProfileImage({
  profileImage,
}: {
  profileImage?: string;
}) {
  const [state, formAction] = useFormState(uploadImage, null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [previewImageUrl, setPreviewImageUrl] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    function handleUploadImage() {
      if (state?.error) {
        setPreviewImageUrl("");
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: state.error,
        });
      }
      if (state?.secure_url) {
        setImageUrl(state.secure_url);
        setPreviewImageUrl("");
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
        console.log(state.secure_url);
      }
    }
    handleUploadImage();
  }, [state]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImageUrl(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("image", file);
      startTransition(() => {
        formAction(formData);
      });
    }
  };

  return (
    <div className="relative flex  items-center justify-center h-full">
      <div className="z-30 group hover:bg-gray-200 opacity-60 absolute rounded-full h-32 w-32 flex items-center justify-center transition duration-500">
        {isPending ? (
          <Loader2 className="h-10 w-10 animate-spin group" />
        ) : (
          <div className="hidden group-hover:block ">
            <Label htmlFor="image">
              <UploadCloud className="h-10 w-10 cursor-pointer" />
            </Label>
            <Input
              id="image"
              className="hidden"
              name="image"
              type="file"
              accept=".jpeg, .jpg, .png, .gif"
              onChange={handleFileChange}
              disabled={isPending}
            />
            <input type="hidden" name="profile-image" value={imageUrl} />
          </div>
        )}
      </div>

      <Avatar
        className={cn(
          `h-32 w-32 absolute ${isPending && "bg-gray-200 opacity-60"}`
        )}
      >
        <AvatarImage src={imageUrl || previewImageUrl || ""} className="" />
        <AvatarFallback>
          <UploadCloud className="h-10 w-10" />
        </AvatarFallback>
      </Avatar>
      {/* <p className="text-sm max-w-64 mt-64 text-center text-muted-foreground">
        Allowed *.jpeg, *.jpg, *.png, *.gif max size of 5 Mb
      </p> */}
    </div>
  );
}
