import { LaporanPerKategoriColumns } from "./column";
import { DataTable } from "./dataTable";

export default async function LaporanTablePerKategori({
  transaksiLaporan,
}: any) {
  return (
    <section>
      <DataTable columns={LaporanPerKategoriColumns} data={transaksiLaporan} />
    </section>
  );
}
