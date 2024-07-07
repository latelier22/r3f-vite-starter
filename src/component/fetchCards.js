import myFetch from "./myFetch";

async function fetchPages(pageSlug = 'accueil') {
  const channel = process.env.NEXT_PUBLIC_STRAPI_CHANNEL;
  let url = `/api/pages?filters[channel][name][$eq]=${channel}&populate[0]=cards&populate[1]=cards.image`;

  // If pageSlug is provided, add a filter for it
  if (pageSlug) {
    url += `&filters[slug][$eq]=${pageSlug}`;
  }

  try {
    const response = await myFetch(url, "GET", null, "pages");
    
    // Check if response has data and data array is not empty
    if (response && response.data && response.data.length > 0) {
      const data = response.data[0];

      // Check if data.attributes exist and has cards
      const cards = data.attributes && data.attributes.cards ? data.attributes.cards : [];

      return cards;
    } else {
      console.warn(`No data found for pageSlug: ${pageSlug}`);
      return []; // Return empty array if no data found
    }
  } catch (error) {
    console.error("Error fetching pages:", error);
    return []; // Return empty array in case of error
  }
}

export default fetchPages;
