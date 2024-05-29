"use client";
import { KategoriColumns } from "./column";
import { DataTable } from "./dataTable";

export default function KategoriTable({ kategoriSetting }: any) {
  const columns = KategoriColumns();
  return (
    <section>
      <DataTable columns={columns} data={kategoriSetting} />
    </section>
  );
}
