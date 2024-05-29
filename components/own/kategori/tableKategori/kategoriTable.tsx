"use client";
import { Suspense } from "react";
import { KategoriColumns } from "./column";
import { DataTable } from "./dataTable";

export default function KategoriTable({ kategoriSetting, params }: any) {
  const columns = KategoriColumns(params);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section>
        <DataTable columns={columns} data={kategoriSetting} />
      </section>
    </Suspense>
  );
}
