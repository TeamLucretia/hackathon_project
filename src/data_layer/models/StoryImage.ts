import axios from 'axios';

export interface StoryImage {
  id: string;
  src: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  continent: string;
  country: string;
  medium: string;
  classification: string;
  style: string;
  onView: boolean;
}

export function getImages(): Promise<StoryImage[]> {
  return axios
    .get('/api/art')
    .then((response: any) => response.data)
    .catch((error: any) => {
      console.log(error);
      return [];
    });
}
