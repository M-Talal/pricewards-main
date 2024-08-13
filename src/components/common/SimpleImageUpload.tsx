import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SimpleImageUpload() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Image</Label>
      <Input id="picture" type="file" />
    </div>
  );
}
