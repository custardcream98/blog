const isUserColorTheme = localStorage.getItem("data-theme");
const isOsColorTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

function getUserTheme() {
  let ret = isUserColorTheme ? isUserColorTheme : isOsColorTheme;
  return ret;
}

window.onload = function () {
  console.log(getUserTheme());

  if (getUserTheme() === "dark") {
    localStorage.setItem("data-theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    $checkbox.setAttribute("checked", true);
  } else {
    localStorage.setItem("data-theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  }
};

function themeToggle(e) {
  if (e.target.checked) {
    localStorage.setItem("data-theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    localStorage.setItem("data-theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  }
}
