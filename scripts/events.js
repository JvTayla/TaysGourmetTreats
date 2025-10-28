const eventsTemplate = [
  // South African Public Holidays
  {
    name: "New Year's Day",
    description: "Celebrate the start of the year",
    image: "assets/images/events/NewYearsDay.jpg",
    month: 0,
    day: 1,
  },
  {
    name: "Human Rights Day",
    description: "Remembering human rights",
    image: "assets/images/events/HumanRightsDay.png",
    month: 2,
    day: 21,
  },
  {
    name: "Good Friday",
    description: "Religious holiday",
    image: "assets/images/events/GoodFriday.jpg",
    month: 3,
    day: 18,
  },
  {
    name: "Family Day",
    description: "Day to spend with family",
    image: "assets images/events/FamilyDay.jpg",
    month: 3,
    day: 21,
  },
  {
    name: "Freedom Day",
    description: "Commemorates democracy",
    image: "assets/images/events/FreedomDay.png",
    month: 3,
    day: 27,
  },
  {
    name: "Freedom Day (observed)",
    description: "Extended long weekend",
    image: "assets/images/events/FreedomDayO.jpeg",
    month: 3,
    day: 28,
  },
  {
    name: "Workers’ Day",
    description: "Honoring workers",
    image: "assets/images/WorkersDay.jpeg",
    month: 4,
    day: 1,
  },
  {
    name: "Youth Day",
    description: "Celebrating youth",
    image: "assets/images/events/YouthDay.png",
    month: 5,
    day: 16,
  },
  {
    name: "National Women’s Day",
    description: "Celebrating women",
    image: "assets/images/events/WomensDay.jpg",
    month: 7,
    day: 9,
  },
  {
    name: "Heritage Day",
    description: "Celebrating South African heritage",
    image: "assets/images/events/HeritageDay.jpeg",
    month: 8,
    day: 24,
  },
  {
    name: "Day of Reconciliation",
    description: "Promoting unity",
    image: "assets/images/events/DayOfReconciliation.jpg",
    month: 11,
    day: 16,
  },
  {
    name: "Christmas Day",
    description: "Festive Christmas celebration",
    image: "assets/images/events/Christmas.jpeg",
    month: 11,
    day: 25,
  },
  {
    name: "Day of Goodwill",
    description: "Day after Christmas for goodwill",
    image: "assets/images/events/Goodwill.jpeg",
    month: 11,
    day: 26,
  },

  // Gift & Relationship Days
  {
    name: "Valentine’s Day",
    description: "Celebrate love and romance",
    image: "assets/imagesValentinesDay.jpeg",
    month: 1,
    day: 14,
  },
  {
    name: "Mother’s Day",
    description: "Honoring mothers",
    image: "assets/images/events/MothersDay.jpeg",
    month: 4,
    day: 11,
  },
  {
    name: "Father’s Day",
    description: "Honoring fathers",
    image: "assets/images/events/FathersDay.jpeg",
    month: 5,
    day: 15,
  },
  {
    name: "National Girlfriend Day",
    description: "Celebrate girlfriends with sweet treats",
    image: "assets/images/events/GirlfriendsDay.jpeg",
    month: 7,
    day: 1,
  },
  {
    name: "National Boyfriend Day",
    description: "Celebrate boyfriends with custom cakes",
    image: "assets/images/events/BoyfriendsDay.jpeg",
    month: 9,
    day: 3,
  },

  // Exam Seasons
  {
    name: "Mid-year Exams Start",
    description: "Good luck care packages",
    image: "assets/images/events/Exam.jpeg",
    month: 5,
    day: 1,
  },
  {
    name: "Mid-year Exams End",
    description: "End of mid-year exams",
    image: "assets/images/events/ExamOver.jpeg",
    month: 6,
    day: 31,
  },
  {
    name: "Final/Matric Exams Start",
    description: "Good luck care packages for final exams",
    image: "assets/images/events/Exam.jpeg",
    month: 10,
    day: 15,
  },
  {
    name: "Final/Matric Exams End",
    description: "End of final exams",
    image: "assets/images/events/ExamOver.jpeg",
    month: 11,
    day: 5,
  },

  // Fun Dates
  {
    name: "Halloween",
    description: "Spooky sweet treats",
    image: "assets/images/events/Halloween.jpeg",
    month: 9,
    day: 31,
  },
  {
    name: "New Year's Eve",
    description: "Celebrate the end of the year",
    image: "assets/images/events/NewYearsDay.jpg",
    month: 11,
    day: 31,
  },
];

// Generate events for multiple years
function generateEventsForYears(startYear, endYear) {
  let events = [];
  for (let year = startYear; year <= endYear; year++) {
    events = events.concat(
      eventsTemplate.map((e) => ({
        ...e,
        date: new Date(year, e.month, e.day),
      }))
    );
  }
  return events;
}

// Generate events for 2025–2027
const events = generateEventsForYears(2025, 2027);

// Get upcoming events
function getUpcomingEvents(events, count = 4) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // reset time for comparison

  const upcoming = events.filter((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });

  upcoming.sort((a, b) => a.date - b.date);

  return upcoming.slice(0, count);
}

// Render events into the DOM
function renderEvents() {
  const container = document.getElementById("event-cards-container");
  container.innerHTML = "";

  const upcomingEvents = getUpcomingEvents(events);

  if (upcomingEvents.length === 0) {
    container.innerHTML =
      "<p>No upcoming events at the moment. Check back soon!</p>";
    return;
  }

  upcomingEvents.forEach((event) => {
    const card = document.createElement("div");
    card.className = "event-card";

    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = event.image;
    img.alt = `${event.name} - ${event.description}`;

    img.style.width = "25em";
    img.style.height = "25em";
    img.style.objectFit = "contain";
    const caption = document.createElement("figcaption");
    caption.textContent = event.description;

    figure.appendChild(img);
    figure.appendChild(caption);
    card.appendChild(figure);

    container.appendChild(card);
  });
}

window.onload = renderEvents;
