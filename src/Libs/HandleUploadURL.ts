import { UploadApiResponse } from "cloudinary";

export const handleUploadURL = (url: string, setUploadData: React.Dispatch<React.SetStateAction<UploadApiResponse | undefined>>) => {
  fetch("/api/v1/images/upload", {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      setUploadData(data.data);
    });
};
