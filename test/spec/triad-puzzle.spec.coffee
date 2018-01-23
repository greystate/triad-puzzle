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
		it "converts a C major triad", =>
			@triad = new Triad

			(expect @triad.toSymbol()).toEqual 'C'
		
		it "converts a Db minor triad", ->
			@triad = new Triad
				pitch: 1
				acc: -1
				type: 1
				
			(expect @triad.toSymbol()).toEqual 'Dbm'
		
		it "converts an F#+ triad", ->
			@triad = new Triad
				pitch: 6
				acc: 1
				type: 3
				
			(expect @triad.toSymbol()).toEqual 'F#+'
		
		it "converts a Bdim triad", ->
			@triad = new Triad
				pitch: 11
				acc: 0
				type: 2
				
			(expect @triad.toSymbol()).toEqual 'Bdim'
		

