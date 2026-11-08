/* =========================================================
   Winsteel – Bhoomipujan & Shilanyas Invitation
   ========================================================= */
(function () {
  "use strict";

  // ---------- Event config ----------
  const EVENT = {
    title: "Bhoomipujan & Shilanyas Ceremony – Winsteel Engineering Works Pvt Ltd",
    // 25 Nov 2026, 8:30 AM IST (UTC+05:30)
    start: new Date("2026-11-25T08:30:00+05:30"),
    end: new Date("2026-11-25T14:00:00+05:30"),
    location: "WINSTEEL ENGINEERING WORKS PVT LTD, Block No. 266, NH 48, Vesma, Jalalpore, Navsari, Gujarat",
    mapLink: "https://maps.app.goo.gl/5LwypVbVMKKsPv8y5?g_st=iw",
    details:
      "We cordially invite you to grace the auspicious occasion of the Bhoomipujan & Shilanyas Ceremony (Foundation Stone Laying) of our new project of Winsteel Engineering Works Pvt Ltd.\n\n8:30 AM onwards, followed by Lunch.\n\nMap: https://maps.app.goo.gl/5LwypVbVMKKsPv8y5?g_st=iw",
  };

  const $ = (s) => document.querySelector(s);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Personalised guest name: ?to=Name ----------
  const guest = new URLSearchParams(location.search).get("to");
  if (guest) {
    $("#guestName").textContent = "Dear " + guest.trim().slice(0, 60);
  }

  // ---------- Toast ----------
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
  }

  // =========================================================
  //  Falling petals + golden sparkles (canvas)
  // =========================================================
  const canvas = $("#petals");
  const ctx = canvas.getContext("2d");
  let W, H, DPR, particles = [];
  const COLORS = ["#ff9a1f", "#ffb627", "#e63946", "#ffcf5c", "#ff7b00", "#d4145a"];

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = innerWidth * DPR;
    H = canvas.height = innerHeight * DPR;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
  }
  resize();
  addEventListener("resize", resize);

  function makeParticle(burst) {
    const sparkle = Math.random() < 0.35;
    return {
      sparkle,
      x: burst ? W / 2 + (Math.random() - 0.5) * W * 0.3 : Math.random() * W,
      y: burst ? H * 0.45 : -20 * DPR,
      vx: burst ? (Math.random() - 0.5) * 14 * DPR : (Math.random() - 0.5) * 0.6 * DPR,
      vy: burst ? (-Math.random() * 12 - 4) * DPR : (Math.random() * 1 + 0.6) * DPR,
      size: (sparkle ? Math.random() * 2 + 1 : Math.random() * 7 + 6) * DPR,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.06,
      sway: Math.random() * Math.PI * 2,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      life: 1,
      burst,
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    if (p.sparkle) {
      ctx.globalAlpha = 0.5 + Math.sin(p.sway * 3) * 0.5;
      ctx.fillStyle = "#ffe9a3";
      ctx.shadowColor = "#ffd36b";
      ctx.shadowBlur = 8 * DPR;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.globalAlpha = 0.9 * p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.6, p.size * 0.7, p.size * 0.6, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.6, -p.size * 0.9, -p.size * 0.6, 0, -p.size);
      ctx.fill();
      ctx.globalAlpha = 0.35 * p.life;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 0.8 * DPR;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.lineTo(0, p.size * 0.7);
      ctx.stroke();
    }
    ctx.restore();
  }

  let maxAmbient = innerWidth < 600 ? 28 : 50;
  let running = !reducedMotion;

  function loop() {
    ctx.clearRect(0, 0, W, H);
    if (running && particles.filter((p) => !p.burst).length < maxAmbient && Math.random() < 0.25) {
      particles.push(makeParticle(false));
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.sway += 0.02;
      if (p.burst) {
        p.vy += 0.25 * DPR;
        p.vx *= 0.985;
        p.life -= 0.006;
      } else {
        p.vx += Math.sin(p.sway) * 0.02 * DPR;
      }
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      drawPetal(p);
      if (p.y > H + 30 * DPR || p.life <= 0) particles.splice(i, 1);
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  function petalBurst(n) {
    if (reducedMotion) return;
    for (let i = 0; i < n; i++) particles.push(makeParticle(true));
  }

  // Pause when tab hidden
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden && !reducedMotion;
  });

  // =========================================================
  //  Gate open
  // =========================================================
  const gate = $("#gate");
  $("#openBtn").addEventListener("click", () => {
    gate.classList.add("open");
    document.body.classList.remove("locked");
    document.body.classList.add("opened");
    petalBurst(innerWidth < 600 ? 80 : 120);
    if (navigator.vibrate) navigator.vibrate(30);
    startMusic();
    setTimeout(() => gate.classList.add("gone"), 1700);
    setTimeout(revealCheck, 300);
  });

  // =========================================================
  //  Scroll reveal
  // =========================================================
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  function revealCheck() {
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
  }
  revealCheck();

  // =========================================================
  //  Countdown
  // =========================================================
  const cdEls = {
    d: $("#cd-days"),
    h: $("#cd-hours"),
    m: $("#cd-mins"),
    s: $("#cd-secs"),
  };
  const pad = (n) => String(n).padStart(2, "0");
  function setVal(el, v) {
    if (el.textContent !== v) {
      el.textContent = v;
      el.classList.remove("tick");
      void el.offsetWidth;
      el.classList.add("tick");
    }
  }
  function tickCountdown() {
    const diff = EVENT.start - Date.now();
    if (diff <= 0) {
      $("#countdown").hidden = true;
      $("#cdDone").hidden = false;
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    setVal(cdEls.d, pad(d));
    setVal(cdEls.h, pad(h));
    setVal(cdEls.m, pad(m));
    setVal(cdEls.s, pad(s));
    setTimeout(tickCountdown, 1000);
  }
  tickCountdown();

  // =========================================================
  //  Calendar
  // =========================================================
  const toCalDate = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const gcalUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(EVENT.title) +
    "&dates=" + toCalDate(EVENT.start) + "/" + toCalDate(EVENT.end) +
    "&details=" + encodeURIComponent(EVENT.details) +
    "&location=" + encodeURIComponent(EVENT.location) +
    "&ctz=Asia/Kolkata";
  $("#gcalBtn").href = gcalUrl;

  $("#icsBtn").addEventListener("click", () => {
    const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Winsteel//Invitation//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:winsteel-bhoomipujan-20261125@winsteel",
      "DTSTAMP:" + toCalDate(new Date()),
      "DTSTART:" + toCalDate(EVENT.start),
      "DTEND:" + toCalDate(EVENT.end),
      "SUMMARY:" + esc(EVENT.title),
      "DESCRIPTION:" + esc(EVENT.details),
      "LOCATION:" + esc(EVENT.location),
      "BEGIN:VALARM",
      "TRIGGER:-PT12H",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder: Winsteel Bhoomipujan tomorrow",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Winsteel-Bhoomipujan.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast("Calendar file downloaded");
  });

  // =========================================================
  //  Copy address
  // =========================================================
  $("#copyAddr").addEventListener("click", async () => {
    const text = EVENT.location + "\n" + EVENT.mapLink;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    toast("Address copied ✓");
  });

  // =========================================================
  //  Share on WhatsApp
  // =========================================================
  const shareUrl = location.origin + location.pathname;
  const shareText =
    "🙏 *Bhoomipujan & Shilanyas Ceremony* 🙏\n" +
    "Winsteel Engineering Works Pvt Ltd\n\n" +
    "📅 Wednesday, 25th November 2026\n" +
    "🕣 8:30 AM onwards, followed by Lunch\n" +
    "📍 Block No. 266, NH 48, Vesma, Jalalpore, Navsari\n\n" +
    "View invitation: ";
  const shareWhatsApp = () =>
    window.open("https://wa.me/?text=" + encodeURIComponent(shareText + shareUrl), "_blank", "noopener");

  $("#shareBtn").addEventListener("click", shareWhatsApp);

  // Quick bar (mobile): native share sheet when available, else WhatsApp
  $("#qbShare").addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Winsteel – Bhoomipujan & Shilanyas", text: shareText, url: shareUrl });
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return;
      }
    }
    shareWhatsApp();
  });
  $("#qbCal").href = gcalUrl;
  $("#qbCal").target = "_blank";
  $("#qbCal").rel = "noopener";

  // =========================================================
  //  Music: plays assets/music.mp3 if present,
  //  otherwise a soft synthesized temple-bell + drone.
  // =========================================================
  const musicBtn = $("#musicBtn");
  let audioEl = null, synth = null, playing = false, useSynth = false;

  function initAudioFile() {
    return new Promise((resolve) => {
      const a = new Audio();
      a.loop = true;
      a.volume = 0.5;
      a.preload = "auto";
      a.addEventListener("canplay", () => resolve(a), { once: true });
      a.addEventListener("error", () => resolve(null), { once: true });
      a.src = "assets/music.mp3";
      setTimeout(() => resolve(null), 2500);
    });
  }

  function createSynth() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    const ac = new AC();
    const master = ac.createGain();
    master.gain.value = 0;
    master.connect(ac.destination);

    // gentle reverb-ish delay
    const delay = ac.createDelay();
    delay.delayTime.value = 0.35;
    const fb = ac.createGain();
    fb.gain.value = 0.35;
    delay.connect(fb).connect(delay);
    delay.connect(master);

    // Tanpura-like drone: Sa (C#3) + Pa + upper Sa
    const base = 138.59;
    [base, base * 1.5, base * 2].forEach((f, i) => {
      const o = ac.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      const g = ac.createGain();
      g.gain.value = [0.08, 0.05, 0.04][i];
      const lfo = ac.createOscillator();
      lfo.frequency.value = 0.1 + i * 0.07;
      const lg = ac.createGain();
      lg.gain.value = 0.025;
      lfo.connect(lg).connect(g.gain);
      o.connect(g).connect(master);
      o.start();
      lfo.start();
    });

    // Temple bell chimes in a raag-like scale
    const scale = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4];
    function bell() {
      if (!playing) return;
      const t = ac.currentTime;
      const f = base * 4 * scale[(Math.random() * scale.length) | 0];
      [1, 2.76, 5.4].forEach((m, i) => {
        const o = ac.createOscillator();
        o.type = "sine";
        o.frequency.value = f * m;
        const g = ac.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime([0.09, 0.03, 0.015][i], t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 3.5 - i);
        o.connect(g);
        g.connect(master);
        g.connect(delay);
        o.start(t);
        o.stop(t + 4);
      });
      synth.timer = setTimeout(bell, 1400 + Math.random() * 2200);
    }

    return {
      ac,
      master,
      timer: null,
      play() {
        ac.resume();
        master.gain.cancelScheduledValues(ac.currentTime);
        master.gain.linearRampToValueAtTime(0.6, ac.currentTime + 2);
        clearTimeout(this.timer);
        bell();
      },
      pause() {
        master.gain.cancelScheduledValues(ac.currentTime);
        master.gain.linearRampToValueAtTime(0, ac.currentTime + 0.6);
        clearTimeout(this.timer);
      },
    };
  }

  const audioReady = initAudioFile().then((a) => {
    audioEl = a;
    useSynth = !a;
  });

  async function startMusic() {
    playing = true;
    musicBtn.classList.add("playing");
    // Create the synth context synchronously inside the click gesture
    if (!synth) synth = createSynth();
    await audioReady;
    if (!playing) return;
    if (!useSynth && audioEl) {
      try {
        await audioEl.play();
        return;
      } catch (e) {
        useSynth = true;
      }
    }
    if (synth) synth.play();
  }

  function stopMusic() {
    playing = false;
    musicBtn.classList.remove("playing");
    if (audioEl) audioEl.pause();
    if (synth) synth.pause();
  }

  musicBtn.addEventListener("click", () => (playing ? stopMusic() : startMusic()));
})();
