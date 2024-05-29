"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { AlertDialogAction, AlertDialogCancel } from "../../../ui/alert-dialog";
import { revalidateBukukas } from "@/lib/actions";
import { toast } from "react-toastify";

export default function ComponentBukuKas({
  kegiatanId,
  tipe,
  dataBukukas,
}: any) {
  const [formData, setFormData] = useState(
    tipe == "edit"
      ? {
          _id: dataBukukas._id,
          desc: dataBukukas.desc,
          name: dataBukukas.name,
        }
      : {
          desc: "",
          name: "",
        }
  );
  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const submitHandler = async (e: any) => {
    if (tipe == "edit") {
      const res = await fetch("/api/bukukas", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Buku Kas Berhasil diedit");
        await revalidateBukukas(kegiatanId);
      }
    } else {
      const res = await fetch("/api/bukukas", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Buku Kas Berhasil ditambahkan");
        await revalidateBukukas(kegiatanId);
      }
    }
    setFormData({
      desc: "",
      name: "",
    });
  };
  return (
    <div className="space-y-8 w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={changeHandler}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc">Desc</Label>
          <Input
            id="desc"
            placeholder="Enter your desc"
            value={formData.desc}
            onChange={changeHandler}
          />
        </div>
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
