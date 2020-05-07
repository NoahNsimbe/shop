
export class SetStores {
    static readonly type = '[app] set stores';
}

export class SetItems {
    static readonly type = '[app] set items';
    constructor(public storeId: string) {}
}

export class SetStore {
    static readonly type = '[app] set store';
    constructor(public storeId: string) {}
}