const KEY = "stealth";

export function toggleStealth() {
  const v = localStorage.getItem(KEY);
  const n = v === "on" ? "off" : "on";
  localStorage.setItem(KEY, n);
  return n;
}

export function isStealth() {
  return localStorage.getItem(KEY) === "on";
}
