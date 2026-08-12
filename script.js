/* =========================================================
   SLIDE SYSTEM
========================================================= */

const slides = [
  document.getElementById("slide1"),
  document.getElementById("slide2"),
  document.getElementById("slide3"),
  document.getElementById("slide4")
];

let currentSlide = 0;


function showSlide(index) {

  if (
    index < 0 ||
    index >= slides.length
  ) {
    return;
  }

  slides.forEach(
    (slide, i) => {

      slide.classList.toggle(
        "active",
        i === index
      );

    }
  );

  currentSlide = index;

}



/* =========================================================
   BIRTHDAY DATE
========================================================= */

const birthdayDate =
  new Date(
    "September 1, 2026 00:00:00"
  ).getTime();



/* =========================================================
   ELEMENTS
========================================================= */

const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsElement =
  document.getElementById("seconds");


const openButton =
  document.getElementById("openButton");


const lockedMessage =
  document.getElementById("lockedMessage");


const normalHint =
  document.getElementById("normalHint");



/* =========================================================
   AUDIO
========================================================= */

const birthdayMusic =
  document.getElementById(
    "birthdayMusic"
  );

const trumpetSound =
  document.getElementById(
    "trumpetSound"
  );


/*
   BACKSOUND SAAT MASIH TERKUNCI
*/

const comebackSound =
  document.getElementById(
    "comebackSound"
  );

const donotSound =
  document.getElementById(
    "donotSound"
  );

const wthSound =
  document.getElementById(
    "wthSound"
  );



/* =========================================================
   OPEN BUTTON CLICK COUNTER
========================================================= */

/*
   Ini hanya dihitung selama
   website masih terkunci.

   Klik 1 -> comeback.mp3
   Klik 2 -> comeback.mp3
   Klik 3 -> donot.mp3
   Klik 4+ -> wth.mp3
*/

let lockedClickCount = 0;



/* =========================================================
   CHECK BIRTHDAY
========================================================= */

function isBirthdayUnlocked() {

  const now =
    new Date().getTime();

  return now >= birthdayDate;

}



/* =========================================================
   PLAY LOCKED SOUND
========================================================= */

function playLockedSound() {

  /*
     Tentukan sound berdasarkan
     jumlah klik.
  */

  let sound = null;


  if (
    lockedClickCount === 1 ||
    lockedClickCount === 2
  ) {

    sound = comebackSound;

  }

  else if (
    lockedClickCount === 3
  ) {

    sound = donotSound;

  }

  else {

    sound = wthSound;

  }


  /*
     Stop semua sound locked
     supaya tidak tumpuk.
  */

  [
    comebackSound,
    donotSound,
    wthSound
  ].forEach(
    (audio) => {

      if (!audio) {
        return;
      }

      audio.pause();

      audio.currentTime = 0;

    }
  );


  /*
     Mainkan sound yang dipilih.
  */

  if (sound) {

    sound.currentTime = 0;

    sound
      .play()
      .catch(
        (error) => {

          console.log(
            "Audio tidak dapat dimainkan:",
            error
          );

        }
      );

  }

}



/* =========================================================
   COUNTDOWN
========================================================= */

function updateCountdown() {

  const now =
    new Date().getTime();


  const distance =
    birthdayDate - now;


  /*
     Kalau sudah 1 September
  */

  if (distance <= 0) {

    daysElement.textContent =
      "00";

    hoursElement.textContent =
      "00";

    minutesElement.textContent =
      "00";

    secondsElement.textContent =
      "00";

    return;
  }


  const days =
    Math.floor(
      distance /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (
        distance %
        (1000 * 60 * 60 * 24)
      )
      /
      (1000 * 60 * 60)
    );


  const minutes =
    Math.floor(
      (
        distance %
        (1000 * 60 * 60)
      )
      /
      (1000 * 60)
    );


  const seconds =
    Math.floor(
      (
        distance %
        (1000 * 60)
      )
      /
      1000
    );


  daysElement.textContent =
    String(days).padStart(2, "0");

  hoursElement.textContent =
    String(hours).padStart(2, "0");

  minutesElement.textContent =
    String(minutes).padStart(2, "0");

  secondsElement.textContent =
    String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
  updateCountdown,
  1000
);



/* =========================================================
   LOCK MESSAGE
========================================================= */

function showLockedMessage() {

  lockedMessage.hidden = false;


  requestAnimationFrame(
    () => {

      lockedMessage.classList.add(
        "show"
      );

    }
  );


  if (normalHint) {

    normalHint.style.display =
      "none";

  }

}



/* =========================================================
   HIDE LOCK MESSAGE
========================================================= */

function hideLockedMessage() {

  lockedMessage.classList.remove(
    "show"
  );


  setTimeout(
    () => {

      lockedMessage.hidden =
        true;

    },
    350
  );


  if (normalHint) {

    normalHint.style.display =
      "";

  }

}



/* =========================================================
   OPEN BUTTON
========================================================= */

