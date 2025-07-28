export const createGenerator = function* <T>(list: Array<T>): Generator<T> {
	for (const item of list) {
		yield item
	}
}
