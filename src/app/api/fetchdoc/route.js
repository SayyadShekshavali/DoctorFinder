import { NextResponse } from "next/server";
import Doctor from "@/app/lib/Doctor.Model";
import Connect from "@/app/lib/mdbconnect";

export async function POST(req) {
  try {
    await Connect();

    const {
      name,
      specialist,
      checkupfee,
      location,
      experience,
      worktype,
      language,
    } = await req.json();

    const conditions = [];

    if (name) conditions.push({ Name: name });
    if (specialist) conditions.push({ Specialist: specialist });
    if (checkupfee) conditions.push({ Checkupfee: checkupfee });
    if (location) conditions.push({ Location: location });
    if (experience) conditions.push({ Experience: experience });
    if (worktype) conditions.push({ worktype });
    if (language?.length > 0) {
      conditions.push({ language: { $in: language } });
    }

    const query = conditions.length > 0 ? { $and: conditions } : {};

    const found = await Doctor.find(query);

    return NextResponse.json({ success: true, data: found }, { status: 200 });
  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
