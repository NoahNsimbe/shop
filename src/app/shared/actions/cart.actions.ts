export class SetCart {
static readonly type = '[cart] set cart';
constructor(public storeId: string) {}
}


export class AddToCart {
static readonly type = '[cart] add item';
constructor(public itemId: string) {}
}

export class UpdateAmount {
    static readonly type = '[cart] update amount';
}

export class RemoveFromCart {
	static readonly type = '[cart] remove item';
	constructor(public itemId: string) {}
}

export class DecrementCart {
	static readonly type = '[cart] decrement cart';
	constructor(public itemId: string) {}
}

export class DecrementCartItem {
	static readonly type = '[cart] decrement cart item';
	constructor(public itemId: string) {}
}

export class IncrementCartItem {
	static readonly type = '[cart] increment cart item';
	constructor(public itemId: string) {}
}
  