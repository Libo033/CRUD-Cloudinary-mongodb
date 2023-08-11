import { UploadApiResponse } from "cloudinary";

export const handleUploadPC = async (
  uploadPreset: string,
  setUploadData: React.Dispatch<
    React.SetStateAction<UploadApiResponse | undefined>
  >
) => {
  const fileInput: Element | null = document.getElementById("file");

  const formData: FormData = new FormData();

  const fileList: FileList | null = (fileInput as HTMLInputElement).files;

  if (fileList === null) {
    throw new Error("Files cannot be null");
  }

  for (const file of fileList) {
    if (file.size > 10485760) {
      alert(`File size bigger than 10MB`);
      setUploadData(undefined);
      return;
    }
    formData.append("file", file);
  }

  formData.append("upload_preset", uploadPreset);

  const savingImage: Promise<UploadApiResponse> = new Promise(
    async (resolve, reject) => {
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dsuydyqgz/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      resolve(data);
    }
  );

  savingImage
    .then(async (data: UploadApiResponse) => {
      setUploadData(data);
    })
    .catch((e) => {
      if (e instanceof Error) {
        console.log(e.message);
      }
    });

  (fileInput as HTMLInputElement).value = "";
};
