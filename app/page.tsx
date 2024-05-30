"use client";
import Head from "next/head";
import LoginForm from "@/components/own/loginForm";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.user != null) {
      router.push("/dashboard?id=660bb772285c3316e6c93e8d");
    }
  }, [session]);
  return (
    <>
      <Head>
        <title>Home Page Title</title>
        <meta name="description" content="Aplikasi Kas Masjid Agung Gamping" />
        <meta name="keywords" content="Aplikasi Kas Masjid Agung Gamping" />
        <meta name="author" content="GoUdMu" />
        <meta property="og:title" content="Aplikasi Kas Masjid Agung Gamping" />
        <meta
          property="og:description"
          content="Aplikasi Kas Masjid Agung Gamping"
        />
      </Head>
      <main className=" m-auto max-w-[80%]">
        <LoginForm />
      </main>
    </>
  );
}
