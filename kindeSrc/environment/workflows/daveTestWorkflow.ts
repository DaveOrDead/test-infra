import { createKindeAPI } from "./utils/getKindeAPI";

export const workflowSettings = {
  id: "addUserTokenClaim",
  name: "User token generation",
  trigger: "user:tokens_generation",
  bindings: {
    console: {},
    "kinde.fetch": {},
    "kinde.idToken": {
      resetClaims: true,
    },
    "kinde.accessToken": {
      resetClaims: true,
    },
  },
};

export default async function CanBeAnyName({ context, request }) {
  const baseURL = context.domains.kindeDomain;
  const kindeAPI = await createKindeAPI(baseURL);
  const users = await kindeAPI.get("users");
  console.log({ users });

  return "testing return";
}
