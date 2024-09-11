import { IncrementClient } from "./client"
import { read } from "./server"

export async function Count() {
	const count = await read()
	return <div>Count: {count}</div>
}

export async function Increment() {
	const count = await read()
	return <IncrementClient count={count} />
}
