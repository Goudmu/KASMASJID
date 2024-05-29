import { columns } from "./column";
import { DataTable } from "./dataTable";

export default async function LaporanTablePerKategori({
  transaksiLaporan,
}: any) {
  return (
    <section>
      <DataTable columns={columns} data={transaksiLaporan} />
    </section>
  );
}
