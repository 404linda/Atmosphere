import { agent } from './atproto/client';

const app = document.getElementById('app');

app.innerHTML = `
  <h2>Atmosphere</h2>
  <input id="handle" placeholder="handle">
  <input id="pass" placeholder="app password" type="password">
  <button id="login">Login</button>
  <div id="feed"></div>
`;

document.getElementById('login').onclick = async () => {
  const handle = document.getElementById('handle').value;
  const password = document.getElementById('pass').value;

  await agent.login({ identifier: handle, password });

  const res = await agent.getTimeline({ limit: 10 });

  document.getElementById('feed').innerHTML =
    res.data.feed.map(p =>
      `<p>@${p.post.author.handle}: ${p.post.record.text}</p>`
    ).join('');
};
