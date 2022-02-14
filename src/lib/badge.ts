  import { parse } from "twemoji-parser";
  import { load } from "opentype.js";

  let distance = 0;
  let startDistance = 0;
  let length = 0;
  export async function badge(input: BadgeInput): Promise<string> {
    distance = 0;
    startDistance = 0;
    length = 0;

    let body = "";
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
    const parsedemoji = parse(value);
    let outSvg: string;
    distance += 10;
    if (!parsedemoji.length) {
      outSvg += await drawText(value, font);
    } else {
      let before: string;
      let offset = 0;
      for (const testemoji of parsedemoji) {
        before = value.substring(0, testemoji.indices[0] + offset);
        value = `${before}ඞ${testemoji.url}ඞ${value.substring(
          testemoji.indices[1] + offset
        )}`;
        offset += testemoji.url.length;
      }
      if (value.startsWith("ඞ")) value = value.substring(1);
      if (value.endsWith("ඞ")) value = value.substring(0, value.length - 1);
      let testArray = value.split("ඞ");
      testArray = testArray.filter((n) => n);
      for (const element of testArray) {
        if (element.startsWith("https://")) {
          outSvg += await drawEmoji(element);
        } else {
          outSvg += await drawText(element, font);
        }
      }
    }
    distance += 10;
    const result = `<rect x="${startDistance}" width="${distance}" height="35" fill="${color}" />${outSvg}`;
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

  async function drawText(textElem: string, fontSource: string) {
    const font = await load(fontSource);
    textElem = textElem.toUpperCase().split("").join(" ");
    const textSvg = font
      .getPath(textElem, startDistance + distance, 22, 12)
      .toSVG();
    distance += font.getAdvanceWidth(textElem, 12) + 5;
    return (
      textSvg.toString().slice(0, 5) +
      ' fill="white"' +
      textSvg.toString().slice(5)
    );
  }
