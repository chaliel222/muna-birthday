const slides = document.querySelectorAll(".slide");

const openBtn = document.getElementById("openBtn");
const continueBtn = document.getElementById("continueBtn");
const nextBtn = document.getElementById("nextBtn");

const backToSlide2Btn =
    document.getElementById("backToSlide2Btn");

const backToSlide3Btn =
    document.getElementById("backToSlide3Btn");

const candleScene =
    document.getElementById("candleScene");

const darkOverlay =
    document.getElementById("darkOverlay");

const celebrationContent =
    document.getElementById("celebrationContent");


/* =========================
   AUDIO
========================= */

const comebackAudio =
    document.getElementById("comebackAudio");

const donotAudio =
    document.getElementById("donotAudio");

const wthAudio =
    document.getElementById("wthAudio");

const fireAudio =
    document.getElementById("fireAudio");

const whosAudio =
    document.getElementById("whosAudio");

const cheersAudio =
    document.getElementById("cheersAudio");

const poperAudio =
    document.getElementById("poperAudio");

const hornAudio =
    document.getElementById("hornAudio");

const hbdAudio =
    document.getElementById("hbdAudio");


let currentSlide = 0;

let openClickCount = 0;

let candlePressed = false;

let fireFadeTimer = null;

let hbdTimer = null;


/* =========================
   BIRTHDAY DATE
========================= */

const birthdayDate =
    new Date("2026-09-01T00:00:00");


/* =========================
   AUDIO HELPERS
========================= */

function stopAudio(audio) {

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
}


function playOnce(audio) {

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    audio.play().catch(() => {});
}


/* =========================
   FIRE AUDIO
   FADE IN
========================= */

function startFireSound() {

    if (!fireAudio) return;

    clearInterval(fireFadeTimer);

    fireAudio.loop = true;
    fireAudio.currentTime = 0;
    fireAudio.volume = 0;

    fireAudio.play().catch(() => {});


    const fadeDuration = 1200;
    const steps = 30;
    const stepTime = fadeDuration / steps;

    let step = 0;


    fireFadeTimer = setInterval(() => {

        step++;

        fireAudio.volume =
            Math.min(1, step / steps);


        if (step >= steps) {

            clearInterval(fireFadeTimer);

            fireFadeTimer = null;

        }

    }, stepTime);
}


/* =========================
   FIRE AUDIO
   FADE OUT
========================= */

function fadeOutFire() {

    if (!fireAudio) return;

    clearInterval(fireFadeTimer);

    fireFadeTimer = null;


    const startVolume =
        fireAudio.volume;

    const fadeDuration = 1200;
    const steps = 30;
    const stepTime =
        fadeDuration / steps;

    let step = 0;


    fireFadeTimer = setInterval(() => {

        step++;


        fireAudio.volume =
            Math.max(
                0,
                startVolume *
                (1 - step / steps)
            );


        if (step >= steps) {

            clearInterval(fireFadeTimer);

            fireFadeTimer = null;

            fireAudio.pause();

            fireAudio.currentTime = 0;

            fireAudio.volume = 1;

        }

    }, stepTime);
}


/* =========================
   PRE-BIRTHDAY SOUNDS
========================= */

function playPreBirthdaySound() {

    stopAudio(comebackAudio);
    stopAudio(donotAudio);
    stopAudio(wthAudio);


    openClickCount++;


    if (openClickCount === 1) {

        playOnce(comebackAudio);

    } else if (openClickCount === 2) {

        playOnce(donotAudio);

    } else {

        playOnce(wthAudio);

    }
}


/* =========================
   SLIDE CONTROL
========================= */

function showSlide(index) {

    if (
        index < 0 ||
        index >= slides.length
    ) {
        return;
    }


    slides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === index
        );

    });


    currentSlide = index;


    const video =
        slides[index].querySelector(".bg-video");


    if (video) {

        video.currentTime = 0;

        video.play().catch(() => {});

    }


    /*
       Ketika masuk Slide 2
       dan lilin belum ditekan,
       fire.mp3 tetap looping.
    */

    if (
        index === 1 &&
        !candlePressed
    ) {

        startFireSound();

    }
}


/* =========================
   SLIDE 1 → SLIDE 2
========================= */

openBtn.addEventListener("click", () => {

    /*
       Open sementara tidak dikunci.
       Bisa masuk Slide 2 kapan saja.
    */

    showSlide(1);

});


/* =========================
   CANDLE / API
========================= */

