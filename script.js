const MY_WEBSITE = "Personal Website";
let currentSection = "homepage";
let autoSlideInterval = null;
let carouselInner = null;
let currentIndex = 0;
let cloneCount = 0;
const cardWidth = 380; 
function initializeButtons() {
    try {
        const buttons = document.querySelectorAll(".navbar nav ul li button:not(.close-btn)");
        if (!buttons || buttons.length !== 3) throw new Error(`Expected 3 navigation buttons, found: ${buttons?.length || 0}`);
        buttons.forEach((button, index) => {
            button.onclick = () => {
                console.log(`${["Home", "Portfolio", "Favorites"][index]} button clicked`);
                showSection(["homepage", "portfolio", "favorites"][index]);
            };
        });
    } catch (error) {
        console.error("Error initializing navigation buttons:", error);
    }
}

function showSection(sectionId) {
    try {
        if (!sectionId || typeof sectionId !== "string") throw new Error("Invalid section ID");
        const sections = document.getElementsByClassName("container");
        if (!sections.length) throw new Error("No sections found");

        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }

        for (let i = 0; i < sections.length; i++) {
            sections[i].classList.add("hidden");
        }

        const section = document.getElementById(sectionId);
        if (!section) throw new Error(`Section not found: ${sectionId}`);
        section.classList.remove("hidden");
        currentSection = sectionId;
        console.log("Current section updated to:", currentSection);

        if (sectionId === "homepage") {
            if (!carouselInner) console.warn("Carousel not initialized");
            else {
                resetCarousel();
                startCarousel();
            }
        }
    } catch (error) {
        console.error("Error in showSection:", error);
    }
}

function closeWebsite() {
    try {
        if (confirm("Are you sure you want to exit the website?")) {
            self.close();
        }
    } catch (error) {
        console.error("Error in closeWebsite:", error);
        alert("Unable to close the window. This may not work in some browsers unless the window was opened by a script.");
    }
}

