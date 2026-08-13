const slides = document.querySelectorAll(".slide");

const openBtn = document.getElementById("openBtn");
const buttonNote = document.getElementById("buttonNote");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const darkOverlay = document.getElementById("darkOverlay");
const flame = document.getElementById("flame");
const candleScene = document.getElementById("candleScene");
const candleHint = document.querySelector(".candle-hint");
const celebrationContent =
    document.getElementById("celebrationContent");

const continueBtn = document.getElementById("continueBtn");
const nextBtn = document.getElementById("nextBtn");

const comebackAudio =
    document.getElementById("comebackAudio");

const donotAudio =
    document.getElementById("donotAudio");

const wthAudio =
    document.getElementById("wthAudio");

const birthdayAudio =
    document.getElementById("birthdayAudio");

const countdownBoxes =
    document.querySelectorAll(".countdown div");


/* =========================
   STATE
========================= */

let currentSlide = 0;
let lockedClicks = 0;
let candleLit = true;


/* =========================
   TARGET DATE
========================= */

const targetDate =
    new Date("2026-09-01T00:00:00");


/* =========================
   FLOATING HEARTS
   40 HEARTS PER SLIDE
========================= */

const HEART_COUNT = 40;

const heartColors = [
    "#ffd84d",
    "#ffe98a",
    "#e9b949",
    "#f6d66a"
];

const heartSizes = [
    "9px",
    "10px",
    "11px",
    "12px",
    "13px"
];

const heartOpacity = [
    0.45,
    0.55,
    0.65,
    0.75,
    0.85
];


function createFloatingHearts() {

    const containers =
        document.querySelectorAll(".floating-hearts");

    containers.forEach(container => {

        container.innerHTML = "";

        for (let i = 0; i < HEART_COUNT; i++) {

            const heart =
                document.createElement("span");

            heart.className =
                "floating-heart";

            heart.textContent = "♥";


            const size =
                heartSizes[
                    Math.floor(
                        Math.random() *
                        heartSizes.length
                    )
                ];

            const color =
                heartColors[
                    Math.floor(
                        Math.random() *
                        heartColors.length
                    )
                ];

            const opacity =
                heartOpacity[
                    Math.floor(
                        Math.random() *
                        heartOpacity.length
                    )
                ];


            const left =
                Math.random() * 100;

            const duration =
                8 +
                Math.random() * 7;

            const delay =
                -(Math.random() * duration);

            const sway =
                2.5 +
                Math.random() * 2;

            const drift =
                -35 +
                Math.random() * 70;

            const rotate =
                -15 +
                Math.random() * 30;


            heart.style.setProperty(
                "--left",
                `${left}%`
            );

            heart.style.setProperty(
                "--size",
                size
            );

            heart.style.setProperty(
                "--color",
                color
            );

            heart.style.setProperty(
                "--opacity",
                opacity
            );

            heart.style.setProperty(
                "--duration",
                `${duration}s`
            );

            heart.style.setProperty(
                "--delay",
                `${delay}s`
            );

            heart.style.setProperty(
                "--sway",
                `${sway}s`
            );

            heart.style.setProperty(
                "--drift",
                `${drift}px`
            );

            heart.style.setProperty(
                "--rotate",
                `${rotate}deg`
            );


            container.appendChild(heart);
        }
    });
}


/* =========================
   SLIDE SYSTEM
========================= */

function showSlide(index) {

    slides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === index
        );

    });

    currentSlide = index;


    const video =
        slides[index]?.querySelector("video");

    if (video) {

        video.currentTime = 0;

        video.play().catch(() => {});
    }
}


/* =========================
   AUDIO SYSTEM
========================= */

function playSound(audio) {

    [
        comebackAudio,
        donotAudio,
        wthAudio
    ].forEach(sound => {

        if (!sound) return;

        sound.pause();
        sound.currentTime = 0;

    });


    if (!audio) return;

    audio.currentTime = 0;

    audio.play().catch(() => {});
}


/* =========================
   COUNTDOWN
========================= */

function isUnlocked() {

    return new Date() >= targetDate;
}


