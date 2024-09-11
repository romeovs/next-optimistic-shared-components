"use client"
import { type DependencyList, useCallback, useEffect, useRef } from "react"

/**
 * useBroadcast allows for cross-tab communication using BroadcastChannel.
 *
 * @requires BroadcastChannel
 *
 * @param name -
 *   the unique name of the channel, shared between all instances,
 *   will be passed to BroadcastChannel.
 * @param onMessage -
 *   a handler that will be called with each incoming message, leave this empty
 *   if you don't need to listen to messages.
 *   This will be memoizied using useCallback.
 * @param deps -
 *   Dependency list passed to useCallback when memoizing the onMessabge callback.
 *   Defaults to no memoization.
 * @returns The current value and a setter for the value [value, setValue]
 */
export function useBroadcast<Message>(
	name: string,
	onMessage?: (message: Message) => void,
	deps?: DependencyList,
): (message: Message) => void {
	const ref = useRef<BroadcastChannel | null>(null)

	// biome-ignore lint/correctness/useExhaustiveDependencies: we can't detect it
	const handler = useCallback(function (evt: MessageEvent) {
		onMessage?.(evt.data)
	}, deps ?? [onMessage])

	useEffect(
		function () {
			if (!ref.current) {
				ref.current = new BroadcastChannel(name)
			}

			ref.current.addEventListener("message", handler)

			return function () {
				if (!ref.current) {
					return
				}
				ref.current.removeEventListener("message", handler)
				ref.current.close()
				ref.current = null
			}
		},
		[name, handler],
	)

	return useCallback(
		function (message: Message) {
			if (ref.current) {
				ref.current.postMessage(message)
				return
			}

			const chan = new BroadcastChannel(name)
			chan.postMessage(message)
			chan.close()
		},
		[name],
	)
}
