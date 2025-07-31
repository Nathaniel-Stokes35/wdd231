const spotlightCont = document.querySelector("#spotlight");
const currList = document.getElementById('curr-list');
const currWeatherDiv = document.getElementById('curr-weather');

const apiKey = '5ed0e22fbc6848ee0a15a76a220f8912';
const city = "Pineville,US";

const events = [
  { "priority": 1, "title": "Power Outage Expected", "message": "Massive power outages are expected due to line maintenance and scattered thunderstorms this weekend. Residents are encouraged to prepare.", "date": "2025-08-02" },
  { "priority": 1, "title": "Boil Water Advisory", "message": "A citywide boil water advisory has been issued due to a main break near downtown Anderson.", "date": "2025-08-01" },
  { "priority": 3, "title": "Library Hours Update", "message": "The McDonald County Library will be closing an hour early this Friday for staff development.", "date": "2025-08-02" },
  { "priority": 4, "title": "Farmers Market This Weekend", "message": "Don't forget to stop by the farmers market at the square Saturday morning for fresh produce and local crafts!", "date": "2025-08-03" },
  { "priority": 2, "title": "Road Construction on Hwy 76", "message": "Expect delays on Hwy 76 near Tiff City as resurfacing work continues through the end of next week.", "date": "2025-08-04" },
  { "priority": 4, "title": "Chamber Meeting", "message": "There will be a Chamber Meeting at the community center Saturday starting at 10:00am.", "date": "2025-08-03" },
  { "priority": 3, "title": "T-Ball Game Delay", "message": "Farmers market will cause Saturday's T-Ball game for the Pineville Tornadoes to be delayed to accommodate facilities.", "date": "2025-08-03" },
  { "priority": 2, "title": "Exit Closed on 49", "message": "Closed southbound exit 7 on 49, find alternate route", "date": "2025-07-25"}
];

function handleSpotlight(members) {

    if (!spotlightCont) return;

    const spotlightMembers = members.filter(biz => biz.membership >= 2);
    const shuffled = spotlightMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3); 

    spotlightCont.innerHTML = '';

    selected.forEach(biz => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img src="images/${biz.image}" alt="${biz.name} image" class="spot-img">
            <h3>${biz.name}</h3>
            <p class="category">${biz.category}</p>
            <p class="address">${biz.address}</p>
            <p class="phone"><a href="tel:${biz.phone.replace(/\D/g, '')}">${biz.phone}</a></p>
            <p class="website"><a href="${biz.website}" target="_blank" rel="noopener">Visit Website</a></p>
        `;

        spotlightCont.appendChild(card);
    });
}

function getRandomSample(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function handleCurrentEvents(events) {
    if (!currList) return;

    const highPriorityEvents = events.filter(e => e.priority === 1 || e.priority === 2);
    const lowPriorityEvents = events.filter(e => e.priority === 3 || e.priority === 4);

    const selectedHigh = getRandomSample(highPriorityEvents, 2);
    const selectedLow = getRandomSample(lowPriorityEvents, 2);

    const combinedEvents = [...selectedHigh, ...selectedLow];

    combinedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    currList.innerHTML = '';

    combinedEvents.forEach(event => {
        const li = document.createElement('li');
        li.innerHTML = `
        <strong>${event.title}</strong><br>
        <em>${event.date}</em><br>
        <p>${event.message}</p>
        `;
        currList.appendChild(li);
    });
}

async function fetchCurrentWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
        throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        currWeatherDiv.innerHTML += `<p>Unable to load current weather data.</p>`;
    }
}

function displayWeather(data) {
    if (!currWeatherDiv) return;

    const locationName = data.name;
    const temp = data.main.temp.toFixed(1); 
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    currWeatherDiv.innerHTML += `
        <h3>${locationName}</h3>
        <img src="${iconUrl}" alt="${description}" />
        <p><strong>Temperature:</strong> ${temp} °F</p>
        <p><strong>Conditions:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} mph</p>
    `;
}

fetchCurrentWeather();