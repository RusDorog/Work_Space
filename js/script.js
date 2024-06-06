const API_URL = "https://workspace-methed.vercel.app/";
const LOCATION_URL = "api/locations";
const VACANCY_URL = "api/locations";

const cardsList = document.querySelector('.cards__list');



const getDATA = async (url, cbSuccess, cdError) => {
    try {
        const Response = await fetch(url);
        const data = await Response.json();
        cbSuccess(data)
    } catch (err) {
        cdError(err)
    }
};

const createCard = vacancy => `
    <article class="vacancy" tabindex="0">
        <img class="vacancy__logo" src="img/yadro.svg" alt="Логотип компании YDRO">

            <p class="vacancy__company">YADRO</p>

            <h3 class="vacancy__title">Инженер</h3>

            <ul class="vacancy__fields">
                <li class="vacancy__fields">от 150 000₽</li>
                <li class="vacancy__fields">полная занятость</li>
                <li class="vacancy__fields">офис</li>
                <li class="vacancy__fields">опыт от 3-х лет</li>
           </ul>
    </article>
`;

const createCards = (data) =>
    data.vacancies.map(vacancy => {
        const li = document.createElement('li');
        li.classList.add('cards__item');
        li.insertAdjacentHTML('beforeend', createCard(vacancy));
        return li;
    })

const renderVacancy = data => {
    cardsList.textContent = "";
    const cards = createCards(data); 
    cardsList.append(...cards);
};

const renderError = err => {
    console.warn(err);
};

const init = () => {
    // select city
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

    // cards

    const url = new URL(`${API_URL}${LOCATION_URL}`);

    getDATA(url, renderVacancy, renderError);
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