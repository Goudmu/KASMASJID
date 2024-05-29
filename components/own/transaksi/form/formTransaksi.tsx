"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { AlertDialogAction, AlertDialogCancel } from "../../../ui/alert-dialog";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ComboboxDemo } from "./category";
import { revalidateAll } from "@/lib/actions";
import { toast } from "react-toastify";

export default function ComponentTransaction({
  kegiatanId,
  tipe,
  dataTransaksi,
}: any) {
  const [formData, setFormData] = useState(
    tipe == "edit"
      ? {
          _id: dataTransaksi._id,
          desc: dataTransaksi.desc,
          amount: dataTransaksi.amount,
          tipe: dataTransaksi.tipe,
          date: dataTransaksi.date,
          kategoriId: dataTransaksi.kategoriId,
          kegiatanId: kegiatanId,
        }
      : {
          desc: "",
          amount: 0,
          tipe: tipe,
          date: new Date(),
          kategoriId: "",
          kegiatanId: kegiatanId,
        }
  );
  const [date, setDate] = React.useState<Date>();
  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const submitHandler = async (e: any) => {
    let newFormData = formData;
    if (date != undefined) newFormData.date = new Date(date.toISOString());

    if (tipe == "edit") {
      const res = await fetch("/api/transaction", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Transaksi Berhasil diedit");
        await revalidateAll(kegiatanId);
      }
    } else {
      const res = await fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Transaksi Berhasil ditambahkan");
        await revalidateAll(kegiatanId);
      }
    }
    setFormData({
      desc: "",
      amount: 0,
      tipe: tipe,
      date: new Date(),
      kategoriId: "",
      kegiatanId: kegiatanId,
    });
  };
  return (
    <div className="space-y-8 w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className=" w-full flex flex-row gap-5 justify-between">
            {/* TANGGAL */}
            <div>
              <div>
                <Label htmlFor="name">Tanggal</Label>
              </div>
              <div className=" w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {/* CATEGORY */}
            <div>
              <div>
                <Label htmlFor="name">Category</Label>
              </div>
              <div className=" w-full">
                <ComboboxDemo
                  tipe={formData.tipe}
                  kategoriNameEdit={
                    tipe == "edit" ? dataTransaksi.kategoriName : ""
                  }
                  setFormData={setFormData}
                  formData={formData}
                  kegiatanId={kegiatanId}
                />
              </div>
            </div>
          </div>
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
        <div className="space-y-2">
          <Label htmlFor="amount">Jumlah</Label>
          <Input
            id="amount"
            placeholder="Masukkan Nominal"
            value={formData.amount}
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
