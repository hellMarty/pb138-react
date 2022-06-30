import {Button, Col, Row} from 'react-bootstrap';
import type {Song} from '../../types';
import {humanizeSongLength} from '../../misc/utils';
import {NextSong} from './NextSong';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { firstInQueueSelector } from '../../state/selectors';
import { songListAtom } from '../../state/atom';
import { useEffect } from 'react';

// Do not worry about actual playback, just make skipping to next song work
export const Player = () => {
  // Todo take the actual song from Recoil
  const currentSong: Song | undefined = useRecoilValue(firstInQueueSelector);
  const setSongList = useSetRecoilState(songListAtom);

  if (!currentSong) {
    return <Row className="mt-5 border align-items-center"><Col>Empty Queue</Col></Row>;
  }

  const nextClicked = () => {
    setSongList((songs: Song[]) => 
      songs.map((s) => {
        if (currentSong.name === s.name && currentSong.author === s.author) {
          return {...s, inQueue: !s.inQueue, played: true};
        }
        return s;
      })
    )
  };

  return (
    <Row className="mt-5 d-flex justify-content-between border align-items-center" style={{flexGrow: 1}}>
      <Col>
        <img className="img-fluid" src={currentSong.coverURL} alt="song cover" style={{maxHeight: 100}} />
      </Col>
      <Col>
        <Row>
          <Col>
            <span>Playing: {currentSong.name}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="small">{currentSong.author}</span>
          </Col>
          <Col>
            <span className="small">00:00/{humanizeSongLength(currentSong.length)}</span>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col className="m-2">
            <Button variant="success">Play</Button>
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            {/*
              TODO skip to the next song in queue
              1. remove current song from queue
              2. increase total songs played count
              3. set next song from queue as current one
              */}
            <Button variant="dark" onClick={nextClicked}>
              Next
            </Button>
          </Col>
        </Row>
      </Col>
      <Col>
        <NextSong />
      </Col>
    </Row>
  );
};
