import {Button, Col, Row} from 'react-bootstrap';
import type {Song} from '../types';
import {humanizeSongLength} from '../misc/utils';
import { songListAtom } from '../state/atom';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';

export type SongProps = Song & {
  /**
   *  The actionButton* props serve to wire up the button. Use for adding/removing songs to and from queue
   */
  actionButtonName: string;
  onAction: (author: string, name: string, updateList: SetterOrUpdater<Song[]>) => void;
};

export const SongItem = ({name, author, coverURL, length, actionButtonName, onAction}: SongProps) => {
  const setSongList = useSetRecoilState(songListAtom);
  console.log(author, name, coverURL);
  
  return (
    <Row className="border d-flex align-items-center p-1">
      <Col md="3">
        <img className="img-fluid" src={coverURL} alt="song cover" style={{maxHeight: 50}} />
      </Col>
      <Col md="2">
        <span>{name}</span>
      </Col>
      <Col md="2">
        <span>{author}</span>
      </Col>
      <Col md="2">
        <span>{humanizeSongLength(length)}</span>
      </Col>
      <Col md="3">
        <Button variant="outline-primary" onClick={() => onAction(author, name, setSongList)}>
          {actionButtonName}
        </Button>
      </Col>
    </Row>
  );
};
