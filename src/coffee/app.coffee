
# Global app object 
window.app ?= { }

# Main controller for the page's functions
class TriadPuzzleController
	constructor: () ->
		@setup()
	
	setup: () ->
		
		$majorAndMinorOnly = document.querySelector '#majorAndMinorOnly'
		$add9s = document.querySelector '#add9s'
		
		$majorAndMinorOnly.addEventListener 'change', @updateSettings
		$add9s.addEventListener 'change', @updateSettings
		
		@puzzle = new TriadPuzzle
			majorAndMinorOnly: $majorAndMinorOnly.checked
			add9s: $add9s.checked
	
	updateSettings: (event) =>
		target = event.target
		@puzzle[target.id] = target.checked
		

# Start everything when the page is ready
document.addEventListener 'DOMContentLoaded', (event) ->
	app.controller = new TriadPuzzleController
	

# @codekit-prepend "triad-puzzle.coffee"
