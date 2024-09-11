import { CountClient, IncrementClient } from "./client"
import { read } from "./server"

export async function Count() {
	const count = await read()
	return <CountClient count={count} />
}

export async function Increment() {
	const count = await read()
	return <IncrementClient count={count} />
}
