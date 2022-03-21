const SEARCH_BTN_ID = "_search";
const SEARCH_BOX_ID = "_search-box";
const SHOW_BOX_CLASS = "show";
const RESET_BTN_ID = "reset-btn";
const HIDE_CLASS = "hide";
const ONOFF_SWITCH_CLASS = ".onoff-switch";

const searchBtn = document.getElementById(SEARCH_BTN_ID);
searchBtn.addEventListener("click", searchBox);

const resetBtn = document.getElementById(RESET_BTN_ID);
resetBtn.addEventListener("click", searchBoxHide);

function searchBox(event) {
    const searchBox = document.getElementById(SEARCH_BOX_ID);
    const darkModeBtn = document.querySelector(ONOFF_SWITCH_CLASS);

    if (!searchBox.classList.contains(SHOW_BOX_CLASS)) {
        searchBox.classList.add(SHOW_BOX_CLASS);
        darkModeBtn.classList.add(HIDE_CLASS);
    }
}

function searchBoxHide(event) {
    const searchBox = document.getElementById(SEARCH_BOX_ID);
    const darkModeBtn = document.querySelector(ONOFF_SWITCH_CLASS);

    if (searchBox.classList.contains(SHOW_BOX_CLASS)) {
        searchBox.classList.remove(SHOW_BOX_CLASS);
        darkModeBtn.classList.remove(HIDE_CLASS);
    }
}
