<script context="module">
	import { parse } from 'twemoji-parser';
	import { load } from 'opentype.js';
// 	@import '@fontsource/roboto';
// @import '@fontsource/montserrat';

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

		let body = '';
		url = input.url;
		// console.log(url);
		for (const [i, value] of input.text.entries()) {
			body += await doTheThing(i % 2, value.toUpperCase(), input.colors, input.fonts);
		}
		let head = `<svg xmlns="http://www.w3.org/2000/svg" width="${length}"
                height="35">`;
		return `${head}${body}</svg>`;
	}

	async function doTheThing(parity, value, colors, fonts) {
		if (value === '') {
			return '';
		}
		console.log('====================');
		let parsedemoji = parse(value);
		let [emojiArray, textArray, isEmojiFirst] = buildEmoji(parsedemoji, value);
		let output = await buildText(textArray, emojiArray, isEmojiFirst, fonts[parity]);
		let result = `<rect x="${startDistance}" width="${distance}" height="35" fill="${colors[parity]}" />${output}`;
		length += distance;
		startDistance = distance;
		distance = 0;
		return result;
	}

	function buildEmoji(parsedEmoji, rawText) {
		let nestedEmoji = [],
			emojiArr = [];
		// checks if emojis are first or second in input
		// the first check is there so there is no error shrug
		let isEmojiFirst = parsedEmoji == false || parsedEmoji[0].indices[0] !== 0 ? false : true;

		if (!parsedEmoji) {
			return [emojiArr, [rawText], isEmojiFirst];
		}
		let lastIndice = 0,
			emojiSegment = 0;
		for (const emoji of parsedEmoji) {
			if (lastIndice !== emoji.indices[0]) {
				emojiArr[emojiSegment] = nestedEmoji;
				++emojiSegment;
				nestedEmoji = [];
			}
			// nestedEmoji.push(emoji.url.substring(emoji.url.lastIndexOf('/') + 1, emoji.url.length));
			nestedEmoji.push(emoji.url);
			lastIndice = emoji.indices[1];
			rawText =
				rawText.substring(0, emoji.indices[0]) +
				'ඞ'.repeat(emoji.text.length) +
				rawText.substring(emoji.indices[1]);
		}
		emojiArr[emojiSegment] = nestedEmoji;
		return [emojiArr, rawText.split('ඞඞ').filter((item) => item), isEmojiFirst];
	}

	async function buildText(textArray, emojiArr, isEmojiFirst, fontSource) {
		const font = await load(fontSource);
		let fullsvg = '';

		textArray = textArray.map((d) => {
			return d.replace('ඞ', '');
		});
		textArray.filter((n) => n);
		distance += isEmojiFirst ? 7 : 15;


		// TODO: rethink this
		for (const [index, textElem] of textArray.entries()) {
			console.log(index);console.log(emojiArr[index]);
			if (emojiArr[index] == undefined || !emojiArr[index].length) {
				console.log('i am last piece of text');
				fullsvg += drawText(textElem);
			}
			else if (!isEmojiFirst) {
				console.log('is emoji last');
				fullsvg += drawText(textElem) + await drawEmoji(index);
			}
			else {
				console.log('is emoji first');
				fullsvg += await drawEmoji(index) + drawText(textElem);
			}
		}
		fullsvg +=
			emojiArr.length > textArray.length && emojiArr[emojiArr.length - 1] != undefined
				? await drawEmoji(emojiArr.length - 1)
				: '';
		distance += 15;

		return fullsvg;

		function drawText(textElem) {
			textElem = textElem.toUpperCase().split('').join(' ');
			let textSvg = font.getPath(textElem, startDistance + distance, 22, 12).toSVG();
			distance += font.getAdvanceWidth(textElem, 12) + 5;
			return textSvg.toString().slice(0, 5) + ' fill="white"' + textSvg.toString().slice(5);
		}

		async function drawEmoji(index) {
			let emojiSvg = '';
			for (const emoji of emojiArr[index]) {
				// let f = await (await fetch(`http://localhost:3000/assets/twemoji/${emoji}`)).text();
				let f = await (await fetch(emoji)).text();
				emojiSvg += `<g transform="translate(${
					startDistance + distance
				},5) scale(0.7,0.7)"> ${f.slice(60, f.length - 6)}</g>`;
				distance += 30;
			}
			return emojiSvg;
		}
	}
</script>
