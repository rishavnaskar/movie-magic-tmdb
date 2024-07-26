import {BASE_URLS} from '../api/base_urls';

export const getPostImageUrl = (endPoint: string, size: 'small' | 'large') => {
  if (size === 'small') {
    return BASE_URLS.FETCH_IMAGE_SMALL.concat(endPoint);
  } else {
    return BASE_URLS.FETCH_IMAGE_LARGE.concat(endPoint);
  }
};
