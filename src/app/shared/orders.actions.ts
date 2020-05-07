
export class ConfirmOrder {
static readonly type = '[orders] confirm order';
}

export class OrderSuccess {
static readonly type = '[orders] order success';
}

export class OrderFailed {
static readonly type = '[orders] order failed';
}

export class SetCart {
static readonly type = '[orders] set cart';
constructor(public storeId: string) {}
}

export class SetOrders {
static readonly type = '[orders] set orders';
constructor(public storeId: string) {}
}

export class GetOrders {
static readonly type = '[orders] get orders';
}

export class AddToCart {
static readonly type = '[orders] add item';
constructor(public itemId: string) {}
}

export class UpdateAmount {
    static readonly type = '[orders] update amount';
}

export class RemoveFromCart {
static readonly type = '[orders] remove item';
constructor(public itemId: string) {}
}
  