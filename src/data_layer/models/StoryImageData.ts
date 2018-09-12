import axios, { AxiosResponse, AxiosError } from 'axios';

export interface StoryImageData {
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
  onView: string;
}

export function getImageData(): Promise<StoryImageData[]> {
  return axios
    .get('/api/art')
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => {
      console.log(error);
      return [];
    });
}
