
export class SetStores {
    static readonly type = '[stores] set stores';
}

export class SetItems {
    static readonly type = '[stores] set items';
    constructor(public storeId: string) {}
}

export class SetStore {
    static readonly type = '[stores] set store';
    constructor(public storeId: string) {}
}

export class SetItem {
    static readonly type = '[stores] set item';
    constructor(public itemId: string) {}
}