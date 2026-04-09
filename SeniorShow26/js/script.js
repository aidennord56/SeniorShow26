// PROJECT DATA
const projectData = [
    { firstName: "Person", lastName: "1", project: "Project" },
    { firstName: "Person", lastName: "2", project: "Project" },
    { firstName: "Person", lastName: "3", project: "Project" },
    { firstName: "Person", lastName: "4", project: "Project" },
    { firstName: "Person", lastName: "5", project: "Project" },
    { firstName: "Person", lastName: "6", project: "Project" },
    { firstName: "Person", lastName: "7", project: "Project" },
    { firstName: "Person", lastName: "8", project: "Project" },
    { firstName: "Person", lastName: "9", project: "Project" },
    { firstName: "Person", lastName: "10", project: "Project" },

    { firstName: "Person", lastName: "11", project: "Project" },
    { firstName: "Person", lastName: "12", project: "Project" },
    { firstName: "Person", lastName: "13", project: "Project" },
    { firstName: "Person", lastName: "14", project: "Project" },
    { firstName: "Person", lastName: "15", project: "Project" },
    { firstName: "Person", lastName: "16", project: "Project" },
    { firstName: "Person", lastName: "17", project: "Project" },
    { firstName: "Person", lastName: "18", project: "Project" },
    { firstName: "Person", lastName: "19", project: "Project" },
    { firstName: "Person", lastName: "20", project: "Project" },

    { firstName: "Person", lastName: "21", project: "Project" },
    { firstName: "Person", lastName: "22", project: "Project" },
    { firstName: "Person", lastName: "23", project: "Project" },
    { firstName: "Person", lastName: "24", project: "Project" },
    { firstName: "Person", lastName: "25", project: "Project" },
    { firstName: "Person", lastName: "26", project: "Project" },
    { firstName: "Person", lastName: "27", project: "Project" }
];

const container = document.getElementById('projects-container');
const track = document.querySelector('.scroll-track');

let isDesktop = window.innerWidth > 767;
let ticking = false;
let isVisible = false;

// INJECT PROJECTS

projectData.forEach(person => {
    const projectElement = document.createElement('div');
    
    projectElement.id = `${person.firstName.toLowerCase()}-${person.lastName.toLowerCase()}`;
    
    projectElement.innerHTML = `
        <img src="../images/1d.jpg" alt="hello">
    `;
    
    // DO NOT DELETE WE WILL USE THIS LATER!
    // projectElement.innerHTML = `
    //     <img src="../images/${person.lastName.toLowerCase()}.png" alt="${person.firstName} ${person.lastName}">
    // `;
    
    container.appendChild(projectElement);
});

// INITIAL SETUP

if (isDesktop) {
    track.style.height = `${projectData.length * 100 / 2}vh`;
}

// CHECK IF PROJECTS ARE ON SCREEN

const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
}, { threshold: 0.01 });

observer.observe(track);

// MOBILE & DESKTOP THRESHOLD SWITCH (767px)

const mediaQuery = window.matchMedia("(min-width: 768px)");
mediaQuery.addEventListener("change", (e) => {
    isDesktop = e.matches;
    track.style.height = isDesktop ? `${projectData.length * 100}vh` : "";
    
    if (!isDesktop) {
        container.scrollLeft = 0;
    } else {
        requestAnimationFrame(syncScroll);
    }
});

// HORIZONTAL SCROLL LOGIC

function syncScroll() {
    if (!isDesktop || !isVisible) {
        ticking = false;
        return;
    }

    const start = track.offsetTop;
    const end = start + track.offsetHeight - window.innerHeight;
    const scrollPos = window.pageYOffset;
    const maxHoriz = container.scrollWidth - window.innerWidth;

    if (scrollPos <= start) {
        container.scrollLeft = 0;
    } else if (scrollPos >= end) {
        container.scrollLeft = maxHoriz;
    } else {
        const pct = (scrollPos - start) / (end - start);
        container.scrollLeft = pct * maxHoriz;
    }

    ticking = false;
}

// PERFORMANCE LOCK

window.addEventListener('scroll', () => {
    if (!ticking && isDesktop && isVisible) {
        window.requestAnimationFrame(syncScroll);
        ticking = true;
    }
}, { passive: true });

// LOAD SYNC

window.addEventListener('load', () => {
    if (isDesktop) syncScroll();
});