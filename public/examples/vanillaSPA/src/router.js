import home from "./home.js";

export function initialRoute(element) {
  home(element);
  console.log(window.location.pathname);

  window.onpopstate = () => home(element);
}
