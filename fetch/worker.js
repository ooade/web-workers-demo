addEventListener('message', async ({ data }) => {
	if (data.type === 'fetch-user') {
		const USER_URL = 'https://api.github.com/users'

		try {
			postMessage(`fetching ${data.user}'s profile...`)

			let profile = await fetchProfile(data.user)

			let users = await fetchFollowers(data.user)

			let i = 0,
				obj = {}

			while (i < users.length) {
				let user = users[i]

				postMessage(`fetching ${user} repos...`)

				let repos = await fetchRepos(user)

				obj[user] = repos.map(repo => repo.name)
				i++
			}

			postMessage(JSON.stringify(obj))
		} catch (error) {
			postMessage(error.message)
		}

		async function fetchProfile(user) {
			let res = await fetch(`${USER_URL}/${user}`)

			if (res.status > 200) {
				throw Error(res.statusText)
			}

			return await res.json()
		}

		async function fetchFollowers(user) {
			let res = await fetch(`${USER_URL}/${user}/followers`)
			let json = await res.json()

			let users = json.reduce((a, v) => a.concat(v.login), [])

			return users
		}

		async function fetchRepos(user) {
			let res = await fetch(`${USER_URL}/${user}/repos`)
			return await res.json()
		}
	}
})
