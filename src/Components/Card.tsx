import React from "react";
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { IProducto } from "@/pages/products";
import styles from "@/styles/Cards.module.css";
import { NextRouter, useRouter } from "next/router";

const Card: React.FC<IProducto> = ({ _id, title, images }) => {
  const router: NextRouter = useRouter();

  const handleDeleteProduct = (id: string) => {
    fetch(`/api/v1/producto/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        router.push("/");
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      });
  };

  return (
    <article className={styles.card}>
      <p>{title}</p>
      <Swiper
        spaceBetween={60}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        <div className={styles.allImages}>
          {images.map((p) => (
            <SwiperSlide
              key={p}
              style={{ height: "39rem", display: "flex", alignItems: "center" }}
            >
              <Image
                className={styles.image}
                src={p}
                alt="imagen"
                width={500}
                height={500}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      <div className={styles.buttonGroup}>
        <button
          onClick={() => router.push(`/products/modify/${_id}`)}
          className={styles.button}
        >
          modificar
        </button>
        <button
          onClick={() => handleDeleteProduct(_id)}
          className={styles.button}
        >
          borrar
        </button>
      </div>
    </article>
  );
};

export default Card;
