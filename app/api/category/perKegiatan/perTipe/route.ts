import { Kategori2, Kegiatan2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams).get("id");
  const tipeKategori = new URLSearchParams(url.searchParams).get("tipe");
  try {
    await connectToDB();
    const category = await Kategori2.find({
      kegiatanId: searchParams,
      tipe: tipeKategori,
    });

    return NextResponse.json({ category: category });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
