Animation tokens for Masonry FLIP behavior

These CSS custom properties control the FLIP animations used by the `MasonryGallery` component.

Tokens

- `--flip-move-duration` (time)

  - How long move animations take (e.g. `420ms`).
  - Recommended: `300ms`–`520ms`. Lower values make reflows snappier; higher values feel more leisurely.

- `--flip-move-ease` (timing function)

  - Cubic-bezier used for move animations. Default: `cubic-bezier(.2,.9,.2,1)`.
  - Recommended: keep ease-out-ish curves for natural movement.

- `--flip-move-stagger` (time)

  - Per-item stagger between move animations (e.g. `25ms`).
  - Recommended: `12ms`–`40ms`. Larger values create a wave effect.

- `--flip-enter-duration` (time)

  - How long enter (fade/scale) animations take (e.g. `360ms`).
  - Recommended: `240ms`–`360ms`.

- `--flip-enter-stagger` (time)
  - Per-item stagger for enter animations (e.g. `40ms`).
  - Recommended: `20ms`–`60ms`.

Tuning tips

- Shorter durations + smaller stagger = snappier UI.
- Longer durations + larger stagger = more cinematic/wave-like transitions.
- For mobile, consider reducing durations by ~25% to keep interactions feeling responsive.

How to change

Edit `src/styles/animation-tokens.css` or override these variables in a higher-level stylesheet or theme provider.

Example: faster moves

:root {
--flip-move-duration: 300ms;
--flip-move-stagger: 16ms;
}

Masonry image height token

- `--masonry-image-height` (length)

  - Controls the height of the image area inside each masonry card.
  - The project defines responsive overrides for several breakpoints. You can tune these values to change how much vertical space images occupy.

Recommended values (guideline)

- Small (mobile phones): 100px
- Medium (tablet / small desktop): 150px
- Large (desktop / large screens): 200px

Breakpoint mapping in this project

- small mobile: <480px → 100px
- mobile: 480–767px → 120px
- tablet: 768–991px → 150px
- desktop: 992–1199px → 170px
- large desktop: >=1200px → 200px

Tuning tips

- Reduce image height on small screens to avoid tall cards pushing content too far down.
- Increase image height on large screens for a more visual, magazine-like layout.

To change

Edit `src/styles/animation-tokens.css` and modify `--masonry-image-height` or its media-query overrides.

Visual examples

Below are quick visual examples showing how different `--masonry-image-height` values affect card appearance. These are thumbnails using sample images from the template assets — the actual token controls the CSS height only.

<div style="display:flex;gap:16px;align-items:flex-start">
  <figure style="text-align:center;margin:0">
    <img src="../public/img/bg-img/b1.jpg" alt="small example" width="140" />
    <figcaption style="font-size:12px;margin-top:6px">Small — ~100px image area</figcaption>
  </figure>
  <figure style="text-align:center;margin:0">
    <img src="../public/img/bg-img/b2.jpg" alt="medium example" width="160" />
    <figcaption style="font-size:12px;margin-top:6px">Medium — ~150px image area</figcaption>
  </figure>
  <figure style="text-align:center;margin:0">
    <img src="../public/img/bg-img/b3.jpg" alt="large example" width="200" />
    <figcaption style="font-size:12px;margin-top:6px">Large — ~200px image area</figcaption>
  </figure>
</div>

## Additional tokens (layout & fade)

These tokens control column-level layout transitions and simple fade/enter easings. They default to the primary FLIP tokens but can be tuned independently.

- `--masonry-column-transition-duration` (time)

  - Controls how long column-level layout transitions run when the grid relayouts (defaults to `--flip-move-duration`).
  - Recommended: `300ms`–`520ms` — keep similar to `--flip-move-duration` for consistent motion.

- `--masonry-column-transition-ease` (timing function)

  - Easing used for column transitions. Defaults to the `--flip-move-ease` cubic-bezier.

- `--masonry-column-transition-delay` (time)

  - Optional delay before the column transition begins. Defaults to `0ms`.

- `--masonry-fade-duration` / `--masonry-fade-ease` (time / timing function)

  - Used for simple opacity fades on items (these default to move tokens but can be tuned separately).
  - Recommended: `--masonry-fade-duration` = `var(--flip-move-duration)` and `--masonry-fade-ease` = `var(--flip-move-ease)`.

- `--flip-enter-ease` (timing function)

  - Easing for the opacity portion of the enter animation (separate from transform easing). Defaults to `ease` but can be set to a different curve for refined control.

### Example: make column transitions a little snappier but keep enters smooth

```css
:root {
  --masonry-column-transition-duration: 320ms;
  --masonry-fade-duration: 300ms;
  --flip-enter-ease: ease-out;
}
```
