const global = window as any;
const origin: { [prop: string]: any } = {};

export function addMock(prop: string, mock: any): void {

    origin[prop] = global[prop];
    global[prop] = mock;

}

export function removeMock(prop: string): void {

    global[prop] = origin[prop];
    origin[prop] = undefined;

}
