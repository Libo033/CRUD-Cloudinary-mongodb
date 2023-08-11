import React, { useState, useEffect } from "react";
import styles from "@/styles/Products.module.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Card from "@/Components/Card";

const inter = Inter({ subsets: ["latin"] });

export interface IProducto {
  _id: string;
  title: string;
  images: string[];
}

const products = () => {
  const [producto, setProducto] = useState<IProducto[]>([]);

  useEffect(() => {
    fetch("/api/v1/producto", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setProducto(data);
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      });
  }, []);

  return (
    <div style={{ width: "100%" }} className={inter.className}>
      <Link
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBlock: "1.5rem",
          fontWeight: "600",
        }}
        href={"/"}
      >
        CREAR
      </Link>
      <div className={styles.products}>
        {producto.length > 0 &&
          producto.map((pr) => <Card key={pr._id} {...pr} />)}
      </div>
    </div>
  );
};

export default products;
