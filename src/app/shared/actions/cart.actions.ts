import { Cart } from '../models/cart';

export class SyncCart {
static readonly type = '[cart] sync cart';
}

export class AddToCart {
static readonly type = '[cart] add item to cart';
constructor(public item: string) {}
}

export class UpdateCartTotal {
    static readonly type = '[cart] update cart total';
}

export class RemoveFromCart {
	static readonly type = '[cart] remove cart item';
	constructor(public item: string) {}
}

export class DecrementCartItem {
	static readonly type = '[cart] decrement cart item';
	constructor(public item: string) {}
}

export class IncrementCartItem {
	static readonly type = '[cart] increment cart item';
	constructor(public itemId: string) {}
}
  