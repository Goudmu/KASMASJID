import { BukuKasColumns } from "./column";
import { DataTable } from "./dataTable";

export default function BukuKasTable({ BukuKasSetting }: any) {
  return (
    <section>
      <DataTable columns={BukuKasColumns} data={BukuKasSetting} />
    </section>
  );
}
