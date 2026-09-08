/* =================================================
   PARTICLES
================================================= */

function createParticles() {

    const container =
        document.getElementById("particles");

    if (!container) return;


    for (let i = 0; i < 35; i++) {

        const particle =
            document.createElement("span");

        particle.classList.add("particle");


        particle.style.left =
            Math.random() * 100 + "vw";


        particle.style.animationDuration =
            (8 + Math.random() * 12) + "s";


        particle.style.animationDelay =
            Math.random() * 10 + "s";


        particle.style.opacity =
            Math.random() * 0.7;


        const size =
            1 + Math.random() * 2;


        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";


        container.appendChild(particle);
    }
}


createParticles();



/* =================================================
   PAGE TRANSITIONS
================================================= */

let navigating = false;


function goNext(screen) {

    if (navigating) return;


    const next =
        screen.dataset.next;


    if (!next) return;


    navigating = true;


    screen.classList.add("exit");


    setTimeout(() => {

        window.location.href = next;

    }, 750);
}



document
    .querySelectorAll(".next-screen")
    .forEach(screen => {

        screen.addEventListener(
            "click",
            () => goNext(screen)
        );

    });



/* =================================================
   KEYBOARD NAVIGATION
================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowRight" ||
            event.key === "Enter" ||
            event.key === " "
        ) {

            const screen =
                document.querySelector(
                    ".next-screen"
                );


            if (screen) {

                goNext(screen);

            }
        }

    }
);



/* =================================================
   MOBILE SWIPE
================================================= */

let touchStartX = 0;


document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


document.addEventListener(
    "touchend",
    event => {

        const touchEndX =
            event.changedTouches[0].screenX;


        if (
            touchStartX - touchEndX > 50
        ) {

            const screen =
                document.querySelector(
                    ".next-screen"
                );


            if (screen) {

                goNext(screen);

            }

        }

    }
);



/* =================================================
   SEND ANSWER
================================================= */

let answerAlreadySent = false;


async function submitAnswer(answer) {

    /*
    ============================================
    ΒΑΛΕ ΕΔΩ ΤΟ EMAIL ΣΟΥ
    ============================================
    */

    const receivingEmail =
        "karatosiouathina@gmail.com";


    if (answerAlreadySent) {
        return;
    }


    answerAlreadySent = true;


    const yesButton =
        document.getElementById("yesButton");

    const noButton =
        document.getElementById("noButton");

    const sendingStatus =
        document.getElementById("sendingStatus");


    if (yesButton) {
        yesButton.disabled = true;
    }


    if (noButton) {
        noButton.disabled = true;
    }


    if (sendingStatus) {

        sendingStatus.style.opacity = "1";

        sendingStatus.innerHTML =
            "Αποστολή απάντησης...";

    }



    /* -----------------------------------------
       Η ΑΠΑΝΤΗΣΗ ΠΟΥ ΘΑ ΛΑΒΕΙΣ
    ----------------------------------------- */

    const answerMessage =
        answer === "yes"
            ? "ΝΑΙ, ΘΑ ΕΙΜΑΙ ❤️"
            : "ΔΥΣΤΥΧΩΣ, ΟΧΙ";


    const now =
        new Date().toLocaleString(
            "el-GR",
            {
                dateStyle: "full",
                timeStyle: "medium"
            }
        );



    /* -----------------------------------------
       FORMSUBMIT
    ----------------------------------------- */

    try {

        const response =
            await fetch(

                "https://formsubmit.co/ajax/" +
                receivingEmail,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"

                    },


                    body: JSON.stringify({

                        _subject:
                            "💌 Νέα απάντηση στην πρόσκληση",

                        Απάντηση:
                            answerMessage,

                        Ημερομηνία:
                            "Πέμπτη, 10 Σεπτεμβρίου 2026",

                        Ώρα:
                            "20:30",

                        Μέρος:
                            "E7 • Πειραιάς",

                        "Ώρα απάντησης":
                            now

                    })

                }

            );


        const data =
            await response.json();


        console.log(
            "FormSubmit response:",
            data
        );

    }


    catch (error) {

        console.error(
            "Σφάλμα αποστολής:",
            error
        );

    }



    /* -----------------------------------------
       Ο ΠΑΡΑΛΗΠΤΗΣ ΔΕΝ ΒΛΕΠΕΙ ΤΗΝ ΑΠΟΣΤΟΛΗ
    ----------------------------------------- */

    if (sendingStatus) {

        sendingStatus.style.opacity = "0";

    }


    showAnswerResult(answer);

}



/* =================================================
   SHOW FINAL RESULT
================================================= */

function showAnswerResult(answer) {

    const overlay =
        document.getElementById(
            "answerOverlay"
        );


    const title =
        document.getElementById(
            "answerTitle"
        );


    const text =
        document.getElementById(
            "answerText"
        );


    const icon =
        document.getElementById(
            "answerIcon"
        );



    if (answer === "yes") {

        icon.innerHTML = "✦";


        title.innerHTML =
            "Τότε είναι επίσημο.";


        text.innerHTML =
            "Η Πέμπτη είναι δική μας.";


        createCelebration();

    }


    else {

        icon.innerHTML = "◇";


        title.innerHTML =
            "Ίσως την επόμενη φορά.";


        text.innerHTML =
            "Κάποιες προσκλήσεις αξίζει να γίνονται, ακόμη κι όταν η απάντηση είναι όχι.";

    }


    overlay.classList.add("show");

}



/* =================================================
   YES CELEBRATION
================================================= */

function createCelebration() {

    for (let i = 0; i < 65; i++) {

        const sparkle =
            document.createElement("div");


        sparkle.innerHTML = "✦";


        sparkle.style.position =
            "fixed";


        sparkle.style.left =
            Math.random() * 100 + "vw";


        sparkle.style.top =
            Math.random() * 100 + "vh";


        sparkle.style.color =
            "#d2b06f";


        sparkle.style.fontSize =
            (5 + Math.random() * 15)
            + "px";


        sparkle.style.zIndex =
            "60";


        sparkle.style.pointerEvents =
            "none";


        sparkle.style.opacity =
            "0";


        sparkle.animate(

            [

                {

                    opacity: 0,

                    transform:
                        "scale(0)"

                },


                {

                    opacity: 1,

                    transform:
                        "scale(1.5)"

                },


                {

                    opacity: 0,

                    transform:
                        "translateY(-70px) scale(0)"

                }

            ],


            {

                duration:
                    1800 +
                    Math.random() * 1700,


                delay:
                    Math.random() * 900,


                easing:
                    "ease-out"

            }

        );


        document.body.appendChild(
            sparkle
        );


        setTimeout(
            () => sparkle.remove(),
            4500
        );

    }

}
