export interface StoryImage {
    src: string;
    thumbnail: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
    //todo: additional info?
}

const DUMMY_IMAGES: StoryImage[] =
    [{
        src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
        thumbnail: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg',
        thumbnailWidth: 320,
        thumbnailHeight: 174,
    },
    {
        src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
        thumbnail: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg',
        thumbnailWidth: 320,
        thumbnailHeight: 212,
    },

    {
        src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
        thumbnail: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg',
        thumbnailWidth: 320,
        thumbnailHeight: 212
    }];

export function GET_DUMMY_IMAGES() {
    const images: StoryImage[] = [];

    //builds a random sort of images of different sizes to replicate the images we'll get from mia.
    for (let index = 0; index < 50; index++) {
        const img = { ...DUMMY_IMAGES[Math.floor(Math.random() * 3)] };
        img.thumbnailWidth = Math.floor(Math.random() * 450) + 200;
        img.thumbnailHeight = Math.floor(Math.random() * 450) + 200;
        images.push({ ...img });
    }

    return images;
}