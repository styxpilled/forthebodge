  import { parse } from "twemoji-parser";
  import { load } from "opentype.js";

  let distance = 0;
  let startDistance = 0;
  let length = 0;
  export async function badge(input: BadgeInput): Promise<string> {
    distance = 0;
    startDistance = 0;
    length = 0;

    let body: string;
    for (const [i, value] of input.text.entries()) {
      body += await generate(
        value.toUpperCase(),
        input.colors[i % 2],
        input.fonts[i % 2]
      );
    }
    const head = `<svg xmlns="http://www.w3.org/2000/svg" width="${length}"
                height="35">`;
    return `${head}${body}</svg>`;
  }

  async function generate(value: string, color: string, font: string) {
    if (value === "") {
      return "";
    }
    const emoji = parse(value);
    let svg: string;
    distance += 10;
    if (!emoji.length) {
      svg += await drawText(value, font);
    } else {
      let before: string;
      let offset = 0;
      for (const e of emoji) {
        before = value.substring(0, e.indices[0] + offset);
        value = `${before}ඞ${e.url}ඞ${value.substring(e.indices[1] + offset)}`;
        offset += e.url.length;
      }
      if (value.startsWith("ඞ")) value = value.substring(1);
      if (value.endsWith("ඞ")) value = value.substring(0, value.length - 1);
      const elements = value.split("ඞ").filter((n) => n);
      for (const element of elements) {
        if (element.startsWith("https://")) {
          svg += await drawEmoji(element);
        } else {
          svg += await drawText(element, font);
        }
      }
    }
    distance += 10;
    const result = `<rect x="${startDistance}" width="${distance}" height="35" fill="${color}" />${svg}`;
    length += distance;
    startDistance = distance;
    distance = 0;
    return result;
  }

  async function drawEmoji(emoji: string) {
    const f = await (await fetch(emoji)).text();
    const svg = `<g transform="translate(${
      startDistance + distance
    },5) scale(0.7,0.7)"> ${f.slice(60, f.length - 6)}</g>`;
    distance += 30;
    return svg;
  }

  async function drawText(element: string, fontSource: string) {
    const font = await load(fontSource);
    element = element.split("").join(" ");
    const textSvg = font
      .getPath(element, startDistance + distance, 22, 12)
      .toSVG();
    distance += font.getAdvanceWidth(element, 12) + 5;
    return (
      textSvg.toString().slice(0, 5) +
      ' fill="white"' +
      textSvg.toString().slice(5)
    );
  }
