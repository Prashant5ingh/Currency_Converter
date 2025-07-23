const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// https://github.com/fawazahmed0/exchange-api
// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json


const dropdowns = document.querySelectorAll(".dropdown select"); // Select element for dropdown
const btn = document.querySelector("form button"); // or ".btn" if you have a button with that class
const fromCurrency = document.querySelector(".from select"); // Select element for "from" currency
const toCurrency = document.querySelector(".to select"); // Select element for "to" currency
const msg = document.querySelector(".msg"); // Select element for message display




for (let select of dropdowns) {

    for (let code in countryList) {  //countryList is an object containing currency codes and their corresponding country codes
        // console.log(code, countryList[code]);
        let newOption = document.createElement("option"); // Create a new option element
        newOption.innerText = code; // Set the text of the option to the currency code
        newOption.value = code; // Set the value of the option to the currency code

        // Starting from usd and inr as default selected options
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected"; // or "true" --> If the select is for "from" and the code is USD, mark it as selected
        }
        else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected"; // If the select is for "to" and the code is INR, mark it as selected

        }

        select.appendChild(newOption); // Append the new option to the select element
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target); // Call the updateFlag function when the select element changes to another country option to update the flag
    });
}

const updateFlag = (element) => {

    let code = element.value; // Get the value of the selected option
    console.log(code);

    let countryCode = countryList[code]; // Get the corresponding country code from the countryList object

    newFlag = `https://flagsapi.com/${countryCode}/flat/64.png`; // Construct the URL for the flag image using the country code
    console.log(newFlag);

    let flag = element.parentElement.querySelector("img") // Select the image element within the parent of the select element. img comes in parent of select element.
    flag.src = newFlag; // Update the source of the flag image to the new URL

}

const updateExchangeRate = async () => {

    let amount = document.querySelector(".amount input"); // Select the input element for the amount
    let aval = amount.value; // Get the value of the amount input tag
    console.log(aval);

    if (amount.value === "" || amount.value <= 0) {
        amount.value = 1; // If the amount is empty or less than or equal to 0, set it to 1
    }

    // API currency values are in lower case
    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`; // Construct the URL for the API request using the selected currencies
    let respose = await fetch(URL);
    let data = await respose.json();
    console.log("from --> to :", data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()]); // Log the exchange rate for the selected "from" and "to" currencies

    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()]; // Get the exchange rate for the selected "to" currency from the API response
    let famount = (aval * rate).toFixed(2); // Calculate the converted amount by multiplying the input amount with the exchange rate and rounding it to 2 decimal places
    msg.innerText = `${aval} ${fromCurrency.value} = ${famount} ${toCurrency.value}`; // Display the conversion message with the input amount, "from" currency, converted amount, and "to" currency

    msg.classList.add("active"); // Add the "active" class to the message element to make it visible


}


window.addEventListener("DOMContentLoaded", () => {  // or "load". Wait for the DOM to be fully loaded before executing the code
    updateExchangeRate(); // Call the function to update the exchange rate when the DOM content is loaded

});

btn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior or reloading of page. We want to handle all the actions with JavaScript.
    updateExchangeRate(); // Call the function to update the exchange rate when the button is clicked
});


