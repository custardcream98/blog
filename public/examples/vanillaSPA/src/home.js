import coinDetail from "./coinDetail.js";

async function getCoinListData() {
  const res = await fetch("https://api.coinpaprika.com/v1/coins");
  const coins = await res.json();

  return coins;
}

export default function render(rootElement) {
  getCoinListData().then((coinsListData) => {
    rootElement.innerText = "";

    const coinPageHeader = document.createElement("h1");
    coinPageHeader.setAttribute("class", "title");
    coinPageHeader.innerText = "코인 리스트";
    rootElement.appendChild(coinPageHeader);

    const coinsList = document.createElement("ul");
    coinsList.setAttribute("class", "coins-list");

    coinsListData.slice(0, 10).forEach((coin) => {
      const coinListItem = document.createElement("li");
      coinListItem.setAttribute("class", "coin__list");

      const coinCard = document.createElement("div");
      coinCard.setAttribute("class", "coin__card");
      const titleContainer = document.createElement("div");
      titleContainer.setAttribute("class", "coin__title__container");
      const rankContainer = document.createElement("div");
      rankContainer.setAttribute("class", "coin__rank__container");
      const title = document.createElement("span");
      title.setAttribute("class", "coin__title");
      const symbol = document.createElement("span");
      symbol.setAttribute("class", "coin__symbol");
      const rank = document.createElement("span");
      rank.setAttribute("class", "coin__rank");

      titleContainer.appendChild(title);
      titleContainer.appendChild(symbol);
      rankContainer.appendChild(rank);

      coinCard.appendChild(titleContainer);
      coinCard.appendChild(rankContainer);

      coinListItem.appendChild(coinCard);

      coinsList.appendChild(coinListItem);

      title.innerText = coin.name;
      symbol.innerText = coin.symbol;
      rank.innerText = coin.rank;

      coinCard.addEventListener("click", () => {
        window.history.pushState(
          {},
          `/coins/${coin.id}`,
          window.location.origin + `/coins/${coin.id}`
        );

        coinDetail(rootElement, coin.id);
      });
    });

    rootElement.appendChild(coinsList);
  });
}
