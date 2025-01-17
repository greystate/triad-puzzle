import TriadPuzzle from '../../src/js/modules/triad-puzzle.js'

describe('TriadPuzzle', function() {

	describe('creation', function() {
		const puzzle = new TriadPuzzle()

		it('can create a random triad', function() {
			this.randomTriad = puzzle.getRandomTriad()

			expect(this.randomTriad.pitch).toBeGreaterThanOrEqual(0)
			expect(this.randomTriad.pitch).toBeLessThanOrEqual(11)

			expect(this.randomTriad.acc).toBeGreaterThanOrEqual(-1)
			expect(this.randomTriad.acc).toBeLessThanOrEqual(1)

			expect(this.randomTriad.type).toBeGreaterThanOrEqual(0)
			expect(this.randomTriad.type).toBeLessThanOrEqual(7)
		})
	})

	it('')
})
