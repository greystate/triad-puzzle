ACCIDENTAL =
	flat:      -1
	natural:    0
	sharp:      1

TYPE =
	major:      0
	minor:      1
	diminished: 2
	augmented:  3
	add9:       4
	madd9:      5
	sus2:       6
	sus4:       7

DEFAULTS =
	pitch:      0    # 0-11
	acc:        0    # -1, 0, 1    (b, [nothing/natural], #)
	type:       0    # 0-7         (major, minor, diminished, augmented etc.)

ROOTS       = 'C D EF G A B'
#              012345678901
ACCIDENTALS = 'b #'
TYPES       = ['', 'm', 'dim', '+', 'add9', 'm(add9)', 'sus2', 'sus4']
ARIA_TYPES  = ['major', 'minor', 'diminished', 'augmented', 'add nine', 'minor add nine', 'sus two', 'sus four']


class Triad
	constructor: (options = { }) ->
		if (typeof options) is 'string'
			return Triad.fromSymbol options
		else
			{ @pitch, @acc, @type } = options
		
			@pitch ?= DEFAULTS.pitch
			@acc ?= DEFAULTS.acc
			@type ?= DEFAULTS.type
		
		@validate()
	
	validate: () ->
		switch @acc
			when -1
				switch @pitch
					when 0, 2, 5, 7, 9
						# Can't be represented as a "flat"
						@acc = 0
			when 0
				switch @pitch
					when 1, 3, 6, 8
						@acc = 1
					when 10
						@acc = -1
			when 1
				switch @pitch
					when 2, 4, 7, 9, 11
						# Can't be represented as a "sharp"
						@acc = 0
			
	rootName: () ->
		"#{@baseName()}#{@accidentalSign()}"
	
	baseName: () ->
		index = @pitch - @acc
		if index > 11 then index = 0
		if index < 0 then index = 11
		ROOTS.charAt index
	
	accidentalSign: (forHTML = false) ->
		if not forHTML
			switch @acc
				when -1
					'b'
				when 1
					'#'
				else
					''
	
	typeName: (forARIA = false) ->
		if forARIA is yes
			ARIA_TYPES[@type]
		else
			TYPES[@type]
	
	toSymbol: () -> "#{@rootName()}#{@typeName()}"

	toAriaLabel: () ->
		base = @baseName()
		acc = switch @acc
			when -1
				'flat'
			when 1
				'sharp'
			else ''
		accEntity = @accidentalSign yes
		type = @typeName yes
		
		"#{base} #{acc} #{type}"
	
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
		<span class="piece" aria-label="#{@toAriaLabel()}">
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

