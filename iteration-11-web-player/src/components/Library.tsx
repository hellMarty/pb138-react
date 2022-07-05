import { useEffect } from 'react';
import {Col, Row, Spinner} from 'react-bootstrap';
import { SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { filterAtom, songListAtom } from '../state/atom';
import { songListSelector } from '../state/selectors';
import type { Song } from '../types';
import { SongItem } from './SongItem';

const NoConnection = () => (
  <Row className="border mt-5">
    <Col>
      <h3>No internet connection!</h3>
    </Col>
  </Row>
);

export const Library = () => {
  // Todo take the actual songs from Recoil
  const setSongList = useSetRecoilState(songListAtom);
  const [filter, setFilter] = useRecoilState(filterAtom);
  const songs = useRecoilValue(songListSelector);

  // Todo seed the db from https://www.fi.muni.cz/~xorsula1/resources/songs.php use useEffect and local states for errors&loading
  // you can skip loading for web and hardcode the values in code. 1pt will be deducted from your solution
  
  const error = false;
  const loading = false;

  useEffect(() => {
    fetch("https://www.fi.muni.cz/~xorsula1/resources/songs.php")
    .then(response => response.json())
    .then(data => {
      setSongList(data);
    })
  }, [])

  const onSongClicked = (author: string, name: string, setSongList: SetterOrUpdater<Song[]>) => {
    setSongList((songs: Song[]) =>
      songs.map((s) => {
        if (s.author === author && s.name === name && !s.inQueue) {
          return {...s, inQueue: !s.inQueue, playing: false};
        }
        return s;
      })
    )
    console.log(songs);
  };

  const updateFilter = () => {
    setFilter(filter === "all" ? "notQueued" : "all");
  }

  if (error) return <NoConnection />;

  return (
    <Row className="border mt-5">
      <Col>
        <Row>
          <Col>
            <h2>Library</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <input className="form-check-input me-2 mb-3" type="checkbox" value="" id="flexCheckDefault" onChange={() => updateFilter()}/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Show songs already in queue
            </label>
          </Col>
        </Row>
        {loading && (
          <Row>
            <Col>
              <Spinner animation="border" />
            </Col>
          </Row>
        )}
        {songs.map((song: Song, index) => (
          <SongItem key={index} {...song} actionButtonName={'Add'} onAction={onSongClicked} />
        ))}
      </Col>
    </Row>
  );
};
