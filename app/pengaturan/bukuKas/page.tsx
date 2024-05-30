"use client";
import { Separator } from "@/components/ui/separator";
import BukuKasForm from "./bukuKasForm";
import { useSearchParams } from "next/navigation";

export default function SettingsAccountPage() {
  const params = useSearchParams().getAll("id")[0];
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Buku Kas</h3>
        <p className="text-sm text-muted-foreground">
          Kelola Buku Kasmu Disini
        </p>
      </div>
      <Separator />
      <BukuKasForm idParams={params} />
    </div>
  );
}
