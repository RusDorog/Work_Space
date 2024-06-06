const API_URL = "https://workspace-methed.vercel.app/";
const LOCATION_URL = "api/locations";




const getDATA = async (url, cbSuccess, cdError) => {
    try {
        const Response = await fetch(url);
        const data = await Response.json();
        cbSuccess(data)
    } catch (err) {
        cdError(err)
    }
}

const init = () => {
    const citySelect = document.querySelector("#city");
    const cityChoices = new Choices(citySelect, {
        itemSelectText: "",
});

    getDATA(
        `${API_URL}${LOCATION_URL}`,
        (locationData) => {
            const locations = locationData.map(location => ({
                value: location,
            }));
            cityChoices.setChoices(locations, "value","label", true,
            );
        }, 
        (err) => {
            console.log(err);
        },
    );
};

init();

// getDATA(
//     API_URL + LOCATION_URL, 
//     (data) => {
//         console.log(data)
//     }, 
//     (err) => {
//         console.log(err);
//     },
// );

fetch(API_URL + LOCATION_URL) 
.then((Response) => {
    return Response.json();
})
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.log(err);
});