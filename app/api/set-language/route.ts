import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  let lang = formData.get("lang") as string || "en";
  if (!["en", "vi"].includes(lang)) lang = "en";

  // Lấy base URL từ request
  const baseUrl = new URL(request.url).origin;

  // Tạo absolute URL
  const redirectUrl = `${baseUrl}/${lang}`;

  const response = NextResponse.redirect(redirectUrl);

  response.cookies.set("preferred_language", lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false,
    sameSite: "lax",
  });

  return response;
}
