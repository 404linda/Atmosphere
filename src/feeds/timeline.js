import { agent } from '../atproto/client';

export async function getTimeline() {
  const res = await agent.getTimeline({ limit: 20 });
  return res.data.feed;
}
