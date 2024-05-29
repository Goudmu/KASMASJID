import { Kegiatan2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const bukukas = await Kegiatan2.find();
    return NextResponse.json({ bukukas: bukukas, status: 200 });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { name, desc, userId } = await req.json();
    const bukukas = await Kegiatan2.create({
      name,
      desc,
      userId: "65fd03eacbed6186259b1a5e",
    });
    return NextResponse.json({ bukukas: bukukas, status: 200 });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const PUT = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { name, desc, userId, _id } = await req.json();
    const bukukas = await Kegiatan2.findByIdAndUpdate(
      { _id },
      {
        name,
        desc,
        userId: "65fd03eacbed6186259b1a5e",
      }
    );
    return NextResponse.json({ bukukas: bukukas, status: 200 });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { _id } = await req.json();
    const bukukas = await Kegiatan2.findByIdAndDelete({ _id });
    return NextResponse.json({ message: "success", status: 200 });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
