import { Client } from '@googlemaps/google-maps-services-js';
import dotenv from 'dotenv';

dotenv.config();

export const reverseGeocodeLocation = async ({
  latitude,
  longitude,
} : {
  latitude: number
  longitude: number,
}) => {
  const client = new Client({});
  try {
    const res = await client.reverseGeocode({
      params: {
        latlng: {
          latitude,
          longitude,
        },
        key: process.env.GOOGLE_MAPS_API_KEY as string,
      },
      timeout: 1000, // milliseconds
    });
    return res.data.results;
  } catch (e: any) {
    throw e.response.data.error_message;
  }
};

export const textSearchLocation = async ({
  query,
} : {
  query: string,
}) => {
  const client = new Client({});
  try {
    const res = await client.textSearch({
      params: {
        query,
        key: process.env.GOOGLE_MAPS_API_KEY as string,
      },
      timeout: 1000, // milliseconds
    });
    return res.data;
  } catch (e: any) {
    throw e.response.data.error_message;
  }
};

export const placeDetailLocation = async ({
  placeId,
} : {
  placeId: string,
}) => {
  const client = new Client({});
  try {
    const res = await client.placeDetails({
      params: {
        place_id: placeId,
        key: process.env.GOOGLE_MAPS_API_KEY as string,
      },
      timeout: 1000, // milliseconds
    });
    return res.data;
  } catch (e: any) {
    throw e.response.data.error_message;
  }
};

// export const isLatLongAccessible = async ({
//   latitude,
//   longitude,
// } : {
//   latitude: number
//   longitude: number,
// }) => {
//   const placeId: string = await reverseGeocodeLocation({ latitude, longitude });
//   console.log(placeId);
//   const placeDetail = await placeDetailLocation({
//     placeId,
//   });
//   console.log(placeDetail);
// };

// placeId = ChIJEYl1T93JtEwRzAi5TUxXuL0