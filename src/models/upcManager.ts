export interface iUPC {
	id: number
	name: string
	category: string
	subcategory: string
	fineline: string
	color?: string
	brand: string
	// subbrand: str
	brand_owner: string
	length: number
	width: number
	height: number
}

export interface iUPCList {
	upcs: Array<iUPC>
}
