// team-carousel.js - Team member carousel for About page
// This creates a sliding carousel to showcase the amazing team members

class TeamCarousel {
  constructor() {
    this.carousel = document.querySelector(".team-carousel");
    this.grid = document.querySelector(".team-grid");
    this.prevButton = document.querySelector(".team-prev");
    this.nextButton = document.querySelector(".team-next");
    this.members = document.querySelectorAll(".team-member");

    this.currentIndex = 0;
    this.membersPerView = this.getMembersPerView();

    this.init();
  }

  init() {
    // Set up event listeners for navigation
    this.prevButton.addEventListener("click", () => this.prev());
    this.nextButton.addEventListener("click", () => this.next());

    // Handle window resize to adjust how many members are visible
    window.addEventListener("resize", () => this.handleResize());

    // Initial setup
    this.updateCarousel();
  }

  // Figure out how many team members to show based on screen size
  getMembersPerView() {
    const width = window.innerWidth;

    if (width >= 1025) {
      return 4; // Desktop - show 4 team members
    } else if (width >= 769) {
      return 2; // Tablet - show 2 team members
    } else {
      return 1; // Mobile - show 1 team member
    }
  }

  handleResize() {
    const newMembersPerView = this.getMembersPerView();

    if (newMembersPerView !== this.membersPerView) {
      this.membersPerView = newMembersPerView;
      this.currentIndex = 0;
      this.updateCarousel();
    }
  }

  updateCarousel() {
    const memberWidth = 100 / this.membersPerView;
    const translateX = -this.currentIndex * memberWidth;

    this.grid.style.transform = `translateX(${translateX}%)`;

    // Update button states (enable/disable based on position)
    this.updateButtonStates();
  }

  // Go to previous set of team members
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  // Go to next set of team members
  next() {
    const maxIndex = this.members.length - this.membersPerView;

    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  // Update button states - disable when at ends
  updateButtonStates() {
    // Previous button - disable when at start
    if (this.currentIndex === 0) {
      this.prevButton.style.opacity = "0.5";
      this.prevButton.style.cursor = "not-allowed";
    } else {
      this.prevButton.style.opacity = "1";
      this.prevButton.style.cursor = "pointer";
    }

    // Next button - disable when at end
    const maxIndex = this.members.length - this.membersPerView;
    if (this.currentIndex >= maxIndex) {
      this.nextButton.style.opacity = "0.5";
      this.nextButton.style.cursor = "not-allowed";
    } else {
      this.nextButton.style.opacity = "1";
      this.nextButton.style.cursor = "pointer";
    }
  }
}

// Initialize the carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TeamCarousel();
});