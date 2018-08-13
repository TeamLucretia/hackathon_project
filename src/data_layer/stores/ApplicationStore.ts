import { StoriesOnDisplayStore } from './StoriesOnDisplayStore';
import { observable } from 'mobx';

export class ApplicationStore {
    @observable
    private _storiesOnDisplayStore = new StoriesOnDisplayStore();

    public get storiesOnDisplayStore() {
        return this._storiesOnDisplayStore;
    }
}
