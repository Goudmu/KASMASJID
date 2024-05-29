import InputKategori from "@/components/own/kategori/formKategori/InputKategori";
import KategoriTable from "@/components/own/kategori/tableKategori/kategoriTable";

const getData = async (kegiatanId: any) => {
  const res = await fetch(
    `http://localhost:3000/api/category/perKegiatan?id=${kegiatanId}`,
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .then(({ category }) => category);
  return res;
};

const KategoriForm = async ({ idParams }: any) => {
  const kategoriSetting = await getData(idParams);

  return (
    <div className=" flex flex-col gap-5">
      <div>
        <InputKategori
          tipe={"input"}
          kegiatanId={idParams}
          dataKategori={kategoriSetting}
        />
      </div>
      <div>
        <KategoriTable kategoriSetting={kategoriSetting} />
      </div>
    </div>
  );
};

export default KategoriForm;
