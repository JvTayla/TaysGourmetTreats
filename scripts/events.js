// events.js - Upcoming events data and display
// This shows all the upcoming holidays and special occasions for planning treats

// Template for all the events throughout the year
const eventsTemplate = [
  // South African Public Holidays - great opportunities for special treats!
  {
    name: "New Year's Day",
    description:
      "Celebrate the start of the year with something sweet before we lock in for those summer bodies",
    image: "../assets/images/events/NewYearsDay.jpg",
    month: 0, // January (0-indexed)
    day: 1,
  },
  {
    name: "Human Rights Day",
    description: "Remembering human rights",
    image: "../assets/images/events/HumanRightsDay.png",
    month: 2, // March
    day: 21,
  },
  {
    name: "Good Friday",
    description: "Religious holiday",
    image: "../assets/images/events/GoodFriday.jpg",
    month: 3, // April
    day: 18,
  },
  {
    name: "Family Day",
    description:
      "A day to spend with family, nothing brings people together like sweet treats",
    image: "../assets/images/events/FamilyDay.jpg",
    month: 3, // April
    day: 21,
  },
  {
    name: "Freedom Day",
    description: "A day that commemorates democracy",
    image: "../assets/images/events/FreedomDay.png",
    month: 3, // April
    day: 27,
  },
  {
    name: "Freedom Day (observed)",
    description:
      "A great time for an extended long weekend to celebrate freedom and democracy",
    image: "../assets/images/events/FreedomDayO.jpeg",
    month: 3, // April
    day: 28,
  },
  {
    name: "Workers' Day",
    description: "A great time to honor workers",
    image: "../assets/images/WorkersDay.jpeg",
    month: 4, // May
    day: 1,
  },
  {
    name: "Youth Day",
    description: "A great time to celebrate youth",
    image: "../assets/images/events/YouthDay.png",
    month: 5, // June
    day: 16,
  },
  {
    name: "National Women's Day",
    description: "A great time to celebrate women",
    image: "../assets/images/events/WomensDay.jpg",
    month: 7, // August
    day: 9,
  },
  {
    name: "Heritage Day",
    description: "A great time to celebrate South African heritage",
    image: "../assets/images/events/HeritageDay.jpeg",
    month: 8, // September
    day: 24,
  },
  {
    name: "Day of Reconciliation",
    description:
      "A day to promote unity, nothing better than a sweet treat to bring people together",
    image: "../assets/images/events/DayOfReconciliation.jpg",
    month: 11, // December
    day: 16,
  },
  {
    name: "Christmas Day",
    description:
      "A great time for a festive Christmas celebration with the best matching Treats",
    image: "../assets/images/events/Christmas.jpeg",
    month: 11, // December
    day: 25,
  },
  {
    name: "Day of Goodwill",
    description: "The day after Christmas for goodwill",
    image: "../assets/images/events/Goodwill.jpeg",
    month: 11, // December
    day: 26,
  },

  // Gift & Relationship Days - perfect for sweet gestures!
  {
    name: "Valentine's Day",
    description: "The perfect time to celebrate love and romance",
    image: "../assets/imagesValentinesDay.jpeg",
    month: 1, // February
    day: 14,
  },
  {
    name: "Mother's Day",
    description:
      "A day to celebrate your mother with something as sweet as her",
    image: "../assets/images/events/MothersDay.jpeg",
    month: 4, // May
    day: 11,
  },
  {
    name: "Father's Day",
    description: "A day to honor your father with something delicious",
    image: "../assets/images/events/FathersDay.jpeg",
    month: 5, // June
    day: 15,
  },
  {
    name: "National Girlfriend Day",
    description: "Celebrate your girlfriend with a sweet treat",
    image: "../assets/images/events/GirlfriendsDay.jpeg",
    month: 7, // August
    day: 1,
  },
  {
    name: "National Boyfriend Day",
    description: "Celebrate your boyfriend with a sweet treat!",
    image: "../assets/images/events/BoyfriendsDay.jpeg",
    month: 9, // October
    day: 3,
  },

  // Exam Seasons - students need treats for energy and celebration!
  {
    name: "Mid-year Exams Start",
    description: "A great time for good luck care packages",
    image: "../assets/images/events/Exam.jpg",
    month: 5, // June
    day: 1,
  },
  {
    name: "Mid-year Exams End",
    description: "A great time to celebrate the end of mid-year exams",
    image: "../assets/images/events/ExamOver.jpg",
    month: 6, // July
    day: 31,
  },
  {
    name: "Final Exams Start",
    description: "A great time to gift good luck care packages for final exams",
    image: "../assets/images/events/Exam.jpg",
    month: 10, // November
    day: 15,
  },
  {
    name: "Final Exams End",
    description: "A great time to celebrate the end of final exams",
    image: "../assets/images/events/ExamOver.jpg",
    month: 11, // December
    day: 5,
  },

  // Fun Dates - just because treats are always welcome!
  {
    name: "Halloween",
    description: "A great time for some spooky sweet treats",
    image: "../assets/images/events/Halloween.jpeg",
    month: 9, // October
    day: 31,
  },
  {
    name: "New Year's Eve",
    description: "Celebrate the end of the year",
    image: "../assets/images/events/NewYearsDay.jpg",
    month: 11, // December
    day: 31,
  },
];

// Generate events for multiple years so we always have upcoming events
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

// Generate events for 2025–2027 - planning ahead!
const events = generateEventsForYears(2025, 2027);

// Get upcoming events - only show future events, not past ones
function getUpcomingEvents(events, count = 4) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // reset time for accurate comparison

  const upcoming = events.filter((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });

  // Sort by date - soonest first
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

  // Create a card for each upcoming event
  upcomingEvents.forEach((event) => {
    const card = document.createElement("div");
    card.className = "event-card";

    // Create event name heading
    const eventName = document.createElement("h3");
    eventName.className = "event-name";
    eventName.textContent = event.name;

    // Create event date with nice formatting
    const eventDate = document.createElement("p");
    eventDate.className = "event-date";
    eventDate.textContent = formatDate(event.date);

    // Create image container
    const imageContainer = document.createElement("div");
    imageContainer.className = "event-image-container";

    const img = document.createElement("img");
    img.src = event.image;
    img.alt = `${event.name} - ${event.description}`;
    img.className = "event-image";

    const caption = document.createElement("figcaption");
    caption.textContent = event.description;
    caption.className = "event-caption";

    // Append elements in correct order
    imageContainer.appendChild(img);
    card.appendChild(eventName);
    card.appendChild(eventDate);
    card.appendChild(imageContainer);
    card.appendChild(caption);

    container.appendChild(card);
  });
}

// Helper function to format date as "Date Month Year" with proper ordinal (1st, 2nd, 3rd, etc.)
function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Add ordinal suffix to day (1st, 2nd, 3rd, 4th, etc.)
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

// Render events when the page loads
window.onload = renderEvents;
