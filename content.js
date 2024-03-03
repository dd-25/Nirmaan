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

observer.observe(target); // Start observing the target element

// window.onload = function () {
//     animateCount(50000); // Change 50000 to your desired final count
// };  

let services = document.querySelectorAll('.service');

services.forEach(function (service, index) {
    // Add click event listener to each service
    service.addEventListener('click', function () {
        // Implement different functions based on the index of the clicked service
        document.querySelector('.services-click').style.visibility = 'visible';
        switch (index) {
            case 0:
                document.querySelector('.architect').style.display = 'flex';
                
                console.log("Architect");
                break;
            case 1:
                document.querySelector('.contractor').style.display = 'flex'
                console.log("Clicked on service 2");
                break;
            case 2:
                document.querySelector('.flooring').style.display = 'flex'
                console.log("Clicked on service 3");
                break;
            case 3:
                document.querySelector('.painter').style.display = 'flex'
                console.log("Clicked on service 3");
                break;
            case 4:
                document.querySelector('.furniture').style.display = 'flex'
                console.log("Clicked on service 3");
                break;
            case 5:
                document.querySelector('.electrician').style.display = 'flex'
                console.log("Clicked on service 3");
                break;
            case 6:
                document.querySelector('.plumber').style.display = 'flex'
                console.log("Clicked on service 3");
                break;
        }
    });
});

let cross_icon = document.querySelector('.fa-arrow-circle-left')
cross_icon.addEventListener('click',()=>{
    document.querySelector('.services-click').style.visibility = 'hidden';
    document.querySelector('.architect').style.display = 'none';
    document.querySelector('.contractor').style.display = 'none';
    document.querySelector('.flooring').style.display = 'none';
    document.querySelector('.painter').style.display = 'none';
    document.querySelector('.electrician').style.display = 'none';
    document.querySelector('.plumber').style.display = 'none';
    var boxInfoHidden = document.querySelector('.box-info.hidden');
    if (boxInfoHidden && window.getComputedStyle(boxInfoHidden).display === 'flex') {
        document.querySelector('.box-info').classList.toggle('hidden');
    }
    
})

document.querySelector('.search-icon').addEventListener('click', function() {
    var searchContainer = document.querySelector('.search-container');
    searchContainer.classList.toggle('show');
});

document.querySelector('.menuIcon').addEventListener('click', function() {
    var menuOptions = document.querySelector('.menu-options');
    // Toggle the visibility of the menu options
    menuOptions.classList.toggle('hidden');
});



const box = document.querySelector('.box')
box.addEventListener('click',()=>{

    document.querySelector('.box-info').classList.toggle('hidden');
})