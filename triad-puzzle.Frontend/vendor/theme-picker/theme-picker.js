const THEME_KEY = 'colortheme'

class ThemePicker extends HTMLElement {
	constructor() {
		super()

		this.currentTheme = this.getAttribute('current') || 'auto'
		this.themes = (this.getAttribute('values') || 'auto,light,dark').split(',')
	}

	connectedCallback() {
		// Make sure that CSS (or script) can distinguish a working element from one that doesn't (e.g. if JavaScript is disabled)
		this.setAttribute('active', true)

		this.addEventListener('click', this)
		this.addEventListener('keypress', this)

		// Try loading a previously stored value
		this.loadTheme()

		this.update()
	}

	update() {
		const current = this.currentTheme

		if (current == 'auto' || current == null) {
			delete document.documentElement.dataset.theme
		} else if (this.themes.indexOf(current) >= 0) {
			document.documentElement.dataset.theme = this.currentTheme
		} else {
			console.error(`Couldn't set theme to '${current}' - possible values are: ${this.themes}`)
		}

		this.setAttribute('current', current)
		this.saveTheme()
	}

	handleEvent(event) {
		// Cycle themes...
		const max = this.themes.length
		const previous = this.themes.indexOf(this.currentTheme)
		let next
		if (previous >= 0) {
			next = previous + 1
			if (next >= max) {
				next = 0
			}
		}

		this.currentTheme = this.themes[next]

		this.update()
	}

	loadTheme() {
		const stored = this.store.getItem(THEME_KEY)
		this.currentTheme = stored != 'null' && stored != null ? stored : 'auto'
	}

	saveTheme() {
		if (this.currentTheme == 'auto') {
			this.store.removeItem(THEME_KEY)
		} else {
			this.store.setItem(THEME_KEY, this.currentTheme)
		}
	}

	get store() {
		return localStorage || getDummyStorage()
	}
}

function getDummyStorage() {
	let emptyFunction = new Function()

	return {
		getItem: emptyFunction,
		setItem: emptyFunction,
		removeItem: emptyFunction
	}
}

customElements.define('theme-picker', ThemePicker)

