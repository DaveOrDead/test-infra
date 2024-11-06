const createKindeAPI = async (baseURL) => {
  console.log("getting a token from baseURL", baseURL);

  const response = await kinde.fetch(`${baseURL}/oauth2/token`, {
    method: "POST",
    responseFormat: "json",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: new URLSearchParams({
      audience: `${baseURL}/api`,
      grant_type: "client_credentials",
      client_id: kinde.env.get("WF_M2M_CLIENT_ID")?.value,
      client_secret: kinde.env.get("WF_M2M_CLIENT_SECRET")?.value,
    }),
  });
  console.log("received response", response);
  const json = response.json;

  const kindeAPI = async (accessToken) => {
    console.log("creating kindeAPI with accessToken", accessToken);
    const callKindeAPI = async (method, endpoint, params) =>
      await kinde.fetch(`${baseURL}/api/v1/${endpoint}`, {
        method,
        responseFormat: "json",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: new URLSearchParams(params),
      });

    return {
      get: async (endpoint, params) =>
        await callKindeAPI("GET", endpoint, params).json,
      post: async (endpoint, params) =>
        await callKindeAPI("PATCH", endpoint, params).json,
      put: async (endpoint, params) =>
        await callKindeAPI("PUT", endpoint, params).json,
      delete: async (endpoint, params) =>
        await callKindeAPI("DELETE", endpoint, params).json,
    };
  };

  return kindeAPI(json.access_token);
};

export { createKindeAPI };
