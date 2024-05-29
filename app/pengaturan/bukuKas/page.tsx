import { Separator } from "@/components/ui/separator";
import BukuKasForm from "./bukuKasForm";

export default function SettingsAccountPage({ searchParams }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Buku Kas</h3>
        <p className="text-sm text-muted-foreground">
          Kelola Buku Kasmu Disini
        </p>
      </div>
      <Separator />
      <BukuKasForm idParams={searchParams.id} />
    </div>
  );
}
