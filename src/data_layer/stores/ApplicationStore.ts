import { ExampleStore } from './ExampleStore';
import { observable } from '../../../node_modules/mobx';

export class ApplicationStore {
    @observable private _exampleStore = new ExampleStore();

    public get exampleStore() {
        return this._exampleStore;
    }
}
