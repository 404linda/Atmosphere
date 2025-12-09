import { agent } from '../atproto/client';

export async function getMyProfile() {
  const res = await agent.getProfile({
    actor: agent.session.did
  });
  return res.data;
}

export async function logout() {
  agent.session = undefined;
  localStorage.clear();
}
