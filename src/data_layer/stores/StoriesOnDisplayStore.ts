import { observable } from 'mobx';

export enum PhotoFilter {
    ALL,
    //todo: 
}

export interface Story {
    image: string;
    title: string;
    //todo:
}

export class StoriesOnDisplayStore {
    @observable private _storiesToDisplay: Story[] = [];
    @observable private _storeIsReady: boolean = false;

    private _allStories: Story[] = [];

    constructor() {
        //todo: get stories from databbase.then((results) => {

        this._allStories = [];
        this._storeIsReady = true;
        // }
    }

    public get storiesToDisplay(): Story[] {
        return this._storiesToDisplay;
    }

    public get storeIsReady(): boolean {
        return this._storeIsReady;
    }

    public filterStoriesToDisplay(filter: PhotoFilter): void {
        const allStories = this._allStories;

        switch (filter) {
            case PhotoFilter.ALL:
                this._storiesToDisplay = [...allStories];
                break;
            default:
                console.assert(false, 'case @filterStoriesToDisplay() was not accounted for');
        }
    }
}