function compareWords() {
    try {
        let w1 = prompt("Enter word 1: ")?.trim();
        let w2 = prompt("Enter word 2: ")?.trim();

        if (w1 === null || w2 === null) throw new Error("Input cancelled by user.");
        if (!w1 || !w2) throw new Error("Both words must be non-empty.");

        if (w1.length > w2.length) {
            alert(`The longer word is "${w1}".`);
            console.log(`The longer word is "${w1}".`);
        } else if (w1.length < w2.length) {
            alert(`The longer word is "${w2}".`);
            console.log(`The longer word is "${w2}".`);
        } else {
            alert("Both words are equal in length.");
            console.log("Both words are equal in length.");
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error("Error in compareWords:", error);
    }
}

function performOperation() {
    try {
        let num1 = parseFloat(prompt("Enter number 1: ")?.trim());
        let num2 = parseFloat(prompt("Enter number 2: ")?.trim());
        let op = prompt("Enter operation: A (Add), S (Subtract), M (Multiply), D (Divide)")?.toLowerCase().trim();

        if (num1 === null || num2 === null || op === null) throw new Error("Input cancelled by user.");
        if (isNaN(num1) || isNaN(num2)) throw new Error("Invalid input! Please enter valid numbers.");
        if (!["a", "s", "m", "d"].includes(op)) throw new Error("Invalid operation. Please enter A, S, M, or D.");

        let result;
        switch (op) {
            case "a": result = num1 + num2; alert(`${num1} + ${num2} = ${result}`); console.log(`${num1} + ${num2} = ${result}`); break;
            case "s": result = num1 - num2; alert(`${num1} - ${num2} = ${result}`); console.log(`${num1} - ${num2} = ${result}`); break;
            case "m": result = num1 * num2; alert(`${num1} * ${num2} = ${result}`); console.log(`${num1} * ${num2} = ${result}`); break;
            case "d":
                if (num2 === 0) throw new Error("Division by 0 is not allowed.");
                result = num1 / num2; alert(`${num1} / ${num2} = ${result.toFixed(2)}`); console.log(`${num1} / ${num2} = ${result.toFixed(2)}`); break;
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error("Error in performOperation:", error);
    }
}

function showBirthstone() {
    try {
        let month = prompt("Enter birth month")?.toLowerCase().trim();

        if (month === null) throw new Error("Input cancelled by user.");
        if (!month) throw new Error("Month cannot be empty.");
        if (!isNaN(parseFloat(month)) && !isNaN(month - 0)) throw new Error("Invalid input! Please enter a valid month name (e.g., January).");

        const birthstones = {
            january: "Garnet", february: "Amethyst", march: "Aquamarine", april: "Diamond",
            may: "Emerald", june: "Alexandrite & Pearl", july: "Ruby", august: "Peridot",
            september: "Sapphire", october: "Opal & Tourmaline", november: "Citrine & Topaz",
            december: "Blue Zircon, Turquoise & Tanzanite"
        };

        if (!birthstones[month]) throw new Error("Invalid month. Please enter a correct month name (e.g., January).");

        alert(`Your birth month is ${month}, Your birthstone is ${birthstones[month]}`);
        console.log(`Your birth month is ${month}, Your birthstone is ${birthstones[month]}`);
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error("Error in showBirthstone:", error);
    }
}

function convertCelsiusToFahrenheit() {
    try {
        let celsius = parseFloat(prompt("Enter temperature in Celsius: ")?.trim());

        if (celsius === null) throw new Error("Input cancelled by user.");
        if (isNaN(celsius)) throw new Error("Invalid input! Please enter a valid number.");

        let fahrenheit = celsius * 1.8 + 32;
        alert(`${celsius} degree Celsius is equal to ${fahrenheit.toFixed(2)} degree Fahrenheit`);
        console.log(`${celsius} degree Celsius is equal to ${fahrenheit.toFixed(2)} degree Fahrenheit`);
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error("Error in convertCelsiusToFahrenheit:", error);
    }
}

function computeAcceleration() {
    try {
        let velocity = parseFloat(prompt("Enter velocity (m/s): ")?.trim());
        let time = parseFloat(prompt("Enter time (s): ")?.trim());

        if (velocity === null || time === null) throw new Error("Input cancelled by user.");
        if (isNaN(velocity) || isNaN(time)) throw new Error("Please enter valid numbers for velocity and time.");
        if (time === 0) throw new Error("Time cannot be 0. Division by zero is not allowed.");

        const acceleration = velocity / time;
        alert(`Acceleration = ${acceleration.toFixed(2)} m/s² (Velocity: ${velocity} m/s, Time: ${time} s)`);
        console.log(`Acceleration = ${acceleration.toFixed(2)} m/s² (Velocity: ${velocity} m/s, Time: ${time} s)`);
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error("Error in computeAcceleration:", error);
    }
}

function toggleLike(element) {
    try {
        if (!element || !(element instanceof HTMLElement)) throw new Error("Invalid element provided");
        const img = element.querySelector('img');
        if (!img) throw new Error("Heart image not found");

        if (element.classList.toggle("liked")) {
            img.src = "images/redheart.png";
        } else {
            img.src = "images/heart.png";
        }
    } catch (error) {
        console.error("Error in toggleLike:", error);
    }
}

function startCarousel() {
    try {
        carouselInner = document.querySelector('#carouselInner');
        const originalCards = carouselInner.querySelectorAll(".carousel-image:not(.clone)");
        const totalCards = originalCards.length;
        if (!carouselInner || !totalCards) throw new Error("Carousel elements not found");

        const carouselWidth = document.querySelector('.carousel').offsetWidth;
        const visibleCards = Math.floor(carouselWidth / cardWidth);
        cloneCount = Math.ceil(visibleCards) + 1;

        document.querySelectorAll('.carousel-image.clone').forEach(clone => clone.remove());

        for (let i = 0; i < cloneCount; i++) {
            const firstClone = originalCards[i % totalCards].cloneNode(true);
            const lastClone = originalCards[totalCards - 1 - (i % totalCards)].cloneNode(true);
            firstClone.classList.add("carousel-image", "clone");
            lastClone.classList.add("carousel-image", "clone");
            carouselInner.appendChild(firstClone);
            carouselInner.insertBefore(lastClone, carouselInner.firstChild);
        }

        currentIndex = cloneCount;
        updatePosition(false);

        function updatePosition(animate = true) {
            carouselInner.style.transition = animate
                ? 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)'
                : 'none';
            carouselInner.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }

        function moveCarousel(direction) {
            currentIndex += direction;
            updatePosition(true);

            carouselInner.addEventListener('transitionend', function resetPosition() {
                if (currentIndex >= totalCards + cloneCount) {
                    currentIndex = cloneCount;
                    updatePosition(false);
                } else if (currentIndex < cloneCount) {
                    currentIndex = totalCards;
                    updatePosition(false);
                }
                carouselInner.removeEventListener('transitionend', resetPosition);
            }, { once: true });
        }

        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        prevBtn.onclick = () => moveCarousel(-1);
        nextBtn.onclick = () => moveCarousel(1);

        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => moveCarousel(1), 3000);

        carouselInner.addEventListener('mouseenter', () => {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
        });
        carouselInner.addEventListener('mouseleave', () => {
            if (!autoSlideInterval) autoSlideInterval = setInterval(() => moveCarousel(1), 3000);
        });

        window.addEventListener('resize', () => {
            const newCarouselWidth = document.querySelector('.carousel').offsetWidth;
            const newVisibleCards = Math.floor(newCarouselWidth / cardWidth);
            const requiredClones = Math.ceil(newVisibleCards) + 1;
            if (requiredClones > cloneCount) {
                const additionalClones = requiredClones - cloneCount;
                for (let i = 0; i < additionalClones; i++) {
                    const firstClone = originalCards[i % totalCards].cloneNode(true);
                    const lastClone = originalCards[totalCards - 1 - (i % totalCards)].cloneNode(true);
                    firstClone.classList.add("carousel-image", "clone");
                    lastClone.classList.add("carousel-image", "clone");
                    carouselInner.appendChild(firstClone);
                    carouselInner.insertBefore(lastClone, carouselInner.firstChild);
                }
                cloneCount = requiredClones;
            }
            currentIndex = cloneCount;
            updatePosition(false);
        });

        requestAnimationFrame(() => updatePosition(true));
    } catch (error) {
        console.error("Error in startCarousel:", error);
    }
}

