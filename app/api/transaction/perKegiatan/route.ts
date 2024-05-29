import { Transaksi2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams).get("id");
  try {
    await connectToDB();
    const transaksi = await Transaksi2.find({ kegiatanId: searchParams });

    return NextResponse.json({ transaksi: transaksi });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { kegiatanId, tipe } = await req.json();

    const transaksi = await Transaksi2.find();
    let newCat: any = [];
    transaksi.map((data: any) => {
      if (data.kegiatanId == kegiatanId && data.tipe == tipe) {
        newCat.push(data);
      }
    });

    return NextResponse.json({ transaksi: newCat });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
