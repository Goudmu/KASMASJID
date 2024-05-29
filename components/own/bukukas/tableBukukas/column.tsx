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
import { revalidateAll, revalidateBukukas } from "@/lib/actions";
import { BukuKasType } from "@/lib/mongodb/models";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import InputBukuKas from "../formBukuKas/InputBukuKas";
import { useCountStore } from "@/app/store/zustand";

export const BukuKasColumns: ColumnDef<BukuKasType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const newname = row.getValue("name") as string;

      return (
        <div className=" first-letter:capitalize text-xs md:text-sm">
          {newname}
        </div>
      );
    },
  },
  {
    accessorKey: "desc",
    header: "Desc",
    cell: ({ row }) => {
      const newDesc = row.getValue("desc") as string;

      return (
        <div className=" first-letter:capitalize text-xs md:text-sm">
          {newDesc != "" ? newDesc : "Tidak Ada Deskripsi"}
        </div>
      );
    },
  },
  {
    accessorKey: "reportVisibilityCode",
    header: "Public / Private",
    cell: ({ row }) => {
      const newVisibility = row.getValue("reportVisibilityCode")
        ? "Public"
        : "Private";
      const formatted = capitalizeFirstLetter(newVisibility);

      return (
        <div className=" first-letter:capitalize text-xs md:text-sm">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "statusId",
    header: "Status",
    cell: ({ row }) => {
      const newStatus = row.getValue("statusId") ? "Aktif" : "Non Aktif";

      return (
        <div className="text-xs md:text-sm text-left font-medium">
          {newStatus}
        </div>
      );
    },
  },
  {
    accessorKey: "bukaBukuKas",
    header: "Buka",
    cell: ({ row }) => {
      const data = row.original;
      const count = useCountStore((state: any) => state.count);
      const params = count;

      const bukaBukuKasHanlder = async () => {
        await revalidateAll(data._id);
      };
      return (
        <div className="text-xs md:text-sm text-left font-medium">
          {data._id == params ? (
            <div
              className={`text-center text-xs md:text-sm border rounded-md py-1 px-2 w-fit  text-black`}
            >
              Sedang dibuka
            </div>
          ) : (
            <div
              className={`text-center text-xs md:text-sm border rounded-md py-1 px-2 w-fit  text-white bg-black cursor-pointer`}
              onClick={bukaBukuKasHanlder}
            >
              Buka Buku Kas
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Edit / Delete",
    cell: ({ row }) => {
      const user = row.original;
      const count = useCountStore((state: any) => state.count);
      const params = count;

      const removeHandler = async (_id: string) => {
        const res = await fetch("/api/bukukas", {
          method: "DELETE",
          body: JSON.stringify({ _id }),
        });
        if (res.ok) {
          toast.success("Buku kas Berhasil Dihapus");
          await revalidateBukukas(params);
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
            <InputBukuKas
              kegiatanId={params}
              tipe={"edit"}
              dataBukukas={user}
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
