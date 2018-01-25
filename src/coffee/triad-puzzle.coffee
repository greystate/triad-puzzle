SPACE_KEY = 32

class TriadPuzzle
	constructor: (@sheetSelector = '.sheet') ->
		@setupSheet()
		document.body.addEventListener 'keypress', (event) =>
			if event.keyCode is SPACE_KEY
				event.preventDefault()
				@setupSheet()
				

	setupSheet: (keepExisting = no) ->
		sheet = document.querySelector @sheetSelector
		hanger = document.createDocumentFragment()
		
		previousTriad = null
		count = 1
		
		while count <= 8
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
		type = randomInt 0, 3
		new Triad { pitch, acc, type }

# Export
window.TriadPuzzle = TriadPuzzle

# @codekit-prepend "helpers.coffee"
# @codekit-prepend "triad.coffee"
