"use client"

import { useCallback, useOptimistic } from "react"
import { useRouter } from "next/navigation"

import { increment } from "./server"

export function IncrementClient(props: { count: number }) {
	const router = useRouter()
	const [optimisticCount, incrementOptimisticCount] = useOptimistic(props.count, function (count) {
		return count + 1
	})

	const handleClick = useCallback(function () {
		incrementOptimisticCount({})
		increment()
		router.refresh()
	}, [incrementOptimisticCount, router])

	return <button onClick={handleClick}>Increment: {optimisticCount}</button>
}
