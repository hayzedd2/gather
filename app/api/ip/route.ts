

export const GET = async () => {
  const token = process.env.IP_ACCESS_TOKEN;
  if (!token) {
    return Response.json({ message: "Missing token" }, { status: 500 });
  }
  const res = await fetch(`https://ipinfo.io/json?token=${token}`).catch(() =>
    null
  );
  const ipData = res ? await res.json() : { country: "Unknown", ip: "" };
  return Response.json(ipData, { status: 200 });
};
