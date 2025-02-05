import { NextRequest } from "next/server";

export const GET = async () => {
  const token = process.env.IP_ACCESS_TOKEN;
  if (!token) {
    return Response.json({ message: "Missing token" }, { status: 500 });
  }
  const res = await fetch(`https://ipinfo.io/json?token=${token}`);
  const {country, ip} = await res.json();
  return Response.json({ country,ip }, { status: 200 });
};
