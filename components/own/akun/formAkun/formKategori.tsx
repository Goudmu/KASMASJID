"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { AlertDialogAction, AlertDialogCancel } from "../../../ui/alert-dialog";
import { revalidateKategori } from "@/lib/actions";
import { toast } from "react-toastify";
import { TipeComboBox } from "./tipeComboBox";

export default function ComponentKategori({
  kegiatanId,
  tipe,
  dataKategori,
}: any) {
  const [formData, setFormData] = useState(
    tipe == "edit"
      ? {
          _id: dataKategori._id,
          nama: dataKategori.nama,
          tipe: dataKategori.tipe,
          kegiatanId: dataKategori.kegiatanId,
        }
      : {
          nama: "",
          tipe: "",
          kegiatanId: kegiatanId,
        }
  );
  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const submitHandler = async () => {
    if (tipe == "edit") {
      const res = await fetch("/api/category", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Transaksi Berhasil diedit");
        await revalidateKategori(kegiatanId);
      }
    } else {
      const res = await fetch("/api/category", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Kategori Berhasil ditambahkan");
        await revalidateKategori(kegiatanId);
      }
    }
    setFormData({
      nama: "",
      tipe: "",
      kegiatanId: kegiatanId,
    });
  };
  return (
    <div className="space-y-8 w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nama">Nama Kategori</Label>
          <Input
            id="nama"
            placeholder="Enter your nama"
            value={formData.nama}
            onChange={changeHandler}
          />
        </div>
        <div>
          <div>
            <Label htmlFor="name">Category</Label>
          </div>
          <div className=" w-full">
            <TipeComboBox
              tipe={formData.tipe}
              kategoriNameEdit={tipe == "edit" ? formData.tipe : ""}
              setFormData={setFormData}
              formData={formData}
              kegiatanId={kegiatanId}
            />
          </div>
        </div>
        {/* <div className="space-y-2">
          <Label htmlFor="tipe">Tipe Kategori</Label>
          <Input
            id="tipe"
            placeholder="Enter your tipe"
            value={formData.tipe}
            onChange={changeHandler}
          />
        </div> */}
      </div>
      <div className=" flex justify-between">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={submitHandler}>
          {tipe == "edit" ? "Edit" : "Input"}
        </AlertDialogAction>
      </div>
    </div>
  );
}
