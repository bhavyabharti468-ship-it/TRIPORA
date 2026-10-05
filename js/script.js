/* =========================================
   TRIPORA DATA
========================================= */

const destinations = [
    {
        id: 1,
        name: "Bali",
        type: "beach",
        budget: "mid",
        price: 22000,
        rating: 4.8,
        image: "images/bali.jfif",
        description: "Tropical beaches, vibrant culture and unforgettable sunsets."
    },

    {
        id: 2,
        name: "Kyoto",
        type: "culture",
        budget: "luxury",
        price: 48000,
        rating: 4.9,
        image: "images/japan.jfif",
        description: "Ancient temples, peaceful gardens and Japanese traditions."
    },

    {
        id: 3,
        name: "Swiss Alps",
        type: "nature",
        budget: "luxury",
        price: 75000,
        rating: 4.9,
        image: "images/switzerland.jfif",
        description: "Snowy mountains, scenic villages and breathtaking landscapes."
    },

    {
        id: 4,
        name: "Kerala",
        type: "nature",
        budget: "budget",
        price: 12000,
        rating: 4.7,
        image: "images/nature.jfif",
        description: "Backwaters, greenery, beaches and peaceful hill stations."
    },

    {
        id: 5,
        name: "Dubai",
        type: "adventure",
        budget: "mid",
        price: 28000,
        rating: 4.8,
        image: "images/adventure.jfif",
        description: "Luxury, adventure, futuristic architecture and desert experiences."
    },

    {
        id: 6,
        name: "Goa",
        type: "beach",
        budget: "budget",
        price: 9500,
        rating: 4.6,
        image: "images/hero.jfif",
        description: "Golden beaches, relaxed vibes and exciting coastal experiences."
    },

    {
        id: 7,
        name: "Manali",
        type: "adventure",
        budget: "budget",
        price: 13500,
        rating: 4.7,
        image: "images/adventure.jfif",
        description: "Mountain adventures, scenic valleys and thrilling activities."
    },

    {
        id: 8,
        name: "Paris",
        type: "culture",
        budget: "luxury",
        price: 65000,
        rating: 4.9,
        image: "images/culture.jfif",
        description: "Art, architecture, history and iconic European experiences."
    }
];

/* =========================================
   DESTINATION SEARCH & FILTER
========================================= */
function filterDestinations() {
    const searchInput = document.getElementById("destinationSearch");
    const typeFilter = document.getElementById("travelType");
    const budgetFilter = document.getElementById("budgetFilter");

    if (!searchInput || !typeFilter || !budgetFilter) return;

    const searchValue = searchInput.value.trim().toLowerCase();
    const selectedType = typeFilter.value;
    const selectedBudget = budgetFilter.value;

    const filteredDestinations = destinations.filter(destination => {
        const matchesSearch =
            destination.name.toLowerCase().includes(searchValue);

        const matchesType =
            selectedType === "all" ||
            destination.type === selectedType;

        const matchesBudget =
            selectedBudget === "all" ||
            destination.budget === selectedBudget;

        return matchesSearch && matchesType && matchesBudget;
    });

    displayDestinations(filteredDestinations);
    updateDestinationResults(filteredDestinations.length);
}


function updateDestinationResults(count) {
    const countElement =
        document.getElementById("destinationCount");

    const noResults =
        document.getElementById("noResults");

    if (countElement) {
        countElement.textContent =
            `Showing ${count} destination${count !== 1 ? "s" : ""}`;
    }

    if (noResults) {
        noResults.style.display =
            count === 0 ? "block" : "none";
    }
}


/* =========================================
   TRIPORA — URL FILTER HANDLER
   ========================================= */

function applyURLFilters() {
    const params = new URLSearchParams(window.location.search);

    const searchValue = params.get("search");
    const mood = params.get("type");

    const searchInput =
        document.getElementById("destinationSearch");

    const typeFilter =
        document.getElementById("travelType");

    if (searchValue && searchInput) {
        searchInput.value = searchValue;
    }

    if (mood && typeFilter) {
        typeFilter.value = mood;
    }

    if (searchValue || mood) {
        filterDestinations();
    }
}

applyURLFilters();


/* =========================
   LIVE SEARCH
========================= */

