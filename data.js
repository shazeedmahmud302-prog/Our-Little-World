window.LOVE_VAULT_DATA = {
  // Change this before sending her the link. Do not use a real account password.
  // Heads up: on a public GitHub Pages site, this is a romantic lock, not real security.
  passcode: "03202026",
  passcodes: ["03202026", "03/20/2026", "march 20 2026", "march 20, 2026"],

  title: "Our Little Vault",
  heroTitle: "All the pieces that still feel like us.",
  heroText: "Songs, letters, photos, and the little proofs that belong to us.",

  // Put your song in assets/music and set src, for example:
  // song: { name: "Our song", src: "assets/music/our-song.mp3" },
  song: null,

  letters: [
    {
      id: "shazee-letter-1",
      type: "mine",
      mode: "pdf",
      title: "A letter from Shazee",
      date: "March 20, 2026",
      month: "March 2026",
      body: "",
      pdfUrl: "assets/letters/2026-03/shazee-letter-1.pdf"
    },
    {
      id: "shazee-letter-2",
      type: "mine",
      mode: "pdf",
      title: "Another letter from Shazee",
      date: "April 2026",
      month: "April 2026",
      body: "",
      pdfUrl: "assets/letters/2026-04/shazee-letter-2.pdf"
    },
    {
      id: "ally-Ally's diary",
      type: "hers",
      mode: "pdf",
      title: "ally_diary",
      date: "March 29, 2026",
      month: "March 29, 2026",
      body: "",
      // Upload a PDF into assets/letters and change this path.
      pdfUrl: "assets/letters/.pdf"
    },
    {
      id: "ally-1st letter from Ally",
      type: "hers",
      mode: "pdf",
      title: "1st letter from Ally",
      date: "May 20, 2026",
      month: "May 20, 2026",
      body: "",
      pdfUrl: "assets/letters/1st_letter_from_ally.pdf"
    }
  ],

  photos: [
    // Example after you add files:
    // { id: "us-1", src: "assets/photos/us-1.jpg", caption: "That day" }
  ]
};
