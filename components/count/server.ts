"use server"
import fs from "node:fs/promises"

const FILENAME = "./count.json"
const DELAY = 1000

export async function read() {
	try {
		const data = await fs.readFile(FILENAME, "utf-8")
		return JSON.parse(data).count
	} catch (err) {
		return 0
	}
}

export async function increment() {
	await delay()

	const current = await read()
	const next = current + 1
	await write(current + 1)
	return next
}

async function write(count: number) {
	const data = JSON.stringify({ count })
	await fs.writeFile(FILENAME, data)
}

async function delay(ms: number = DELAY) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
