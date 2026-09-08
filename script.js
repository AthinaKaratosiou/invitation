/* ==============================
   PARTICLES
============================== */

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



/* ==============================
   PAGE TRANSITION
============================== */

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



/* ==============================
   KEYBOARD
============================== */

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



/* ==============================
   MOBILE SWIPE
============================== */

let touchStartX = 0;


document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    }
);


document.addEventListener(
    "touchend",
    event => {

        const touchEndX =
            event.changedTouches[0]
                .screenX;

        if (
            touchStartX -
            touchEndX > 50
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



/* ==============================
   ANSWER
============================== */


function submitAnswer(answer) {

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
            "Η πρόσκληση παραμένει όμορφη, ακόμη κι έτσι.";

    }


    overlay.classList.add("show");


    /*
       ΕΔΩ ΘΑ ΣΥΝΔΕΣΟΥΜΕ
       ΤΗΝ ΑΠΟΣΤΟΛΗ EMAIL
       ΣΤΟ ΔΙΚΟ ΣΟΥ EMAIL.
    */

}



/* ==============================
   YES CELEBRATION
============================== */


function createCelebration() {

    for (let i = 0; i < 50; i++) {

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

        sparkle.style.opacity = "0";

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


        document.body
            .appendChild(sparkle);


        setTimeout(
            () => sparkle.remove(),
            4500
        );

    }

}
