import Head from "next/head";
import LoginForm from "@/components/own/loginForm";

export default function Home() {
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
