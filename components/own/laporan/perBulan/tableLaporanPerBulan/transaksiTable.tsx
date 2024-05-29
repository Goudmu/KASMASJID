import { columns } from "./columnPenerimaan";
import { DataTable } from "./dataTable";

export default async function LaporanTable({ transaksiLaporan }: any) {
  return (
    <section>
      <DataTable columns={columns} data={transaksiLaporan} />
    </section>
  );
}