const destinationSearch =
    document.getElementById("destinationSearch");

if (destinationSearch) {

    destinationSearch.addEventListener(
        "input",
        filterDestinations
    );

}


/* =========================
   FILTER DROPDOWNS
========================= */

const travelType =
    document.getElementById("travelType");

const budgetFilter =
    document.getElementById("budgetFilter");


if (travelType) {

    travelType.addEventListener(
        "change",
        filterDestinations
    );

}


if (budgetFilter) {

    budgetFilter.addEventListener(
        "change",
        filterDestinations
    );

}
/* =====================================================
   FLIGHT BOOKING
===================================================== */

function searchFlights() {

    const from = document.getElementById("fromCity").value;
    const to = document.getElementById("toCity").value;
    const message = document.getElementById("flightMessage");

    if (from === "" || to === "") {

        message.textContent = "Please enter your departure and destination city.";
        message.style.color = "#c0392b";

        return;
    }

    message.textContent =
        "Showing available flights from " + from + " to " + to + ".";

    message.style.color = "#168f83";
}


function selectFlight(airline, price) {
    const fromCity = document.getElementById("fromCity").value.trim();
    const toCity = document.getElementById("toCity").value.trim();
    const departureDate = document.getElementById("departureDate").value;
    const passengers = document.getElementById("passengers").value;

    if (!fromCity || !toCity || !departureDate) {
        alert("Please enter your departure city, destination and travel date first.");
        return;
    }

    const booking = saveBooking("Flight", {
        name: airline,
        price: price,
        from: fromCity,
        to: toCity,
        date: departureDate,
        passengers: passengers
    });

    alert(
        "Flight selected successfully! ✈️\n\n" +
        booking.name +
        "\n" +
        booking.from + " → " + booking.to +
        "\nDate: " + booking.date +
        "\nPassengers: " + booking.passengers +
        "\n₹" + booking.price.toLocaleString("en-IN")
    );
}
/* =====================================================
   HOTEL BOOKING
===================================================== */

function searchHotels() {

    const locationInput =
        document.getElementById("hotelLocation");

    const location =
        locationInput.value.trim().toLowerCase();

    const message =
        document.getElementById("hotelMessage");

    const hotels =
        document.querySelectorAll(".hotel-card");

    if (location === "") {

        hotels.forEach(function (hotel) {
            hotel.style.display = "block";
        });

        message.textContent =
            "Showing all available stays.";

        message.style.color = "#168f83";

        return;
    }


    let found = 0;


    hotels.forEach(function (hotel) {

        const hotelLocation =
            hotel.getAttribute("data-location");

        if (hotelLocation.includes(location)) {

            hotel.style.display = "block";

            found++;

        } else {

            hotel.style.display = "none";

        }

    });


    if (found === 0) {

        message.textContent =
            "No hotels found for \"" +
            locationInput.value +
            "\".";

        message.style.color = "#c0392b";

    } else {

        message.textContent =
            found +
            " hotel option(s) found for " +
            locationInput.value +
            ".";

        message.style.color = "#168f83";
    }
}


function bookHotel(hotelName, price) {
    const location = document.getElementById("hotelLocation").value.trim();
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
    const guests = document.getElementById("hotelGuests").value;

    if (!location || !checkIn || !checkOut) {
        alert("Please enter the location, check-in and check-out dates first.");
        return;
    }

    const booking = saveBooking("Hotel", {
        name: hotelName,
        price: price,
        location: location,
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests
    });

    alert(
        "Hotel booked successfully! 🏨\n\n" +
        booking.name +
        "\n📍 " + booking.location +
        "\nCheck-in: " + booking.checkIn +
        "\nCheck-out: " + booking.checkOut +
        "\nGuests: " + booking.guests +
        "\n₹" + booking.price.toLocaleString("en-IN")
    );
}
/* =====================================================
   TRAVEL ITINERARY
===================================================== */

