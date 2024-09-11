import { useCallback, useOptimistic, startTransition, useRef } from "react"
import { useRouter } from "next/navigation"

import { useBroadcast } from "./use-broadcast-channel"
import * as server from "./server"

type Action = "init" | "commit"

export function useSyncedCount(count: number) {
	const router = useRouter()

	const [optimisticCount, incrementOptimisticCount] = useOptimistic(count, function (count) {
		return count + 1
	})

	const ref = useRef(null)

	const send = useBroadcast<Action>("count", function (action) {
		if (action === "init") {
			startTransition(async function () {
				incrementOptimisticCount({})
				await new Promise<void>(function (resolve) {
					const old = ref.current
					ref.current = function () {
						old?.()
						resolve()
					}
				})
			})
		}
		if (action === "commit") {
			startTransition(function () {
				ref.current?.()
				ref.current = null
				router.refresh()
			})
		}
	}, [router, incrementOptimisticCount])

	const increment = useCallback(async function () {
		send("init")
		incrementOptimisticCount({})
		await server.increment()
		router.refresh()
		send("commit")
	}, [send])

	return {
		count: optimisticCount,
		increment,
	}
}
