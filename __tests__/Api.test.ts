import {getRequestToken} from '../src/api/helper';
import {getPostImageUrl} from '../src/utils/helper';

it('Testing image url function', () => {
  expect(getPostImageUrl('/hZkgoQYus5vegHoetLkCJzb17zJ.jpg', 'large')).toMatch(
    'https://image.tmdb.org/t/p/w500/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
  );
});

it('Testing get request token api', async () => {
  expect(await getRequestToken()).toBeDefined();
});
