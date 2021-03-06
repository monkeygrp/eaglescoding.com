/*
* Nav module.
* Handles main sidenav for the site.
*/

const Nav = (function() {

    function init() {
        const hamburgerButton = document.querySelector("[rel='js-hamburger-button']");
        const closeButton = document.querySelector("[rel='js-close-button']");
        const studentPagesButton = document.querySelector("[rel='js-student-pages-button']");
        const codeArtButton = document.querySelector("[rel='js-code-art-button']");
        const closeSubNavButtons = document.querySelectorAll("[rel='js-close-subnav-button']");
        const backButtons = document.querySelectorAll("[rel='js-back-button']");
        hamburgerButton.addEventListener("click", openMainNav, false);
        closeButton.addEventListener("click", closeMainNav, false);
        studentPagesButton.addEventListener("click", openSubNav, false);
        codeArtButton.addEventListener("click", openSubNav, false);
        for (let i = 0; i < closeSubNavButtons.length; i++) {
            closeSubNavButtons[i].addEventListener("click", closeSubNav, false);
        }
        for (let i = 0; i < backButtons.length; i++) {
            backButtons[i].addEventListener("click", backToMainNav, false);
        }
    }

    function openMainNav() {
        var mainNav = document.querySelector("[rel='js-mainNav']");
        mainNav.style.display = "flex";
        mainNav.classList.add("w3-animate-left");
    }

    function closeMainNav() {
        document.querySelector("[rel='js-mainNav']").style.display = "none";
    }

    function openSubNav(evt) {
        var mainNav = document.querySelector("[rel='js-mainNav']");
        mainNav.classList.remove("w3-collapse");
        mainNav.style.display = "none";

        // pick which subNav to open (0 for code art or 1 for student pages)
        const cond = (evt.target.getAttribute("rel") === "js-student-pages-button");
        const subNavID = cond ? 1 : 0;

        var subNav = document.querySelectorAll("[rel='js-subNav']")[subNavID];
        subNav.style.display = "flex";
        // need this to get animation to run the first time user opens the submenu.
        // otherwise it'll just appear with no animation.
        subNav.classList.add("w3-animate-left");
    }

    function closeSubNav() {
        var subNavs = document.querySelectorAll("[rel='js-subNav']");
        for (var i = 0; i < subNavs.length; i++) {
            subNavs[i].style.display = "none";
        }
    }

    function backToMainNav() {
        closeSubNav();
        var mainNav = document.querySelector("[rel='js-mainNav']");
        mainNav.classList.add("w3-collapse");
        mainNav.classList.add("w3-animate-left");
        mainNav.style.display = "flex";
    }

    const publicAPI = {
        init: init,
    }
    return publicAPI;

})();

Nav.init();
