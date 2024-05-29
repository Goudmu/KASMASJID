import { columns } from "./column";
import { DataTable } from "./dataTable";

export default function BukuKasTable({ BukuKasSetting }: any) {
  return (
    <section>
      <DataTable columns={columns} data={BukuKasSetting} />
    </section>
  );
}
