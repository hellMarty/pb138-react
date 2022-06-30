import {Col, Row} from 'react-bootstrap';
import { SetterOrUpdater, useRecoilValue } from 'recoil';
import { songQueueSelector } from '../state/selectors';
import type {Song} from '../types';
import {SongItem} from './SongItem';

export const Queue = () => {
  // @todo todo take the actual songs from Recoil
  const songs = useRecoilValue(songQueueSelector);

  const onSongClick = (author: string, name: string, setSongList: SetterOrUpdater<Song[]>) => {
    setSongList((songs: Song[]) => 
      songs.map((s) => {
        if (s.author === author && s.name === name) {
          return {...s, inQueue: !s.inQueue};
        }
        return s;
      })
    )
  };

  return (
    <Row className="border">
      <Col>
        <h2>Queue</h2>
        {songs.map((song, index) => (
          <SongItem key={index} {...song} actionButtonName={'Remove'} onAction={onSongClick} />
        ))}
      </Col>
    </Row>
  );
};
