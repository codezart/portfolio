import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.json();
  formData.access_key = process.env.WEB3FORMS_ACCESS_KEY;

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
