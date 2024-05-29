import { columns } from "./column";
import { DataTable } from "./dataTable";

export default function KategoriTable({ kategoriSetting }: any) {
  return (
    <section>
      <DataTable columns={columns} data={kategoriSetting} />
    </section>
  );
}