function addTripDay() {

    const tripDays = document.getElementById("tripDays");

    if (!tripDays) {
        return;
    }

    const dayCount =
        tripDays.querySelectorAll(".trip-day").length + 1;

    const newDay = document.createElement("div");

    newDay.className = "trip-day";

    newDay.innerHTML = `
        <div class="day-number">
            <span>DAY</span>
            <strong>${String(dayCount).padStart(2, "0")}</strong>
        </div>

        <div class="day-content">

            <div class="day-title">

                <div>
                    <h3>New Activity</h3>
                    <p>Custom activity added</p>
                </div>

                <span class="day-complete">
                    ✓ Added
                </span>

            </div>

            <div class="activity-list">

                <div class="activity">

                    <div class="activity-icon">
                        📍
                    </div>

                    <div>
                        <strong>Explore a new experience</strong>

                        <p>
                            Your new travel activity has been added to the itinerary.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    `;

    tripDays.appendChild(newDay);
}
/* =====================================================
   PHOTO GALLERY FILTER
===================================================== */

function filterGallery(category, button) {

    const items =
        document.querySelectorAll(".gallery-item");

    const buttons =
        document.querySelectorAll(".gallery-filter");


    /* Remove active state */

    buttons.forEach(function (btn) {
        btn.classList.remove("active");
    });


    /* Add active state */

    button.classList.add("active");


    /* Filter photos */

    items.forEach(function (item) {

        if (
            category === "all" ||
            item.classList.contains(category)
        ) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

}
/* ================================
   REVIEWS
================================ */

function submitReview(event) {

    event.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const destination = document.getElementById("reviewDestination").value.trim();
    const rating = document.getElementById("reviewRating").value;
    const message = document.getElementById("reviewMessage").value.trim();
    const messageBox = document.getElementById("reviewMessageBox");

    if (
        name === "" ||
        destination === "" ||
        rating === "" ||
        message === ""
    ) {
        messageBox.textContent = "Please fill in all fields.";
        return;
    }

    messageBox.textContent =
        "Thank you, " + name + "! Your review has been submitted successfully. ★";

    document.querySelector(".review-form").reset();
}
/* ================================
   CONTACT FORM
================================ */

function submitContactForm(event) {

    event.preventDefault();

    const name =
        document.getElementById("contactName").value.trim();

    const email =
        document.getElementById("contactEmail").value.trim();

    const subject =
        document.getElementById("contactSubject").value;

    const message =
        document.getElementById("contactMessage").value.trim();

    const messageBox =
        document.getElementById("contactMessageBox");


    if (
        name === "" ||
        email === "" ||
        subject === "" ||
        message === ""
    ) {

        messageBox.textContent =
            "Please fill in all fields.";

        return;
    }


    messageBox.textContent =
        "Thank you, " + name +
        "! Your message has been sent successfully. ✓";


    document.querySelector(".contact-form").reset();

}
/* ========================================
   ADMIN PANEL
======================================== */


/* SEARCH USERS */

function searchUsers() {

    const input =
        document.getElementById("userSearch");

    const filter =
        input.value.toLowerCase();

    const rows =
        document.querySelectorAll("#userTable tr");

    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();

        if (text.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}


/* FILTER BOOKINGS */

function filterBookings() {

    const filter =
        document.getElementById("bookingFilter").value;

    const rows =
        document.querySelectorAll("#bookingTable tr");

    rows.forEach(row => {

        const status =
            row.getAttribute("data-status");

        if (
            filter === "all" ||
            status === filter
        ) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


/* DELETE PACKAGE */

function deletePackage(button) {

    const row =
        button.closest("tr");

    const packageName =
        row.querySelector("td").textContent.trim();

    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            packageName +
            "?"
        );

    if (confirmDelete) {

        row.remove();

        alert(
            "Package deleted successfully."
        );

    }

}


/* ADD PACKAGE */

function addPackage() {

    const packageTable =
        document.getElementById("packageTable");

    if (!packageTable) {
        return;
    }


    const packageName =
        prompt("Enter package name:");

    if (
        packageName === null ||
        packageName.trim() === ""
    ) {
        return;
    }


    const destination =
        prompt("Enter destination:");

    if (
        destination === null ||
        destination.trim() === ""
    ) {
        return;
    }


    const duration =
        prompt("Enter duration:");

    if (
        duration === null ||
        duration.trim() === ""
    ) {
        return;
    }


    const price =
        prompt("Enter package price:");

    if (
        price === null ||
        price.trim() === ""
    ) {
        return;
    }


    const newRow =
        document.createElement("tr");


    newRow.innerHTML = `

        <td>
            <strong>
                ${packageName}
            </strong>
        </td>

        <td>
            ${destination}
        </td>

        <td>
            ${duration}
        </td>

        <td>
            ₹${price}
        </td>

        <td>
            <span class="status active">
                Active
            </span>
        </td>

        <td>

            <button
                class="delete-btn"
                onclick="deletePackage(this)"
            >
                Delete
            </button>

        </td>

    `;


    packageTable.appendChild(newRow);


    alert(
        "New package added successfully!"
    );

}

/* =========================================
   DYNAMIC DESTINATION CARDS
========================================= */

function displayDestinations(destinationList = destinations) {

    const grid = document.getElementById("destinationGrid");

    if (!grid) return;

    grid.innerHTML = "";

    destinationList.forEach(destination => {

        const card = document.createElement("article");

        card.className = "destination-card";

        card.innerHTML = `
            <div class="destination-image">
                <img src="${destination.image}" alt="${destination.name}">
            </div>

            <div class="destination-content">

                <div class="destination-title-row">
                    <h3>${destination.name}</h3>

                    <span class="destination-rating">
                        ★ ${destination.rating}
                    </span>
                </div>

                <p>${destination.description}</p>

                <div class="destination-bottom">

                    <div>
                        <small>FROM</small>
                        <strong>₹${destination.price.toLocaleString("en-IN")}</strong>
                    </div>

                    <button
                        class="destination-btn"
                        onclick="selectDestination(${destination.id})">
                        Explore →
                    </button>

                </div>

            </div>
        `;

        grid.appendChild(card);
    });
}
displayDestinations();
/* =========================================
   SAVE DESTINATION TO MY TRIP
========================================= */

function selectDestination(id) {

    const destination = destinations.find(
        item => item.id === id
    );

    if (!destination) return;

    localStorage.setItem(
        "selectedDestination",
        JSON.stringify(destination)
    );

    alert(
        destination.name +
        " has been added to My Trip! ✈️"
    );
}
/* =========================================
   MY TRIP - LOAD SAVED DESTINATION
========================================= */

function loadSavedTrip() {

    const tripCard =
        document.getElementById("savedTripCard");

    if (!tripCard) return;

    const savedTrip =
        localStorage.getItem("selectedDestination");

    if (!savedTrip) {

        tripCard.innerHTML = `
            <div class="empty-trip">
                <h3>No destination selected yet.</h3>

                <p>
                    Go to Discover and choose a destination
                    to start building your trip.
                </p>
            </div>
        `;

        return;
    }

    const destination =
        JSON.parse(savedTrip);

    tripCard.innerHTML = `
        <img
            src="${destination.image}"
            alt="${destination.name}"
        >

        <div class="saved-trip-info">

            <h3>${destination.name}</h3>

            <p>
                ${destination.description}
            </p>

            <div class="saved-trip-rating">
                ★ ${destination.rating} / 5
            </div>

            <div class="saved-trip-price">
                Starting from
                ₹${destination.price.toLocaleString("en-IN")}
            </div>

        </div>
    `;
}

loadSavedTrip();
/* =========================================
   TRIP BUILDER - LIVE BUDGET CALCULATOR
========================================= */

let travellerCount = 2;


/* CHANGE TRAVELLER COUNT */

function changeTravellers(change) {

    travellerCount += change;

    // Keep travellers between 1 and 10
    if (travellerCount < 1) {
        travellerCount = 1;
    }

    if (travellerCount > 10) {
        travellerCount = 10;
    }

    document.getElementById("travellerCount").textContent =
        travellerCount;

    document.getElementById("builderTravellers").textContent =
        travellerCount;

    calculateTripCost();
}


/* CALCULATE TOTAL */

function calculateTripCost() {
    const savedDestination = localStorage.getItem("selectedDestination");

    if (savedDestination) {
        const destination = JSON.parse(savedDestination);
        document.getElementById("builderDestination").textContent = destination.name;
    }
    let destinationPrice = 0;

    if (savedDestination) {
        const destination = JSON.parse(savedDestination);
        destinationPrice = destination.price;
    }

    const days =
        parseInt(document.getElementById("tripDays").value);

    const selectedHotel =
        document.querySelector('input[name="hotel"]:checked');

    const hotelPrice =
        selectedHotel
            ? parseInt(selectedHotel.value)
            : 0;

    /*
       Flight price per traveller
    */

    const flightPrice = 5500;

    /*
       Hotel cost:
       hotel price × number of nights
    */

    const nights = days - 1;

    const totalHotel =
        hotelPrice * nights;

    /*
       Flight cost:
       flight price × travellers
    */

    const totalFlights =
        flightPrice * travellerCount;

    /*
       Experiences
    */

    const selectedExperiences =
        document.querySelectorAll(
            '.builder-option input[type="checkbox"]:checked'
        );

    let experienceTotal = 0;

    selectedExperiences.forEach(experience => {

        experienceTotal +=
            parseInt(experience.value);
    });

    /*
       Multiply experiences by travellers
    */

    experienceTotal =
        experienceTotal * travellerCount;


    /*
       FINAL TOTAL
    */

    const total = destinationPrice + totalFlights + totalHotel + experienceTotal;
    const budgetTotal = document.getElementById("dynamicBudgetTotal");

if (budgetTotal) {
    budgetTotal.textContent = `₹${total.toLocaleString("en-IN")}`;
}

    /*
       DISPLAY VALUES
    */
    document.getElementById("builderDestinationPrice").textContent =
        "₹" + destinationPrice.toLocaleString("en-IN");

    document.getElementById("builderFlights").textContent =
        "₹" + totalFlights.toLocaleString("en-IN");

    document.getElementById("builderHotel").textContent =
        "₹" + totalHotel.toLocaleString("en-IN");

    document.getElementById("builderExperiences").textContent =
        "₹" + experienceTotal.toLocaleString("en-IN");

    document.getElementById("builderTotal").textContent =
        "₹" + total.toLocaleString("en-IN");
}


/* UPDATE CALCULATION WHEN OPTIONS CHANGE */

document.addEventListener("DOMContentLoaded", function () {

    const duration =
        document.getElementById("tripDays");

    if (duration) {
        duration.addEventListener(
            "change",
            calculateTripCost
        );
    }


    const hotels =
        document.querySelectorAll(
            'input[name="hotel"]'
        );

    hotels.forEach(hotel => {

        hotel.addEventListener(
            "change",
            calculateTripCost
        );

    });


    const experiences =
        document.querySelectorAll(
            '.builder-option input[type="checkbox"]'
        );

    experiences.forEach(experience => {

        experience.addEventListener(
            "change",
            calculateTripCost
        );

    });


    calculateTripCost();

});
/* =========================================
   SAVE COMPLETE BUILT TRIP
========================================= */

function saveBuiltTrip() {

    const savedDestination =
        localStorage.getItem("selectedDestination");

    if (!savedDestination) {

        const message =
            document.getElementById("builderMessage");

        message.textContent =
            "Please select a destination first.";

        return;
    }

    const destination =
        JSON.parse(savedDestination);


    const days =
        parseInt(
            document.getElementById("tripDays").value
        );


    const selectedHotel =
        document.querySelector(
            'input[name="hotel"]:checked'
        );


    const hotelName =
        selectedHotel
            ? selectedHotel.dataset.name
            : "No hotel selected";


    const hotelPrice =
        selectedHotel
            ? parseInt(selectedHotel.value)
            : 0;


    const selectedExperiences =
        document.querySelectorAll(
            '.builder-option input[type="checkbox"]:checked'
        );


    const experiences = [];

    selectedExperiences.forEach(experience => {

        experiences.push({
            name: experience.dataset.name,
            price: parseInt(experience.value)
        });

    });


    const total =
        parseInt(
            document
                .getElementById("builderTotal")
                .textContent
                .replace(/[₹,]/g, "")
        );


    const builtTrip = {

        destination: destination.name,

        image: destination.image,

        travellers: travellerCount,

        days: days,

        hotel: {
            name: hotelName,
            price: hotelPrice
        },

        experiences: experiences,

        total: total,

        savedAt: new Date().toLocaleString()

    };


    localStorage.setItem("builtTrip", JSON.stringify(builtTrip));

    loadBuiltTrip();
    generateItinerary();
    updateItineraryTitle();

    const message = document.getElementById("builderMessage");


    message.textContent = "Your trip has been saved! You can view it below. ✓";
}
/* =========================================
   DISPLAY SAVED BUILT TRIP
========================================= */

function loadBuiltTrip() {

    const card =
        document.getElementById("builtTripCard");

    if (!card) return;

    const savedTrip =
        localStorage.getItem("builtTrip");

    if (!savedTrip) {

        card.innerHTML = `
            <div class="no-built-trip">

                <h3>No customized trip saved yet.</h3>

                <p>
                    Use the Trip Builder above to create
                    your perfect journey.
                </p>

            </div>
        `;

        return;
    }

    const trip =
        JSON.parse(savedTrip);


    let experienceHTML = "";

    if (trip.experiences.length === 0) {

        experienceHTML =
            `<span class="experience-tag">
                No experiences selected
            </span>`;

    } else {

        trip.experiences.forEach(experience => {

            experienceHTML += `
                <span class="experience-tag">
                    ✓ ${experience.name}
                </span>
            `;

        });
    }


    card.innerHTML = `

        <div class="built-trip-main">

            <img
                class="built-trip-image"
                src="${trip.image}"
                alt="${trip.destination}"
            >

            <div class="built-trip-info">

                <h3>${trip.destination}</h3>

                <div class="built-trip-details">

                    <div class="built-trip-detail">
                        <span>TRAVELLERS</span>
                        <strong>
                            👥 ${trip.travellers}
                        </strong>
                    </div>

                    <div class="built-trip-detail">
                        <span>DURATION</span>
                        <strong>
                            📅 ${trip.days} Days
                        </strong>
                    </div>

                    <div class="built-trip-detail">
                        <span>HOTEL</span>
                        <strong>
                            🏨 ${trip.hotel.name}
                        </strong>
                    </div>

                    <div class="built-trip-detail">
                        <span>SAVED</span>
                        <strong>
                            ${trip.savedAt}
                        </strong>
                    </div>

                </div>

            </div>

        </div>


        <div class="built-trip-experiences">

            <h4>EXPERIENCES</h4>

            <div class="experience-tags">
                ${experienceHTML}
            </div>

        </div>


        <div class="built-trip-total">

            <span>ESTIMATED TOTAL</span>

            <strong>
                ₹${trip.total.toLocaleString("en-IN")}
            </strong>

        </div>


        <div class="built-trip-actions">

            <button
                class="clear-trip-btn"
                onclick="clearBuiltTrip()">

                Clear Trip

            </button>

            <button
                class="continue-trip-btn"
                onclick="continueTrip()">

                Continue Planning →

            </button>

        </div>
    `;
}


/* CLEAR SAVED TRIP */

function clearBuiltTrip() {

    localStorage.removeItem("builtTrip");

    loadBuiltTrip();

}


/* CONTINUE PLANNING */

function continueTrip() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


loadBuiltTrip();
function updateItineraryTitle() {
    const title = document.getElementById("dynamicItineraryTitle");
    if (!title) return;

    const savedTrip = localStorage.getItem("builtTrip");

    if (!savedTrip) {
        title.textContent = "Your Travel Itinerary";
        return;
    }

    const trip = JSON.parse(savedTrip);
    const tripName = document.getElementById("dynamicTripName");

if (tripName) {
    tripName.textContent = `${trip.destination} Escape`;
}

    title.textContent = `${trip.days} Days of ${trip.destination} Magic`;
}

updateItineraryTitle();
function generateItinerary() {
    const container = document.getElementById("dynamicItinerary");
    if (!container) return;

    const savedTrip = localStorage.getItem("builtTrip");

    if (!savedTrip) {
        container.innerHTML = `
            <div class="empty-trip">
                <h3>No trip itinerary available</h3>
                <p>Build and save a trip first to generate your itinerary.</p>
            </div>
        `;
        return;
    }

    const trip = JSON.parse(savedTrip);

    const activities = [
        "Arrival & Hotel Check-in",
        "Explore the Local Area",
        "Discover Popular Attractions",
        "Local Food & Cultural Experience",
        "Adventure & Leisure Day",
        "Hidden Gems & Photography",
        "Relaxation & Free Exploration",
        "Shopping & Souvenir Hunt",
        "Final Sightseeing",
        "Departure & Goodbye"
    ];

    container.innerHTML = "";

    for (let day = 1; day <= trip.days; day++) {

        const activity = activities[(day - 1) % activities.length];

        const dayCard = document.createElement("div");
        dayCard.className = "itinerary-day";

        dayCard.innerHTML = `
            <div class="itinerary-day-number">
                <span>DAY</span>
                <strong>${day}</strong>
            </div>

            <div class="itinerary-day-content">
                <h3>${activity}</h3>
                <p>Enjoy your ${trip.destination} experience and make the most of your journey.</p>
                <span class="itinerary-location">📍 ${trip.destination}</span>
            </div>
        `;

        container.appendChild(dayCard);
    }
}

generateItinerary();
function saveBooking(type, details) {
    const existingBookings = JSON.parse(localStorage.getItem("triporaBookings")) || [];

    const booking = {
        id: Date.now(),
        type: type,
        ...details,
        bookedAt: new Date().toLocaleString()
    };

    existingBookings.push(booking);

    localStorage.setItem(
        "triporaBookings",
        JSON.stringify(existingBookings)
    );

    return booking;
}
function loadBookings() {
    const container = document.getElementById("bookingsList");
    if (!container) return;

    const bookings = JSON.parse(localStorage.getItem("triporaBookings")) || [];

    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="no-bookings">
                <h3>No bookings yet</h3>
                <p>Your hotel and flight bookings will appear here.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";

    bookings.forEach(booking => {
        const card = document.createElement("div");
        card.className = "booking-card";

        const icon = booking.type === "Hotel" ? "🏨" : "✈️";

        card.innerHTML = `
            <div class="booking-icon">${icon}</div>

            <div class="booking-info">
    <span>${booking.type}</span>
    <h3>${booking.name}</h3>

    ${booking.type === "Flight"
                ? `
        <p>📍 ${booking.from} → ${booking.to}</p>
        <p>📅 ${booking.date} &nbsp; • &nbsp; 👥 ${booking.passengers}</p>
      `
                : `
        <p>📍 ${booking.location}</p>
        <p>📅 ${booking.checkIn} → ${booking.checkOut} &nbsp; • &nbsp; 👥 ${booking.guests}</p>
      `
            }
</div>
            <div class="booking-price">
            <span>PRICE</span>
            <strong>₹${booking.price.toLocaleString("en-IN")}</strong>
            <button class="cancel-booking-btn" onclick="cancelBooking(${booking.id})">
                Cancel
            </button>
            </div>
        `;

        container.appendChild(card);
    });
}

loadBookings();
function cancelBooking(id) {
    const bookings = JSON.parse(localStorage.getItem("triporaBookings")) || [];

    const updatedBookings = bookings.filter(booking => booking.id !== id);

    localStorage.setItem(
        "triporaBookings",
        JSON.stringify(updatedBookings)
    );

    loadBookings();
}
function setupLogin() {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }

        const registeredUser = localStorage.getItem("triporaRegisteredUser");

        if (!registeredUser) {
            alert("No registered account found. Please create an account first.");
            return;
        }

        const user = JSON.parse(registeredUser);

        if (email !== user.email || password !== user.password) {
            alert("Incorrect email or password.");
            return;
        }

        const sessionUser = {
            email: email,
            loggedIn: true,
            loginTime: new Date().toLocaleString()
        };

        localStorage.setItem("triporaUser", JSON.stringify(sessionUser));

        alert("Login successful! ✈️");

        window.location.href = "index.html";
    });
}

setupLogin();

function updateNavbar() {
    const navLogin = document.getElementById("navLogin");

    if (!navLogin) return;

    const savedUser = localStorage.getItem("triporaUser");

    if (savedUser) {
        const user = JSON.parse(savedUser);

        if (user.loggedIn) {
            const navUser = document.getElementById("navUser");

            if (navUser) {
                const registeredUser = JSON.parse(
                    localStorage.getItem("triporaRegisteredUser")
                );

                navUser.textContent = registeredUser
                    ? `Hi, ${registeredUser.name}`
                    : "";
            }
            navLogin.textContent = "Logout";
            navLogin.href = "#";

            navLogin.onclick = function (event) {
                event.preventDefault();

                localStorage.removeItem("triporaUser");

                alert("You have been logged out.");

                window.location.href = "index.html";
            };
        }
    }
}

updateNavbar();
function setupRegistration() {
    const registerForm = document.getElementById("registerForm");

    if (!registerForm) return;

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const phone = document.getElementById("registerPhone").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("registerConfirmPassword").value;
        const preference = document.getElementById("travelPreference").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const user = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            preference: preference
        };

        localStorage.setItem("triporaRegisteredUser", JSON.stringify(user));

        alert("Account created successfully! 🎉");

        window.location.href = "login.html";
    });
}

