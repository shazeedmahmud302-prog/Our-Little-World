# Love Vault

This folder is ready for GitHub Pages.

## Monthly Letter Workflow

Every month:

1. Put new PDFs in a month folder, for example:
   `assets/letters/2026-05/shazee-may-1.pdf`
2. Open `data.js`.
3. Add a new object inside `letters`.
4. Commit and push to GitHub Pages.

Example:

```js
{
  id: "shazee-2026-05-01",
  type: "mine",
  mode: "pdf",
  title: "May letter from Shazee",
  date: "May 2026",
  month: "May 2026",
  body: "",
  pdfUrl: "assets/letters/2026-05/shazee-may-1.pdf"
}
```

For Ally:

```js
{
  id: "ally-2026-05-01",
  type: "hers",
  mode: "pdf",
  title: "May letter from Ally",
  date: "May 2026",
  month: "May 2026",
  body: "",
  pdfUrl: "assets/letters/2026-05/ally-may-1.pdf"
}
```

## Meaning Of `type`

- `type: "mine"` means Shazee.
- `type: "hers"` means Ally.

## Other Content

- `passcode`: the passcode she types to open the page.
- `song`: put an audio file in `assets/music`, then set `src`.
- `photos`: put images in `assets/photos`, then add them to the list.

## GitHub Pages

Upload this whole `love-vault` folder to a GitHub repo. In repo settings, enable GitHub Pages for the branch containing `index.html`.

Important: a public static website cannot truly hide secrets. The passcode is a sweet privacy gate, but anyone technical could inspect the source if the repo/site is public.
