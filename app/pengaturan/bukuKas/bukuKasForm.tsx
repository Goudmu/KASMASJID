import InputBukuKas from "@/components/own/bukukas/formBukuKas/InputBukuKas";
import BukuKasTable from "@/components/own/bukukas/tableBukukas/bukuKasTable";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/bukukas", {
    cache: "no-store",
  })
    .then((res) => res.json())
    .then(({ bukukas }) => bukukas);
  return res;
};

const BukuKasForm = async ({ idParams }: any) => {
  const BukuKasSetting = await getData();

  return (
    <div className=" flex flex-col gap-5">
      <div>
        <InputBukuKas
          tipe={"input"}
          dataBukukas={BukuKasSetting}
          kegiatanId={idParams}
        />
      </div>
      <div>
        <BukuKasTable BukuKasSetting={BukuKasSetting} />
      </div>
    </div>
  );
};

export default BukuKasForm;
