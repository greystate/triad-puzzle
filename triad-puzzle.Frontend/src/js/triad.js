class Triad {
	constructor(options = { pitch: 0, acc: 0, type: 0}) {
		if (typeof(options) === 'string') {
			// nop
		} else {
			this.pitch = options.pitch
			this.acc = options.acc
			this.type = options.type
		}
	}
}

export default Triad