openButton.addEventListener(
  "click",
  () => {

    /*
       CEK APAKAH SUDAH 1 SEPTEMBER
    */

    if (!isBirthdayUnlocked()) {

      /*
         MASIH TERKUNCI
      */

      lockedClickCount++;


      /*
         TAMPILKAN PESAN
      */

      showLockedMessage();


      /*
         MAINKAN SOUND
         SESUAI JUMLAH KLIK
      */

      playLockedSound();


      return;
    }


    /*
       SUDAH 1 SEPTEMBER
    */

    hideLockedMessage();


    /*
       PINDAH KE SLIDE 2
    */

    showSlide(1);


    /*
       PLAY BIRTHDAY MUSIC
    */

    if (birthdayMusic) {

      birthdayMusic.currentTime =
        0;

      birthdayMusic
        .play()
        .catch(
          () => {}
        );

    }

  }
);



/* =========================================================
   CANDLE
========================================================= */

const flame =
  document.getElementById(
    "flame"
  );

const darkness =
  document.getElementById(
    "darkness"
  );

const candleGlow =
  document.getElementById(
    "candleGlow"
  );

const celebration =
  document.getElementById(
    "celebration"
  );


let candleClicked = false;



function revealBirthday() {

  if (candleClicked) {

    return;

  }


  candleClicked = true;


  /*
     MUNCULKAN BIRTHDAY MESSAGE
  */

  celebration.classList.add(
    "show"
  );


  /*
     MATIKAN API
  */

  flame.classList.add(
    "fade-out"
  );

  darkness.classList.add(
    "fade-out"
  );

  candleGlow.classList.add(
    "fade-out"
  );


  /*
     PLAY TRUMPET
  */

  if (trumpetSound) {

    trumpetSound.currentTime =
      0;

    trumpetSound
      .play()
      .catch(
        () => {}
      );

  }

}


flame.addEventListener(
  "click",
  revealBirthday
);



/* =========================================================
   CONTINUE TO MEMORIES
========================================================= */

const toMemories =
  document.getElementById(
    "toMemories"
  );


toMemories.addEventListener(
  "click",
  () => {

    showSlide(2);

  }
);



/* =========================================================
   NEXT TO LETTER
========================================================= */

const toLetter =
  document.getElementById(
    "toLetter"
  );


toLetter.addEventListener(
  "click",
  () => {

    showSlide(3);

  }
);



/* =========================================================
   FLOATING HEART GENERATOR
========================================================= */

function createFloatingHearts(
  containerId
) {

  const container =
    document.getElementById(
      containerId
    );


  if (!container) {

    return;

  }


  const heartCount = 18;


  for (
    let i = 0;
    i < heartCount;
    i++
  ) {

    const heart =
      document.createElement(
        "span"
      );


    heart.className =
      "floating-heart";


    heart.textContent =
      "♥";


    /*
       RANDOM POSITION
    */

    heart.style.left =
      Math.random() * 100 + "%";


    /*
       RANDOM SIZE
    */

    const size =
      12 +
      Math.random() * 18;


    heart.style.fontSize =
      size + "px";


    /*
       RANDOM SPEED
    */

    const duration =
      7 +
      Math.random() * 9;


    heart.style.animationDuration =
      duration + "s";


    /*
       RANDOM DELAY
    */

    heart.style.animationDelay =
      (
        -Math.random() *
        duration
      ) + "s";


    /*
       RANDOM HORIZONTAL MOVEMENT
    */

    const drift =
      -70 +
      Math.random() * 140;


    heart.style.setProperty(
      "--drift",
      drift + "px"
    );


    /*
       RANDOM OPACITY
    */

    const opacityOptions = [
      1,
      0.9,
      0.8,
      0.8,
      0.65,
      0.5,
      0.5
    ];


    const opacity =
      opacityOptions[
        Math.floor(
          Math.random() *
          opacityOptions.length
        )
      ];


    heart.style.setProperty(
      "--heart-opacity",
      opacity
    );


    container.appendChild(
      heart
    );

  }

}



/* =========================================================
   CREATE HEARTS
========================================================= */

createFloatingHearts(
  "hearts1"
);

createFloatingHearts(
  "hearts2"
);

createFloatingHearts(
  "hearts3"
);

createFloatingHearts(
  "hearts4"
);



/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    /*
       ARROW RIGHT
    */

    if (
      event.key === "ArrowRight"
    ) {

      /*
         Jangan boleh melewati
         Slide 1 sebelum tanggal
         ulang tahun.
      */

      if (
        currentSlide === 0 &&
        !isBirthdayUnlocked()
      ) {

        lockedClickCount++;

        showLockedMessage();

        playLockedSound();

        return;

      }


      if (
        currentSlide <
        slides.length - 1
      ) {

        showSlide(
          currentSlide + 1
        );

      }

    }


    /*
       ARROW LEFT
    */

    if (
      event.key === "ArrowLeft"
    ) {

      if (
        currentSlide > 0
      ) {

        showSlide(
          currentSlide - 1
        );

      }

    }

  }
);