export type Cart = {
	id: string
	items: CartItem[]
}

export type CartItem = {
	id: string
	quantity: number
}
