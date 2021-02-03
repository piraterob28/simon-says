 var gamePattern = [];
 var userClickedPattern = [];
 var level = 0;
 var clickLevel = 0;

 var buttonColors = ["red", "blue", "green", "yellow"];


 $("body").keydown(function(event) {
    if (event.key === "a"){
     if (level === 0){
     nextSequence();
     }
    } 
 });

 $(".btn").on("click", function(event) {
    var userChosenColor = event.currentTarget.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userChosenColor);
    
       
});

function nextSequence() {
    clickLevel = 0; 
    userClickedPattern = [];
    var randomNumber = Math.floor((Math.random() *4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).hide().fadeIn();
    playSound(randomChosenColor);
    level++; 
    $("h1").text("Level " + level);
    
};

function playSound(colorName) {
    var myAudio = new Audio("sounds/" + colorName + ".mp3");
    myAudio.play();
}

function animatePress(currentColor) {
    colorChange = $("#" + currentColor)
    colorChange.addClass("pressed");
    setTimeout(function() {
        colorChange.removeClass("pressed");
    }, 100);
}

function checkAnswer(userChosenColor) {
    if ((clickLevel) < gamePattern.length) {
        if (userClickedPattern[clickLevel] === gamePattern[clickLevel]){
            playSound(userChosenColor);
            clickLevel++
        }
        else {
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
                }, 200);
            var myAudio = new Audio("sounds/wrong.mp3");
            myAudio.play();
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }
    if ((clickLevel) === gamePattern.length) {
        if (userClickedPattern[clickLevel] === gamePattern[clickLevel]){
            playSound(userChosenColor);
            setTimeout(function() {
                nextSequence();}, 500);
        }
    
        else {
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
                }, 200);
            var myAudio = new Audio("sounds/wrong.mp3");
            myAudio.play();
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }
    
}

function startOver() {
    gamePattern = [];
    level = 0;
    clickLevel = 0;
    $("body").keydown(function(event) {
         if (level === 0){
         nextSequence();
         } 
     });
    console.log("game over");
}
