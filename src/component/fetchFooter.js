import myFetch from "./myFetch";

async function fetchFooter() {
  const channel = process.env.NEXT_PUBLIC_STRAPI_CHANNEL;
  const response = await myFetch(
    `/api/footers?populate=*&filters[channels][name][$eq]=${channel}`,
    "GET",
    null,
    "footers"
  );
  const data = response.data[0];
  
  // Extracting and formatting the footer data
  const footer = {
    id: data.id,
    createdAt: data.attributes.createdAt,
    updatedAt: data.attributes.updatedAt,
    channels: data.attributes.channels.data,
    messages: data.attributes.message.reduce((acc, msg) => {
      acc[msg.title] = msg.message;
      return acc;
    }, {}),
  };


  return footer;
}

export default fetchFooter;
