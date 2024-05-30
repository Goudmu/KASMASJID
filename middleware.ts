import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req: any) {
  if (
    req.nextUrl.pathname.startsWith(
      "/(pengaturan|pengaturan/.*|laporan|laporan/.*)"
    )
  ) {
    return NextResponse.rewrite(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/(pengaturan|pengaturan/.*|laporan|laporan/.*)"],
};
