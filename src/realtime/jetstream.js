export function startRealtime(onPost) {
  const ws = new WebSocket(
    'wss://jetstream.bsky.app/subscribe?wantedCollections=app.bsky.feed.post'
  );

  ws.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    if (data?.record?.text) {
      onPost(data);
    }
  };
}
