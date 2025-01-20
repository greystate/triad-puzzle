(function () {
	'use strict';

	const ACCIDENTAL = {
		flat:      -1,
		natural:    0,
		sharp:      1
	};

	const DEFAULTS$1 = {
		pitch:      0,   // 0-11
		acc:        0,   // -1, 0, 1  (b, [nothing/natural], #)
		type:       0    // 0-7       (major, minor, diminished, augmented etc.)
	};

	const ROOTS = 'C D EF G A B';
	//             012345678901
	//                       11

	const ACCIDENTALS = 'b #';
	const TYPES       = ['', 'm', 'dim', '+', 'add9', 'm(add9)', 'sus2', 'sus4'];
	const ARIA_TYPES  = ['major', 'minor', 'diminished', 'augmented', 'add nine', 'minor add nine', 'sus two', 'sus four'];
	const FORMULAE    = ['1 3 5', '1 b3 5', '1 b3 b5', '1 3 #5', '2 3 5', '2 b3 5', '1 2 5', '1 4 5'];

	class Triad {
		constructor(options = { }) {
			if (typeof(options) === 'string') {
				return Triad.fromSymbol(options)
			} else {
				({ pitch: this.pitch, acc: this.acc, type: this.type } = options);
				if (this.pitch == null) { this.pitch = DEFAULTS$1.pitch; }
				if (this.acc == null) { this.acc = DEFAULTS$1.acc; }
				if (this.type == null) { this.type = DEFAULTS$1.type; }
				this.formula = FORMULAE[this.type];
			}

			this.validate();
		}

		validate() {
			switch (this.acc) {
				case ACCIDENTAL.flat:
					switch (this.pitch) {
						case 0:
						case 2:
						case 5:
						case 7:
						case 9:
							// Can't be represented as a "flat"
							this.acc = ACCIDENTAL.natural;
							break
					}
					break

				case ACCIDENTAL.natural:
					switch (this.pitch) {
						case 1:
						case 3:
						case 6:
						case 8:
							this.acc = ACCIDENTAL.sharp;
							break
						case 10:
							this.acc = ACCIDENTAL.flat;
							break
					}
					break

				case ACCIDENTAL.sharp:
					switch (this.pitch) {
						case 2:
						case 4:
						case 7:
						case 9:
						case 11:
							// Can't be represented as a "sharp"
							this.acc = ACCIDENTAL.natural;
							break
					}
					break
			}
		}

		baseName() {
			let index = this.pitch - this.acc;
			if (index > 11) { index = 0; }
			if (index < 0) { index = 11; }

			return ROOTS.charAt(index)
		}

		accidentalSign(forHTML = false) {
			switch (this.acc) {
				case -1:
					return forHTML ? Triad.entityForAccidental('b') : 'b'
				case 1:
					return forHTML ? Triad.entityForAccidental('#') : '#'
				default:
					return ''
			}
		}

		typeName(forARIA = false) {
			if (forARIA === true) {
				return ARIA_TYPES[this.type]
			} else {
				return TYPES[this.type]
			}
		}

		rootName() {
			return `${this.baseName()}${this.accidentalSign()}`
		}

		equals(otherTriad) {
			if (otherTriad !== null) {
				return this.pitch === otherTriad.pitch && this.type === otherTriad.type
			} else {
				return false
			}
		}

		toSymbol() {
			return `${this.rootName()}${this.typeName()}`
		}

		toAriaLabel() {
			const base = this.baseName();
			let acc = '';
			switch (this.acc) {
				case -1:
					acc = 'flat';
					break
				case 1:
					acc = 'sharp';
					break
				default:
					acc = '';
					break
			}

			this.accidentalSign(true);
			const type = this.typeName(true);
			let label = `${base} ${acc} ${type}`;

			return label.replace(/\s+/, ' ')
		}

		toHTML() {
			const base = this.baseName();
			const acc = this.accidentalSign();
			const accEntity = this.accidentalSign(true);
			const type = this.typeName();

			const baseHTML = `<data class="root" value="${base}">${base}</data>`;
			const accHTML =  acc != '' ? `<sup><data class="acc" value="${acc}">${accEntity}</data></sup>` : '';
			const typeHTML = type != '' ? `<data class="triad" value="${type}">${type}</data>` : '';
			const parts = [baseHTML, accHTML, typeHTML].filter(val => val != '');

			return `<span class="piece" aria-label="${this.toAriaLabel()}">${parts.join('\n\t')}</span>`
		}

		toFormulaHTML() {
			const formula = this.formula.split(' ');
			const rootHTML = `<data class="step">${formula[0]}</data>`;

			const modifier3 = formula[1].length == 1 ? '' : formula[1].charAt(0);
			const modifier5 = formula[2].length == 1 ? '' : formula[2].charAt(0);
			const step3AtIndex = modifier3 == '' ? 0 : 1;
			const step5AtIndex = modifier5 == '' ? 0 : 1;

			const entity3 = modifier3 != '' ? Triad.entityForAccidental(modifier3) : '';
			const entity5 = modifier5 != '' ? Triad.entityForAccidental(modifier5) : '';

			const mod3HTML = modifier3 != '' ? `<data class="acc" value="${modifier3}">${entity3}</data>` : '';
			const mod5HTML = modifier5 != '' ? `<data class="acc" value="${modifier5}">${entity5}</data>` : '';

			const thirdHTML = `<data class="step">${mod3HTML}${formula[1].charAt(step3AtIndex)}</data>`;
			const fifthHTML = `<data class="step">${mod5HTML}${formula[2].charAt(step5AtIndex)}</data>`;

			return `<article class="formula">\n\t${rootHTML}\n\t${thirdHTML}\n\t${fifthHTML}\n</article>`
		}

		// Static methods
		static fromSymbol(symbol) {
			let result;

			// ^
			// ([CDEFGAB])                          # root
			// ([b\#]?)                             # optional accidental
			// (\+|m|dim|add9|m\(add9\)|sus[24])?   # optional triad type
			// $
			const symbolRE = /^([CDEFGAB])([b\#]?)(\+|m|dim|add9|m\(add9\)|sus[24])?$/;
			let match, root, accidental, triadtype;

			if (symbolRE.test(symbol)) {
				[match, root, accidental, triadtype] = symbol.match(symbolRE);
				const acc = accidental !== '' ? ACCIDENTALS.indexOf(accidental) - 1 : 0;
				let pitch = ROOTS.indexOf(root) + acc;
				if (pitch > 11) { pitch = 0; }
				if (pitch < 0 ) { pitch = 11; }
				const type = triadtype !== undefined ? TYPES.indexOf(triadtype) : 0;
				result = new Triad({ pitch, acc, type });
			}

			return result
		}

		static entityForAccidental(accidental) {
			let result;

			switch (accidental) {
				case 'b':
					result = '&#x266D;';
					break
				case '#':
					result = '&#x266F;';
					break
				default:
					result = '';
			}

			return result
		}
	}

	const SPACE_KEY = 32;
	const PIECES = 8;
	const DEFAULTS = {
		sheetSelector: '.sheet',
		majorAndMinorOnly: false,
		add9s: false,
		suss: false
	};

	class TriadPuzzle {
		constructor(options = {}) {
			this.sheetSelector = options.sheetSelector ?? DEFAULTS.sheetSelector;
			this.majorAndMinorOnly = options.majorAndMinorOnly ?? DEFAULTS.majorAndMinorOnly;
			this.add9s = options.add9s ?? DEFAULTS.add9s;

			this.suss = options.suss ?? DEFAULTS.suss; // Not implemented yet

			this.setupSheet();

			document.body.addEventListener('keypress', (event) => {
				if (event.keyCode === SPACE_KEY) {
					event.preventDefault();
					this.setupSheet();
				}
			});

			document.body.addEventListener('touchend', (event) => {
				const target = event.target;
				if (target.closest('.piece'))
					this.setupSheet();
			});
		}

		setupSheet(keepExisting = false) {
			const sheet = document.querySelector(this.sheetSelector);
			const hanger = document.createDocumentFragment();

			let previousTriad = null;
			let item, triad, count = 1;

			// We need 8 pieces, but we don't want to have
			// two identical triads follow each other
			while (count <= PIECES) {
				item = document.createElement('li');
				triad = this.getRandomTriad();
				if (triad.equals(previousTriad) === false) {
					const rotation = randomInt(-2, 3);
					item.innerHTML = triad.toHTML();
					item.style.setProperty('--rotation', rotation);
					hanger.appendChild(item);
					previousTriad = triad;
					count++;
				}
			}

			// Fallback for browsers that don't support View Transitions:
			if (!document.startViewTransition) {
				if (keepExisting === false) { sheet.innerHTML = ''; }

				sheet.appendChild(hanger);
				return
			}

			// With View Transitions:
			document.startViewTransition(() => {
				if (keepExisting === false) { sheet.innerHTML = ''; }

				sheet.appendChild(hanger);
			});
		}

		getRandomTriad() {
			let pitch = randomInt(0, 11);
			let acc = randomInt(-1, 1);
			let type = randomInt(0, (this.majorAndMinorOnly ? 1 : 3));

			let [pp, aa] = clampForClarity(pitch, acc);

			if (this.add9s && type <= 1) {
				if (randomInt(0, 20) > 16) {
					type += 4;
				}
			}

			if (this.suss && type <= 1) {
				if (randomInt(0, 20) > 13) {
					type += 6;
				}
			}

			return new Triad({
				pitch: pp,
				acc: aa,
				type: type
			})
		}
	}

	function randomInt(min, max) {
		const low = min !== undefined ? min : 0;
		const high = max !== undefined ? max : 1;

		return Math.floor(Math.random() * (high - low + 1)) + low

	}

	function clampForClarity(p, a) {
		let acc = a;

		// Cb and Fb should be output as B and E
		if (a === -1 && (p === 11 || p === 4)) {
			acc = 0;
		}

		// Likewise, H# and E# should output as C and F
		if (a === 1 && (p === 0 || p === 5)) {
			acc = 0;
		}

		return [p, acc]
	}

	const THEME_KEY = 'colortheme';

	class ThemePicker extends HTMLElement {
		constructor() {
			super();

			this.currentTheme = this.getAttribute('current') || 'auto';
			this.themes = (this.getAttribute('values') || 'auto,light,dark').split(',');
		}

		connectedCallback() {
			// Make sure that CSS (or script) can distinguish a working element from one that doesn't (e.g. if JavaScript is disabled)
			this.setAttribute('active', true);

			this.addEventListener('click', this);
			this.addEventListener('keypress', this);

			// Try loading a previously stored value
			this.loadTheme();

			this.update();
		}

		update() {
			const current = this.currentTheme;

			if (current == 'auto' || current == null) {
				delete document.documentElement.dataset.theme;
			} else if (this.themes.indexOf(current) >= 0) {
				document.documentElement.dataset.theme = this.currentTheme;
			} else {
				console.error(`Couldn't set theme to '${current}' - possible values are: ${this.themes}`);
			}

			this.setAttribute('current', current);
			this.saveTheme();
		}

		handleEvent(event) {
			// Cycle themes...
			const max = this.themes.length;
			const previous = this.themes.indexOf(this.currentTheme);
			let next;
			if (previous >= 0) {
				next = previous + 1;
				if (next >= max) {
					next = 0;
				}
			}

			this.currentTheme = this.themes[next];

			this.update();
		}

		loadTheme() {
			const stored = this.store.getItem(THEME_KEY);
			this.currentTheme = stored != 'null' && stored != null ? stored : 'auto';
		}

		saveTheme() {
			if (this.currentTheme == 'auto') {
				this.store.removeItem(THEME_KEY);
			} else {
				this.store.setItem(THEME_KEY, this.currentTheme);
			}
		}

		get store() {
			return localStorage || getDummyStorage$1()
		}
	}

	function getDummyStorage$1() {
		let emptyFunction = new Function();

		return {
			getItem: emptyFunction,
			setItem: emptyFunction,
			removeItem: emptyFunction
		}
	}

	customElements.define('theme-picker', ThemePicker);

	class WakelockToggle extends HTMLElement {

		constructor(element) {
			super();

			this.sentinel = null;
			this.label = 'Keep the screen on';
		}

		connectedCallback() {
			// Bail out early, if not available
			if (!('wakeLock' in navigator)) {
				return
			}

			const switcherId = 'wakelock';
			const labelElement = document.createElement('label');
			labelElement.setAttribute('for', switcherId);
			labelElement.textContent = this.getAttribute('label') || this.label;

			const switcher = document.createElement('input');
			switcher.id = switcherId;
			switcher.type = 'checkbox';
			switcher.setAttribute('switch', '');
			switcher.addEventListener('change', this);

			const styleElement = document.createElement('style');
			styleElement.textContent = `
			wakelock-toggle {
				display: flex;
				justify-content: flex-start;
				gap: 10px;
			}
		`;
			this.appendChild(styleElement);
			this.appendChild(switcher);
			this.appendChild(labelElement);
		}

		get switcherElement() {
			return this.querySelector('input')
		}

		handleEvent(event) {
			const value = this.switcherElement.checked;
			if (value) {
				this.requestWakeLock();
			} else {
				if (this.sentinel !== null) {
					this.sentinel.release().then(() => {
						this.sentinel = null;
					});
				}
			}
		}

		async requestWakeLock() {
			try {
				this.sentinel = await navigator.wakeLock.request("screen");

				this.sentinel.addEventListener("release", () => {
					this.switcherElement.checked = false;
				});

			} catch (err) {
				console.info(`Couldn't activate WakeLock.`);
				console.log(`${err.name}, ${err.message}`);

				this.switcherElement.checked = false;
				this.switcherElement.disabled = true;
			}
		}
	}

	customElements.define('wakelock-toggle', WakelockToggle);

	function inititalize() {
		const settings = getSettings();
		applySettings(settings);

		const puzzle = new TriadPuzzle(settings);

		document.querySelector('.settings').addEventListener('change', (event) => {
			const target = event.target;
			if (target.nodeName != 'INPUT') { return }
			const newValue = target.checked;
			const setting = target.id;
			puzzle[setting] = newValue;

			saveSetting(setting, newValue);
		});
	}

	function getSettings() {
		const store = getStorage();
		const settings = { };

		settings.add9s = store.getItem('add9s') === 'true';
		settings.majorAndMinorOnly = store.getItem('majorAndMinorOnly') === 'true';

		return settings
	}

	function saveSetting(setting, value) {
		const store = getStorage();

		store.setItem(setting, value);
	}

	function applySettings(settings) {
		const majorAndMinorToggle = document.querySelector('#majorAndMinorOnly');
		const add9sToggle = document.querySelector('#add9s');
		if (majorAndMinorToggle) { majorAndMinorToggle.checked = settings.majorAndMinorOnly; }
		if (add9sToggle) { add9sToggle.checked = settings.add9s; }
	}

	function getStorage() {
		return localStorage || getDummyStorage()
	}

	function getDummyStorage() {
		let emptyFunction = new Function();

		return {
			getItem: emptyFunction,
			setItem: emptyFunction,
			removeItem: emptyFunction
		}
	}

	//
	//	This is the "module" version of the app's main JS file.
	//	It's purely a wrapper file — code your app in the app.js file
	//	referenced below along with various modules beside it.
	//


	inititalize();

})();
