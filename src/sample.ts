export class Sample {
	readonly #foo: string;

	public constructor(foo: string) {
		this.#foo = foo;
	}

	public foo(): string {
		return this.#foo;
	}
}
