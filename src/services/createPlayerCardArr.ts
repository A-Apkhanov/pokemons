export function createPlayerCardArr<T, U>(
	obj: T,
	possession: U
): Array<T[keyof T] & { possession: U; key: string }> {
	const copyArr = Object.entries(obj);
	const newArr = [];
	for (let item of copyArr) {
		newArr.push({
			...item[1],
			key: item[0],
			possession: possession,
		});
	}
	return newArr;
}