function resetCarousel() {
    if (!carouselInner) return;
    currentIndex = cloneCount;
    carouselInner.style.transition = 'none';
    carouselInner.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function addComment(element) {
    try {
        if (!element || !(element instanceof HTMLElement)) throw new Error("Invalid element provided");
        const commentInput = element.previousElementSibling;
        if (!commentInput || commentInput.tagName !== "INPUT") throw new Error("Comment input not found");
        const commentText = commentInput.value.trim();
        if (!commentText) throw new Error("Comment cannot be empty");

        const commentInputWrapper = element.closest('.comment-input-wrapper');
        if (!commentInputWrapper) throw new Error("Comment input wrapper not found");
        const commentsSection = commentInputWrapper.querySelector(".comments-section");
        if (!commentsSection) throw new Error("Comments section not found");
        const commentList = commentsSection.querySelector(".comments-list");
        if (!commentList) throw new Error("Comments list not found");

        const newComment = document.createElement("li");
        newComment.textContent = commentText;
        commentList.appendChild(newComment);
        commentInput.value = "";
    } catch (error) {
        console.error("Error in addComment:", error);
        alert(`Error adding comment: ${error.message}`);
    }
}

function preloadImages() {
    try {
        const images = [
            "images/profile1.jpg", "images/profile2.jpg", "images/profile3.jpg",
            "images/profile4.jpg", "images/profile5.jpg", "images/profile6.jpg", "images/profile7.jpg",
            "images/favorite1.jpg", "images/gallery1.jpg", "images/gallery2.jpg",
            "images/gallery3.jpg", "images/gallery4.jpg", "images/gallery5.jpg",
            "images/gallery6.jpg", "images/heart.png", "images/redheart.png"
        ];
        images.forEach(src => {
            if (typeof src !== "string" || !src) throw new Error("Invalid image source");
            const img = new Image();
            img.src = src;
            img.onerror = () => console.error(`Failed to preload image: ${src}`);
        });
    } catch (error) {
        console.error("Error in preloadImages:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded, initializing website...");
    preloadImages();
    startCarousel();
    showSection("homepage");
    initializeButtons();

    const commentInputs = document.querySelectorAll('.comment-input');
    commentInputs.forEach(input => {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const postButton = input.nextElementSibling;
                if (postButton && postButton.tagName === 'BUTTON') {
                    addComment(postButton);
                }
            }
        });
    });
});