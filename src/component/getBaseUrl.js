export default function getBaseUrl(url) {
    const baseUrl = url.startsWith('/uploads')
      ? process.env.NEXT_PUBLIC_STRAPI_URL
      : `images/`;
    return baseUrl;
  }
