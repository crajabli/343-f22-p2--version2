const searchField = document.querySelector('input[name="query-text"]');
const searchButton = document.getElementById("search-button");
const resultsContainer = document.querySelector("#filtered-results");
let resultingDrivers = [];

getDriverNames();
// console.log(data);
// searchButton.addEventListener("click", () => {
//     const queryText = searchField.value;
//     console.log(queryText);
//     getDriverNames(queryText);
// });


async function getDriverNames() {
    const response= await fetch(`https://ergast.com/api/f1/2022/drivers.json`);
    const driversJson = await response.json();
    console.log("drivers array");
    console.log(driversJson);   
    const driverCards = driversJson.MRData.DriverTable.Drivers.map(driverToCard);
    let filteredDriverCards = driverCards;
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
}) => {
    const driverTemplate = `
            <div class="col">
                <div class="card text-center" style="width: 18rem;">
                    <img src="images/${givenName}.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${givenName} ${familyName}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${nationality}</li>
                        <li class="list-group-item">${dateOfBirth}</li>
                    </ul>
                </div>
            </div>`;
    return driverTemplate;
};


const filterDriverCard = (markup, query) => {
    console.log(markup, query);
    return markup.toLowerCase().includes(query.toLowerCase());
  };






// const driverCards = data.items.map(driverToCard);



