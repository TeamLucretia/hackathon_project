import axios from 'axios';

export interface StoryImage {
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  TEMP?: string;
  //todo: additional info?
}

const DUMMY_IMAGES: StoryImage[] = [
  {
    src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
    thumbnail:
      'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 174
  },
  {
    src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
    thumbnail:
      'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 212
  },

  {
    src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
    thumbnail:
      'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 212
  }
];

export async function getImages() {
  console.log('hello??');
  const result = await axios
    .get('/api/art')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
  console.log(result);
}

export function GET_DUMMY_IMAGES() {
  getImages();
  const images: StoryImage[] = [];

  const TEMP_KEYS = [
    'ONE',
    'TWO',
    'THREE',
    'ELEVEN',
    'TWELVE',
    'THIRTEEN',
    'TWENTY-ONE',
    'TWENTY-TWO',
    'TWENTY-THREE'
  ];

  //builds a random sort of images of different sizes to replicate the images we'll get from mia.
  for (let index = 0; index < 50; index++) {
    const img = { ...DUMMY_IMAGES[Math.floor(Math.random() * 3)] };
    img.thumbnailWidth = Math.floor(Math.random() * 450) + 200;
    img.thumbnailHeight = Math.floor(Math.random() * 450) + 200;
    img.TEMP = TEMP_KEYS[Math.floor(Math.random() * TEMP_KEYS.length)];
    images.push({ ...img });
  }

  return images;
}
