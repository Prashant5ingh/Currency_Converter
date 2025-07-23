const factPara = document.querySelector("#dogfacts");
const btn = document.querySelector("#btn")

const URL = "https://dogapi.dog/api/v2/breeds";
// https://free-apis.github.io/#/browse 

let promise = fetch(URL);
console.log(promise)


const getData = async () => {
    console.log("getting data....");
    let response = await fetch(URL)
    console.log(response)   //response.status --> 200 JSON format

    let resData = await response.json(); // converting json to js object
    console.log(resData) // now data is usable data array of index 10

    // "data" is the key in the object and now we can access the array of objects
    console.log(resData.data[0].attributes.description) // description of the first dog breed named "Affenpinscher"
    factPara.innerText = resData.data[0].attributes.name;  // to print as paragraph on webpage
}
btn.addEventListener("click", getData) // when button is clicked, it will call the function "getData" instead "getData()"  
// getData()


// Promise Chain Example
// This is an example of promise chaining to fetch data from the same URL
function getFacts() {

    fetch(URL)
        .then((response) => {
            return response.json();
        })

        .then((resData) =>{
            console.log("Promise Chain",resData);
    factPara.innerText =  resData.data[0].attributes.name;

});
}
getFacts(); // calling the function to get facts immediately when the script is loaded