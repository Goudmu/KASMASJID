"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidateAll(kegiatanId: string) {
  revalidatePath(`/dashboard?id=${kegiatanId}`);
  redirect(`/dashboard?id=${kegiatanId}`);
}
export async function revalidateBukukas(kegiatanId: string) {
  revalidatePath(`/pengaturan/bukuKas?id=${kegiatanId}`);
  redirect(`/pengaturan/bukuKas?id=${kegiatanId}`);
}
export async function revalidateKategori(kegiatanId: string) {
  revalidatePath(`/pengaturan/kategori?id=${kegiatanId}`);
  redirect(`/pengaturan/kategori?id=${kegiatanId}`);
}
