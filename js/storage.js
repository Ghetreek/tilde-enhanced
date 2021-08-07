class LocalStorage {
	async get (key) {
		return (window.localStorage.getItem(key))
	}

	async set (key, value) {
		window.localStorage.setItem(key, value)
	}

	async getAll () {
		var response = {}
		var length = window.localStorage.length
		for (var i = 0; i < length; i++) {
			var key = window.localStorage.key(i)
			response[key] = window.localStorage.getItem(key)
		}
		return (response)
	}
}

class FirefoxStorage {
	async get (key) {
		return (await browser.storage.sync.get(key))
	}

	async set (key, value) {
		var obj = {}
		obj[key] = value
		return (await browser.storage.sync.set(obj))
	}

	async getAll () {
		return ((await browser.storage.sync.get(null)))
	}
}

class ChromeStorage {
	async get (key) {
		return (new Promise((resolve, reject) => {
			browser.storage.sync.get(key, (result) => {
				resolve (result.key)
			})
		}))
	}

	async set (key, value) {
		var obj = {}
		obj[key] = value
		return (new Promise((resolve, reject) => {
			chrome.storage.sync.set(obj, () => {
				resolve (true)
			})
		}))
	}

	async getAll () {
		return (new Promise((resolve, reject) => {
			browser.storage.sync.get(null, (result) => {
				resolve (result)
			})
		}))
	}
}