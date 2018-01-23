describe "Triad", ->

	describe "creation", ->
		@triad = new Triad
		@otherTriad = new Triad
			pitch: 3
			acc: 1
			type: 1
		@notherTriad = new Triad "Abdim"

		it "defaults to a C major triad", =>
			(expect @triad.pitch).toEqual 0
			(expect @triad.acc).toEqual 0
			(expect @triad.type).toEqual 0

		it "can create a D#m triad as well", =>
			(expect @otherTriad.pitch).toEqual 3
			(expect @otherTriad.acc).toEqual 1
			(expect @otherTriad.type).toEqual 1
		
		it "can create with a symbol too", =>
			(expect @notherTriad.pitch).toEqual 8
			(expect @notherTriad.acc).toEqual -1
			(expect @notherTriad.type).toEqual 2

		it "reports its root name", =>
			(expect @triad.rootName()).toEqual 'C'
			(expect @otherTriad.rootName()).toEqual 'D#'
			(expect @notherTriad.rootName()).toEqual 'Ab'
		
		it "reports its accidental sign", =>
			(expect @triad.accidentalSign()).toEqual ''
			(expect @otherTriad.accidentalSign()).toEqual '#'
			(expect @notherTriad.accidentalSign()).toEqual 'b'
	
		it "reports its type name", =>
			(expect @triad.typeName()).toEqual ''
			(expect @otherTriad.typeName()).toEqual 'm'
			(expect @notherTriad.typeName()).toEqual 'dim'
	

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
		
	describe ".toHTML()", ->
		it "renders a simple C triad", ->
			@triad = new Triad
			html = @triad.toHTML()
			(expect html).toEqual """
				<span class="piece">
					<data class="root" value="C">C</data>
				</span>
			"""
		it "also renders an F#+ triad", ->
			@triad = new Triad 'F#+'
			html = @triad.toHTML()
			(expect html).toEqual """
				<span class="piece">
					<data class="root" value="F">F</data>
					<data class="acc" value="#">#</data>
					<data class="triad" value="+">+</data>
				</span>
			"""
			