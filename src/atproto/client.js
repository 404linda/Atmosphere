import { BskyAgent } from '@atproto/api';

export let agent;

export function createAgent(useGhost = false) {
  agent = new BskyAgent({
    service: useGhost
      ? 'https://bsky.social' // you can proxy later
      : 'https://bsky.social'
  });
}
