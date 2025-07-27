declare interface IActionItems {
	label: string
	icon?: string
	props?: Record<string, unknown>
	callback: () => void
}
