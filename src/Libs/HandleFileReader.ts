import React, { SetStateAction } from "react";
import { UploadApiResponse } from "cloudinary";

export const handleFileReader = (
  changeEvent: any,
  setUploadData: React.Dispatch<SetStateAction<UploadApiResponse | undefined>>,
  setUrl: React.Dispatch<SetStateAction<string>>
): void => {
  try {
    const reader: FileReader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      if (typeof onLoadEvent.target?.result?.toString() === "string") {
        setUrl(changeEvent.target.files[0].name);
        setUploadData(undefined);
      }
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  } catch (error) {
    setUploadData(undefined);
  }
};
