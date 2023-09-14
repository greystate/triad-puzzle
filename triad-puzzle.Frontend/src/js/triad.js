const ACCIDENTAL = {
	flat:      -1,
	natural:    0,
	sharp:      1
}

const TYPE = {
	major:      0,
	minor:      1,
	diminished: 2,
	augmented:  3,
	add9:       4,
	madd9:      5,
	sus2:       6,
	sus4:       7
}

const DEFAULTS = {
	pitch:      0,   // 0-11
	acc:        0,   // -1, 0, 1  (b, [nothing/natural], #)
	type:       0    // 0-7       (major, minor, diminished, augmented etc.)
}

const ROOTS = 'C D EF G A B'
//             012345678901

const ACCIDENTALS = 'b #'
const TYPES       = ['', 'm', 'dim', '+', 'add9', 'm(add9)', 'sus2', 'sus4']
const ARIA_TYPES  = ['major', 'minor', 'diminished', 'augmented', 'add nine', 'minor add nine', 'sus two', 'sus four']

class Triad {
	constructor(options = { }) {
		if (typeof(options) === 'string') {
			return Triad.fromSymbol(options)
		} else {
			({ pitch: this.pitch, acc: this.acc, type: this.type } = options)
			if (this.pitch == null) { this.pitch = DEFAULTS.pitch }
			if (this.acc == null) { this.acc = DEFAULTS.acc }
			if (this.type == null) { this.type = DEFAULTS.type }
		}

		this.validate()
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
						this.acc = ACCIDENTAL.natural
						break
				}
				break

			case ACCIDENTAL.natural:
				switch (this.pitch) {
					case 1:
					case 3:
					case 6:
					case 8:
						this.acc = ACCIDENTAL.sharp
						break
					case 10:
						this.acc = ACCIDENTAL.flat
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
						this.acc = ACCIDENTAL.natural
						break
				}
				break
		}
	}

	baseName() {
		let index = this.pitch - this.acc
		if (index > 11) { index = 0 }
		if (index < 0) { index = 11 }

		return ROOTS.charAt(index)
	}

	static fromSymbol(symbol) {
		let result

		// ^
		// ([CDEFGAB])     # root
		// ([b\#]?)        # optional accidental
		// (\+|m|dim)?     # optional triad type
		// $
		const symbolRE = /^([CDEFGAB])([b\#]?)(\+|m|dim)?$/
		let match, root, accidental, triadtype

		if (symbolRE.test(symbol)) {
			[match, root, accidental, triadtype] = symbol.match(symbolRE)
			const acc = accidental !== '' ? ACCIDENTALS.indexOf(accidental) - 1 : 0
			const pitch = ROOTS.indexOf(root) + acc
			const type = triadtype !== undefined ? TYPES.indexOf(triadtype) : 0
			result = new Triad({ pitch, acc, type })
		}

		return result
	}
}

export default Triad
