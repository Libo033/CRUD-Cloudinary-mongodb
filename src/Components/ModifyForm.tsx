import React, { FormEvent, useState, useEffect } from "react";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
import { handleAdd } from "@/Libs/HandleAdd";
import { handleFileReader } from "@/Libs/HandleFileReader";
import { NextRouter, useRouter } from "next/router";
import { UploadApiResponse } from "cloudinary";
import { handleDelete } from "@/Libs/HandleDelete";

const ModifyForm = () => {
  const router: NextRouter = useRouter();
  const { id } = router.query;
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [imagesUploaded, setImagesUploaded] = useState<Array<string>>([]);
  const [uploadData, setUploadData] = useState<UploadApiResponse | undefined>();

  useEffect(() => {
    if (uploadData?.secure_url !== undefined) {
      setImagesUploaded([...imagesUploaded, uploadData.secure_url]);
    }
    setUploadData(undefined);
    setUrl("");
  }, [uploadData]);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetch(`/api/v1/producto/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setImagesUploaded(data.images)
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      });
  }, [id]);

  const handleSubmit = (Event: FormEvent) => {
    Event.preventDefault();

    fetch(`/api/v1/producto/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        images: imagesUploaded,
        title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push("/products");
      });
  };

  return (
    <form
      className={styles.form}
      action="post"
      onChange={(Event) => handleFileReader(Event, setUploadData, setUrl)}
      onSubmit={(Event: FormEvent) => handleSubmit(Event)}
    >
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor="title">
          Titulo
        </label>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
        />
      </div>
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor="image">
          Imagen
        </label>
        <div className={styles.fileInputContainer}>
          <input
            className={styles.input}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            id="image"
          />
          <label className={styles.fileLabel} htmlFor="file">
            upload
          </label>
          <input className={styles.file} type="file" name="file" id="file" />
          <button
            onClick={(event) => handleAdd(event, url, setUploadData)}
            className={styles.add}
          >
            add
          </button>
        </div>
        <div className={styles.imagesContainer}>
          {imagesUploaded.length > 0
            ? imagesUploaded.map((img) => (
                <div key={img} className={styles.imageContainer}>
                  <Image
                    className={styles.image}
                    src={img}
                    alt="image"
                    width={99}
                    height={99}
                  />
                  <Image
                    className={styles.delete}
                    src={"/img/delete.svg"}
                    width={24}
                    height={24}
                    alt="cross"
                    onClick={(Event: FormEvent) =>
                      handleDelete(Event, img, "00-start/", setImagesUploaded)
                    }
                  />
                </div>
              ))
            : undefined}
        </div>
      </div>
      <button type="submit" className={styles.createButton}>
        Modificar
      </button>
    </form>
  );
};

export default ModifyForm;
