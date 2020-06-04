import { StoreItem } from '../models/store-items';
import { Cart } from '../models/cart';

export class SetCart {
static readonly type = '[cart] set cart';
constructor(public storeId: string) {}
}


export class AddToCart {
static readonly type = '[cart] add item';
constructor(public item: Cart) {}
}

export class UpdateCartTotal {
    static readonly type = '[cart] update total';
}

export class RemoveFromCart {
	static readonly type = '[cart] remove item';
	constructor(public item: Cart) {}
}

export class DecrementCart {
	static readonly type = '[cart] decrement cart';
	constructor(public itemId: string) {}
}

export class DecrementCartItem {
	static readonly type = '[cart] decrement cart item';
	constructor(public item: Cart) {}
}

export class IncrementCartItem {
	static readonly type = '[cart] increment cart item';
	constructor(public itemId: string) {}
}
  