import { Kategori2, Transaksi2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const category = await Kategori2.find();
    return NextResponse.json({ category: category });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { kegiatanId, nama, tipe } = await req.json();
    const category = await Kategori2.create({
      kegiatanId,
      nama,
      tipe,
    });
    return NextResponse.json({ category: category });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { nama, tipe, _id } = await req.json();
    const category = await Kategori2.findByIdAndUpdate(
      { _id },
      {
        nama,
        tipe,
      }
    );
    return NextResponse.json({ category: category });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { _id } = await req.json();
    const category = await Kategori2.findOneAndDelete({ _id });
    const thiCatTransaksi = await Transaksi2.deleteMany({ kategoriId: _id });
    return NextResponse.json({ message: "Kategori berhasil dihapus" });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
