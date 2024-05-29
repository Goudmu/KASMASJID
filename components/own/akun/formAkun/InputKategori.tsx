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
import ComponentKategori from "./formKategori";

const InputKategori = ({ kegiatanId, tipe, dataKategori }: any) => {
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
              {capitalizeFirstLetter(tipe)} Kategori
            </span>
          ) : (
            <Button>{capitalizeFirstLetter(tipe)} Kategori</Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kategori</AlertDialogTitle>
            <AlertDialogDescription>
              Aksi ini akan {tipe == "edit" ? "mengedit" : "menambah"} Kategori
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className=" flex flex-col gap-5 w-full">
              <div>
                <ComponentKategori
                  kegiatanId={kegiatanId}
                  tipe={tipe}
                  dataKategori={dataKategori}
                />
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InputKategori;
