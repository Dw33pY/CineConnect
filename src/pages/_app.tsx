import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import Header from "../components/Header"; // Import the Header component

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      {/* Render the Header */}
      <Header /> 

      {/* Render the specific page content */}
      <Component {...pageProps} />
    </div>
  );
}
