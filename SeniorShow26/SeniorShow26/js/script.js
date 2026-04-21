

// PROJECT DATA


const projectData = [
    // Book Committee
    { firstName: "Bryce", lastName: "Rupnow", committee: "Book", project: "Project", portfolio: "link" },
    { firstName: "Jay", lastName: "Kerl", committee: "Book", project: "Project", portfolio: "link" },
    { firstName: "John", lastName: "Shaver", committee: "Book", project: "Project", portfolio: "link" },
    { firstName: "Julia", lastName: "Emons", committee: "Book", project: "Project", portfolio: "juliaemons.com" },
    { firstName: "Mallory", lastName: "Jakubiak", committee: "Book", project: "Project", portfolio: "malloryj.myportfolio.com" },
    { firstName: "Red", lastName: "Moser", committee: "Book", project: "Project", portfolio: "link" },

    // Design Committee
    { firstName: "Holly", lastName: "Pearson", committee: "Design", project: "Project", portfolio: "link" },
    { firstName: "Joe", lastName: "Schaller", committee: "Design", project: "Project", portfolio: "link" },
    { firstName: "Nathan", lastName: "Johnson", committee: "Design", project: "Project", portfolio: "link" },
    { firstName: "Taylor", lastName: "Sherack", committee: "Design", project: "Project", portfolio: "sherackt7860044c.myportfolio.com/" },

    // Food Committee
    { firstName: "Autumn", lastName: "Birkholz", committee: "Food", project: "Project", portfolio: "autumnbirkholz.myportfolio.com" },
    { firstName: "Ava", lastName: "VanderBloemen", committee: "Food", project: "Project", portfolio: "link" },
    { firstName: "Silas", lastName: "Green", committee: "Food", project: "Project", portfolio: "link" },

    // Gallary Committee
    { firstName: "Claire", lastName: "Ivens", committee: "Gallary", project: "Project", portfolio: "link" },
    { firstName: "Hannah", lastName: "Hagman", committee: "Gallary", project: "Project", portfolio: "link" },
    { firstName: "Hannah", lastName: "Sternagel", committee: "Gallary", project: "Project", portfolio: "link" },
    { firstName: "Kailey", lastName: "Hemish", committee: "Gallary", project: "Project", portfolio: "link" },
    { firstName: "River", lastName: "Olson", committee: "Gallary", project: "Project", portfolio: "olsond8317.myportfolio.com" },

    // Marcom Committee
    { firstName: "Braeden", lastName: "Lange", committee: "Marcom", project: "Project", portfolio: "link" },
    { firstName: "Cj", lastName: "Jobe", committee: "Marcom", project: "Project", portfolio: "link" },
    { firstName: "Olivia", lastName: "Quale", committee: "Marcom", project: "Project", portfolio: "link" },

    // Website Committee
    { firstName: "Aiden", lastName: "Nord", committee: "Website", project: "Variance", portfolio: "aidennord.com" },
    { firstName: "Jennalyn", lastName: "Mallmann", committee: "Website", project: "Project", portfolio: "link" },
    { firstName: "Karina", lastName: "Dougall", committee: "Website", project: "Project", portfolio: "link" },
    { firstName: "Kyla", lastName: "Jorud", committee: "Website", project: "Project", portfolio: "link" },
    { firstName: "Matthew", lastName: "VanderMeer", committee: "Website", project: "Project", portfolio: "mvdesign.framer.media" },
    { firstName: "Reid", lastName: "Barbeln", committee: "Website", project: "Project", portfolio: "reidbarbeln.cargo.site" }
];

const container = document.getElementById('projects-container');
const track = document.querySelector('.scroll-track');
const searchInputs = document.querySelectorAll('.search-input');

let isDesktop = window.innerWidth > 767;
let ticking = false;
let isVisible = false;


// METRIC CACHING 


let cachedTrackOffset = 0;
let cachedTrackHeight = 0;
let cachedContainerWidth = 0;

function updateMetrics() {
    isDesktop = window.innerWidth > 767;
    track.style.height = ""; 
    container.style.position = "";

    if (isDesktop) {
        track.style.height = `${projectData.length * 50}vh`;
        container.style.position = "sticky";
        container.style.top = "0";
    } else {
        track.style.height = "auto";
        container.style.position = "static";
    }

    cachedTrackOffset = track.offsetTop;
    cachedTrackHeight = track.offsetHeight;
    cachedContainerWidth = container.scrollWidth;
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateMetrics();
        if (isDesktop) syncScroll();
    }, 100);
});


// INJECT PROJECTS


projectData.forEach(person => {
    const projectElement = document.createElement('div');
    projectElement.id = `${person.firstName.toLowerCase()}-${person.lastName.toLowerCase()}`;

    const fullName = `${person.firstName} ${person.lastName}`;
    
    projectElement.innerHTML = `
        <img src="../images/faces/${person.firstName.toLowerCase()}_${person.lastName.toLowerCase()}.webp" 
             alt="${fullName}" 
             loading="lazy" 
             decoding="async">
        <div class="member-name">${fullName}</div>
    `;

    projectElement.addEventListener('click', () => {
        openPersonModal(fullName);
    });
    
    container.appendChild(projectElement);
});


// INJECT COMM FOOTER


