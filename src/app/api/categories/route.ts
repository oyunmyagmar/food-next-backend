export async function GET() {
  const categories = ["Appetizers", "Salads", "Pizzas"];
  return Response.json({ data: categories });
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  return Response.json({ message: "Hello from POST Categories" });
}
// export const dynamic = "force-static";

// export async function GET() {
//   const res = await fetch("https://data.mongodb-api.com/...", {
//     headers: {
//       "Content-Type": "application/json",
//       "API-Key": process.env.DATA_API_KEY,
//     },
//   });
//   const data = await res.json();

//   return Response.json({ data });
// }
