fetch('/assets/sitedata.json').then(response => {
    return response.json();
}).then(data => {
    const SEARCH_BTN_ID = "_search";
    const SEARCH_BOX_ID = "_search-box";
    const SEARCH_INPUT_ID = "_search-input";
    const SEARCH_HITS_ID = "_search-hits";
    const SHOW_BOX_CLASS = "show";
    const RESET_BTN_ID = "reset-btn";
    const HIDE_CLASS = "hide";
    const ONOFF_SWITCH_CLASS = ".switch-button";
    const ITEM_TAMPLATE_ID = "_search-item-template";
    const ITEM_IMG_CLASS = ".search-img";
    const ITEM_TITLE_CLASS = ".search-text__title";
    const ITEM_SUBTITLE_TAG = "small";

    const options = {
        isCaseSensitive: false,
        includeScore: true,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
            "image.path",
            "title",
            "date",
            "description",
            "content",
            "categories",
            "tags",
            "url"
        ]
    };

    const searchHits = document.getElementById(SEARCH_HITS_ID);
    const itemTemplate = document.getElementById(ITEM_TAMPLATE_ID);

    const fuse_documents = new Fuse(data.documents, options);
    const fuse_pages = new Fuse(data.pages, options);

    const searchBtn = document.getElementById(SEARCH_BTN_ID);
    searchBtn.addEventListener("click", searchBox);

    const resetBtn = document.getElementById(RESET_BTN_ID);
    resetBtn.addEventListener("click", searchBoxHide);

    const searchInput = document.getElementById(SEARCH_INPUT_ID);
    searchInput.addEventListener("input", inputTyped);

    function searchBox(event) {
        const searchBox = document.getElementById(SEARCH_BOX_ID);
        const darkModeBtn = document.querySelector(ONOFF_SWITCH_CLASS);

        searchBox.classList.add(SHOW_BOX_CLASS);
        darkModeBtn.classList.add(HIDE_CLASS);
        searchInput.focus(); // move focus to input box
    }

    function searchBoxHide(event) {
        const searchBox = document.getElementById(SEARCH_BOX_ID);
        const darkModeBtn = document.querySelector(ONOFF_SWITCH_CLASS);

        searchBox.classList.remove(SHOW_BOX_CLASS);
        darkModeBtn.classList.remove(HIDE_CLASS);
        searchHits.classList.add(HIDE_CLASS);
    }

    function inputTyped(event) {
        searchHits.innerText = "";
        searchHits.classList.remove(HIDE_CLASS);

        const input = event.target.value;

        const [page_searched, document_searched] = fuse(input);

        document_searched.map(doc => {
            const item = itemTemplate.content.cloneNode(true).children[0];
            const item_img = item.querySelector(ITEM_IMG_CLASS);
            const item_title = item.querySelector(ITEM_TITLE_CLASS);
            const item_subtitle = item.querySelector(ITEM_SUBTITLE_TAG);

            if (doc.item.image) item_img.setAttribute("src", doc.item.image.path);
            else item_img.setAttribute("src", "/assets/img/404.png");

            item_title.textContent = doc.item.title;
            item.setAttribute("href", `https://custardcream98.github.io${doc.item.url}`);
            item_subtitle.textContent = doc.item.description;

            searchHits.append(item)
        })
    }

    function fuse(pattern) {
        return [fuse_pages.search(pattern), fuse_documents.search(pattern)];
    }

    // Monkey Patching window.history
    (function(history){
        var pushState = history.pushState;
        history.pushState = function(state) {
            resetBtn.click();
            return pushState.apply(history, arguments);
        };
    })(window.history);
}).catch(e => {
    console.log('Error: ', e.message);
});

