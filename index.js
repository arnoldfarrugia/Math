// ---- Variables
var score = 0;
var min = 1;
var max = 20;
var answer = "";
var result = 0;
durationMin = 00;
durationSec = 00;
var difficulty = "Easy";
var operator = "?";
var feedback = "";
var random = 0;
var pauseMin = "";
var pauseSec = "";
var input = [];

// ---- Numpad ----

var value = [];

$(".num").click(function () {
    value.push($(this).text());
    $(".answer").val(value.join(""));
});

$(".del").click(function () {
    value.pop();
    $(".answer").val(value.join(""));
});

$(".submit").click(function () {
    value = [];
});

// ---- Timer ----
timer = function () {
    setInterval(updateDisplay, 1000); // every second call updateDisplay

    function updateDisplay() {
        var minutes = parseInt($(".min").text());
        var seconds = parseInt($(".sec").text());

        if (durationSec == 59) {
            seconds = seconds - 1;
            $(".sec").text(seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 }));

            if (seconds == 00 && minutes > 0) {
                minutes = minutes - 1;
                $(".sec").text("59");
                $(".min").text(minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }));
            } else if (seconds == 00 && minutes == 00) {
                $(".equation").addClass("hide");
                $(".min-menu").addClass("hide");
                $(".numbers").addClass("hide");
                $(".review").removeClass("hide");
                $(".final-score").text(score);
            }
        } else {
            seconds++;
            $(".sec").text(seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 }));

            if (seconds == 60) {
                minutes++;
                $(".sec").text("00");
                $(".min").text(minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }));
            }
        }
    }
};

// ---- Menu ----
$(".choose-dif").click(function () {
    $(".options-dif").toggle();
});

$(".choose-arit").click(function () {
    $(".options-arit").toggle();
});

$(".choose-dur").click(function () {
    $(".options-dur").toggle();
});

// ---- Choose difficulty
$(".difficulty").click(function () {
    difficulty = $(this).text();

    if (difficulty == "Easy") {
        $(".green").addClass("green-bg");
        $(".yellow").removeClass("yellow-bg");
        $(".red").removeClass("red-bg");
        min = 1;
        max = 20;
    } else if (difficulty == "Medium") {
        $(".green").removeClass("green-bg");
        $(".yellow").addClass("yellow-bg");
        $(".red").removeClass("red-bg");
        min = 21;
        max = 40;
    } else {
        $(".green").removeClass("green-bg");
        $(".yellow").removeClass("yellow-bg");
        $(".red").addClass("red-bg");
        min = 41;
        max = 99;
    }
});

// ---- Choose operator
$(".operator").click(function () {
    operator = $(this).attr("id");
    $(".operator").removeClass("chosen");
    $(this).addClass("chosen");
});

// Choose duration
$(".duration").click(function () {
    var time = $(this).text();
    if (time == "1 min") {
        durationMin = 00;
        durationSec = 59;
        $(".min").text("00");
        $(".sec").text("59");
    } else if (time == "5 min") {
        durationMin = 05;
        durationSec = 59;
        $(".min").text("05");
        $(".sec").text("59");
    }

    $(".duration").removeClass("chosen");
    $(this).addClass("chosen");
});

// ---- Edit settings ----
$(".edit").click(function () {
    pauseMin = $(".min").text();
    pauseSec = $(".sec").text();

    $(".logo").removeClass("hide");
    $(".equation").addClass("hide");
    $(".full-menu").removeClass("hide");
    $(".dur-menu").addClass("hide");
    $(".numbers").addClass("hide");
    $(".min-menu").addClass("hide");
});

// ---- Random feedback generator
randomPraise = function () {
    z = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

    if (z == 1) {
        feedback = "Amazing!";
    } else if (z == 2) {
        feedback = "Oh yeah!";
    } else if (z == 3) {
        feedback = "Very nice!";
    } else if (z == 4) {
        feedback = "Incredible!";
    } else {
        feedback = "Groovy!";
    }
};

// ---- Check answer
checkAnswer = function () {
    randomPraise();
    $(".result").text(feedback);
    score++;

    // ---- Show a new sum
    setTimeout(function () {
        $(".answer").val("");
        $(".result").text("");
        input = [];
        startGame();
    }, 800);
};

// ---- Random game function

