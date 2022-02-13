<script context="module">
  import { parse } from "twemoji-parser";
  import { load } from "opentype.js";

  let distance = 0;
  let startDistance = 0;
  let length = 0;
  let url;
  export async function badge(
    input = {
      // url: url,
      // text: text,
      // colors: colors,
      // fonts: fonts
    }
  ) {
    distance = 0;
    startDistance = 0;
    length = 0;

    let body = "";
    url = input.url;
    for (const [i, value] of input.text.entries()) {
      body += await doTheThing(
        i % 2,
        value.toUpperCase(),
        input.colors,
        input.fonts
      );
    }
    let head = `<svg xmlns="http://www.w3.org/2000/svg" width="${length}"
                height="35">`;
    return `${head}${body}</svg>`;
  }

  async function doTheThing(parity, value, colors, fonts) {
    if (value === "") {
      return "";
    }
    let parsedemoji = parse(value);
    let offset = 0;
    let teststr, before;
    teststr = value;
    for (const testemoji of parsedemoji) {
      before = teststr.substring(0, testemoji.indices[0] + offset);
      teststr = `${before}ඞ${testemoji.url}ඞ${teststr.substring(
        testemoji.indices[1] + offset
      )}`;
      offset += testemoji.url.length;
    }
    if (teststr.startsWith("ඞ")) teststr = teststr.substring(1);
    if (teststr.endsWith("ඞ")) teststr = teststr.substring(0, teststr.length - 1);
    let testArray = teststr.split("ඞ");
    testArray = testArray.filter(n => n);
    let outSvg = '';
    distance += 10;
    for (const element of testArray) {
      if (element.startsWith('https://')) {
        outSvg += await drawEmoji(element);
      }
      else {
        outSvg += await drawText(element, fonts[parity]);
      }
    }
    distance += 10;
    let result = `<rect x="${startDistance}" width="${distance}" height="35" fill="${colors[parity]}" />${outSvg}`;
    length += distance;
    startDistance = distance;
    distance = 0;
    return result;
  }

  async function drawEmoji(emoji) {
    let svg;
    let f = await (await fetch(emoji)).text();
    svg = `<g transform="translate(${
      startDistance + distance
    },5) scale(0.7,0.7)"> ${f.slice(60, f.length - 6)}</g>`;
    distance += 30;
    return svg;
  }

  async function drawText(textElem, fontSource) {
    const font = await load(fontSource)
      textElem = textElem.toUpperCase().split("").join(" ");
      let textSvg = font
        .getPath(textElem, startDistance + distance, 22, 12)
        .toSVG();
      distance += font.getAdvanceWidth(textElem, 12) + 5;
      return (
        textSvg.toString().slice(0, 5) +
        ' fill="white"' +
        textSvg.toString().slice(5)
      );
    }

</script>
