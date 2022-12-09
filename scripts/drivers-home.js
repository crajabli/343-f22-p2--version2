const searchField = document.querySelector('input[name="query-text"]');
const searchButton = document.getElementById("search-button");
const resultsContainer = document.querySelector("#filtered-results");
let resultingDrivers = [];
const year2016 = document.getElementById("2016_drivers");
const year2022 = document.getElementById("2022_drivers");
const year2020 = document.getElementById("2020_drivers");

getDriverNames(2022);

year2016.addEventListener("click", (ev) => {
    getDriverNames(2016);
});

year2020.addEventListener("click", (ev) => {
    getDriverNames(2020);
});

year2022.addEventListener("click", (ev) => {
    getDriverNames(2022);
});


// async function getDriverPicture(givenName, familyName) {
//     const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${givenName}%20${familyName}&prop=pageimages&format=json&formatversion=2&pithumbsize=250`)
//     const pictureJson = await response.json();
//     console.log(pictureJson);
// }


async function getQuote() {
    const response = await fetch(`https://api.quotable.io/random`);
    const quoteJson = await response.json();
    return quoteJson;
}


async function getDriverNames(year) {
    const response= await fetch(`https://ergast.com/api/f1/${year}/drivers.json`);
    const driversJson = await response.json();
    console.log("drivers picture test");
 
    const driverData = driversJson.MRData.DriverTable.Drivers;

    const updatedDriverData = await Promise.all(driverData.map(async (driver) => {
        const object = await getQuote();
        const quote = object.content;
        driver.quote = quote;
        return driver;

    }))
    const driverCards = updatedDriverData.map(driverToCard);


    let filteredDriverCards = driverCards;
    // let filteredDriverCards = updatedCards;
    resultsContainer.innerHTML = filteredDriverCards.join("");
    

    
    searchField.addEventListener("input", (ev) => {
        ev.preventDefault;
        const queryText = searchField.value;
        filteredDriverCards = driverCards.filter((card) =>
            filterDriverCard(card, queryText)
        );
        resultsContainer.innerHTML = filteredDriverCards.join("");
    });
}


const driverToCard = ({
    driverId,
    givenName,
    familyName,
    nationality,
    dateOfBirth,
    quote,
}   ) => {
    const driverTemplate = `
            <div class="col">
                <div class="card text-center" style="width: 18rem;">
                    <img src="images/${familyName}.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${givenName} ${familyName}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${nationality}</li>
                        <li class="list-group-item">${dateOfBirth}</li>
                        <li class="list-group-item" id="quotes"> ${quote} - ${givenName} ${familyName}</li>
                    </ul>
                </div>
            </div>`;
    return driverTemplate;
};


const filterDriverCard = (markup, query) => {
    // console.log(markup, query);
    return markup.toLowerCase().includes(query.toLowerCase());
  };





