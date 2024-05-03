export const getURLParams = (url: string): Record<string, string> => {
  const params = url.split("?")[1];
  if (!params) return {};
  const paramsArray = params.split("&");
  return paramsArray.reduce((acc, param) => {
    const [key, value] = param.split("=");
    return { ...acc, [key]: value };
  }, {});
};