function buildCommittees() {
    const slider = document.getElementById('slider');
    if (!slider) return;
    
    slider.innerHTML = ''; 

    const grouped = projectData.reduce((acc, person) => {
        if (!acc[person.committee]) {
            acc[person.committee] = [];
        }
        acc[person.committee].push(person);
        return acc;
    }, {});

    Object.keys(grouped).forEach(committeeName => {
        const comDiv = document.createElement('div');
        comDiv.id = `commi-${committeeName.toLowerCase()}`;

        let memberHTML = '';
        
        grouped[committeeName].forEach(member => {
            const hasPortfolio = member.portfolio && 
                                 member.portfolio.trim() !== "" && 
                                 member.portfolio !== "link";
                                 
            const portfolioBtn = hasPortfolio 
                ? `<div class="buttonlink"> Portfolio </div>` 
                : '';

            const clickAction = hasPortfolio 
                ? `onclick="window.open('https://${member.portfolio}', '_blank')"` 
                : '';

            memberHTML += `
                <button ${clickAction}> 
                    <div>
                    <h3> ${member.firstName} ${member.lastName} </h3>
                    ${portfolioBtn}
                    </div>
                    <img src="./images/faces/${member.firstName.toLowerCase()}_${member.lastName.toLowerCase()}.webp" 
                         alt="${member.firstName} ${member.lastName}">
                </button>`;
        });

        comDiv.innerHTML = `
            ${memberHTML}
            <h3> ${committeeName} Committee </h3>
        `;
        
        slider.appendChild(comDiv);
    });
}


// MODAL CONTROL


function openPersonModal(name) {
    const overlay = document.getElementById('modal-overlay');
    const display = document.getElementById('modal-name-display');
    
    if (overlay && display) {
        display.textContent = name;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.onclick = function(event) {
    const overlay = document.getElementById('modal-overlay');
    if (event.target == overlay) {
        closeModal();
    }
}


// INITIAL SETUP


updateMetrics();
buildCommittees();


// CHECK IF PROJECTS ARE ON SCREEN


const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
}, { threshold: 0.01 });

observer.observe(track);


// MOBILE & DESKTOP THRESHOLD SWITCH (767px)


window.addEventListener('resize', updateMetrics);


// HORIZONTAL SCROLL LOGIC


function syncScroll() {
    if (!isDesktop || !isVisible) {
        ticking = false;
        return;
    }

    const scrollPos = window.pageYOffset;
    const end = cachedTrackOffset + cachedTrackHeight - window.innerHeight;
    const maxHoriz = cachedContainerWidth - window.innerWidth;

    if (scrollPos <= cachedTrackOffset) {
        container.scrollLeft = 0;
    } else if (scrollPos >= end) {
        container.scrollLeft = maxHoriz;
    } else {
        const pct = (scrollPos - cachedTrackOffset) / (end - cachedTrackOffset);
        container.scrollLeft = pct * maxHoriz;
    }

    ticking = false;
}


// UPDATE COLORS


const colors = ["var(--pink)", "var(--green)", "var(--orange)"];

document.querySelectorAll('section[aria-label="Class Projects"] > *').forEach(el => {
    el.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
});


// PERFORMANCE LOCK


window.addEventListener('scroll', () => {
    if (!ticking && isDesktop && isVisible) {
        window.requestAnimationFrame(syncScroll);
        ticking = true;
    }
}, { passive: true });


// FUZZY SEARCH


function findMostSimilar(query) {
    const searchTerms = query.toLowerCase().trim().split(/\s+/);
    if (searchTerms.length === 0 || searchTerms[0] === "") return null;
    const matches = projectData.filter(item => {
        const dataWords = [
            item.firstName.toLowerCase(),
            item.lastName.toLowerCase(),
            item.project.toLowerCase()
        ];
        return searchTerms.every(term => 
            dataWords.some(word => word.startsWith(term))
        );
    });

    if (matches.length === 0) return null;
    return matches.sort((a, b) => {
        const firstTerm = searchTerms[0];

        const getWeight = (item) => {
            if (item.firstName.toLowerCase().startsWith(firstTerm)) return 1;
            if (item.lastName.toLowerCase().startsWith(firstTerm)) return 2;
            if (item.project.toLowerCase().startsWith(firstTerm)) return 3;
            return 4;
        };

        return getWeight(a) - getWeight(b);
    })[0];
}

let searchTimeout;
searchInputs.forEach(input => {
    const guessDisplay = input.parentElement.querySelector('.search-guess');

    input.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        if (query.length > 0) {
            guessDisplay.classList.add('active');
        } else {
            guessDisplay.classList.remove('active');
            guessDisplay.textContent = "";
            return;
        }

        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const result = findMostSimilar(query);
            
            if (result) {
                const fullName = `${result.firstName} ${result.lastName}`;
                guessDisplay.textContent = fullName;
                guessDisplay.setAttribute('data-full-name', fullName);
                guessDisplay.href = `#${result.firstName.toLowerCase()}-${result.lastName.toLowerCase()}`;
            } else {
                guessDisplay.textContent = "No match found";
                guessDisplay.removeAttribute('data-full-name');
                guessDisplay.href = "#";
            }
        }, 150);
    });

    guessDisplay.onclick = function(e) {
        const nameToOpen = this.getAttribute('data-full-name');

        if (nameToOpen) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log("Attempting to open modal for:", nameToOpen);
            
            if (typeof openPersonModal === "function") {
                openPersonModal(nameToOpen);
            } else {
                console.error("openPersonModal function is not defined!");
            }
            
            input.value = "";
            this.classList.remove('active');
            this.textContent = "";
        }
    };
});


// SCROLL CONTROL


window.addEventListener('wheel', (e) => {
    if (!isDesktop || !isVisible) return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        window.scrollTo({
            top: window.pageYOffset + e.deltaY,
            behavior: 'auto'
        });
    }
}, { passive: false });

window.addEventListener('scroll', () => {
    if (!ticking && isDesktop && isVisible) {
        window.requestAnimationFrame(syncScroll);
        ticking = true;
    }
}, { passive: true });


// LOAD SYNC


window.addEventListener('load', () => {
    updateMetrics();
    if (isDesktop) syncScroll();
});