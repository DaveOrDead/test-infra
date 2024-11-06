import { createKindeAPI } from "../utils/getKindeAPI";

export const workflowSettings = {
  id: "addUserTokenClaim",
  name: "User token generation",
  failurePolicy: {
    action: "continue",
  },
  trigger: "user:tokens_generation",
  bindings: {
    console: {},
    "kinde.fetch": {},
    "kinde.idToken": {},
    "kinde.accessToken": {},
    "kinde.env": {},
    url: {},
  },
};

export default {
  async canBeAnyName({ context, request }) {
    const baseURL = context.domains.kindeDomain;
    const kindeAPI = await createKindeAPI(baseURL);
    const users = await kindeAPI.get("users");
    console.log({ users });

    return "testing return";
  },
};
