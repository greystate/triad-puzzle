
# Global app object 
window.app ?= { }

# Main controller for the page's functions
class TriadPuzzleController
	constructor: () ->
		@setup()
	
	setup: () ->
		@puzzle = new TriadPuzzle
			majorAndMinorOnly: yes


# Start everything when the page is ready
document.addEventListener 'DOMContentLoaded', (event) ->
	app.controller = new TriadPuzzleController
	

# @codekit-prepend "triad-puzzle.coffee"
