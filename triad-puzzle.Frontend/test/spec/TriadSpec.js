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

			//this.notherTriad = new Triad('Abdim')
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
	})
})
