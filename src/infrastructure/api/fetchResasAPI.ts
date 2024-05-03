import { getURLParams } from "../../helpers/getURLParams";

export const fetchResasAPI = async (
  endpoint: string,
  method: string = "GET",
  body?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  const API_KEY =
    import.meta.env.VITE_RESAS_API_KEY ||
    getURLParams(window.location.href).resas_api_key;
  if (!API_KEY) {
    throw new Error("RESAS_API_KEY is not defined");
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
  const data = await response.json();
  return data.result;
};
