"use client";
import InputBukuKas from "@/components/own/bukukas/formBukuKas/InputBukuKas";
import BukuKasTable from "@/components/own/bukukas/tableBukukas/bukuKasTable";
import { useEffect, useState } from "react";

const BukuKasForm = ({ idParams }: any) => {
  const [BukuKasSetting, setBukuKasSetting] = useState();

  const getData = async () => {
    const res = await fetch("http://localhost:3000/api/bukukas", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then(({ bukukas }) => {
        setBukuKasSetting(bukukas);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (BukuKasSetting == null || BukuKasSetting == undefined) {
    return <div>Loading...</div>;
  }

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
