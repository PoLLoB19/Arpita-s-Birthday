/* =========================================================
   ✏️ EDIT THESE TWO NAMES — they update everywhere on the page
   ========================================================= */
const CONFIG = {
  herName: "Arpita",
  yourName: "Pollob",
};
/* ========================================================= */

(() => {
  "use strict";

  const $  = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const rand = (a, b) => Math.random() * (b - a) + a;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- names ---------- */
  $$("[data-her-name]").forEach((el) => (el.textContent = CONFIG.herName));
  $$("[data-your-name]").forEach((el) => (el.textContent = CONFIG.yourName));
  document.title = `Happy Birthday, ${CONFIG.herName} 🎂`;

  /* ---------- doodle drawings (hand-drawn style SVGs) ---------- */
  const draw = (inner) =>
    `<svg viewBox="0 0 48 48" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

  const petals = [0, 1, 2, 3, 4]
    .map((k) => `<ellipse cx="24" cy="12" rx="6" ry="8" transform="rotate(${72 * k} 24 24)"/>`)
    .join("");

  const DOODLES = {
    heart:   draw('<path d="M24 42C10 31 5 24 5 17a10 10 0 0 1 19-4 10 10 0 0 1 19 4c0 7-5 14-19 25z"/>'),
    star:    draw('<path d="M24 5l5.6 12.2 13.4 1.4-10 9 2.9 13.2L24 33.6 12.1 40.8 15 27.6l-10-9 13.4-1.4z"/>'),
    sparkle: draw('<path d="M24 4c1.5 12 8 18.5 20 20-12 1.5-18.5 8-20 20-1.5-12-8-18.5-20-20 12-1.5 18.5-8 20-20z"/>'),
    flower:  draw(`${petals}<circle cx="24" cy="24" r="4" fill-opacity=".5"/>`),
    balloon: draw('<path d="M24 4c-8 0-13 6-13 13 0 8 6 14 13 14s13-6 13-14C37 10 32 4 24 4z"/><path d="M24 31l-2.5 4h5z"/><path d="M24 35c0 4-4 5-2 9" fill="none"/><path d="M17 11c-2 2-3 5-3 8" fill="none"/>'),
    gift:    draw('<rect x="8" y="20" width="32" height="22" rx="3"/><rect x="5" y="14" width="38" height="7" rx="2"/><path d="M24 14v28" fill="none"/><path d="M24 14c-3-8-12-8-10-3s7 3 10 3zM24 14c3-8 12-8 10-3s-7 3-10 3z"/>'),
    note:    draw('<path d="M18 36V10l20-4v26"/><circle cx="12" cy="36" r="6"/><circle cx="32" cy="32" r="6"/>'),
    squiggle:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M4 30c4-10 8-10 10 0s6 10 10 0 8-10 10 0 6 10 8 0"/></svg>',
  };
  const TYPES = Object.keys(DOODLES);
  const PALETTE = ["#ff7aa2", "#b79cff", "#5ed1a5", "#ffb84d", "#6cc0ff"];

  // big doodles on the cover
  $$("[data-doodle]").forEach((el) => (el.innerHTML = DOODLES[el.dataset.doodle] || ""));

  // little doodles floating in the background all the way down the page
  const layer = $(".doodle-layer");
  if (layer) {
    const count = window.innerWidth < 600 ? 14 : 26;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "doodle";
      el.innerHTML = DOODLES[TYPES[i % TYPES.length]];
      const size = rand(22, 50);
      Object.assign(el.style, {
        left: rand(0, 96) + "%",
        top: rand(0, 96) + "%",
        width: size + "px",
        height: size + "px",
        color: PALETTE[i % PALETTE.length],
      });
      el.style.setProperty("--r", rand(-25, 25) + "deg");
      el.style.setProperty("--dur", rand(7, 13) + "s");
      el.style.setProperty("--delay", rand(-12, 0) + "s");
      layer.appendChild(el);
    }
  }

  /* soft moving emoji confetti behind the story */
  const emojiLayer = $(".emoji-layer");
  if (emojiLayer) {
    const emojis = ["♡", "✨", "🌸", "💌", "🌙", "🕊️", "💗", "🎀"];
    const count = window.innerWidth < 600 ? 12 : 20;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "floating-emoji";
      el.textContent = emojis[i % emojis.length];
      Object.assign(el.style, {
        left: rand(2, 96) + "%",
        top: rand(4, 96) + "%",
      });
      el.style.setProperty("--dur", rand(8, 15) + "s");
      el.style.setProperty("--delay", rand(-12, 0) + "s");
      emojiLayer.appendChild(el);
    }
  }

  /* ---------- bunting flags on the cover ---------- */
  const bunting = $(".bunting");
  if (bunting) {
    const flags = window.innerWidth < 600 ? 10 : 18;
    const flagColors = ["#ffb5cb", "#e4d9ff", "#d3f4e6", "#fff1b8", "#ffd3b8"];
    for (let i = 0; i < flags; i++) {
      const s = document.createElement("span");
      s.style.background = flagColors[i % flagColors.length];
      s.style.setProperty("--n", i);
      bunting.appendChild(s);
    }
  }

  /* ---------- scroll progress bar ---------- */
  const bar = $("#progress");
  let ticking = false;
  const updateBar = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateBar);
      }
    },
    { passive: true }
  );

  /* ---------- cute placeholder if a photo file is missing ---------- */
  const PH_COLORS = ["#ffd3df", "#e4d9ff", "#d3f4e6", "#fff1b8", "#ffe0cc", "#d5ecff"];
  const placeholder = (i, file) => {
    const safe = String(file).replace(/[<>&"]/g, "");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
      <rect width="600" height="750" fill="${PH_COLORS[i % PH_COLORS.length]}"/>
      <text x="300" y="350" font-size="120" text-anchor="middle">📸</text>
      <text x="300" y="450" font-size="36" text-anchor="middle" fill="#6b3f52" font-family="sans-serif">add your photo here</text>
      <text x="300" y="500" font-size="26" text-anchor="middle" fill="#94697c" font-family="sans-serif">${safe}</text>
    </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  };
  $$(".polaroid img").forEach((img, i) => {
    const original = img.getAttribute("src");
    const useFallback = () => {
      img.src = placeholder(i, original);
    };
    img.addEventListener("error", useFallback, { once: true });
    if (img.complete && img.naturalWidth === 0) useFallback();
  });

  /* ---------- scroll reveal (poem lines come one after another) ---------- */
  $$(".poem").forEach((poem) => {
    $$("p", poem).forEach((p, i) => p.style.setProperty("--i", i));
  });

  const reveals = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in-view"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("in-view");
          io.unobserve(el);
          // drop the stagger delay afterwards so hover feels instant
          setTimeout(() => el.style.setProperty("--d", "0s"), 1600);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    $$(".gallery .polaroid").forEach((el, i) => el.style.setProperty("--d", i * 0.15 + "s"));
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- confetti ---------- */
  const canvas = $("#confetti");
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0;
  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const CONFETTI_COLORS = ["#ff7aa2", "#ffb5cb", "#b79cff", "#5ed1a5", "#ffb84d", "#6cc0ff", "#ffe07a"];
  let parts = [];
  let raf = 0;

  function burst(x, y, n = 90) {
    if (reduceMotion) return;
    for (let i = 0; i < n; i++) {
      const angle = rand(-Math.PI * 0.95, -Math.PI * 0.05);
      const speed = rand(4, 12);
      const r = Math.random();
      parts.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        s: rand(7, 12),
        rot: rand(0, 6.28),
        vr: rand(-0.25, 0.25),
        color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
        shape: r < 0.5 ? "rect" : r < 0.8 ? "dot" : "heart",
        life: 0,
        max: rand(110, 180),
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    parts = parts.filter((p) => p.y < H + 30 && p.life < p.max);
    for (const p of parts) {
      p.vy += 0.22;
      p.vx *= 0.992;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, (p.max - p.life) / 30));
      if (p.shape === "rect") {
        ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.6);
      } else if (p.shape === "dot") {
        ctx.beginPath();
        ctx.arc(0, 0, p.s / 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.font = `${p.s * 1.8}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("♥", 0, 0);
      }
      ctx.restore();
    }
    if (parts.length) {
      raf = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, W, H);
      raf = 0;
    }
  }

  /* ---------- music (button only shows if audio/song.mp3 exists) ---------- */
  const bgm = $("#bgm");
  const musicBtn = $("#musicBtn");
  const videos = $$("video");
  bgm.volume = 0.35;
  let musicOn = false;
  let activeVideo = null;
  let resumeMusicAfterVideo = false;
  const setMusic = (on) => {
    musicOn = on;
    musicBtn.textContent = on ? "🔊" : "🎵";
    musicBtn.classList.toggle("on", on);
  };
  const playMusic = () => {
    if (musicBtn.hidden || activeVideo) return;
    bgm.play().then(() => {
      if (activeVideo) {
        bgm.pause();
        setMusic(false);
        return;
      }
      setMusic(true);
    }).catch(() => {});
  };
  if (bgm.readyState >= 1) musicBtn.hidden = false;
  bgm.addEventListener("loadedmetadata", () => (musicBtn.hidden = false));
  musicBtn.addEventListener("click", () => {
    if (musicOn) {
      bgm.pause();
      setMusic(false);
    } else {
      playMusic();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "hidden") return;
    resumeMusicAfterVideo = false;
    if (!bgm.paused) {
      bgm.pause();
      setMusic(false);
    }
  });

  const finishVideo = (video) => {
    if (activeVideo !== video) return;
    activeVideo = null;
    if (resumeMusicAfterVideo) {
      resumeMusicAfterVideo = false;
      playMusic();
    }
  };
  videos.forEach((video) => {
    video.addEventListener("play", () => {
      if (activeVideo === video) return;
      const previousVideo = activeVideo;
      if (!previousVideo) {
        resumeMusicAfterVideo = musicOn || !bgm.paused;
        if (resumeMusicAfterVideo) {
          bgm.pause();
          setMusic(false);
        }
      }
      activeVideo = video;
      if (previousVideo) previousVideo.pause();
    });
    video.addEventListener("pause", () => finishVideo(video));
    video.addEventListener("ended", () => finishVideo(video));
  });

  /* ---------- cover button ---------- */
  $("#openBtn").addEventListener("click", (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 140);
    playMusic();
    $("#start").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- birthday cake ---------- */
  const cake = $("#cake");
  const blowBtn = $("#blowBtn");
  const wish = $("#wish");
  const candleVideoWrap = $("#candleVideoWrap");
  const candleVideo = $("#candleVideo");

  const playCandleVideo = () => {
    if (!candleVideoWrap || !candleVideo) return;
    candleVideoWrap.hidden = false;
    candleVideoWrap.classList.add("show");
    candleVideo.currentTime = 0;
    candleVideo.play().catch(() => {});
    candleVideoWrap.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  };

  const toggleCandles = () => {
    const out = cake.classList.toggle("out");
    wish.classList.toggle("show", out);
    blowBtn.textContent = out ? "Light them again 🕯️" : "Blow out the candles 🌬️";
    if (out) {
      const r = cake.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height * 0.3, 160);
      setTimeout(() => burst(window.innerWidth * 0.2, window.innerHeight * 0.75, 70), 250);
      setTimeout(() => burst(window.innerWidth * 0.8, window.innerHeight * 0.75, 70), 450);
      setTimeout(playCandleVideo, 500);
    } else if (candleVideo) {
      candleVideo.pause();
      candleVideo.currentTime = 0;
      if (candleVideoWrap) {
        candleVideoWrap.hidden = true;
        candleVideoWrap.classList.remove("show");
      }
    }
  };
  blowBtn.addEventListener("click", toggleCandles);
  cake.addEventListener("click", toggleCandles);

  /* ---------- 24-poem carousel ---------- */
  const poemSlides = $$(".poem-slide");
  const poemDots = $("#poemDots");
  const poemPrev = $("#poemPrev");
  const poemNext = $("#poemNext");
  if (poemSlides.length && poemDots && poemPrev && poemNext) {
    let poemIndex = 0;
    const dots = poemSlides.map((slide, i) => {
      const dot = document.createElement("button");
      dot.className = "poem-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `কবিতা ${i + 1}`);
      dot.addEventListener("click", () => showPoem(i));
      poemDots.appendChild(dot);
      return dot;
    });

    function showPoem(index) {
      poemIndex = (index + poemSlides.length) % poemSlides.length;
      poemSlides.forEach((slide, i) => {
        const active = i === poemIndex;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
        dots[i].classList.toggle("is-active", active);
        dots[i].setAttribute("aria-current", active ? "true" : "false");
      });
    }

    poemPrev.addEventListener("click", () => showPoem(poemIndex - 1));
    poemNext.addEventListener("click", () => showPoem(poemIndex + 1));
    showPoem(0);
  }

  // a tiny welcome sprinkle when she reaches the cake
  const finale = $("#finale");
  if (finale && "IntersectionObserver" in window && !reduceMotion) {
    const fio = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          burst(window.innerWidth / 2, window.innerHeight * 0.6, 60);
          fio.disconnect();
        }
      },
      { threshold: 0.7 }
    );
    fio.observe(finale);
  }
})();
