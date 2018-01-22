describe "Triad", ->

	describe "creation", ->
		@triad = new Triad

		it "defaults to a C major triad", =>
			(expect @triad.pitch).toEqual 0
			(expect @triad.acc).toEqual 0
			(expect @triad.type).toEqual 0


	describe "@fromSymbol", ->
		it "builds a minor Triad from its symbol", =>
			@triad = Triad.fromSymbol 'C#m'

			(expect @triad.pitch).toEqual 1
			(expect @triad.acc).toEqual 1
			(expect @triad.type).toEqual 1

		it "builds an augmented Triad from its symbol", =>
			@triad = Triad.fromSymbol 'Ab+'
			(expect @triad.pitch).toEqual 8
			(expect @triad.acc).toEqual -1
			(expect @triad.type).toEqual 3

		it "builds a major Triad from its symbol", ->
			@triad = Triad.fromSymbol 'F'
			
			(expect @triad.pitch).toEqual 5
			(expect @triad.acc).toEqual 0
			(expect @triad.type).toEqual 0

		it "builds a diminished Triad from its symbol", ->
			@triad = Triad.fromSymbol 'Bbdim'
			
			(expect @triad.pitch).toEqual 10
			(expect @triad.acc).toEqual -1
			(expect @triad.type).toEqual 2
		
		it "Shouldn't build a Triad from a wrong symbol", ->
			@triad = Triad.fromSymbol 'Pdiddy'
			(expect @triad).toBeUndefined()


	describe ".toSymbol()", ->
		it "defaults to a C major triad", =>
			@triad = new Triad

			(expect @triad.toSymbol()).toEqual 'C'

