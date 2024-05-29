"use client";
import { KategoriColumns } from "./column";
import { DataTable } from "./dataTable";

export default function KategoriTable({ kategoriSetting, params }: any) {
  const columns = KategoriColumns(params);
  return (
    <section>
      <DataTable columns={columns} data={kategoriSetting} />
    </section>
  );
}
