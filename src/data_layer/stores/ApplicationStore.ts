import { StoryStore } from './StoriesOnDisplayStore';
import { observable } from 'mobx';

//holds our different stores, if you need a new store you'd add it here
export class ApplicationStore {
    @observable
    private _storyStore = new StoryStore();

    public get storyStore() {
        return this._storyStore;
    }
}
