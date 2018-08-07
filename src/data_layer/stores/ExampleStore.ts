import { observable } from '../../../node_modules/mobx';

export class ExampleStore {
    @observable private _example = 0;

    public get exampleNumber(): number {
        return this._example;
    }

    public incrementExample(): void {
        this._example++;
    }
}
