# 🎂 Birthday surprise website

A one-page, scrapbook-style birthday page. Poems fade in one after another as she scrolls, photos drop in like polaroids, doodles float around, and it ends with a cake she can blow the candles out on (with confetti!).

```
birthday-website/
├── index.html   ← poems, photos, captions
├── style.css    ← colours and look
├── script.js    ← her name / your name + all the animations
├── images/      ← put her photos here
├── videos/      ← put memory1.mp4, memory2.mp4, and special-video.mp4 here
└── audio/       ← optional: song.mp3
```

## 1. Edit it in VS Code

1. Open the folder in VS Code: **File → Open Folder…**
2. Install the **Live Server** extension, then right-click `index.html` → **Open with Live Server**. The page reloads every time you save.

### Change the names
Top of `script.js`:
```js
const CONFIG = {
  herName: "Her Name",
  yourName: "Your Name",
};
```

### Write your poems
In `index.html`, find each `<article class="poem-card …">`. Every `<p>` inside is one line or one stanza, and they appear one after another. Use `<br />` for a line break inside a stanza:
```html
<div class="poem">
  <p>First line of your poem,<br />second line here</p>
  <p>Next stanza…</p>
</div>
```
Bengali (or any language) works too. To add a poem, copy a whole `<article> … </article>` block. Card colours: no class = pink, or add `lav`, `mint`, `butter`.

### Add her photos
1. Drop your pictures into `images/` and name them `photo1.jpg`, `photo2.jpg`, … `photo7.jpg`. (Or keep your own names and change the `src="images/…"` in `index.html`.)
2. Edit the caption inside each `<figcaption>`.
3. Until a photo exists, that slot shows a cute "add your photo here" placeholder.

To add more photos, copy a whole `<figure class="polaroid …"> … </figure>` block. In the gallery, more photos wrap automatically. Change `--rot:3deg` on a photo to tilt it more or less.

### Add videos and Bangla poetry
The page includes two ordinary memory-video slots and one larger special-video slot. Add these files to `videos/`:

- `memory1.mp4` and `memory2.mp4` for the memory cards
- `special-video.mp4` for the highlighted final video

Optional poster images can be added as `images/video-poster-1.jpg`, `images/video-poster-2.jpg`, and `images/special-video-poster.jpg`. The Bangla poetry section uses Google Fonts `Noto Serif Bengali` with a local fallback and can be edited directly in `index.html`.

### Optional: background music
Put an MP3 at `audio/song.mp3`. A little 🎵 button appears, and the music starts when she taps "Open your surprise".

### Change colours
The `:root { … }` block at the top of `style.css` holds the whole palette.

## 2. Put it online with GitHub Pages

1. On github.com create a **new repository**. Tip: give it a hard-to-guess name (like `for-you-8f3k2`) so the surprise stays a surprise.
2. In VS Code open the terminal (**Terminal → New Terminal**) and run:
   ```bash
   git init
   git add .
   git commit -m "birthday website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main, folder: / (root) → Save**.
4. After a minute your link is ready:
   `https://YOUR-USERNAME.github.io/YOUR-REPO/`

Send her that link. To update later, edit in VS Code, then `git add . && git commit -m "update" && git push`.

## Tips

- **File names are case-sensitive on GitHub.** `Photo1.JPG` will not load if the page says `photo1.jpg`. Keep everything lowercase.
- Shrink big photos first (about 1200 px wide, under ~500 KB each) so the page loads fast on her phone.
- A GitHub Pages site is public to anyone with the link, and so are the photos in the repository.
- Best on a phone. It is designed mobile-first.
