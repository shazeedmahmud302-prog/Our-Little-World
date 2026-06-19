const siteData = window.LOVE_VAULT_DATA || {};
const state = {
  passcode: siteData.passcode || "03202026",
  passcodes: siteData.passcodes || [],
  title: siteData.title || "Our Little World",
  heroTitle: siteData.heroTitle || "Let's reminisce and cherish the beautiful memories we've made together here",
  song: siteData.song || null,
  songs: normalizeSongs(siteData.songs, siteData.song),
  letters: normalizeLetters(siteData.letters),
  photos: normalizePhotos(siteData.photos)
};

const lockScreen = document.querySelector("#lockScreen");
const vault = document.querySelector("#vault");
const lockMode = document.querySelector("#lockMode");
const lockCopy = document.querySelector("#lockCopy");
const lockForm = document.querySelector("#lockForm");
const passcodeInput = document.querySelector("#passcodeInput");
const unlockButton = document.querySelector("#unlockButton");
const unlockLabel = document.querySelector(".unlock-label");
const lockHint = document.querySelector("#lockHint");
const lockAgainButton = document.querySelector("#lockAgainButton");
const homeView = document.querySelector("#homeView");
const letterRoom = document.querySelector("#letterRoom");
const backToFolders = document.querySelector("#backToFolders");
const roomKicker = document.querySelector("#roomKicker");
const roomTitle = document.querySelector("#roomTitle");
const roomCopy = document.querySelector("#roomCopy");
const letterRoomGrid = document.querySelector("#letterRoomGrid");
const letterList = document.querySelector("#letterList");
const letterTemplate = document.querySelector("#letterTemplate");
const photoTemplate = document.querySelector("#photoTemplate");
const photoGrid = document.querySelector("#photoGrid");
const audioPlayer = document.querySelector("#audioPlayer");
const songName = document.querySelector("#songName");
const playerCard = document.querySelector("#playerCard");
const playlist = document.querySelector("#playlist");
let currentSongIndex = 0;

document.title = state.title;
document.querySelector(".vault-header h1").textContent = state.title;
document.querySelector(".hero-copy h2").textContent = state.heroTitle;
document.querySelector(".hero-copy p:last-child").textContent = state.heroText;

setLockMode();
renderAll();

lockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const passcode = passcodeInput.value.trim();
  if (!passcode) return;

  if (isCorrectPasscode(passcode)) {
    unlock();
  } else {
    lockHint.textContent = "Wrong passcode. Try the memory again.";
    passcodeInput.select();
  }
});

lockAgainButton.addEventListener("click", () => {
  vault.classList.add("hidden");
  lockScreen.classList.remove("hidden");
  passcodeInput.value = "";
  showHome();
  setLockMode();
});

backToFolders.addEventListener("click", showHome);

function setLockMode() {
  lockMode.textContent = "Private memory vault";
  unlockLabel.textContent = "Open Vault";
  lockCopy.textContent = "Enter the passcode to open the memories.";
  lockHint.textContent = "Only the two of you should know this.";
}

function isCorrectPasscode(passcode) {
  const allowed = [state.passcode, ...state.passcodes].filter(Boolean);
  return allowed.some((item) => normalizePasscode(item) === normalizePasscode(passcode));
}

function normalizePasscode(value) {
  return String(value).trim().toLowerCase().replace(/,/g, "").replace(/\s+/g, " ");
}

function unlock() {
  lockScreen.classList.add("hidden");
  vault.classList.remove("hidden");
  passcodeInput.value = "";
  lockHint.textContent = "";
  showHome();
  renderAll();
}

function showHome() {
  homeView.classList.remove("hidden");
  letterRoom.classList.add("hidden");
}

function openLetterRoom(type) {
  const name = type === "mine" ? "Shazee" : "Ally";
  const letters = state.letters.filter((letter) => letter.type === type);

  homeView.classList.add("hidden");
  letterRoom.classList.remove("hidden");
  roomKicker.textContent = `${name}'s folder`;
  roomTitle.textContent = `Letters from ${name}`;
  roomCopy.textContent = "Tap any letter icon to open the PDF.";
  letterRoomGrid.innerHTML = "";

  if (!letters.length) {
    letterRoomGrid.append(emptyState(`No letters from ${name} have been added yet.`));
    return;
  }

  groupLettersByMonth(letters).forEach((group) => {
    const section = document.createElement("section");
    section.className = "month-section";
    section.innerHTML = `
      <div class="month-heading">
        <span></span>
        <h3></h3>
      </div>
      <div class="pdf-icon-grid"></div>
    `;
    section.querySelector(".month-heading span").textContent = `${group.letters.length} letter${group.letters.length === 1 ? "" : "s"}`;
    section.querySelector(".month-heading h3").textContent = group.month;
    const grid = section.querySelector(".pdf-icon-grid");
    group.letters.forEach((letter) => grid.append(createPdfIcon(letter)));
    letterRoomGrid.append(section);
  });
}

