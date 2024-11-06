import { createKindeAPI } from "./utils/getKindeAPI";

export default async function CanBeAnyName({ context, request }) {
  const baseURL = context.domains.kindeDomain;
  const kindeAPI = await createKindeAPI(baseURL);
  const users = await kindeAPI.get("users");
  console.log({ users });

  return "testing return";
}
