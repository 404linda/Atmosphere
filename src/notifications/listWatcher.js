import { agent } from "../atproto/client";

let seen = new Set();

export function startListWatcher() {
  setInterval(async () => {
    const res = await agent.app.bsky.graph.getLists({});
    const lists = res.data.lists;

    lists.forEach(l => {
      if (!seen.has(l.uri)) {
        console.log("📌 New list event:", l.name);
        seen.add(l.uri);
      }
    });
  }, 15000);
}
