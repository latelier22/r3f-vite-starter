import myFetch from "./myFetch";

async function fetchPages(pageSlug = null) {
  const channel = process.env.NEXT_PUBLIC_STRAPI_CHANNEL;
  let url = `/api/pages?filters[channel][name][$eq]=${channel}&populate[0]=avantApres&populate[1]=avantApres.avant&populate[2]=avantApres.apres&populate[3]=photos&populate[4]=section`;
  // If pageSlug is provided, add a filter for it
  if (pageSlug) {
    url += `&filters[slug][$eq]=${pageSlug}`;
  }

  const response = await myFetch(url, "GET", null, "pages");
  const data = response.data;

  const pages = data.map((item) => {
    return {
      id: item.id,
      ...item.attributes,
    };
  });

  // If a pageSlug was provided, return the specific page, otherwise return all pages
  if (pageSlug) {
    return pages.length > 0 ? pages[0] : null;
  }

  return pages;
}

export default fetchPages;










// // 20240611150723
// // http://vps.latelier22.fr:1336/api/pages?populate=*&filters[channels][name][$eq]=TOITURES%20ET%20TRAVAUX

// {
//     "data": [
//       {
//         "id": 1,
//         "attributes": {
//           "title": "Fuite",
//           "tags": "Fuite, réparation, urgence, toiture, eau",
//           "description": "Votre toiture présente une fuite ou une fissure ? Il est impératif d'agir rapidement pour éviter des dommages plus importants. Notre équipe est disponible 7 jours sur 7, 24 heures sur 24, pour intervenir en cas d'urgence. Nous proposons des solutions rapides et efficaces, y compris la pose de bâche en urgence, la mise hors d'eau prioritaire, et le remplacement des tuiles, ardoises, et tôles défectueuses.",
//           "createdAt": "2024-06-11T13:05:12.798Z",
//           "updatedAt": "2024-06-11T13:05:12.798Z",
//           "photos": {
//             "data": [
//               {
//                 "id": 1,
//                 "attributes": {
//                   "name": "photo-fuite2.png",
//                   "alternativeText": null,
//                   "caption": null,
//                   "width": 290,
//                   "height": 384,
//                   "formats": {
//                     "thumbnail": {
//                       "name": "thumbnail_photo-fuite2.png",
//                       "hash": "thumbnail_photo_fuite2_89ee15dd02",
//                       "ext": ".png",
//                       "mime": "image/png",
//                       "path": null,
//                       "width": 118,
//                       "height": 156,
//                       "size": 35.68,
//                       "sizeInBytes": 35682,
//                       "url": "/uploads/thumbnail_photo_fuite2_89ee15dd02.png"
//                     }
//                   },
//                   "hash": "photo_fuite2_89ee15dd02",
//                   "ext": ".png",
//                   "mime": "image/png",
//                   "size": 48.34,
//                   "url": "/uploads/photo_fuite2_89ee15dd02.png",
//                   "previewUrl": null,
//                   "provider": "local",
//                   "provider_metadata": null,
//                   "createdAt": "2024-06-11T13:02:33.872Z",
//                   "updatedAt": "2024-06-11T13:02:33.872Z"
//                 }
//               },
//               {
//                 "id": 2,
//                 "attributes": {
//                   "name": "photo-fuite1.png",
//                   "alternativeText": null,
//                   "caption": null,
//                   "width": 800,
//                   "height": 455,
//                   "formats": {
//                     "thumbnail": {
//                       "name": "thumbnail_photo-fuite1.png",
//                       "hash": "thumbnail_photo_fuite1_7b90b988f8",
//                       "ext": ".png",
//                       "mime": "image/png",
//                       "path": null,
//                       "width": 245,
//                       "height": 139,
//                       "size": 67.81,
//                       "sizeInBytes": 67813,
//                       "url": "/uploads/thumbnail_photo_fuite1_7b90b988f8.png"
//                     },
//                     "small": {
//                       "name": "small_photo-fuite1.png",
//                       "hash": "small_photo_fuite1_7b90b988f8",
//                       "ext": ".png",
//                       "mime": "image/png",
//                       "path": null,
//                       "width": 500,
//                       "height": 284,
//                       "size": 233.49,
//                       "sizeInBytes": 233487,
//                       "url": "/uploads/small_photo_fuite1_7b90b988f8.png"
//                     },
//                     "medium": {
//                       "name": "medium_photo-fuite1.png",
//                       "hash": "medium_photo_fuite1_7b90b988f8",
//                       "ext": ".png",
//                       "mime": "image/png",
//                       "path": null,
//                       "width": 750,
//                       "height": 427,
//                       "size": 464.31,
//                       "sizeInBytes": 464309,
//                       "url": "/uploads/medium_photo_fuite1_7b90b988f8.png"
//                     }
//                   },
//                   "hash": "photo_fuite1_7b90b988f8",
//                   "ext": ".png",
//                   "mime": "image/png",
//                   "size": 111.77,
//                   "url": "/uploads/photo_fuite1_7b90b988f8.png",
//                   "previewUrl": null,
//                   "provider": "local",
//                   "provider_metadata": null,
//                   "createdAt": "2024-06-11T13:02:33.968Z",
//                   "updatedAt": "2024-06-11T13:02:33.968Z"
//                 }
//               }
//             ]
//           },
//           "section": [
//             {
//               "id": 1,
//               "title": "Nous agissons vite et bien",
//               "body": "- Intervention rapide en cas de tempête ou de fuite de toiture\n- Pose urgente de bâche pour prévenir les infiltrations d'eau\n- Mise hors d'eau prioritaire pour minimiser les dégâts\n- Remplacement immédiat des tuiles, ardoises, et tôles endommagées\n- Service disponible 7 jours sur 7, 24 heures sur 24"
//             }
//           ],
//           "channels": {
//             "data": [
//               {
//                 "id": 1,
//                 "attributes": {
//                   "name": "TOITURES ET TRAVAUX",
//                   "active": true,
//                   "createdAt": "2024-06-11T11:28:57.996Z",
//                   "updatedAt": "2024-06-11T11:28:57.996Z"
//                 }
//               }
//             ]
//           }
//         }
//       }
//     ],
//     "meta": {
//       "pagination": {
//         "page": 1,
//         "pageSize": 25,
//         "pageCount": 1,
//         "total": 1
//       }
//     }
//   }