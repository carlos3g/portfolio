/** Fetches a font file for `ImageResponse`, which needs the raw bytes. */
export async function loadGoogleFont(
  family: string,
  weight: number
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+"
  )}:wght@${weight}&display=swap`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src:\s*url\((.+?)\)\s*format/);
  if (!match) throw new Error(`Could not resolve font ${family}@${weight}`);
  const fontUrl = match[1].replace(/['"]/g, "");
  const response = await fetch(fontUrl);
  if (!response.ok) throw new Error(`Failed to load font ${family}@${weight}`);
  return await response.arrayBuffer();
}
