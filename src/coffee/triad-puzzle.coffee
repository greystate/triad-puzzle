SPACE_KEY = 32
PIECES = 8

class TriadPuzzle
	constructor: (options = {}) ->
		{ @sheetSelector, @majorAndMinorOnly, @add9s } = options
		@sheetSelector ?= '.sheet'
		@majorAndMinorOnly ?= no
		@add9s ?= no
		@suss ?= no
		
		@setupSheet()
		document.body.addEventListener 'keypress', (event) =>
			if event.keyCode is SPACE_KEY
				event.preventDefault()
				@setupSheet()
		document.body.addEventListener 'touchend', (event) =>
			target = event.target
			if target.closest '.piece'
				@setupSheet()
		

	setupSheet: (keepExisting = no) ->
		sheet = document.querySelector @sheetSelector
		hanger = document.createDocumentFragment()
		
		previousTriad = null
		count = 1
		
		# We need 8 pieces, but we don't want to have
		# two identical triads follow each other
		while count <= PIECES
			item = document.createElement 'li'
			triad = @getRandomTriad()
			if triad.toSymbol() isnt previousTriad
				rotation = randomInt -2, 3
				item.innerHTML = triad.toHTML()
				item.style.setProperty '--rotation', rotation
				hanger.appendChild item
				previousTriad = triad.toSymbol()
				count++
		
		sheet.innerHTML = '' unless keepExisting is yes
		sheet.appendChild hanger
	
	getRandomTriad: () ->
		pitch = randomInt 0, 11
		acc = randomInt -1, 1
		type = randomInt 0, if @majorAndMinorOnly then 1 else 3
		if @add9s and type <= 1
			if (randomInt 0, 20) > 16 then type += 4
		if @suss and type <= 1
			if (randomInt 0, 20) > 13 then type += 6
		new Triad { pitch, acc, type }

# Export
window.TriadPuzzle = TriadPuzzle

# @codekit-prepend "helpers.coffee"
# @codekit-prepend "triad.coffee"
