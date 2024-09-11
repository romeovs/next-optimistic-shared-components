"use client"


import { useSyncedCount } from "./use-synced-count"

export function CountClient(props: { count: number }) {
	const { count } = useSyncedCount(props.count)
	return <div>Count: {count}</div>
}

export function IncrementClient(props: { count: number }) {
	const { count, increment } = useSyncedCount(props.count)
	return <button onClick={increment}>Increment: {count}</button>
}
