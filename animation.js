var bigQuestion = "How do Swedes use Social Media?";
var typeRate = 100;
var titleArea = document.getElementById("titleArea")
var title = document.getElementById("title");
var subtitle = document.getElementById("subtitle");
var search = document.getElementById("search");
var searchfield = document.getElementById("searchfield")

//set up css for animations
//subtitle.setAttribute("style", "display: none;");
titleArea.setAttribute("style", "height: 100vh;");

title.innerHTML = ""

var titleCharCounter = 0
var intervalId;

var animationSequence = [
    focusSearchfield,
    pause,
    titleAnimation,
    subtitleAnimation,
    longPause, 
    animateSearchClick,
    unfocusSearchfield,
    layoutAnimation
]
var animationCounter = 0;

function animate(){
    if(animationCounter <= animationSequence.length){
        animationSequence[animationCounter]()
    }
}

function subtitleAnimation(){
    var oldClasses = subtitle.getAttribute("class");
    subtitle.setAttribute("class", oldClasses + " show-subtitle");
    setTimeout(function(){
        subtitle.setAttribute("style", "opacity: 1;");
        animationCounter++;
        animate()
    }, 500)
}
function longPause(){
    setTimeout(function(){
        animationCounter++;
        animate()
    }, 1000);
}
function pause(){
    setTimeout(function(){
        animationCounter++;
        animate()
    }, 300);
}

function focusSearchfield(){
    setTimeout(function(){
        searchfield.setAttribute("style", "border: 2px solid #40C4FF");
        animationCounter++;
        animate()
    }, 100);
}

function unfocusSearchfield(){
    setTimeout(function(){
        searchfield.setAttribute("style", "box-shadow: ;")
        animationCounter++;
        animate()
    }, 100);

}

function titleAnimation(){
    if (!intervalId){
        intervalId = setInterval(titleAnimation, typeRate);
    } else {
        if(titleCharCounter > bigQuestion.length ){
            clearInterval(intervalId)
            animationCounter++;
            animate()
        } else {
            var str = bigQuestion.substr(0, titleCharCounter++)
            title.innerHTML = str + "|" 
        }
    }
}

function animateSearchClick(){
    setTimeout(function(){
        title.innerHTML = bigQuestion
        search.setAttribute("style", "background: rgba(0,0,55,0.25);")
    }, 150);
    setTimeout(function(){
        search.setAttribute("style", "")
        animationCounter++;
        animate()
    }, 500);
}

function layoutAnimation(){
    var oldClasses = titleArea.getAttribute("class");
    titleArea.setAttribute("class", oldClasses + " " + "small-searchbar");
    setTimeout(function(){ titleArea.setAttribute("style", "100px");animationCounter++;
    animate()}, 100)
}

animate()