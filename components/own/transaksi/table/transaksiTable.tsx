import { columns } from "./column";
import { DataTable } from "./dataTable";

export default async function TransaksiTable({ thisBukuKasTransaksi }: any) {
  // console.log(thisBukuKasTransaksi);
  return (
    <section>
      <DataTable columns={columns} data={thisBukuKasTransaksi} />
    </section>
  );
}
