import { BskyAgent } from '@atproto/api';

export const agent = new BskyAgent({
  service: 'https://bsky.social'
});

export async function login(handle, password) {
  return agent.login({
    identifier: handle,
    password
  });
}
