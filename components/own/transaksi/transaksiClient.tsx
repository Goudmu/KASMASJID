import InputPenerimaan from "@/components/own/transaksi/form/InputPenerimaan";
// import { Transaction } from "@/components/own/transaksi/table/column";
import TransaksiTable from "@/components/own/transaksi/table/transaksiTable";
import { CategoryType } from "@/lib/mongodb/models";
import { getMonthById } from "@/lib/utils";
import React from "react";
import { TransactionType } from "./table/column";

async function getCategory(params: any): Promise<CategoryType[]> {
  const res = await fetch(
    `http://localhost:3000/api/category/perKegiatan?idKegiatan=${params.id}`,
    {
      cache: "no-store",
    }
  );
  const { category } = await res.json();
  return category;
}
async function getTransactions(kategori: any): Promise<TransactionType[]> {
  const res = await fetch("http://localhost:3000/api/transaction", {
    cache: "no-store",
  });
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
  const thisBukuKasTransaksi = await getTransactions(thisBukuKasKategori);
  return (
    <div className="flex flex-col">
      <div className=" items-center text-center">
        <h1>DASHBOARD</h1>
      </div>
      <div>
        <InputPenerimaan />
      </div>
      <div className="">
        <TransaksiTable thisBukuKasTransaksi={thisBukuKasTransaksi} />
      </div>
    </div>
  );
};

export default Dashboard;

/*
"use client";
import { LoadingSpinner } from "@/components/own/spinner";
import InputPenerimaan from "@/components/own/transaksi/form/InputPenerimaan";
import TransaksiTable from "@/components/own/transaksi/table/transaksiTable";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [thisBukuKasTransaksi, setthisBukuKasTransaksi] = useState();
  const params = useSearchParams().getAll("id")[0];

  const getTransaction = async () => {
    const res = await fetch(
      `http://localhost:3000/api/transaction/perKegiatan?id${params}`,
      {
        cache: "no-store",
      }
    );
    const { transaksi } = await res.json();
    setthisBukuKasTransaksi(transaksi);
  };

  useEffect(() => {
    getTransaction();
  }, []);
  if (thisBukuKasTransaksi == null) {
    return (
      <div className=" w-screen h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (thisBukuKasTransaksi != null) {
    return (
      <div className="flex flex-col">
        <div className=" items-center text-center">
          <h1>DASHBOARD</h1>
        </div>
        <div>
          <InputPenerimaan />
        </div>
        <div className="">
          <TransaksiTable thisBukuKasTransaksi={thisBukuKasTransaksi} />
        </div>
      </div>
    );
  }
};

export default Dashboard;

*/
