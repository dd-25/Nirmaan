function animateCount(target) {
    const counterElement = document.getElementById("userCount");
    const duration = 1500; // Adjust animation duration in milliseconds
    const interval = 50; // Interval between count updates in milliseconds
    const steps = Math.ceil(duration / interval);
    const increment = Math.ceil(target / steps);
    let current = 0; // Starting value

    function updateCounter() {
        current += increment;
        counterElement.innerHTML = current.toLocaleString();

        if (current < target) {
            setTimeout(updateCounter, interval);
        } else {
            // Display target value with a plus sign after animation completes
            counterElement.innerHTML = target.toLocaleString() + "+";
        }
    }

    updateCounter();
}

const target = document.getElementById("userCount"); // Define the target element
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start the animation when the target element becomes visible
            animateCount(50000);
            observer.unobserve(entry.target); // Stop observing the target element
        }
    });
});

try{
    observer.observe(target); // Start observing the target element
}
catch{
    console.log("caught successfully")
}

document.querySelector('.search-icon').addEventListener('click', function() {
    var searchContainer = document.querySelector('.search-container');
    searchContainer.classList.toggle('show');
});
document.querySelector('.menuIcon').addEventListener('click', function() {
    var menuOptions = document.querySelector('.menu-options');
    // Toggle the visibility of the menu options
    menuOptions.classList.toggle('hidden');
});

const scrollDiv = document.querySelector(".h");
function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', scrollDiv.scrollTop);
}
function restoreScrollPosition() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        scrollDiv.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
}
if(scrollDiv)
scrollDiv.addEventListener('scroll', saveScrollPosition);
window.onload = restoreScrollPosition;