function renderAll() {
  renderFolders();
  renderPhotos();
  renderSong();
}

function renderFolders() {
  letterList.innerHTML = "";
  const people = [
    { type: "mine", name: "Shazee", label: "Letters from Shazee" },
    { type: "hers", name: "Ally", label: "Letters from Ally" }
  ];

  people.forEach((person) => {
    const letters = state.letters.filter((letter) => letter.type === person.type);
    const node = letterTemplate.content.firstElementChild.cloneNode(true);
    node.classList.toggle("hers", person.type === "hers");
    node.querySelector(".letter-badge").textContent = person.name;
    node.querySelector(".letter-title").textContent = person.label;
    node.querySelector(".letter-count").textContent = `${letters.length} letter${letters.length === 1 ? "" : "s"}`;
    node.addEventListener("click", () => openLetterRoom(person.type));
    letterList.append(node);
  });
}

function createPdfIcon(letter) {
  const item = document.createElement(letter.pdfUrl ? "a" : "div");
  item.className = `pdf-icon-card ${letter.type === "hers" ? "hers" : ""} ${letter.pdfUrl ? "" : "disabled"}`;
  if (letter.pdfUrl) {
    item.href = letter.pdfUrl;
    item.target = "_blank";
    item.rel = "noopener";
  }

  item.innerHTML = `
    <span class="pdf-icon" aria-hidden="true"></span>
    <strong></strong>
    <small></small>
  `;
  item.querySelector("strong").textContent = letter.title;
  item.querySelector("small").textContent = letter.date || letter.month || (letter.pdfUrl ? "Open PDF" : "PDF coming soon");
  return item;
}

function groupLettersByMonth(letters) {
  const groups = new Map();
  letters.forEach((letter) => {
    const month = letter.month || monthFromDate(letter.date) || "Letters";
    if (!groups.has(month)) groups.set(month, []);
    groups.get(month).push(letter);
  });

  return [...groups.entries()].map(([month, groupedLetters]) => ({
    month,
    letters: groupedLetters
  }));
}

function monthFromDate(date) {
  const match = String(date || "").match(/[A-Za-z]+\\s+\\d{4}/);
  return match ? match[0] : "";
}

function renderPhotos() {
  photoGrid.innerHTML = "";
  if (!state.photos.length) {
    photoGrid.append(emptyState("No photos have been added yet."));
    return;
  }

  state.photos.forEach((photo) => {
    const node = photoTemplate.content.firstElementChild.cloneNode(true);
    const image = node.querySelector("img");
    const caption = node.querySelector("figcaption");

    image.src = photo.src;
    image.alt = photo.caption || "Memory photo";
    caption.textContent = photo.caption || "";
    caption.classList.toggle("hidden", !photo.caption);
    photoGrid.append(node);
  });
}

function renderSong() {
  if (!state.songs.length) {
    songName.textContent = "No song added yet";
    audioPlayer.removeAttribute("src");
    audioPlayer.load();
    playerCard.classList.add("no-song");
    playlist.innerHTML = "";
    return;
  }

  playerCard.classList.remove("no-song");
  const currentSong = state.songs[currentSongIndex] || state.songs[0];
  songName.textContent = currentSong.artist ? `${currentSong.name} - ${currentSong.artist}` : currentSong.name;
  audioPlayer.src = currentSong.src;
  renderPlaylist();
}

function renderPlaylist() {
  playlist.innerHTML = "";
  state.songs.forEach((song, index) => {
    const button = document.createElement("button");
    button.className = `playlist-item ${index === currentSongIndex ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span>${index + 1}</span>
      <strong></strong>
      <small></small>
    `;
    button.querySelector("strong").textContent = song.name;
    button.querySelector("small").textContent = song.artist || "Our song";
    button.addEventListener("click", () => {
      currentSongIndex = index;
      renderSong();
      audioPlayer.play().catch(() => {});
    });
    playlist.append(button);
  });
}

function emptyState(message) {
  const node = document.createElement("div");
  node.className = "empty-state";
  node.textContent = message;
  return node;
}

function normalizeLetters(letters = []) {
  return letters.map((letter) => ({
    id: letter.id || "",
    type: letter.type || "mine",
    mode: letter.mode || "pdf",
    title: letter.title || "Untitled letter",
    date: letter.date || "",
    month: letter.month || monthFromDate(letter.date),
    body: letter.body || "",
    pdfUrl: letter.pdfUrl || ""
  }));
}

function normalizePhotos(photos = []) {
  return photos.map((photo) => ({
    id: photo.id || "",
    src: photo.src || "",
    caption: photo.caption || ""
  })).filter((photo) => photo.src);
}

function normalizeSongs(songs = [], fallbackSong = null) {
  const list = songs.length ? songs : (fallbackSong ? [fallbackSong] : []);
  return list.map((song) => ({
    name: song.name || "Our song",
    artist: song.artist || "",
    src: song.src || ""
  })).filter((song) => song.src);
}
