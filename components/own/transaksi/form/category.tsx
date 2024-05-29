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

type Category = {
  _id: string;
  value: string;
  nama: string;
};

export function ComboboxDemo({
  setFormData,
  formData,
  tipe,
  kategoriNameEdit,
  kegiatanId,
}: any) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState<Category | null>(
    null
  );
  const [category, setCategory] = React.useState<Category[]>([]);

  const getData = async () => {
    const res = await fetch(
      `http://localhost:3000/api/category/perKegiatan/perTipe?id=${kegiatanId}&tipe=${tipe}`,
      {
        cache: "no-store",
      }
    )
      .then((res) => res.json())
      .then(({ category }) => {
        setCategory(category);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

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
              <>Cari Kategori...</>
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
  setSelectedStatus: (status: Category | null) => void;
  category: Category[];
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
                  ["kategoriId"]: status._id,
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
