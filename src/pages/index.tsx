import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React from "react";
import UploadForm from "@/Components/UploadForm";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <div className={inter.className}>
      <main className={styles.main}>
        <h1>Subir <Link href={"/products"}>Productos</Link></h1>
        <UploadForm />
      </main>
    </div>
  );
}
