import { agent } from '../atproto/client';

export async function getMyLists() {
  const res = await agent.app.bsky.graph.getLists({});
  return res.data.lists;
}
