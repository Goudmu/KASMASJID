import { User2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const user = await User2.find();
    return NextResponse.json({ user: user });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
