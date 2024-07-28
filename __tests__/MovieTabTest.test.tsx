import React from 'react';
import {render} from '@testing-library/react-native';
import MovieListView from '../src/ui/components/MovieListView';
import {nowPlayingMovieActions} from '../src/redux/action';
import {getInitialData} from '../src/redux/state';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

test('Tab Snapshot', () => {
  const snap = render(
    <MovieListView
      movieDataState={getInitialData()}
      movieAction={nowPlayingMovieActions}
    />,
  ).toJSON();
  expect(snap).toMatchSnapshot();
});