randomGame = function () {
    // Randomly select an operator
    var sign = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

    if (sign == 1) {
        operator = "+";
    } else if (sign == 2) {
        operator = "-";
    } else if (sign == 3) {
        operator = "x";
    } else {
        operator = "÷";
    }

    // Reset the difficulty if operator is a * or /
    if ((operator == "x" && difficulty == "Easy") || (operator == "÷" && difficulty == "Easy")) {
        max = 10;
    } else if ((operator == "x" && difficulty == "Medium") || (operator == "÷" && difficulty == "Medium")) {
        min = 11;
        max = 20;
    } else if ((operator == "x" && difficulty == "Hard") || (operator == "÷" && difficulty == "Hard")) {
        min = 21;
        max = 40;
    }
};

// ---- Game function --------------------------------------------------------------------------------------<<<

startGame = function () {
    $(".score").text(score);

    if (random == 1) {
        randomGame();
    }

    // ---- Set 2 random numbers based on difficulty chosen
    var a = Math.floor(Math.random() * (max - min + 1)) + min;
    var b = Math.floor(Math.random() * (max - min + 1)) + min;

    // ---- Show random numbers on screen
    if (operator == "-") {
        if (b > a) {
            $(".num2").text(a);
            $(".num1").text(b);
        } else {
            $(".num1").text(a);
            $(".num2").text(b);
        }
    } else if (operator == "÷") {
        let d = a * b;
        $(".num1").text(d);
        $(".num2").text(b);
    } else {
        $(".num1").text(a);
        $(".num2").text(b);
    }

    $(".symbol").text(operator);

    // ---- Calculate the correct result

    if (operator == "+") {
        result = a + b;
    } else if (operator == "-") {
        if (b > a) {
            result = b - a;
        } else {
            result = a - b;
        }
    } else if (operator == "x") {
        result = a * b;
    } else {
        result = (a * b) / b;
    }

    // ---- Auto submit result on keyboard

    $(".answer").keydown(function (e) {
        // If delete is pressed
        if (e.which == 8) {
            input.pop();
        } else {
            input.push(String.fromCharCode(e.which));
            answer = input.join("");

            if (answer == result) {
                checkAnswer();
            }
        }
    });

    // ---- On clicking submit button
    $("#sum").submit(function (event) {
        event.preventDefault();
        var answer = $(".answer", this).val();

        // ---- Check if answer is correct
        if (answer == result) {
            checkAnswer();
        } else {
            $(".result").text("Try Again!");
        }
    });
};

// ---- Start button ----

$(".go").click(function () {
    // Set the variables based on selected difficulty
    if ((operator == "x" && difficulty == "Easy") || (operator == "÷" && difficulty == "Easy")) {
        max = 10;
    } else if ((operator == "x" && difficulty == "Medium") || (operator == "÷" && difficulty == "Medium")) {
        min = 11;
        max = 20;
    } else if ((operator == "x" && difficulty == "Hard") || (operator == "÷" && difficulty == "Hard")) {
        min = 21;
        max = 40;
    }

    // Hide full-menu & show min-menu
    $(".full-menu").addClass("hide");
    $(".min-menu").removeClass("hide");
    $(".quit").removeClass("hide");

    // Hide title
    $("h1").addClass("hide");
    $(".logo").addClass("hide");

    // Change menu difficulty colour
    $(".dif-col").addClass(difficulty);

    // Change menu arithmetic symbol
    if (operator == "?") {
        $(".menu-icon").html('<ion-icon class = "shuffle-menu" name="shuffle"></ion-icon>');
    } else {
        $(".menu-icon").text(operator);
    }

    // Show the sum section
    $(".equation").removeClass("hide");

    // Show the numbers (on mobile)
    $(".numbers").removeClass("hide");

    // Check if timer is running and start Timer
    let s = $(".sec").text();
    let m = $(".min").text();

    if (s == durationSec && m == durationMin) {
        timer();
    } else {
        $(".sec").text(pauseSec);
        $(".min").text(pauseMin);
    }

    // Check if "Random" operator was selected and start game
    if (operator == "?") {
        random = 1;
    }

    startGame();

    $(".answer").focus();
    // $(".answer").focus(function () {
    //     document.activeElement.blur();
    // });
});

// ---- Restart game

$(".restart").click(function () {
    location.reload();
});

// ---- Show Lightbox - ABOUT
$(".info").click(function () {
    $(".about").css("display", "block");
    // Disable page scrolling
    $("html, body").css("overflow", "hidden");

    $(".close").click(function () {
        $(".about").css("display", "none");
        // Enable page scrolling
        $("html, body").css("overflow", "auto");
    });

    $(document).on("keyup", function (e) {
        if (e.key == "Escape") {
            $(".about").css("display", "none");
            $("html, body").css("overflow", "auto");
        }
    });
});

// ---- Quit Game
$(".quit").click(function () {
    location.reload();
});
