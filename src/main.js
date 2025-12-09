import { createPost } from './feeds/post';
import { login } from './atproto/client';
import { getTimeline } from './feeds/timeline';
import { getMyLists } from './lists/lists';
import { getMyProfile, logout } from './account/manage';

const app = document.getElementById('app');

let current = 'login';

const screens = {
  login: `
    <h2>Atmosphere</h2>
    <input id="handle" placeholder="handle.bsky.social">
    <input id="password" type="password" placeholder="App password">
    <button id="loginBtn">Login</button>
    <div id="status"></div>
  `,
  home: `
    <div style="display:flex; gap:8px;">
      <button id="toCompose">Compose</button>
      <button id="toLists">Lists</button>
      <button id="toAccount">Account</button>
    </div>
    <div id="feed" style="margin-top:10px;"></div>
  `,
  compose: `
    <button id="backHome">← Back</button>
    <h3>Compose</h3>
    <textarea id="postText"></textarea>
    <button id="postBtn">Post</button>
  `,
  lists: `
    <button id="backHome">← Back</button>
    <h3>Your Lists</h3>
    <div id="listsBox"></div>
  `,
  account: `
    <button id="backHome">← Back</button>
    <h3>Account</h3>
    <div id="profile"></div>
    <button id="logoutBtn">Logout</button>
  `
};

function go(screen) {
  current = screen;
  app.innerHTML = screens[screen];
  bindUI();
}

function bindUI() {
  if (current === 'login') {
    document.getElementById('loginBtn').onclick = doLogin;
  }

  if (current === 'home') {
    document.getElementById('toCompose').onclick = () => go('compose');
    document.getElementById('toLists').onclick = () => loadLists();
    document.getElementById('toAccount').onclick = () => loadAccount();
    loadFeed();
  }

  if (current === 'compose') {
  document.getElementById('backHome').onclick = () => go('home');

  document.getElementById('postBtn').onclick = async () => {
    const text = document.getElementById('postText').value;
    if (!text.trim()) return alert('Empty post');

    await createPost(text);
    go('home');
  };
}

  if (current === 'lists' || current === 'account') {
    document.getElementById('backHome').onclick = () => go('home');
  }

  if (current === 'account') {
    document.getElementById('logoutBtn').onclick = () => {
      logout();
      go('login');
    };
  }
}

async function doLogin() {
  const h = document.getElementById('handle').value;
  const p = document.getElementById('password').value;
  const status = document.getElementById('status');

  try {
    await login(h, p);
    go('home');
  } catch {
    status.innerText = 'Login failed';
  }
}

async function loadFeed() {
  const feedBox = document.getElementById('feed');
  const feed = await getTimeline();

  feedBox.innerHTML = feed.map(item => `
    <div style="margin:10px 0; padding:10px; background:#020617;">
      <b>@${item.post.author.handle}</b><br>
      ${item.post.record.text}
    </div>
  `).join('');
}

async function loadLists() {
  go('lists');
  const box = document.getElementById('listsBox');
  const lists = await getMyLists();

  box.innerHTML = lists.map(l => `
    <div style="margin:6px 0; padding:8px; background:#020617;">
      ${l.name}
    </div>
  `).join('');
}

async function loadAccount() {
  go('account');
  const p = await getMyProfile();

  document.getElementById('profile').innerHTML = `
    <p><b>@${p.handle}</b></p>
    <p>${p.displayName || ''}</p>
  `;
}

go('login');
