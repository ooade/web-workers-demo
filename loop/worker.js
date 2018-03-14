onmessage = ({ data }) => {
	if (data === 'compute') {
		let sum = 0

		for (let i = 1; i <= 1e9; i++) {
			sum += i
		}

		postMessage(sum)
	}
}
