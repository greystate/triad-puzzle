ACCIDENTAL =
	flat:      -1
	natural:    0
	sharp:      1

TYPE =
	major:      0
	minor:      1
	diminished: 2
	augmented:  3

DEFAULTS =
	pitch:      0    # 0-11
	acc:        0    # -1, 0, 1    (b, [nothing/natural], #)
	type:       0    # 0-3         (major, minor, diminished, augmented)

ROOTS       = 'C D EF G A B'
ACCIDENTALS = 'b #'
TYPES       = ['', 'm', 'dim', '+']


class Triad
	constructor: (options = { }) ->
		if (typeof options) is 'string'
			return Triad.fromSymbol options
		else
			{ @pitch, @acc, @type } = options
		
			@pitch ?= DEFAULTS.pitch
			@acc ?= DEFAULTS.acc
			@type ?= DEFAULTS.type
		
	rootName: () ->
		"#{@baseName()}#{@accidentalSign()}"
	
	baseName: () ->
		ROOTS.charAt @pitch - @acc
	
	accidentalSign: (forHTML = false) ->
		if not forHTML
			switch @acc
				when -1
					'b'
				when 1
					'#'
				else
					''
	
	typeName: () -> TYPES[@type]
	
	toSymbol: () -> "#{@rootName()}#{@typeName()}"

	toHTML: () ->
		base = @baseName()
		acc = @accidentalSign()
		accEntity = @accidentalSign yes
		type = @typeName()
		
		baseHTML = """<data class="root" value="#{base}">#{base}</data>"""
		accHTML =  if acc isnt '' then """<data class="acc" value="#{acc}">#{acc}</data>""" else ''
		typeHTML = if type isnt '' then """<data class="triad" value="#{type}">#{type}</data>""" else ''
		parts = [baseHTML, accHTML, typeHTML].filter (val) => val isnt ''
		
		"""
		<span class="piece">
			#{parts.join '\n\t'}
		</span>
		"""
	
	@fromSymbol: (symbol) ->
		symbolRE = ///
			^
			([CDEFGAB])     # root
			([b\#]?)        # optional accidental
			(\+|m|dim)?     # optional triad type
			$
		///
		if symbolRE.test symbol
			[match, root, accidental, triadtype] = symbol.match symbolRE
			acc = if accidental isnt '' then (ACCIDENTALS.indexOf accidental) - 1 else 0
			pitch = (ROOTS.indexOf root) + acc
			type = if triadtype isnt undefined then TYPES.indexOf triadtype else 0
			new Triad { pitch, acc, type }

window.Triad = Triad
