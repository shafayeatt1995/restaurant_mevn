const loadedAnimations = new Map();

export function startDate(date = new Date()) {
  let startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  return startDate;
}

export function endDate(date = new Date()) {
  let endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);
  return endDate;
}

export function addDate(days = 0, date = new Date()) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function compareDate(start, end) {
  return endDate(start).getTime() === endDate(end).getTime();
}

export function dateDifferent(start = new Date(), end = new Date()) {
  return (startDate(end) - startDate(start)) / (1000 * 60 * 60 * 24);
}

export function onlyDate(date = new Date()) {
  const localDate = new Date(date);
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function validateDate(date, defaultDate) {
  return !isNaN(Date.parse(date))
    ? new Date(date)
    : !isNaN(Date.parse(defaultDate))
    ? new Date(defaultDate)
    : new Date();
}

export function strSlug(val) {
  return val
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]/g, "");
}

export function arrayConverter(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function changeRoute(value) {
  const { name, params, query } = this.$route;
  const targetRoute = {
    name,
    params,
    query: deepClone({ ...query, ...value }),
  };

  const { pathname, search } = window.location;
  const targetUrl = this.$router.resolve(targetRoute).href;
  const currentUrl = pathname + search;
  if (currentUrl !== targetUrl) {
    this.$router.push(targetRoute, null, { replace: true });
  }
}

export function getItem(key, defaultValue = "") {
  const item = localStorage.getItem(key);
  return item ?? defaultValue;
}

export function setItem(key, value) {
  localStorage.setItem(key, value);
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function randomStr(key = 10) {
  return [...Array(key)].map(() => Math.random().toString(36)[2]).join("");
}

export function addMinutesToDate(minutes = 60, date = new Date()) {
  return new Date(date.getTime() + minutes * 60000);
}

export function encode(value) {
  return value ? btoa(value) : "";
}

export function decode(value) {
  return value ? atob(value) : "";
}

export async function refreshTokens() {
  try {
    if (process.client) {
      const isTokenExpiring = (token) => {
        if (!token) return false;
        const [, payload] = token.split(".");
        const decoded = JSON.parse(atob(payload));
        const exp = decoded.exp * 1000;
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        return exp - now < twentyFourHours;
      };

      if (this.$auth.loggedIn) {
        const token = this.$auth.strategy.token.get();
        if (isTokenExpiring(token)) {
          await this.$auth.refreshTokens();
          await this.$auth.fetchUser();
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function initLottie(container, path) {
  if (
    loadedAnimations.has(container) &&
    loadedAnimations.get(container) === path
  ) {
    return;
  }

  const loadLottieScript = () => {
    return new Promise((resolve, reject) => {
      if (window.lottie) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = "/js/lottie.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      }
    });
  };

  await loadLottieScript();

  window.lottie.loadAnimation({
    container: container,
    renderer: "canvas",
    loop: true,
    autoplay: true,
    path: path,
  });

  loadedAnimations.set(container, path);
}

export function paginate(items = [], perPage = 20) {
  return { perPage, page: items.length / perPage + 1 };
}

export function cookieParse() {
  return document.cookie.split(";").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=").map((item) => item.trim());
    acc[name] = decodeURIComponent(value);
    return acc;
  }, {});
}

export function checkDate(date) {
  return !isNaN(new Date(date).getTime());
}

export function getDatesBetween(start = new Date(), end = new Date()) {
  return Array.from(
    { length: (new Date(end) - new Date(start)) / (24 * 60 * 60 * 1000) + 1 },
    (_, index) =>
      new Date(new Date(start).getTime() + index * 24 * 60 * 60 * 1000)
  );
}

export function fullDateFormat(date = new Date()) {
  return Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
