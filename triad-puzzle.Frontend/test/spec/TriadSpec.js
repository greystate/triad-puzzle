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

		it('can create a D#m triad as well', function() {
			expect(this.otherTriad.pitch).toEqual(3)
			expect(this.otherTriad.acc).toEqual(1)
			expect(this.otherTriad.type).toEqual(1)
		})

		it('can create with a symbol too', function() {
			expect(this.notherTriad.pitch).toEqual( 8)
			expect(this.notherTriad.acc).toEqual(-1)
			expect(this.notherTriad.type).toEqual( 2)
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


})
