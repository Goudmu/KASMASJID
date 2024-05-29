"use client";

import * as React from "react";

import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { capitalizeFirstLetter } from "@/lib/utils";

type TipeKategori = {
  nama: string;
};

export function TipeComboBox({ setFormData, formData, kategoriNameEdit }: any) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] =
    React.useState<TipeKategori | null>(null);
  const [category, setCategory] = React.useState<TipeKategori[]>([
    {
      nama: "penerimaan",
    },
    {
      nama: "pengeluaran",
    },
  ]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? (
              <>{capitalizeFirstLetter(selectedStatus.nama)}</>
            ) : kategoriNameEdit != "" ? (
              <>{capitalizeFirstLetter(kategoriNameEdit)}</>
            ) : (
              <>Pilih Tipe Kategori...</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            category={category}
            setFormData={setFormData}
            formData={formData}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.nama}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            category={category}
            setFormData={setFormData}
            formData={formData}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  category,
  setFormData,
  formData,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: TipeKategori | null) => void;
  category: TipeKategori[];
  setFormData: any;
  formData: any;
}) {
  return (
    <Command>
      <CommandInput placeholder="Cari Kategori" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {category?.map((status, index) => (
            <CommandItem
              key={index}
              value={status.nama}
              onSelect={(value) => {
                setSelectedStatus(
                  category.find((priority) => priority.nama === value) || null
                );
                setOpen(false);
                setFormData({
                  ...formData,
                  ["tipe"]: status.nama,
                });
              }}
            >
              {capitalizeFirstLetter(status.nama)}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
