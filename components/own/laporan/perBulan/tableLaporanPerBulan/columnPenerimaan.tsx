"use client";

import { ColumnDef } from "@tanstack/react-table";
import { capitalizeFirstLetter, commafy } from "@/lib/utils";

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

export const LaporanPerBulanColumns: ColumnDef<TransactionType>[] = [
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
    accessorKey: "amount",
    header: "Penerimaan",
    cell: ({ row }) => {
      const user = row.original;
      const newTipe = row.getValue("amount") as number;
      const formatted = commafy(newTipe);

      return (
        <div className="text-xs md:text-sm text-left font-medium">
          {user.tipe == "penerimaan" ? `Rp${formatted}` : "Rp0"}
        </div>
      );
    },
  },
  {
    accessorKey: "amount2",
    header: "Pengeluaran",
    cell: ({ row }) => {
      const user = row.original;
      const newTipe = row.getValue("amount") as number;
      const formatted = commafy(newTipe);

      return (
        <div className="text-xs md:text-sm text-left font-medium">
          {user.tipe == "pengeluaran" ? `Rp${formatted}` : "Rp0"}
        </div>
      );
    },
  },
];
