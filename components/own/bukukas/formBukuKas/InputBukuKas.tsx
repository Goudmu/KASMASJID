"use client";
import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/utils";
import ComponentBukuKas from "./formBukuKas";

const InputBukuKas = ({ kegiatanId, tipe, dataBukukas }: any) => {
  return (
    <div
      className={`${
        tipe == "edit"
          ? "w-full focus:bg-accent focus:text-accent-foreground cursor-pointer rounded-sm"
          : ""
      }`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {tipe == "edit" ? (
            <span className=" cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm w-full">
              {capitalizeFirstLetter(tipe)} Buku Kas
            </span>
          ) : (
            <Button>{capitalizeFirstLetter(tipe)} Buku Kas</Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Buku Kas</AlertDialogTitle>
            <AlertDialogDescription>
              Aksi ini akan {tipe == "edit" ? "mengedit" : "menambah"} Buku Kas
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className=" flex flex-col gap-5 w-full">
              <div>
                <ComponentBukuKas
                  kegiatanId={kegiatanId}
                  tipe={tipe}
                  dataBukukas={dataBukukas}
                />
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InputBukuKas;