setupRegistration();
/* =========================================
   TRIPORA — HERO SLIDER
   ========================================= */

let triporaHeroIndex = 0;
let triporaHeroTimer;

function showHeroSlide(index) {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    if (!slides.length) return;

    if (index >= slides.length) {
        triporaHeroIndex = 0;
    } else if (index < 0) {
        triporaHeroIndex = slides.length - 1;
    } else {
        triporaHeroIndex = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === triporaHeroIndex);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === triporaHeroIndex);
    });
}

function changeHeroSlide(direction) {
    showHeroSlide(triporaHeroIndex + direction);
    resetHeroTimer();
}

function goToHeroSlide(index) {
    showHeroSlide(index);
    resetHeroTimer();
}

function startHeroTimer() {
    triporaHeroTimer = setInterval(() => {
        showHeroSlide(triporaHeroIndex + 1);
    }, 5000);
}

function resetHeroTimer() {
    clearInterval(triporaHeroTimer);
    startHeroTimer();
}

showHeroSlide(0);
startHeroTimer();
/* =========================================
   TRIPORA — TRAVEL MOOD INTERACTION
   ========================================= */

function selectTravelMood(mood) {
    localStorage.setItem("selectedTravelMood", mood);

    window.location.href = `destinations.html?type=${mood}`;
}   
/* =========================================
   TRIPORA — HOMEPAGE SEARCH
   ========================================= */

