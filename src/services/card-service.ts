import { GET } from "./rest-service";

const API = "https://ringsdb.com/api";

export async function getDeck(id: string) {
  const url = `${API}/oauth2/deck/load/${id}`;
  return await GET(url)
    // .then(res => JSON.parse(res))
    .catch((err) => {
      console.error(err);
    });
}

export async function getCard(id: string) {
  const url = `${API}/public/card/${id}.json`;
  return await GET(url)
    // .then(res => JSON.parse(res))
    .catch((err) => {
      console.error(err);
    });
}
