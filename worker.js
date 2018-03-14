onmessage = ({
	data: [num1, num2]
}) => {
	let initial = 0
	const result = num1 + num2;

	// for (let i = 0; i < 1e10; i++) {
	// 	initial += i
	// }

	(async () => {
		let req = await fetch('https://api.github.com/users/ooade')
		let json = await req.json()

	})()

	postMessage([result, initial])

}