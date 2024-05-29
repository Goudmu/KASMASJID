import InputPenerimaan from "@/components/own/transaksi/form/InputPenerimaan";
import { TransactionType } from "@/components/own/transaksi/table/column";
import TransaksiTable from "@/components/own/transaksi/table/transaksiTable";
import { CategoryType } from "@/lib/mongodb/models";
import { getMonthById } from "@/lib/utils";
import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export async function getCategory(params: any): Promise<CategoryType[]> {
  const res = await fetch(
    `http://localhost:3000/api/category/perKegiatan?id=${params.id}`,
    {
      cache: "no-store",
    }
  );
  const { category } = await res.json();
  return category;
}
export async function getTransactions(
  kategori: any,
  searchParams: any
): Promise<TransactionType[]> {
  const res = await fetch(
    `http://localhost:3000/api/transaction/perKegiatan?id=${searchParams.id}`,
    {
      cache: "no-store",
    }
  );
  const { transaksi } = await res.json();
  transaksi.map((dataTransaksi: TransactionType) => {
    kategori.map((dataKategori: CategoryType) => {
      if (dataTransaksi.kategoriId == dataKategori._id) {
        const date = new Date(dataTransaksi.date).getMonth();
        const formatted = getMonthById(date);
        dataTransaksi.kategoriName = dataKategori.nama;
        dataTransaksi.month = formatted;
        dataTransaksi.year = new Date(dataTransaksi.date)
          .getFullYear()
          .toString();
        return;
      }
    });
  });
  return transaksi;
}

const Dashboard = async ({ searchParams }: any) => {
  const thisBukuKasKategori = await getCategory(searchParams);
  const thisBukuKasTransaksi = await getTransactions(
    thisBukuKasKategori,
    searchParams
  );
  const session = await getServerSession(options);
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col m-auto w-[80%] gap-10 mt-8">
      <div className="flex w-full justify-end gap-5">
        <InputPenerimaan kegiatanId={searchParams.id} tipe={"penerimaan"} />
        <InputPenerimaan kegiatanId={searchParams.id} tipe={"pengeluaran"} />
      </div>
      <div className=" w-full">
        <TransaksiTable thisBukuKasTransaksi={thisBukuKasTransaksi} />
      </div>
    </div>
  );
};

export default Dashboard;
