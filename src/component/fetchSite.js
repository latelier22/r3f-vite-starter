import myFetch from "./myFetch";

async function fetchSite() {
  const channel = process.env.NEXT_PUBLIC_STRAPI_CHANNEL;
  const response = await myFetch(
    `/api/sites?populate=*&filters[channels][name][$eq]=${channel}`,
    "GET",
    null,
    "sites"
  );
  const data = response.data[0];
  const site = {
    id: data.id,
    ...data.attributes,
  };
  return site;
}
export default fetchSite;
