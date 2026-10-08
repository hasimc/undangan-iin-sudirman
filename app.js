const cover = document.getElementById("cover");
const main = document.getElementById("main");
const music = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");

const params = new URLSearchParams(location.search);
const guest = params.get("to");
if (guest) {
  const name = decodeURIComponent(guest).replace(/\+/g, " ");
  document.getElementById("guestCover").textContent = name;
  document.getElementById("guestInline").textContent = name;
}

document.getElementById("openInvitation").addEventListener("click", async () => {
  cover.classList.add("hide");
  document.body.classList.remove("locked");
  main.classList.add("visible");
  try {
    await music.play();
    musicToggle.textContent = "❚❚";
  } catch (_) {}
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "❚❚";
    } catch (_) {}
  } else {
    music.pause();
    musicToggle.textContent = "♫";
  }
});

document.getElementById("shareButton").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Undangan Pernikahan Iin & Calon",
        text: "Undangan Pernikahan Iin Resti Fausiah & Calon",
        url: location.href
      });
    } catch (_) {}
  } else {
    try {
      await navigator.clipboard.writeText(location.href);
      alert("Tautan undangan berhasil disalin.");
    } catch (_) {
      alert(location.href);
    }
  }
});

document.getElementById("rsvpForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formStatus").textContent =
    "Konfirmasi tersimpan di perangkat ini. Pengiriman ke WhatsApp dapat ditambahkan pada tahap berikutnya.";
});

document.getElementById("calendarButton").addEventListener("click", () => {
  const start = "20270524T010000Z";
  const end = "20270524T040000Z";
  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent("Pernikahan Iin Resti Fausiah & Calon") +
    "&dates=" + start + "/" + end +
    "&details=" + encodeURIComponent("Undangan Pernikahan Iin Resti Fausiah & Calon") +
    "&location=" + encodeURIComponent("Desa Singki, Kecamatan Anggeraja, Kabupaten Enrekang");
  window.open(url, "_blank", "noopener");
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  document.getElementById("scrollLine").style.width =
    `${max ? scrollY / max * 100 : 0}%`;
}, {passive:true});

// 24 Mei 2027, 09.00 WITA
const weddingDate = new Date("2027-05-24T09:00:00+08:00").getTime();

function countdown() {
  const d = weddingDate - Date.now();
  if (d <= 0) {
    ["days","hours","minutes","seconds"].forEach(id =>
      document.getElementById(id).textContent = "00"
    );
    return;
  }
  document.getElementById("days").textContent = String(Math.floor(d/86400000)).padStart(2,"0");
  document.getElementById("hours").textContent = String(Math.floor(d%86400000/3600000)).padStart(2,"0");
  document.getElementById("minutes").textContent = String(Math.floor(d%3600000/60000)).padStart(2,"0");
  document.getElementById("seconds").textContent = String(Math.floor(d%60000/1000)).padStart(2,"0");
}
countdown();
setInterval(countdown, 1000);
