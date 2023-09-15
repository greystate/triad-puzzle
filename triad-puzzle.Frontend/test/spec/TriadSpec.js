import Triad from '../../src/js/triad.js'

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
		})

		it('can create a D#m triad', function() {
			expect(this.otherTriad.pitch).toEqual(3)
			expect(this.otherTriad.acc).toEqual(1)
			expect(this.otherTriad.type).toEqual(1)
		})

		it('can be created from a symbol', function() {
			expect(this.notherTriad.pitch).toEqual(8)
			expect(this.notherTriad.acc).toEqual(-1)
			expect(this.notherTriad.type).toEqual( 2)
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

			expect(triadOver.baseName()).toEqual('C')
			expect(triadUnder.baseName()).toEqual('B')
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

		it('Shouldn\'t build a Triad from a wrong symbol', function() {
			const triad = Triad.fromSymbol('Pdiddy')

			expect(triad).toBeUndefined()
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
