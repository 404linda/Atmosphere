import { agent } from "../atproto/client";

export async function getLists() {
  const res = await agent.app.bsky.graph.getLists({});
  return res.data.lists;
}

export async function leaveList(listUri, did) {
  return await agent.app.bsky.graph.removeMember({
    list: listUri,
    subject: did
  });
}
