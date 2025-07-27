export default function () {
	return useState<boolean>('loadingRoute', () => false)
}
