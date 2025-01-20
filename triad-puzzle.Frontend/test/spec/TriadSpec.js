import Triad from '../../src/js/modules/triad.js'

describe('Triad', function() {
	describe('creation', function() {
		beforeAll(function() {
			this.triad = new Triad()

			this.otherTriad = new Triad({
				pitch: 3,
				acc: 1,
				type: 1
			})

			this.notherTriad = new Triad('Abdim')
		})

		it('defaults to a C major triad', function() {
			expect(this.triad.pitch).toEqual(0)
			expect(this.triad.acc).toEqual(0)
			expect(this.triad.type).toEqual(0)
			expect(this.triad.formula).toEqual('1 3 5')
		})

		it('can create a D#m triad', function() {
			expect(this.otherTriad.pitch).toEqual(3)
			expect(this.otherTriad.acc).toEqual(1)
			expect(this.otherTriad.type).toEqual(1)
			expect(this.otherTriad.formula).toEqual('1 b3 5')
		})

		it('can be created from a symbol', function() {
			expect(this.notherTriad.pitch).toEqual(8)
			expect(this.notherTriad.acc).toEqual(-1)
			expect(this.notherTriad.type).toEqual( 2)
			expect(this.notherTriad.formula).toEqual('1 b3 b5')
		})
	})

	describe('validation', function() {
		it(`fixes 'impossible flats'`, function() {
			const triad = new Triad({
				pitch: 0,
				acc: -1
			})

			expect(triad.acc).toEqual(0)
		})

		it(`fixes 'impossible sharps'`, function() {
			const triad = new Triad({
				pitch: 4,
				acc: 1
			})

			expect(triad.acc).toEqual(0)
		})

		it(`fixes 'impossible naturals'`, function() {
			const triadBflat = new Triad({
				pitch: 10,
				acc: 0
			})

			const triadFsharp = new Triad({
				pitch: 6,
				acc: 0
			})

			expect(triadBflat.acc).toEqual(-1)
			expect(triadFsharp.acc).toEqual(1)
		})

		it('fixes out of range root values', function() {
			const triadOver = new Triad({
				pitch: 11,
				acc: -1
			})

			const triadUnder = new Triad({
				pitch: 0,
				acc: 1
			})

			const overRun = Triad.fromSymbol('B#m')
			const underRun = Triad.fromSymbol('Cb+')

			expect(triadOver.baseName()).toEqual('C')
			expect(triadUnder.baseName()).toEqual('B')

			expect(overRun.pitch).toEqual(0)
			expect(underRun.pitch).toEqual(11)
		})
	})

	describe('comparison', function() {
		it('recognizes enharmonic triads', function() {
			const triad1 = new Triad('Cm')
			const triad2 = new Triad('B#m')

			expect(triad1.equals(triad2)).toBeTruthy()
		})

		it('distinguishes between types', function() {
			const triad1 = new Triad('D+')
			const triad2 = new Triad('Ddim')

			expect(triad1.equals(triad2)).toBeFalsy()
		})
	})


	describe('.fromSymbol()', function() {
		it('builds a minor Triad from its symbol', function() {
			const triad = Triad.fromSymbol('C#m')

			expect(triad.pitch).toEqual(1)
			expect(triad.acc).toEqual(1)
			expect(triad.type).toEqual(1)
		})

		it('builds an augmented Triad from its symbol', function() {
			const triad = Triad.fromSymbol('Ab+')

			expect(triad.pitch).toEqual( 8)
			expect(triad.acc).toEqual(-1)
			expect(triad.type).toEqual( 3)
		})

		it('builds a major Triad from its symbol', function() {
			const triad = Triad.fromSymbol('F')

			expect(triad.pitch).toEqual(5)
			expect(triad.acc).toEqual(0)
			expect(triad.type).toEqual(0)
		})

		it('builds a diminished Triad from its symbol', function() {
			const triad = Triad.fromSymbol('Bbdim')

			expect(triad.pitch).toEqual(10)
			expect(triad.acc).toEqual(-1)
			expect(triad.type).toEqual(2)
		})

		it('builds a minor (add9) Triad from its symbol', function() {
			const triad = Triad.fromSymbol('Dm(add9)')

			expect(triad.pitch).toEqual(2)
			expect(triad.acc).toEqual(0)
			expect(triad.type).toEqual(5)
		})

		it('builds an add9 Triad from its symbol', function() {
			const triad = Triad.fromSymbol('Abadd9')

			expect(triad.pitch).toEqual(8)
			expect(triad.acc).toEqual(-1)
			expect(triad.type).toEqual(4)
		})

		it('builds a sus2 Triad from its symbol', function() {
			const triad = Triad.fromSymbol('Bsus2')

			expect(triad.pitch).toEqual(11)
			expect(triad.acc).toEqual(0)
			expect(triad.type).toEqual(6)
		})

		it('builds a sus4 Triad from its symbol', function() {
			const triad = Triad.fromSymbol('Fsus4')

			expect(triad.pitch).toEqual(5)
			expect(triad.acc).toEqual(0)
			expect(triad.type).toEqual(7)
		})

		it('Shouldn\'t build a Triad from a wrong symbol', function() {
			const triad = Triad.fromSymbol('Pdiddy')

			expect(triad).toBeUndefined()
		})
	})

	describe('.entityForAccidental()', function() {
		it('returns the correct flat for "b"', function() {
			expect(Triad.entityForAccidental('b')).toEqual('&#x266D;')
		})

		it('returns the correct sharp for "#"', function() {
			expect(Triad.entityForAccidental('#')).toEqual('&#x266F;')
		})
	})

	describe('.toSymbol()', function() {
		it('converts a C major triad', function() {
			const triad = new Triad()

			expect(triad.toSymbol()).toEqual('C')
		})

		it('converts a Db minor triad', function() {
			const triad = new Triad({
				pitch: 1,
				acc: -1,
				type: 1
			})

			expect(triad.toSymbol()).toEqual('Dbm')
		})

		it('converts an F#+ triad', function() {

			const triad = new Triad({
				pitch: 6,
				acc: 1,
				type: 3
			})

			expect(triad.toSymbol()).toEqual('F#+')
		})

		it('converts a Bdim triad', function() {
			const triad = new Triad({
				pitch: 11,
				acc: 0,
				type: 2
			})

			expect(triad.toSymbol()).toEqual('Bdim')
		})

		it('converts a G#add9 triad', function() {
			const triad = new Triad({
				pitch: 8,
				acc: 1,
				type: 4
			})

			expect(triad.toSymbol()).toEqual('G#add9')
		})

		it('converts an Ebm(add9) triad', function() {
			const triad = new Triad({
				pitch: 3,
				acc: -1,
				type: 5
			})

			expect(triad.toSymbol()).toEqual('Ebm(add9)')
		})

	})

	describe('.toHTML()', function() {
		it('renders a simple C triad', function() {
			const triad = new Triad()
			const html = triad.toHTML()

			expect(html).toEqual(`<span class="piece" aria-label="C major"><data class="root" value="C">C</data></span>`)
		})

		it('renders an F#+ triad', function() {
			const triad = new Triad('F#+')
			const html = triad.toHTML()

			expect(html).toEqual(`<span class="piece" aria-label="F sharp augmented"><data class="root" value="F">F</data>\n\t<sup><data class="acc" value="#">&#x266F;</data></sup>\n\t<data class="triad" value="+">+</data></span>`)
		})

		it('renders an Bbm triad', function() {
			const triad = new Triad('Bbm')
			const html = triad.toHTML()

			expect(html).toEqual(`<span class="piece" aria-label="B flat minor"><data class="root" value="B">B</data>\n\t<sup><data class="acc" value="b">&#x266D;</data></sup>\n\t<data class="triad" value="m">m</data></span>`)
		})
	})

	describe('.toFormulaHTML()', function() {
		it('returns the formula for a major triad, regardless of pitch', function() {
			const triad1 = new Triad('F')
			const triad2 = new Triad('Gb')

			expect(triad1.toFormulaHTML()).toEqual('<article class="formula">\n\t<data class="step">1</data>\n\t<data class="step">3</data>\n\t<data class="step">5</data>\n</article>')
			expect(triad1.toFormulaHTML()).toEqual(triad2.toFormulaHTML())
		})

		it('returns the formula for a minor triad, regardless of pitch', function() {
			const triad1 = new Triad('Cm')
			const triad2 = new Triad('Abm')

			expect(triad1.toFormulaHTML()).toEqual('<article class="formula">\n\t<data class="step">1</data>\n\t<data class="step"><data class="acc" value="b">&#x266D;</data>3</data>\n\t<data class="step">5</data>\n</article>')
			expect(triad1.toFormulaHTML()).toEqual(triad2.toFormulaHTML())
		})
	})

	describe('.toAriaLabel()', function() {
		it('reads out an E triad', function() {
			const triad = new Triad('E')

			expect(triad.toAriaLabel()).toEqual('E major')
		})

		it('reads out a Dbm triad', function() {
			const triad = new Triad('Dbm')

			expect(triad.toAriaLabel()).toEqual('D flat minor')
		})

		it('reads out an F#+ triad', function() {
			const triad = new Triad('F#+')

			expect(triad.toAriaLabel()).toEqual('F sharp augmented')
		})
	})



})
