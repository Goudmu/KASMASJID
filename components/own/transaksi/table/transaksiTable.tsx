import { TransaksiColumns } from "./column";
import { DataTable } from "./dataTable";

export default async function TransaksiTable({ thisBukuKasTransaksi }: any) {
  return (
    <section>
      <DataTable columns={TransaksiColumns} data={thisBukuKasTransaksi} />
    </section>
  );
}