function searchFromHome() {
    const searchInput = document.getElementById("homeDestinationSearch");

    if (!searchInput) return;

    const destination = searchInput.value.trim();

    if (!destination) {
        alert("Please enter a destination first.");
        searchInput.focus();
        return;
    }

    window.location.href =
        "destinations.html?search=" +
        encodeURIComponent(destination);
}
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);

    const searchValue = params.get("search");
    const mood = params.get("type");

    const searchInput =
        document.getElementById("destinationSearch");

    const typeFilter =
        document.getElementById("travelType");

    if (searchValue && searchInput) {
        searchInput.value = searchValue;
    }

    if (mood && typeFilter) {
        typeFilter.value = mood;
    }

    if (searchValue || mood) {
        filterDestinations();
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const savedTrip = localStorage.getItem("builtTrip");

    if (savedTrip) {
        const trip = JSON.parse(savedTrip);
        const budgetTotal = document.getElementById("dynamicBudgetTotal");

        if (budgetTotal) {
            budgetTotal.textContent =
                `₹${trip.total.toLocaleString("en-IN")}`;
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const savedTrip = localStorage.getItem("builtTrip");

    if (!savedTrip) return;

    const trip = JSON.parse(savedTrip);
    const tripName = document.getElementById("dynamicTripName");

    if (tripName) {
        tripName.textContent = `${trip.destination} Escape`;
    }
    const tripLocation = document.getElementById("dynamicTripLocation");

if (tripLocation) {
    tripLocation.textContent = `📍 ${trip.destination}`;
}
});
function searchFlights() {
    const fromCity = document.getElementById("fromCity");
    const toCity = document.getElementById("toCity");
    const flightMessage = document.getElementById("flightMessage");

    if (!fromCity || !toCity) return;

    const from = fromCity.value.trim();
    const to = toCity.value.trim();

    if (!from || !to) {
        alert("Please enter both departure and destination cities.");
        return;
    }

    document.querySelectorAll(".flight-from").forEach(function (element) {
        element.textContent = from;
    });

    document.querySelectorAll(".flight-to").forEach(function (element) {
        element.textContent = to;
    });

    if (flightMessage) {
        flightMessage.textContent =
            `Showing available flights from ${from} to ${to}.`;
    }
}