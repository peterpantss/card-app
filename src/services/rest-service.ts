export async function GET(url: string) {
  return await fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
}
