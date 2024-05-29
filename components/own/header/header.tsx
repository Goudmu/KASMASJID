"use client";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import LogoutComponent from "../signOut";
import { useSession } from "next-auth/react";

export default function HeaderOwn() {
  const params = useSearchParams().getAll("id")[0];
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className=" w-full bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
            <Link className="mr-6 hidden lg:flex" href="#">
              <MosqueIcon className="h-10 w-10" />
              <div className="flex items-center justify-center">
                <span className=" text-base md:text-xl ml-5">
                  Masjid Agung Gamping
                </span>
              </div>
            </Link>
          </header>
        </div>
      </div>
    );
  }
  return (
    <div className=" w-full bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
          <Link className="mr-6 hidden lg:flex" href="#">
            <MosqueIcon className="h-10 w-10" />
            <div className="flex items-center justify-center">
              <span className=" text-base md:text-xl ml-5">
                Masjid Agung Gamping
              </span>
            </div>
          </Link>
          <div className="ml-auto flex gap-2">
            <Link
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href={`/dashboard?id=${params}`}
            >
              Home
            </Link>
            <Link
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href={`/laporan?id=${params}`}
            >
              Laporan
            </Link>
            <Link
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href={`/pengaturan?id=${params}`}
            >
              Pengaturan
            </Link>
            {/* <Link
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="#"
            >
              Portfolio
            </Link>
            <Link
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="#"
            >
              Contact
            </Link>
            <Button
              className="justify-self-end px-2 py-1 text-xs"
              variant="outline"
            >
              Sign in
            </Button> */}
            {/* <Button className="justify-self-end px-2 py-1 text-xs">
              Sign Up
            </Button> */}
            <LogoutComponent />
          </div>
        </header>
      </div>
    </div>
  );
}

function CarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function MosqueIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 128 128"
      //   style={"enable-background:new 0 0 512 512"}
    >
      <g>
        <path
          d="M126.25 45.857h-5.586l.718-1.742a10.72 10.72 0 0 0-2.337-11.7l-4.951-4.952v-6.024a1.75 1.75 0 1 0-3.5 0v6.025l-4.952 4.952a10.72 10.72 0 0 0-2.337 11.7l.718 1.742h-5.585a1.75 1.75 0 0 0-1.75 1.75V58a1.75 1.75 0 0 0 1.75 1.75h4.062v11.314h-7.75v-6.625a1.751 1.751 0 0 0-1.75-1.75h-3.7a20.593 20.593 0 0 0-.455-23.462 34.031 34.031 0 0 0-16.512-12.291l-1.928-.69a11.915 11.915 0 0 0-.4-10.782l-4.478-8.007a1.749 1.749 0 0 0-3.054 0l-4.479 8.007a11.915 11.915 0 0 0-.4 10.782l-1.928.69a34.031 34.031 0 0 0-16.508 12.291 20.594 20.594 0 0 0-.458 23.462H35a1.751 1.751 0 0 0-1.75 1.75v6.625H25.5V59.752h4.063A1.751 1.751 0 0 0 31.313 58V47.6a1.751 1.751 0 0 0-1.75-1.75h-5.587l.719-1.742a10.721 10.721 0 0 0-2.337-11.7l-4.952-4.952v-6.017a1.75 1.75 0 1 0-3.5 0v6.025l-4.951 4.952a10.72 10.72 0 0 0-2.337 11.7l.718 1.742H1.75A1.751 1.751 0 0 0 0 47.607V58a1.751 1.751 0 0 0 1.75 1.75h4.063v59.937a1.75 1.75 0 0 0 1.75 1.75h112.874a1.75 1.75 0 0 0 1.75-1.75V59.752h4.063A1.751 1.751 0 0 0 128 58V47.6a1.751 1.751 0 0 0-1.75-1.743Zm-19.71-3.076a7.232 7.232 0 0 1 1.577-7.89l4.227-4.227 4.227 4.227a7.23 7.23 0 0 1 1.576 7.89l-1.269 3.076h-9.069ZM61.049 17.172 64 11.9l2.951 5.276a8.4 8.4 0 0 1 .147 7.891l-2.509-.9a1.752 1.752 0 0 0-1.178 0l-2.509.9a8.4 8.4 0 0 1 .147-7.895ZM42.033 41.223a30.52 30.52 0 0 1 14.812-10.991L64 27.672l7.155 2.56a30.52 30.52 0 0 1 14.812 10.991 17.32 17.32 0 0 1-1 21.466H43.035a17.32 17.32 0 0 1-1.002-21.466ZM36.75 66.189h54.5v4.875h-54.5ZM9.853 42.781a7.23 7.23 0 0 1 1.576-7.89l4.227-4.227 4.227 4.227a7.23 7.23 0 0 1 1.576 7.89l-1.268 3.076h-9.069ZM3.5 49.357h24.313v6.9H3.5Zm5.813 10.4H22v58.187H9.313ZM25.5 74.564h77v43.375h-3.285v-13.215a12.719 12.719 0 0 0-4.01-9.249l-3.839-3.595a1.752 1.752 0 0 0-2.392 0l-3.839 3.595a12.719 12.719 0 0 0-4.01 9.249v13.215h-4.687V97.766a17.815 17.815 0 0 0-5.618-12.957l-5.62-5.266a1.75 1.75 0 0 0-2.392 0l-5.628 5.266a17.814 17.814 0 0 0-5.617 12.957v20.173h-4.688v-13.215a12.719 12.719 0 0 0-4.01-9.249l-3.839-3.595a1.752 1.752 0 0 0-2.392 0L32.8 95.475a12.719 12.719 0 0 0-4.01 9.249v13.215H25.5Zm6.785 43.375v-13.215a9.2 9.2 0 0 1 2.9-6.694l2.642-2.475 2.642 2.475a9.2 9.2 0 0 1 2.9 6.694v13.215Zm22.778 0V97.766a14.3 14.3 0 0 1 4.509-10.4L64 83.218l4.428 4.146a14.3 14.3 0 0 1 4.51 10.4v20.173Zm29.562 0v-13.215a9.2 9.2 0 0 1 2.9-6.694l2.642-2.475 2.643 2.475a9.2 9.2 0 0 1 2.9 6.694v13.215Zm34.062 0H106V59.752h12.687Zm5.813-61.687h-24.313v-6.9H124.5Z"
          fill="#000000"
          opacity="1"
          data-original="#000000"
          className=""
        ></path>
        <path
          d="M69.639 34.469a1.75 1.75 0 0 0-1.179 3.3 22.462 22.462 0 0 1 10.94 8.017 1.75 1.75 0 1 0 2.875-2 25.985 25.985 0 0 0-12.636-9.317Z"
          fill="#000000"
          opacity="1"
          data-original="#000000"
          className=""
        ></path>
      </g>
    </svg>
  );
}
