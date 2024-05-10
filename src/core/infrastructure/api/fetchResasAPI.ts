import { getURLParams } from "../../../helpers/getURLParams";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache: { [key: string]: any } = {};

export const fetchResasAPI = async (
  endpoint: string,
  method: string = "GET",
  body?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  const API_KEY =
    import.meta.env.VITE_RESAS_API_KEY ||
    getURLParams(window.location.href).resas_api_key;
  if (!API_KEY) {
    throw new Error(
      "'RESAS_API_KEY' is not defined. Please set the environment variable 'VITE_RESAS_API_KEY' during the build process or the URL parameter 'resas_api_key'.",
    );
  }

  if (method === "GET" && cache[endpoint]) {
    return cache[endpoint];
  }

  const options: RequestInit = {
    method,
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(
    `https://opendata.resas-portal.go.jp/${endpoint}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch with status code ${response.status}.`);
  }

  let responseJson;
  try {
    responseJson = await response.json();
  } catch (error) {
    throw new Error("Failed to parse response as JSON.");
  }

  if (!("result" in responseJson)) {
    throw new Error("Response does not have 'result' field.");
  }

  if (method === "GET") {
    cache[endpoint] = responseJson.result;
  }

  return responseJson.result;
};
