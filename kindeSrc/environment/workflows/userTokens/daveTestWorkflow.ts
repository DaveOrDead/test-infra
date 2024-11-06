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

export default async function canBeAnyName({ context, request }) {
  const baseURL = context.domains.kindeDomain;
  const orgCode = context.organization.code;
  const userId = context.user.id;
  const kindeAPI = await createKindeAPI(baseURL);
  const res = await kindeAPI.get(
    `organizations/${orgCode}/users/${userId}/roles`
  );
  console.log({ res });

  kinde.accessToken.setCustomClaim(
    "roles",
    res.roles.map((r) => r.key)
  );

  return "testing return";
}
