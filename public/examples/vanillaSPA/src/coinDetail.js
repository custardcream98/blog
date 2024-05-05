import home from "./home.js"

async function getCoinData(coinId) {
  const res = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  const coins = await res.json()

  return coins
}

export default function render(rootElement, coinId) {
  getCoinData(coinId).then((coinData) => {
    rootElement.innerText = ""
    rootElement.innerHtml = ""

    const backBtn = document.createElement("button")
    backBtn.setAttribute("class", "back")
    backBtn.innerText = "홈으로"

    backBtn.onclick = () => {
      window.history.pushState({}, `/`, window.location.origin)
      home(rootElement)
    }

    const coinCard = document.createElement("div")
    coinCard.setAttribute("class", "detail__card")
    const titleContainer = document.createElement("div")
    titleContainer.setAttribute("class", "detail__title__container")
    const priceContainer = document.createElement("div")
    priceContainer.setAttribute("class", "detail__price__container")
    const title = document.createElement("span")
    title.setAttribute("class", "detail__title")
    const price = document.createElement("span")
    price.setAttribute("class", "detail__price")
    const pricePercent = document.createElement("span")
    pricePercent.setAttribute("class", "detail__price-percent")

    titleContainer.appendChild(title)
    priceContainer.appendChild(price)
    priceContainer.appendChild(pricePercent)

    coinCard.appendChild(titleContainer)
    coinCard.appendChild(priceContainer)

    rootElement.appendChild(backBtn)
    rootElement.appendChild(coinCard)

    title.innerText = coinData.name
    price.innerText = coinData.quotes.USD.price.toFixed(2) + " USD"
    pricePercent.innerText = coinData.quotes.USD.percent_change_24h + "%"
  })
}
