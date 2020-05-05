export class SetUsername {
  static readonly type = '[app] set username';
  constructor(public payload: string) {}
}

export class ConfirmOrder {
  static readonly type = '[app] confirm order';
}

export class OrderSuccess {
  static readonly type = '[app] order success';
}

export class OrderFailed {
  static readonly type = '[app] order failed';
}

export class SetStores {
  static readonly type = '[app] get stores';
}

export class SetItems {
  static readonly type = '[app] get items';
  constructor(public storeId: string) {}
}

export class SetOrder {
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

export class RemoveFromCart {
  static readonly type = '[app] remove item';
  constructor(public storeId: string) {}
}
