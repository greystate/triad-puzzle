
# Global app object 
window.app ?= { }

# Main controller for the page's functions
class TriadPuzzleController
	constructor: () ->
		@setup()
		@drawPuzzle()
	
	setup: () ->
		{ majorAndMinorOnly, add9s } = @getSettingNodes()
		
		majorAndMinorOnly.addEventListener 'change', @updateSettings
		add9s.addEventListener 'change', @updateSettings
	
	getSettingNodes: () ->
		majorAndMinorOnly = document.querySelector '#majorAndMinorOnly'
		add9s = document.querySelector '#add9s'
		{ majorAndMinorOnly, add9s }
		
	getSettings: () ->
		{ majorAndMinorOnly, add9s } = @getSettingNodes()
		majorAndMinorOnly: majorAndMinorOnly.checked, add9s: add9s.checked

	updateSettings: (event) =>
		target = event.target
		@puzzle[target.id] = target.checked
	
	drawPuzzle: () ->
		{ majorAndMinorOnly, add9s } = @getSettings()
		@puzzle = new TriadPuzzle { majorAndMinorOnly, add9s }

# Start everything when the page is ready
document.addEventListener 'DOMContentLoaded', (event) ->
	app.controller = new TriadPuzzleController
	

# @codekit-prepend "triad-puzzle.coffee"
