import Triad from './triad.js'

const SPACE_KEY = 32
const PIECES = 8
const DEFAULTS = {
	sheetSelector: '.sheet',
	majorAndMinorOnly: false,
	add9s: false,
	suss: false
}

class TriadPuzzle {
	constructor(options = {}) {
		this.sheetSelector = options.sheetSelector ?? DEFAULTS.sheetSelector
		this.majorAndMinorOnly = options.majorAndMinorOnly ?? DEFAULTS.majorAndMinorOnly
		this.add9s = options.add9s ?? DEFAULTS.add9s

		this.suss = options.suss ?? DEFAULTS.suss // Not implemented yet

		this.setupSheet()

		document.body.addEventListener('keypress', (event) => {
			if (event.keyCode === SPACE_KEY) {
				event.preventDefault()
				this.setupSheet()
			}
		})

		document.body.addEventListener('touchend', (event) => {
			const target = event.target
			if (target.closest('.piece'))
				this.setupSheet()
		})
	}

	setupSheet(keepExisting = false) {
		const sheet = document.querySelector(this.sheetSelector)
		const hanger = document.createDocumentFragment()

		let previousTriad = null
		let item, triad, count = 1

		// We need 8 pieces, but we don't want to have
		// two identical triads follow each other
		while (count <= PIECES) {
			item = document.createElement('li')
			triad = this.getRandomTriad()
			if (triad.toSymbol() !== previousTriad) {
				const rotation = randomInt(-2, 3)
				item.innerHTML = triad.toHTML()
				item.style.setProperty('--rotation', rotation)
				hanger.appendChild(item)
				previousTriad = triad.toSymbol()
				count++
			}
		}

		// Fallback for browsers that don't support View Transitions:
		if (!document.startViewTransition) {
			if (keepExisting === false) { sheet.innerHTML = '' }

			sheet.appendChild(hanger)
			return
		}

		// With View Transitions:
		const transition = document.startViewTransition(() => {
			if (keepExisting === false) { sheet.innerHTML = '' }

			sheet.appendChild(hanger)
		})
	}

	getRandomTriad() {
		let pitch = randomInt(0, 11)
		let acc = randomInt(-1, 1)
		let type = randomInt(0, (this.majorAndMinorOnly ? 1 : 3))

		let [pp, aa] = clampForClarity(pitch, acc)

		if (this.add9s && type <= 1) {
			if (randomInt(0, 20) > 16) {
				type += 4
			}
		}

		if (this.suss && type <= 1) {
			if (randomInt(0, 20) > 13) {
				type += 6
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
	const low = min !== undefined ? min : 0
	const high = max !== undefined ? max : 1

	return Math.floor(Math.random() * (high - low + 1)) + low

}

function clampForClarity(p, a) {
	let acc = a

	// Cb and Fb should be output as B and E
	if (a === -1 && (p === 11 || p === 4)) {
		acc = 0
	}

	// Likewise, H# and E# should output as C and F
	if (a === 1 && (p === 0 || p === 5)) {
		acc = 0
	}

	return [p, acc]
}

export default TriadPuzzle
