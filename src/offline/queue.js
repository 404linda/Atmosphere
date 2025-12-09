import { encrypt, decrypt } from "./storage";
import { agent } from "../atproto/client";

const KEY = "offline_posts";

export function queuePost(text) {
  const saved = localStorage.getItem(KEY);
  const list = saved ? decrypt(saved) : [];
  list.push({ text, t: Date.now() });
  localStorage.setItem(KEY, encrypt(list));
}

export async function flushQueue() {
  const saved = localStorage.getItem(KEY);
  if (!saved) return;
  const list = decrypt(saved);

  for (const post of list) {
    await agent.post({ text: post.text });
  }

  localStorage.removeItem(KEY);
}