candleScene.addEventListener(
    "click",
    () => {

        /*
           Mencegah api dipencet
           berkali-kali.
        */

        if (candlePressed) return;

        candlePressed = true;


        /* =========================
           API HILANG
        ========================== */

        candleScene.style.opacity = "0";

        candleScene.style.pointerEvents =
            "none";


        /* =========================
           DARKNESS HILANG
        ========================== */

        darkOverlay.style.opacity = "0";


        /* =========================
           FIRE FADE OUT
        ========================== */

        fadeOutFire();


        /* =========================
           WHO'S
           Bunyi sekali
        ========================== */

        playOnce(whosAudio);


        /* =========================
           CHEERS
           Bunyi sekali
        ========================== */

        playOnce(cheersAudio);


        /* =========================
           POPER 1
           +1 detik
        ========================== */

        setTimeout(() => {

            const poper1 =
                poperAudio.cloneNode();

            poper1.volume = 1;

            poper1.play()
                .catch(() => {});

        }, 1000);


        /* =========================
           POPER 2
           +1.5 detik
        ========================== */

        setTimeout(() => {

            const poper2 =
                poperAudio.cloneNode();

            poper2.volume = 1;

            poper2.play()
                .catch(() => {});

        }, 1500);


        /* =========================
           HORN
           Bunyi sekali
        ========================== */

        playOnce(hornAudio);


        /* =========================
           TAMPILKAN SELEBRASI
        ========================== */

        setTimeout(() => {

            celebrationContent
                .classList
                .add("show");

        }, 900);


        /* =========================
           HBD MUSIC

           Mulai +5 detik
           Loop terus
        ========================== */

        clearTimeout(hbdTimer);


        hbdTimer = setTimeout(() => {

            hbdAudio.loop = true;

            hbdAudio.currentTime = 0;

            hbdAudio.volume = 1;

            hbdAudio.play()
                .catch(() => {});

        }, 5000);

    }
);


/* =========================
   SLIDE 2 → SLIDE 3
========================= */

continueBtn.addEventListener(
    "click",
    () => {

        /*
           HBD JANGAN dihentikan.
           Tetap berjalan.
        */

        showSlide(2);

    }
);


/* =========================
   SLIDE 3 → SLIDE 2
   BACK
========================= */

backToSlide2Btn.addEventListener(
    "click",
    () => {

        /*
           HBD tetap berjalan.
        */

        showSlide(1);

    }
);


/* =========================
   SLIDE 3 → SLIDE 4
========================= */

nextBtn.addEventListener(
    "click",
    () => {

        /*
           HBD tetap berjalan.
        */

        showSlide(3);

    }
);


/* =========================
   SLIDE 4 → SLIDE 3
   BACK
========================= */

backToSlide3Btn.addEventListener(
    "click",
    () => {

        /*
           HBD tetap berjalan.
        */

        showSlide(2);

    }
);


/* =========================
   COUNTDOWN
========================= */

function updateCountdown() {

    const now = new Date();

    const difference =
        birthdayDate - now;


    if (difference <= 0) {

        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                difference /
                (1000 * 60)
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                difference /
                1000
            ) % 60
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================
   FLOATING HEARTS
========================= */

document
    .querySelectorAll(".floating-hearts")
    .forEach(container => {

        const colors = [
            "#ffd94f",
            "#ffe477",
            "#f6c744",
            "#fff0a8"
        ];


        for (let i = 0; i < 10; i++) {

            const heart =
                document.createElement("span");


            heart.className =
                "floating-heart";


            heart.textContent = "♥";


            heart.style.setProperty(
                "--left",
                `${Math.random() * 100}%`
            );


            heart.style.setProperty(
                "--size",
                `${10 + Math.random() * 12}px`
            );


            heart.style.setProperty(
                "--color",
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ]
            );


            heart.style.setProperty(
                "--opacity",
                `${0.25 + Math.random() * 0.35}`
            );


            heart.style.setProperty(
                "--duration",
                `${8 + Math.random() * 8}s`
            );


            heart.style.setProperty(
                "--sway",
                `${2 + Math.random() * 2}s`
            );


            heart.style.setProperty(
                "--delay",
                `${Math.random() * -10}s`
            );


            heart.style.setProperty(
                "--drift",
                `${-35 + Math.random() * 70}px`
            );


            heart.style.setProperty(
                "--rotate",
                `${-20 + Math.random() * 40}deg`
            );


            container.appendChild(heart);

        }

    });