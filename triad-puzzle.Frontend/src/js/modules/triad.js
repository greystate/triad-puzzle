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
//                       11

const ACCIDENTALS = 'b #'
const TYPES       = ['', 'm', 'dim', '+', 'add9', 'm(add9)', 'sus2', 'sus4']
const ARIA_TYPES  = ['major', 'minor', 'diminished', 'augmented', 'add nine', 'minor add nine', 'sus two', 'sus four']
const FORMULAE    = ['1 3 5', '1 b3 5', '1 b3 b5', '1 3 #5', '2 3 5', '2 b3 5', '1 2 5', '1 4 5']

class Triad {
	constructor(options = { }) {
		if (typeof(options) === 'string') {
			return Triad.fromSymbol(options)
		} else {
			({ pitch: this.pitch, acc: this.acc, type: this.type } = options)
			if (this.pitch == null) { this.pitch = DEFAULTS.pitch }
			if (this.acc == null) { this.acc = DEFAULTS.acc }
			if (this.type == null) { this.type = DEFAULTS.type }
			this.formula = FORMULAE[this.type]
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

	accidentalSign(forHTML = false) {
		switch (this.acc) {
			case -1:
				return forHTML ? Triad.entityForAccidental('b') : 'b'
				break
			case 1:
				return forHTML ? Triad.entityForAccidental('#') : '#'
				break
			default:
				return ''
				break
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
		const base = this.baseName()
		let acc = ''
		switch (this.acc) {
			case -1:
				acc = 'flat'
				break
			case 1:
				acc = 'sharp'
				break
			default:
				acc = ''
				break
		}

		const accEntity = this.accidentalSign(true)
		const type = this.typeName(true)
		let label = `${base} ${acc} ${type}`

		return label.replace(/\s+/, ' ')
	}

	toHTML() {
		const base = this.baseName()
		const acc = this.accidentalSign()
		const accEntity = this.accidentalSign(true)
		const type = this.typeName()

		const baseHTML = `<data class="root" value="${base}">${base}</data>`
		const accHTML =  acc != '' ? `<sup><data class="acc" value="${acc}">${accEntity}</data></sup>` : ''
		const typeHTML = type != '' ? `<data class="triad" value="${type}">${type}</data>` : ''
		const parts = [baseHTML, accHTML, typeHTML].filter(val => val != '')

		return `<span class="piece" aria-label="${this.toAriaLabel()}">${parts.join('\n\t')}</span>`
	}

	toFormulaHTML() {
		const formula = this.formula.split(' ')
		const rootHTML = `<data class="step">${formula[0]}</data>`

		const modifier3 = formula[1].length == 1 ? '' : formula[1].charAt(0)
		const modifier5 = formula[2].length == 1 ? '' : formula[2].charAt(0)
		const step3AtIndex = modifier3 == '' ? 0 : 1
		const step5AtIndex = modifier5 == '' ? 0 : 1

		const entity3 = modifier3 != '' ? Triad.entityForAccidental(modifier3) : ''
		const entity5 = modifier5 != '' ? Triad.entityForAccidental(modifier5) : ''

		const mod3HTML = modifier3 != '' ? `<data class="acc" value="${modifier3}">${entity3}</data>` : ''
		const mod5HTML = modifier5 != '' ? `<data class="acc" value="${modifier5}">${entity5}</data>` : ''

		const thirdHTML = `<data class="step">${mod3HTML}${formula[1].charAt(step3AtIndex)}</data>`
		const fifthHTML = `<data class="step">${mod5HTML}${formula[2].charAt(step5AtIndex)}</data>`

		return `<article class="formula">\n\t${rootHTML}\n\t${thirdHTML}\n\t${fifthHTML}\n</article>`
	}

	// Static methods
	static fromSymbol(symbol) {
		let result

		// ^
		// ([CDEFGAB])                          # root
		// ([b\#]?)                             # optional accidental
		// (\+|m|dim|add9|m\(add9\)|sus[24])?   # optional triad type
		// $
		const symbolRE = /^([CDEFGAB])([b\#]?)(\+|m|dim|add9|m\(add9\)|sus[24])?$/
		let match, root, accidental, triadtype

		if (symbolRE.test(symbol)) {
			[match, root, accidental, triadtype] = symbol.match(symbolRE)
			const acc = accidental !== '' ? ACCIDENTALS.indexOf(accidental) - 1 : 0
			let pitch = ROOTS.indexOf(root) + acc
			if (pitch > 11) { pitch = 0 }
			if (pitch < 0 ) { pitch = 11 }
			const type = triadtype !== undefined ? TYPES.indexOf(triadtype) : 0
			result = new Triad({ pitch, acc, type })
		}

		return result
	}

	static entityForAccidental(accidental) {
		let result

		switch (accidental) {
			case 'b':
				result = '&#x266D;'
				break
			case '#':
				result = '&#x266F;'
				break
			default:
				result = ''
		}

		return result
	}
}

export default Triad
