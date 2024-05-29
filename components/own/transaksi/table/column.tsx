"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalizeFirstLetter, commafy, getMonthById } from "@/lib/utils";
import { revalidateAll } from "@/lib/actions";
import InputPenerimaan from "../form/InputPenerimaan";

export type TransactionType = {
  _id: string;
  date: string;
  month: string;
  year: string;
  desc: string;
  amount: number;
  tipe: string;
  kategoriId: string;
  kategoriName: string;
  kegiatanId: string;
  userId: string;
};

export const TransaksiColumns: ColumnDef<TransactionType>[] = [
  {
    accessorKey: "_id",
    header: "Id",
    cell: ({ row }) => {
      const formatted = row.getValue("_id") as string;

      return <div className="text-center text-xs md:text-sm">{formatted}</div>;
    },
  },
  {
    accessorKey: "kegiatanId",
    header: "KegiatanId",
    cell: ({ row }) => {
      const formatted = row.getValue("kegiatanId") as string;

      return <div className="text-center text-xs md:text-sm">{formatted}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString();

      return <div className="text-center text-xs md:text-sm">{formatted}</div>;
    },
  },
  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row }) => {
      const date = row.getValue("month") as string;

      return <div className="text-center text-xs md:text-sm">{date}</div>;
    },
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => {
      const date = row.getValue("year") as string;

      return <div className="text-center text-xs md:text-sm">{date}</div>;
    },
  },
  {
    accessorKey: "tipe",
    header: "Tipe",
    cell: ({ row }) => {
      const newTipe = row.getValue("tipe") as string;
      const formatted = capitalizeFirstLetter(newTipe);

      return (
        <div
          className={`text-center text-xs md:text-sm border rounded-md py-1 px-2 w-fit  text-black`}
        >
          {formatted}
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
          {newDesc}
        </div>
      );
    },
  },

  {
    accessorKey: "kategoriName",
    header: "Kategori",
    cell: ({ row }) => {
      const newKategori = row.getValue("kategoriName") as string;
      const newTipe = row.getValue("tipe") as string;
      const formatted = capitalizeFirstLetter(newKategori);

      return (
        <div
          className={`text-xs md:text-sm text-center rounded-md py-1 px-2 w-fit font-bold ${
            newTipe == "penerimaan" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const newTipe = row.getValue("amount") as number;
      const formatted = commafy(newTipe);

      return (
        <div className="text-xs md:text-sm text-left font-medium">
          Rp{formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Edit / Delete",
    cell: ({ row }) => {
      const user = row.original;
      const _id = row.getValue("_id") as string;
      const kegiatanId = row.getValue("kegiatanId") as string;

      // UNTUK DATA EDIT
      const desc = row.getValue("desc") as string;
      const amount = row.getValue("amount") as number;
      const tipe = row.getValue("tipe") as string;
      const date = row.getValue("date") as string;

      const removeHandler = async (_id: string) => {
        const res = await fetch("http://localhost:3000/api/transaction", {
          method: "DELETE",
          body: JSON.stringify({ _id }),
        });
        if (res.ok) {
          await revalidateAll(kegiatanId);
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
            <InputPenerimaan
              kegiatanId={kegiatanId}
              tipe={"edit"}
              dataTransaksi={user}
            />
            <DropdownMenuItem
              onClick={() => removeHandler(_id)}
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
