import { KategoriColumns } from "./column";
import { DataTable } from "./dataTable";

export default function KategoriTable({ kategoriSetting }: any) {
  return (
    <section>
      <DataTable columns={KategoriColumns} data={kategoriSetting} />
    </section>
  );
}
