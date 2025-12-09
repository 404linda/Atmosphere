import { agent } from '../atproto/client';

export async function createPost(text) {
  return agent.post({
    text: text,
    createdAt: new Date().toISOString()
  });
}
