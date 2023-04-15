import axios from 'axios';

const BATHROOM_URL = 'www.refugerestrooms.org/api/';

export const textSearchBathroom = async ({
  query,
}: {
  query: string,
}) => {
  return axios
    .post(`${BATHROOM_URL}/v1/restrooms/search?query=${query}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const reverseGeocodeBathroom = async ({
  latitude,
  longitude,
} : {
  latitude: number
  longitude: number,
}) => {
  return axios
    .post(`${BATHROOM_URL}/v1/restrooms/by_location?lat=${latitude}&lng=${longitude}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};