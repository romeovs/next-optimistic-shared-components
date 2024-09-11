"use client"

import { useCallback, useOptimistic } from "react"
import { useRouter } from "next/navigation"

import { useSyncedCount } from "./use-synced-count"

export function CountClient(props: { count: number }) {
	const { count } = useSyncedCount(props.count)
	return <div>Count: {count}</div>
}

export function IncrementClient(props: { count: number }) {
	const router = useRouter()
	const { count, increment } = useSyncedCount(props.count)
	const [optimisticCount, incrementOptimisticCount] = useOptimistic(count, function (count) {
		return count + 1
	})

	const handleClick = useCallback(function () {
		incrementOptimisticCount({})
		increment()
		router.refresh()
	}, [incrementOptimisticCount, router])

	return <button onClick={handleClick}>Increment: {optimisticCount}</button>
}
