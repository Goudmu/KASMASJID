import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req: any) {
  console.log(req.nextUrl.pathname);
  console.log(req.nextauth.token.role);

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
