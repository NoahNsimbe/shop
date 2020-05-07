
export class ConfirmOrder {
static readonly type = '[app] confirm order';
}

export class OrderSuccess {
static readonly type = '[app] order success';
}

export class OrderFailed {
static readonly type = '[app] order failed';
}

export class SetCart {
static readonly type = '[app] get items';
constructor(public storeId: string) {}
}

export class SetOrders {
static readonly type = '[app] set order';
constructor(public storeId: string) {}
}

export class GetOrders {
static readonly type = '[app] get order';
}

export class AddToCart {
static readonly type = '[app] add item';
constructor(public itemId: string) {}
}

export class UpdateAmount {
    static readonly type = '[app] add item';
}

export class RemoveFromCart {
static readonly type = '[app] remove item';
constructor(public itemId: string) {}
}
  