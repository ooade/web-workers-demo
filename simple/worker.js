onmessage = ({ data: [num1, num2] }) => {
	postMessage(num1 + num2)
}
