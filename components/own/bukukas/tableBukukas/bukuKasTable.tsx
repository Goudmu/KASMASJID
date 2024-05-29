"use client";
import { BukuKasColumns2 } from "./column";
import { DataTable } from "./dataTable";

export default function BukuKasTable({ BukuKasSetting }: any) {
  const columns = BukuKasColumns2();
  return (
    <section>
      <DataTable columns={columns} data={BukuKasSetting} />
    </section>
  );
}
