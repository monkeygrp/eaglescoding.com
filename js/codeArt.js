// Hamburger/side menu
function openMainNav() {
    var mySideNav = document.getElementById("mySideNav");
    mySideNav.style.display = "flex";
    if(mySideNav.className.indexOf(" w3-animate-left") === -1) {
        mySideNav.className += " w3-animate-left";
    }
}

function closeMainNav() {
    document.getElementById("mySideNav").style.display = "none";
}

function openCodeArtNav() {
    var mySideNav = document.getElementById("mySideNav");
    mySideNav.className = mySideNav.className.replace(" w3-collapse",""); 
    mySideNav.style.display = "none";
    var codeArtNav = document.getElementById("codeArtNav");
    codeArtNav.style.display = "flex";
    // need this if to get animation to run the first time user opens the submenu.
    // otherwise it'll just appear with no animation.
    if (codeArtNav.className.indexOf(" w3-animate-left") === -1) {
        codeArtNav.className += " w3-animate-left";
    }
}

function closeCodeArtNav() {
    document.getElementById("codeArtNav").style.display = "none";
}

function backToMainNav() {
    document.getElementById("codeArtNav").style.display = "none";
    var mySideNav = document.getElementById("mySideNav");
    mySideNav.className += " w3-collapse";
    if(mySideNav.className.indexOf(" w3-animate-left") === -1) {
        mySideNav.className += " w3-animate-left";
    }
    mySideNav.style.display = "flex";
}

function highlightMe(elt) {
    var codeArtNavDivs = document.getElementsByClassName("codeArtNavDivs");
    var i;
    for (i = 0; i < codeArtNavDivs.length; i++) {
        codeArtNavDivs[i].className = codeArtNavDivs[i].className.replace(" w3-gray", " w3-black");
    }
    elt.className = elt.className.replace(" w3-black", " w3-gray");
}

/*********** Slideshow Updating Functions **************** */
var slideIndex = 1;
var direction = 0;
var numFigures = document.getElementsByTagName("figure").length;
if (numFigures === 1) {
    var navType = "noNav";
} else if (numFigures > 1 && numFigures <= 7) {
    var navType = "dotNav";
} else if (numFigures >= 8) {
    var navType = "numNav";
}
// displayNav(navType);  // moved this call into the updateDot and updateNums functions.
showDivs(slideIndex);

function plusDivs(n) {
    direction = n;
    showDivs(slideIndex += n);
}

function currentDiv(n) {
    if (n < slideIndex) { direction = -1; }
    else if (n > slideIndex) { direction = 1; } 
    showDivs(slideIndex = n);
}

function showDivs(n) {
    // update the figure and caption.
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    x[slideIndex-1].style.display = "block";

    // call update of dots or numNav
    switch(navType) {
        case "noNav": break;
        case "dotNav":
            updateDots(n);
            break;
        case "numNav":
            updateNums();
    }
}

function updateDots(n) {
    displayDotNav();
    var dots = document.getElementsByClassName("navdots");
    var i;
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-black", "");
    }
    dots[slideIndex - 1].className += " w3-black";
}

function updateNums() {
    // generate and display number list.  Handles wrapping and scrolling scenarios.
    displayNumNav();
    var navnumElements = document.getElementsByClassName("navnums");
    
    // remove blue from numbers.
    for (i = 0; i < 7; i++) {
        navnumElements[i].className = navnumElements[i].className.replace(" w3-text-blue", "");
    }
    
    // add blue to active number.
    if (slideIndex <= 4) {
        navnumElements[slideIndex - 1].className += " w3-text-blue";
    } else if (slideIndex > 4 && slideIndex <= numFigures - 3) {
        navnumElements[3].className += " w3-text-blue";
    } else if (slideIndex > numFigures - 3) {
        navnumElements[6 + slideIndex - numFigures].className += " w3-text-blue";
    }
}

/******* Functions for generating navigation under the slideshow  ************* */
// function displayNav(navType) {
//     switch(navType) {
//         case "noNav":
//             break;
//         case "dotNav":
//             displayDotNav();
//             break;
//         case "numNav":
//             displayNumNav();
//             break;
//     }
// }

