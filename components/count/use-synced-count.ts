import { useCallback } from "react"
import { useRouter } from "next/navigation"

import { useBroadcast } from "./use-broadcast-channel"
import * as server from "./server"

export function useSyncedCount(count: number) {
	const router = useRouter()

	const send = useBroadcast<void>("count", function () {
		router.refresh()
	}, [router])

	const increment = useCallback(async function () {
		await server.increment()
		send()
	}, [send])

	return {
		count,
		increment,
	}
}
