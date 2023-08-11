import React from "react";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import ModifyForm from "@/Components/ModifyForm";

const inter = Inter({ subsets: ["latin"] });

const modify = () => {
  return (
    <div className={inter.className}>
      <main className={styles.main}>
        <h1>Modificar</h1>
        <ModifyForm />
      </main>
    </div>
  );
};

export default modify;