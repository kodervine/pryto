// Dynamically select any of the coin names
const coinsNameDropdown = document.getElementById("crypto-id");

const selectCryptoId = document.getElementById("crypto-id");

// Get bitcoin data from nomic API
const bitCoinData =
  "https://api.nomics.com/v1/currencies/ticker?key=23ac2761382825f70678666ea03f9ccdafe7bed4&ids=BTC,ETH,XRP&interval=1d,30d&convert=USD&platform-currency=ETH&per-page=100&page=1";

// Use async to fetch the bitcoin data
// setInterval(() => {
async function getBitcoinFunction() {
  // Show time
  setInterval(() => {
    let timeToday = new Date();
    const showDate = document.getElementById("show-date");
    showDate.innerText = timeToday;
  });

  // Variable to append fetched conversion data to
  let fetchedData = {};
  async function getExchangeCurrency() {
    const fetchData = await fetch(
      "https://api.coingecko.com/api/v3/exchange_rates"
    );
    fetchedData = await fetchData.json();
    console.log(fetchedData.rates);

    // Select dropdown menu coin name in order to get innerText to compare with the fetch API currency symbol
    coinsNameDropdown.addEventListener("change", () => {
      const coinName =
        coinsNameDropdown.options[coinsNameDropdown.selectedIndex].innerText;
      console.log(coinName);

      //Static Money value in dollars and naira - to calculate with and divide others with
      const dollarAmount = fetchedData.rates.usd.value;

      const nairaAmount = fetchedData.rates.ngn.value;

      // Loop for the dropdown menu, which will use the selected dropdown coin  Name, to get its monetary value dynamically
      for (let data in fetchedData.rates) {
        if (coinName.toLowerCase() === data) {
          const coinValue = fetchedData.rates[data].value;
          console.log(coinValue);

          // ====== Do the mathematics for the coins here
          const eachAmount = Math.round(fetchedData.rates[data].value);
          console.log(eachAmount);

          let newUSDValue;
          if (dollarAmount / coinValue < 1) {
            newUSDValue = Math.round((dollarAmount / coinValue) * 100) / 100;
          } else {
            newUSDValue = Math.round(dollarAmount / coinValue);
          }

          const newNairaValue = Math.round(nairaAmount / coinValue);

          // Get Input of numbers to be multiplied by from the DOM
          const getValueOfCoin = document.getElementById("input-coin").value;

          // Multiply with the value from the number input, ensure the decimal and whole number is working
          const multiplyInnerNairaText =
            newNairaValue * parseInt(getValueOfCoin);
          const multiplyInnerDollarText =
            newUSDValue * parseInt(getValueOfCoin);

          const divideInnerNairaText = Math.round(
            newNairaValue * parseFloat(getValueOfCoin)
          );
          const divideInnerDollarText = Math.round(
            newUSDValue * parseFloat(getValueOfCoin)
          );

          const nairaId = document.getElementById("naira-id");
          const usdId = document.getElementById("usd-id");

          if (Number.isInteger(getValueOfCoin)) {
            nairaId.innerText = `${fetchedData.rates.ngn.unit} ${multiplyInnerNairaText}`;
            usdId.innerText = `$${multiplyInnerDollarText}`;
          } else {
            nairaId.innerText = `${fetchedData.rates.ngn.unit} ${divideInnerNairaText}`;
            usdId.innerText = `$${divideInnerDollarText}`;
          }
        }

        // Add the newly created options from the bitCoin API on the html screen
        const createCryptoDropdownOption = document.createElement("option");
        if (fetchedData.rates[data].type === "crypto") {
          createCryptoDropdownOption.value = data.toUpperCase();
          createCryptoDropdownOption.innerText = data.toUpperCase();

          // const newArray = Array.from(coinsNameDropdown.children);
          // console.log(newArray);

          // const setForArray = new Set();
          // console.log(setForArray);
          // for (let arr of newArray) {
          //   setForArray.add(arr);
          // }
          // console.log(setForArray);
          coinsNameDropdown.appendChild(createCryptoDropdownOption);
        }
      }
    });
  }
  getExchangeCurrency();
}
getBitcoinFunction();
// }, 1000);
