import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/pengaturan/sidebar/sidebar";

export const metadata: Metadata = {
  title: "Laporan",
  description: "Create Laporan Penerimaan dan Pengeluaran Kas",
};

const sidebarNavItems = [
  {
    title: "Laporan Per Bulan",
    href: "/laporan",
  },
  {
    title: "Laporan Per Kategori",
    href: "/laporan/kategori",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 ">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Laporan</h2>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
