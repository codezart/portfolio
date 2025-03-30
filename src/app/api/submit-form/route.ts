import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.json();
  formData.access_key = "d5c2517e-e6fd-4d4d-ad80-7be420ec7564";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
