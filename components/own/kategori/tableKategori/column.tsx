"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalizeFirstLetter } from "@/lib/utils";
import { revalidateKategori } from "@/lib/actions";
import { CategoryType } from "@/lib/mongodb/models";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import InputKategori from "../formKategori/InputKategori";

export const KategoriColumns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "tipe",
    header: "Tipe",
    cell: ({ row }) => {
      const newtipe = row.getValue("tipe") as string;

      return (
        <div
          className={`text-center text-xs md:text-sm border rounded-md py-1 px-2 w-fit  text-black`}
        >
          {newtipe}
        </div>
      );
    },
  },
  {
    accessorKey: "nama",
    header: "Name",
    cell: ({ row }) => {
      const newname = row.getValue("nama") as string;

      return (
        <div className=" first-letter:capitalize text-xs md:text-sm">
          {newname}
        </div>
      );
    },
  },
  {
    accessorKey: "statusId",
    header: "Status",
    cell: ({ row }) => {
      const newVisibility = row.getValue("statusId") ? "Public" : "Private";
      const formatted = capitalizeFirstLetter(newVisibility);

      return (
        <div className=" first-letter:capitalize text-xs md:text-sm">
          {formatted}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "statusId",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     const newStatus = row.getValue("statusId") ? "Aktif" : "Non Aktif";

  //     return (
  //       <div className="text-xs md:text-sm text-left font-medium">
  //         {newStatus}
  //       </div>
  //     );
  //   },
  // },
  {
    id: "actions",
    header: "Edit / Delete",
    cell: ({ row }) => {
      const user = row.original;
      const params = useSearchParams().getAll("id")[0];

      const removeHandler = async (_id: string) => {
        const res = await fetch("http://localhost:3000/api/category", {
          method: "DELETE",
          body: JSON.stringify({ _id }),
        });
        if (res.ok) {
          toast.success(
            "Kategori dan transaksi dari kategori tersebut Berhasil Dihapus"
          );
          await revalidateKategori(params);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />
            <InputKategori
              tipe={"edit"}
              dataKategori={user}
              kegiatanId={params}
            />
            <DropdownMenuItem
              onClick={() => removeHandler(user._id)}
              className=" cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
