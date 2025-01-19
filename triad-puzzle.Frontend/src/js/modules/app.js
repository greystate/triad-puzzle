import TriadPuzzle from './triad-puzzle.js'
import '../../../vendor/theme-picker/theme-picker.js'
import '../../../vendor/wakelock-toggle/wakelock-toggle.js'

export default function() {
	const settings = getSettings()
	applySettings(settings)

	const puzzle = new TriadPuzzle(settings)

	document.querySelector('.settings').addEventListener('change', (event) => {
		const target = event.target
		if (target.nodeName != 'INPUT') { return }
		const newValue = target.checked
		const setting = target.id
		puzzle[setting] = newValue

		saveSetting(setting, newValue)
	})
}

function getSettings() {
	const store = getStorage()
	const settings = { }

	settings.add9s = store.getItem('add9s') === 'true'
	settings.majorAndMinorOnly = store.getItem('majorAndMinorOnly') === 'true'

	return settings
}

function saveSetting(setting, value) {
	const store = getStorage()

	store.setItem(setting, value)
}

function applySettings(settings) {
	const majorAndMinorToggle = document.querySelector('#majorAndMinorOnly')
	const add9sToggle = document.querySelector('#add9s')
	if (majorAndMinorToggle) { majorAndMinorToggle.checked = settings.majorAndMinorOnly }
	if (add9sToggle) { add9sToggle.checked = settings.add9s }
}

function getStorage() {
	return localStorage || getDummyStorage()
}

function getDummyStorage() {
	let emptyFunction = new Function()

	return {
		getItem: emptyFunction,
		setItem: emptyFunction,
		removeItem: emptyFunction
	}
}
