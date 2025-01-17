import Triad from './triad.js'

class TriadPuzzle {
	constructor() {

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
