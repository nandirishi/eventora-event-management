// ==========================================
// EVENTORA - MAIN JAVASCRIPT
// ==========================================

// 1. EVENT DATABASE
const events = [
    {
        id: 1,
        name: "Neon Nights Music Festival",
        category: "Music",
        date: "2026-12-12T18:00:00",
        displayDate: "12 December 2026",
        location: "Bhubaneswar, Odisha",
        price: "₹799",
        description: "Experience an electrifying night of music, lights and unforgettable performances.",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
        details: "Join music lovers for an incredible evening featuring live performances, energetic DJs, and spectacular lighting."
    },
    {
        id: 2,
        name: "FutureTech Summit 2026",
        category: "Technology",
        date: "2026-12-18T09:00:00",
        displayDate: "18 December 2026",
        location: "Bengaluru, Karnataka",
        price: "₹499",
        description: "Explore artificial intelligence, innovation and the future of technology.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        details: "Meet technology enthusiasts, developers, and industry leaders. Discover groundbreaking developments in AI and Cloud Computing."
    },
    {
        id: 3,
        name: "Creative Minds Workshop",
        category: "Workshop",
        date: "2026-12-22T10:00:00",
        displayDate: "22 December 2026",
        location: "New Delhi, India",
        price: "₹299",
        description: "Unlock your creativity through interactive sessions and practical learning.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
        details: "Participate in hands-on creative design sprints, collaborate with peers, and build portfolio pieces."
    },
    {
        id: 4,
        name: "Cultural Carnival",
        category: "Culture",
        date: "2027-01-05T16:00:00",
        displayDate: "5 January 2027",
        location: "Kolkata, West Bengal",
        price: "₹399",
        description: "Celebrate art, culture, traditional performances and incredible food.",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
        details: "Enjoy an exciting celebration of regional heritage through dance, live theatrical art, and street gastronomy."
    },
    {
        id: 5,
        name: "Champions Sports Meet",
        category: "Sports",
        date: "2027-01-12T08:00:00",
        displayDate: "12 January 2027",
        location: "Mumbai, Maharashtra",
        price: "₹199",
        description: "Celebrate athletic excellence with exciting sporting competitions.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
        details: "Experience track events, team challenges, and dynamic competitions across multiple athletic categories."
    },
    {
        id: 6,
        name: "AI & Machine Learning Expo",
        category: "Technology",
        date: "2027-01-20T10:00:00",
        displayDate: "20 January 2027",
        location: "Hyderabad, Telangana",
        price: "₹599",
        description: "Discover the possibilities of AI, machine learning and intelligent systems.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
        details: "Technical keynotes, interactive robotics labs, and networking with machine learning researchers."
    }
];

// 2. DOM ELEMENTS
const eventGrid = document.getElementById("eventGrid");
const eventCount = document.getElementById("eventCount");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const filterButtons = document.querySelectorAll(".category-btn");

const registrationModal = document.getElementById("registrationModal");
const closeModal = document.getElementById("closeModal");
const registrationForm = document.getElementById("registrationForm");
const selectedEvent = document.getElementById("selectedEvent");
const selectedEventText = document.getElementById("selectedEventText");
const registrationMessage = document.getElementById("registrationMessage");

const detailsModal = document.getElementById("detailsModal");

