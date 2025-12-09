import { createAgent, agent } from './atproto/client';
import { queuePost, flushQueue } from './offline/queue';
import { toggleStealth, isStealth } from './stealth/mode';
import { getLists } from './lists/manage';
import { startRealtime } from './realtime/jetstream';
import { startListWatcher } from './notifications/listWatcher';

const app = document.getElementById('app');

/* ---------- basic screens ---------- */
const screens = {
  login: `
    <h2>Atmosphere</h2>
    <input id="handle" placeholder="handle.bsky.social" />
    <input id="pass" type="password" placeholder="App password" />
    <button id="loginBtn">Login</button>
  `,

  home: `
    <div style="display:flex; gap:10px; margin-bottom:10px;">
      <button id="toCompose">Compose</button>
      <button id="toLists">Lists</button>
      <button id="ghostBtn">Ghost</button>
    </div>
    <div id="feed"></div>
  `,

  compose: `
    <button id="backHome">← Back</button>
    <textarea id="postText" placeholder="Write your post..."></textarea>
    <button id="postBtn">Post</button>
  `,

  lists: `
    <button id="backHome">← Back</button>
    <h3>Your Lists</h3>
    <div id="lists"></div>
  `
};

let current = 'login';

function render() {
  app.innerHTML = screens[current];
  bindUI();
}

/* ---------- screen navigation ---------- */

function go(screen) {
  current = screen;
  render();
}

/* ---------- UI bindings ---------- */

function bindUI() {
  /* LOGIN */
  if (current === 'login') {
    const loginBtn = document.getElementById('loginBtn');

    loginBtn.onclick = async () => {
      const handle = document.getElementById('handle').value;
      const pass = document.getElementById('pass').value;

      try {
        createAgent();
        await agent.login({ identifier: handle, password: pass });

        await flushQueue();

        go('home');
        loadFeed();
        realtime();
        startListWatcher();
      } catch {
        alert('Login failed');
      }
    };
  }

  /* HOME */
  if (current === 'home') {
    document.getElementById('toCompose').onclick = () => go('compose');
    document.getElementById('toLists').onclick = () => loadLists();
    document.getElementById('ghostBtn').onclick = () => {
      const mode = toggleStealth();
      document.body.style.background = mode === 'on' ? '#000' : '#fff';
    };
  }

  /* COMPOSE */
  if (current === 'compose') {
    document.getElementById('backHome').onclick = () => go('home');

    document.getElementById('postBtn').onclick = async () => {
      const text = document.getElementById('postText').value;

      try {
        await agent.post({ text });
      } catch {
        queuePost(text);
      }

      go('home');
      loadFeed();
    };
  }

  /* LISTS */
  if (current === 'lists') {
    document.getElementById('backHome').onclick = () => go('home');
  }
}

/* ---------- feed + realtime ---------- */

async function loadFeed() {
  const res = await agent.getTimeline({ limit: 20 });

  document.getElementById('feed').innerHTML =
    res.data.feed.map(p =>
      `<div style="margin:10px 0;">
        <b>@${p.post.author.handle}</b>
        <p>${p.post.record.text}</p>
      </div>`
    ).join('');
}

function realtime() {
  startRealtime((data) => {
    const feed = document.getElementById('feed');
    if (!feed) return;

    const div = document.createElement('div');
    div.innerHTML = `<b>⚡ Live</b>: ${data.record.text}`;
    feed.prepend(div);
  });
}

/* ---------- lists ---------- */

async function loadLists() {
  go('lists');

  const lists = await getLists();
  document.getElementById('lists').innerHTML =
    lists.map(l =>
      `<div style="margin:10px 0;">${l.name}</div>`
    ).join('');
}

/* ---------- init ---------- */

render();
