import { LaporanPerBulanColumns } from "./columnPenerimaan";
import { DataTable } from "./dataTable";

export default async function LaporanTable({ transaksiLaporan }: any) {
  return (
    <section>
      <DataTable columns={LaporanPerBulanColumns} data={transaksiLaporan} />
    </section>
  );
}