// 3. RENDER EVENTS
function displayEvents(eventList) {
    eventGrid.innerHTML = "";
    eventCount.textContent = eventList.length;

    if (eventList.length === 0) {
        document.getElementById("noEvents").hidden = false;
        return;
    }
    document.getElementById("noEvents").hidden = true;

    eventList.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <div class="event-image">
                <img src="${event.image}" alt="${escapeHTML(event.name)}" loading="lazy">
                <span class="event-category">${escapeHTML(event.category)}</span>
            </div>
            <div class="event-info">
                <span class="event-date">📅 ${event.displayDate}</span>
                <h3>${escapeHTML(event.name)}</h3>
                <p class="event-description">${escapeHTML(event.description)}</p>
                <p class="event-location">📍 ${escapeHTML(event.location)}</p>
                <div class="event-footer">
                    <span class="event-price">${event.price}</span>
                    <button class="event-details-btn" onclick="openDetails(${event.id})">Details ↗</button>
                    <button class="primary-button" onclick="openRegistration(${event.id})" style="padding: 6px 14px; font-size: 12px;">Register</button>
                </div>
            </div>
        `;
        eventGrid.appendChild(card);
    });
}

// 4. EVENT DETAILS MODAL
function openDetails(eventId) {
    const item = events.find(e => e.id === eventId);
    if (!item) return;

    document.getElementById("detailTitle").textContent = item.name;
    document.getElementById("detailCategory").textContent = `${item.category} • ${item.displayDate}`;
    document.getElementById("detailDescription").textContent = item.details;
    document.getElementById("detailLocation").textContent = `📍 Location: ${item.location}`;
    document.getElementById("detailPrice").textContent = `Ticket Price: ${item.price}`;
    
    const regBtn = document.getElementById("detailRegisterBtn");
    regBtn.onclick = () => {
        closeDetails();
        openRegistration(item.id);
    };

    detailsModal.hidden = false;
}

function closeDetails() {
    detailsModal.hidden = true;
}

// 5. SEARCH AND FILTER
let selectedCategory = "All";

function filterEvents() {
    const searchText = searchInput.value.toLowerCase().trim();

    let filteredEvents = events.filter(event => {
        const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
        const matchesSearch =
            event.name.toLowerCase().includes(searchText) ||
            event.location.toLowerCase().includes(searchText) ||
            event.category.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    const sortValue = sortSelect.value;
    if (sortValue === "date") {
        filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortValue === "name") {
        filteredEvents.sort((a, b) => a.name.localeCompare(b.name));
    }

    displayEvents(filteredEvents);
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedCategory = button.dataset.category;
        filterEvents();
    });
});

searchInput.addEventListener("input", filterEvents);
sortSelect.addEventListener("change", filterEvents);

// 6. REGISTRATION SYSTEM
function openRegistration(eventId) {
    const eventItem = events.find(item => item.id === eventId);
    if (!eventItem) return;

    const currentUser = JSON.parse(localStorage.getItem("eventoraCurrentUser"));
    if (currentUser) {
        document.getElementById("participantName").value = currentUser.name;
        document.getElementById("participantEmail").value = currentUser.email;
    }

    selectedEvent.value = eventItem.name;
    selectedEventText.textContent = "Reserving a spot for: " + eventItem.name;
    registrationMessage.hidden = true;
    registrationForm.hidden = false;
    registrationModal.hidden = false;
}

closeModal.addEventListener("click", () => { registrationModal.hidden = true; });
window.addEventListener("click", (e) => {
    if (e.target === registrationModal) registrationModal.hidden = true;
    if (e.target === detailsModal) detailsModal.hidden = true;
});

registrationForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("participantName").value.trim();
    const email = document.getElementById("participantEmail").value.trim();
    const phone = document.getElementById("participantPhone").value.trim();
    const eventName = selectedEvent.value;

    if (name.length < 2) {
        alert("Please enter a valid full name.");
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    const registration = {
        name: name,
        email: email,
        phone: phone,
        event: eventName,
        registeredAt: new Date().toLocaleString()
    };

    let registrations = JSON.parse(localStorage.getItem("eventoraRegistrations")) || [];
    registrations.push(registration);
    localStorage.setItem("eventoraRegistrations", JSON.stringify(registrations));

    registrationForm.hidden = true;
    registrationMessage.hidden = false;
    registrationMessage.textContent = `✓ Registration Confirmed! Thank you ${name}, your spot for ${eventName} has been booked.`;
});

// 7. COUNTDOWN TIMER BONUS FEATURE
function initCountdownTimer() {
    const targetDate = new Date(events[0].date).getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            document.getElementById("timerDisplay").innerHTML = "Event is Live Now!";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2, "0");
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// 8. THEME TOGGLE
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    themeToggle.textContent = isLight ? "☾" : "☀";
    localStorage.setItem("eventoraTheme", isLight ? "light" : "dark");
});

if (localStorage.getItem("eventoraTheme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☾";
}

// 9. AUTHENTICATION & MY REGISTRATIONS
let currentAuthMode = "login";

function openAuth(mode) {
    currentAuthMode = mode;
    const modal = document.getElementById("authModal");
    const title = document.getElementById("authTitle");
    const subtitle = document.getElementById("authSubtitle");
    const nameField = document.getElementById("signupNameField");
    const submit = document.getElementById("authSubmit");
    const switchText = document.getElementById("authSwitch");
    document.getElementById("authMessage").textContent = "";

    modal.hidden = false;
    document.getElementById("authForm").reset();

    if (mode === "signup") {
        title.textContent = "Create Your Account";
        subtitle.textContent = "Join EVENTORA to easily manage registrations.";
        nameField.hidden = false;
        submit.textContent = "Create Account";
        switchText.innerHTML = 'Already have an account? <a href="#" onclick="openAuth(\'login\'); return false;">Log In</a>';
    } else {
        title.textContent = "Welcome Back!";
        subtitle.textContent = "Log in to manage your registrations.";
        nameField.hidden = true;
        submit.textContent = "Log In";
        switchText.innerHTML = 'Don\'t have an account? <a href="#" onclick="openAuth(\'signup\'); return false;">Sign Up</a>';
    }
}

function closeAuth() {
    document.getElementById("authModal").hidden = true;
}

document.getElementById("authForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("authEmail").value.trim().toLowerCase();
    const password = document.getElementById("authPassword").value;
    const message = document.getElementById("authMessage");

    let users = JSON.parse(localStorage.getItem("eventoraUsers")) || [];

    if (password.length < 6) {
        message.textContent = "Password must contain at least 6 characters.";
        return;
    }

    if (currentAuthMode === "signup") {
        if (name.length < 2) {
            message.textContent = "Please enter your full name.";
            return;
        }
        if (users.some(user => user.email === email)) {
            message.textContent = "An account with this email already exists.";
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("eventoraUsers", JSON.stringify(users));
        localStorage.setItem("eventoraCurrentUser", JSON.stringify({ name, email }));
    } else {
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            message.textContent = "Invalid email or password.";
            return;
        }
        localStorage.setItem("eventoraCurrentUser", JSON.stringify({ name: user.name, email: user.email }));
    }

    closeAuth();
    updateAccountNavigation();
});

function updateAccountNavigation() {
    const user = JSON.parse(localStorage.getItem("eventoraCurrentUser"));
    const accountActions = document.getElementById("accountActions");
    const userMenu = document.getElementById("userMenu");

    if (user) {
        accountActions.style.display = "none";
        userMenu.style.display = "block";
        document.getElementById("userGreeting").textContent = "Hi, " + user.name.split(" ")[0];
    } else {
        accountActions.style.display = "flex";
        userMenu.style.display = "none";
    }
}

function toggleUserMenu() {
    document.getElementById("userDropdown").classList.toggle("show");
}

function logoutUser() {
    localStorage.removeItem("eventoraCurrentUser");
    document.getElementById("userDropdown").classList.remove("show");
    updateAccountNavigation();
}

function showMyRegistrations() {
    const user = JSON.parse(localStorage.getItem("eventoraCurrentUser"));
    if (!user) {
        openAuth("login");
        return;
    }

    const registrations = JSON.parse(localStorage.getItem("eventoraRegistrations")) || [];
    const userRegistrations = registrations.filter(r => r.email && r.email.toLowerCase() === user.email);
    const list = document.getElementById("myRegistrationsList");

    if (userRegistrations.length === 0) {
        list.innerHTML = "<p style='color: var(--muted); margin-top:15px;'>You haven't registered for any events yet.</p>";
    } else {
        list.innerHTML = userRegistrations.map(r => `
            <div class="registration-item">
                <h3>${escapeHTML(r.event || "Event")}</h3>
                <p>Participant: ${escapeHTML(r.name)}</p>
                <p>Date Registered: ${escapeHTML(r.registeredAt)}</p>
            </div>
        `).join("");
    }

    document.getElementById("myRegistrationsModal").hidden = false;
    document.getElementById("userDropdown").classList.remove("show");
}

function closeMyRegistrations() {
    document.getElementById("myRegistrationsModal").hidden = true;
}

function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[c]);
}

// 10. INITIALIZE APP
displayEvents(events);
initCountdownTimer();
updateAccountNavigation();