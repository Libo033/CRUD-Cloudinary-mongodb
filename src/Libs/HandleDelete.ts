import React, { FormEvent } from "react";

export const handleDelete = (
  Event: FormEvent,
  img: string,
  upload_preset: string,
  setImagesUploaded: React.Dispatch<React.SetStateAction<string[]>>
) => {
  Event.preventDefault();

  const public_id: string = img.slice(
    img.indexOf(upload_preset) + upload_preset.length,
    img.length - 4
  );

  fetch(`/api/v1/images/${public_id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      if (data.data.result === "ok") {
        setImagesUploaded((imagesUploaded) =>
          imagesUploaded.filter((images: string) => images !== img)
        );
      } else {
        throw new Error("It cannot be deleted");
      }
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error.message);
      }
    });
};
