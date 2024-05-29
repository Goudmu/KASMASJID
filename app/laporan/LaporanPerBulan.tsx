import LaporanTable from "@/components/own/laporan/perBulan/tableLaporanPerBulan/transaksiTable";
import { getCategory, getTransactions } from "../dashboard/page";

const LaporanPerBulan = async ({ idParams }: any) => {
  const thisBukuKasKategori = await getCategory(idParams);
  const thisBukuKasTransaksi = await getTransactions(
    thisBukuKasKategori,
    idParams
  );

  return (
    <div className=" flex flex-col gap-5">
      <div>
        <LaporanTable transaksiLaporan={thisBukuKasTransaksi} />
      </div>
    </div>
  );
};

export default LaporanPerBulan;