function displayDotNav() {
    var leftArrow = '<span class="w3-hover-black w3-round unselectable navarrow" onclick="plusDivs(-1)">&#10094;</span>';
    var rightArrow = '<span class="w3-hover-black w3-round unselectable navarrow" onclick="plusDivs(1)">&#10095;</span>';
    var navDotA = '<span class="w3-badge navdots w3-border w3-border-black w3-transparent w3-hover-black" onclick="currentDiv(';
    var navDotB = ')"></span>';
    var navDots = '';
    var i;
    for (i = 1; i <= numFigures; i++) {
        navDots += navDotA + i + navDotB;
    }
    document.getElementById("imageNav").innerHTML = leftArrow + navDots + rightArrow;
}

function displayNumNav() {
    var leftArrow = '<span class="w3-hover-black w3-round unselectable navarrow" onclick="plusDivs(-1)">&#10094;</span>';
    var rightArrow = '<span class="w3-hover-black w3-round unselectable navarrow" onclick="plusDivs(1)">&#10095;</span>';
    var a = '<span class="navnums w3-xlarge w3-hover-text-blue" onclick="currentDiv(';
    var aRight = '<span class="navnums w3-xlarge w3-hover-text-blue num-animate-right" onclick="currentDiv(';
    var aFadeRight = '<span class="navnums w3-xlarge num-fade-animate-right" onclick="currentDiv(';
    var aLeft = '<span class="navnums w3-xlarge w3-hover-text-blue num-animate-left" onclick="currentDiv(';
    var aFadeLeft = '<span class="navnums w3-xlarge num-fade-animate-left" onclick="currentDiv(';
    var b = ')">'
    var c = '</span>';
    var res = "";
    // the direction of scrolling affects the numbers upon which animation should run.
    switch (direction) {
        case 0:
        case 1:
            if (slideIndex <= 4) {
                var i;
                for (i = 1; i <= 7; i++) {
                    res += a + i.toString() + b + i.toString() + c;
                }
            } else if (slideIndex > 4 && slideIndex <= numFigures - 3) {
                var i;
                for (i = slideIndex - 3; i <= slideIndex + 2; i++) {
                    res += aRight + i.toString() + b + i.toString() + c;
                }
                // make the last number fade in on arrow click.  The rest just move without fade.
                res += aFadeRight + (slideIndex + 3).toString() + b + (slideIndex + 3).toString() + c;
            } else if (slideIndex > numFigures - 3) {
                var i;
                for (i = numFigures - 6; i <= numFigures; i++) {
                    res += a + i.toString() + b + i.toString() + c;
                }
            }
            break;
        case -1:
            if (slideIndex <= 3) {
                var i;
                for (i = 1; i <= 7; i++) {
                    res += a + i.toString() + b + i.toString() + c;
                }
            } else if (slideIndex >= 4 && slideIndex < numFigures - 3) {
                var i;
                // make the first number fade in on arrow click.  The rest just move without fade.
                res += aFadeLeft + (slideIndex - 3).toString() + b + (slideIndex - 3).toString() + c;
                for (i = slideIndex - 2; i <= slideIndex + 3; i++) {
                    res += aLeft + i.toString() + b + i.toString() + c;
                }
            } else if (slideIndex >= numFigures - 3) {
                var i;
                for (i = numFigures - 6; i <= numFigures; i++) {
                    res += a + i.toString() + b + i.toString() + c;
                }
            }
    }
    document.getElementById("imageNav").innerHTML = leftArrow + res + rightArrow;
    // add blue hover CSS after animation completes.  Otherwise will be blue during animation.
    // Only an issue for the far right or left number.
    setTimeout(function() {
        var x = document.getElementsByClassName("navnums");
        if (direction === 1) {
            if (x[6].className.indexOf("w3-hover-text-blue") === -1) {
                x[6].className += " w3-hover-text-blue";
            }
        } else if (direction === -1) {
            if (x[0].className.indexOf("w3-hover-text-blue") === -1) {
                x[0].className += " w3-hover-text-blue";
            }
        }
    }, 300);
}