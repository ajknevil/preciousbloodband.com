export function makeSrcSets(base: string) {
  return {
    avif: `${base}-800.avif 800w, ${base}-1200.avif 1200w, ${base}-1600.avif 1600w`,
    webp: `${base}-800.webp 800w, ${base}-1200.webp 1200w, ${base}-1600.webp 1600w`,
    jpgSrc: `${base}-1600.jpg`,
    jpgSrcSet: `${base}-800.jpg 800w, ${base}-1200.jpg 1200w, ${base}-1600.jpg 1600w`,
    smallSvg: `${base}-small.svg`,
  };
}

export function makeSrcSetsFor(
  base: string,
  widths: number[] = [800, 1200, 1600]
) {
  const avif = widths.map((w) => `${base}-${w}.avif ${w}w`).join(", ");
  const webp = widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ");
  const jpgSrc = `${base}-${widths[widths.length - 1]}.jpg`;
  const jpgSrcSet = widths.map((w) => `${base}-${w}.jpg ${w}w`).join(", ");
  const smallSvg = `${base}-small.svg`;
  return { avif, webp, jpgSrc, jpgSrcSet, smallSvg };
}
