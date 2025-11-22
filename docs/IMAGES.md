# Image generation

This project includes a small image generation helper that creates responsive
variants (JPEG, WebP, AVIF) for the hero images. Generated files live under
`public/img/bg-img/` and follow the pattern `bg-1-800.jpg`, `bg-1-1200.webp`,
etc.

## Usage

From the project root you can run the default conversion:

```bash
npm run images:convert
```

Or use the regen alias which accepts CLI flags (pass flags after `--`):

```bash
# generate 480,800,1200 widths with custom qualities
npm run images:regen -- --widths=480,800,1200 --jpeg-quality=82 --webp-quality=80 --avif-quality=50

# skip writing the legacy 'base.jpg' (useful if your sources live in the same folder)
npm run images:regen -- --skip-original
```

## Flags

- `--widths`: comma-separated integers (e.g. `480,800,1200`). Defaults to `800,1200,1600`.
- `--jpeg-quality`: JPEG quality (0-100). Default: 82.
- `--webp-quality`: WebP quality (0-100). Default: 80.
- `--avif-quality`: AVIF quality (0-100). Default: 50.
- `--skip-original`: if present, don't write the legacy `bg-1.jpg` or `bg-2.jpg` files.

## Notes

- The script is intentionally simple and synchronous per-image. For large batches you
  may want to parallelize conversions or integrate them in your asset build pipeline.
- If you modify the widths or add files, re-run the script to regenerate variants.
- Commit only the images you want to keep in source control; large generated assets
  may be better cached as build artifacts in CI rather than committed.