function updateCountdown() {

    const difference =
        targetDate - new Date();


    if (difference <= 0) {

        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";

        openBtn.disabled = false;
        openBtn.classList.add("unlocked");

        return;
    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );

    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;


    daysEl.textContent =
        String(days).padStart(2, "0");

    hoursEl.textContent =
        String(hours).padStart(2, "0");

    minutesEl.textContent =
        String(minutes).padStart(2, "0");

    secondsEl.textContent =
        String(seconds).padStart(2, "0");
}


/* =========================
   COUNTDOWN FLOAT
========================= */

const floatingData = [];


countdownBoxes.forEach((box, index) => {

    floatingData.push({

        element: box,

        phase:
            index * 1.7,

        speedX:
            0.00032 +
            Math.random() * 0.00006,

        amplitudeX:
            2.5 +
            Math.random() * 1.5,

        speedY:
            0.00042 +
            Math.random() * 0.00007,

        amplitudeY:
            3.5 +
            Math.random() * 1.8,

        speedR:
            0.00030 +
            Math.random() * 0.00006,

        amplitudeR:
            0.8 +
            Math.random() * 0.7,

        speedS:
            0.00035 +
            Math.random() * 0.00005

    });

});


function animateCountdown(time) {

    countdownBoxes.forEach((box, index) => {

        const data =
            floatingData[index];

        const t =
            time +
            data.phase * 1000;


        const x =
            Math.sin(
                t * data.speedX
            ) *
            data.amplitudeX;


        const y =
            Math.sin(
                t * data.speedY
            ) *
            data.amplitudeY;


        const rotation =
            Math.sin(
                t * data.speedR
            ) *
            data.amplitudeR;


        const scale =
            1 +
            Math.sin(
                t * data.speedS
            ) *
            0.008;


        box.style.transform =
            `translate3d(
                ${x.toFixed(3)}px,
                ${y.toFixed(3)}px,
                0
            )
            rotate(${rotation.toFixed(3)}deg)
            scale(${scale.toFixed(4)})`;

    });


    requestAnimationFrame(
        animateCountdown
    );
}


/* =========================
   OPEN BUTTON
========================= */

openBtn.addEventListener("click", () => {

    if (isUnlocked()) {

        openBtn.disabled = true;

        showSlide(1);

        return;
    }


    lockedClicks++;


    if (lockedClicks === 1) {

        buttonNote.textContent =
            "Come back on 1st September, My Cutie Ducky";

        playSound(comebackAudio);

    } else if (lockedClicks === 2) {

        buttonNote.textContent =
            "Do Not Repeat It Again";

        playSound(donotAudio);

    } else {

        buttonNote.textContent =
            "😡😡😡";

        playSound(wthAudio);
    }


    openBtn.animate(
        [
            {
                transform: "scale(1)"
            },
            {
                transform: "scale(1.14)"
            },
            {
                transform: "scale(.97)"
            },
            {
                transform: "scale(1)"
            }
        ],
        {
            duration: 420,
            easing: "ease-out"
        }
    );

});


/* =========================
   CANDLE
========================= */

flame.addEventListener("click", () => {

    if (!candleLit) {
        return;
    }


    candleLit = false;

    flame.style.pointerEvents =
        "none";


    darkOverlay.style.opacity =
        "0";


    candleScene.style.transition =
        "opacity 1.4s ease, transform 1.4s ease";


    candleScene.style.opacity =
        "0";


    candleScene.style.transform =
        "translate(-50%, -50%) scale(.7)";


    candleHint.style.opacity =
        "0";


    setTimeout(() => {

        celebrationContent.classList.add(
            "show"
        );


        if (birthdayAudio) {

            birthdayAudio.volume =
                0.55;

            birthdayAudio.play().catch(
                () => {}
            );
        }

    }, 900);

});


/* =========================
   NAVIGATION
========================= */

continueBtn.addEventListener("click", () => {

    showSlide(2);

});


nextBtn.addEventListener("click", () => {

    showSlide(3);

});


/* =========================
   VIDEO RECOVERY
========================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {
            return;
        }


        const video =
            slides[currentSlide]
                ?.querySelector("video");


        if (video) {

            video.play().catch(
                () => {}
            );

        }

    }
);


/* =========================
   INITIALIZE
========================= */

createFloatingHearts();

updateCountdown();

setInterval(
    updateCountdown,
    1000
);

requestAnimationFrame(
    animateCountdown
);

showSlide(0);