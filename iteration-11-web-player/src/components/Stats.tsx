import {Col, Row} from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import {humanizeSongLength} from '../misc/utils';
import { songListAtom } from '../state/atom';
import { queueLengthSelector, songsPlayedSelector, songsQueuedSelector } from '../state/selectors';

export const Stats = () => {
  // Todo retrieve from a nice recoil selector instead
  const totalSongs = useRecoilValue(songListAtom).length;
  const songsInQueue = useRecoilValue(songsQueuedSelector);
  const songsPlayed = useRecoilValue(songsPlayedSelector);
  const songLength = useRecoilValue(queueLengthSelector);



  const statsToRender = [
    {key: 'Total songs', value: totalSongs},
    {key: 'Songs queued', value: songsInQueue},
    {key: 'Songs played', value: songsPlayed},
    {key: 'Left to play', value: humanizeSongLength(songLength)},
  ];

  return (
    <Row className="mt-5">
      <h2>Stats about your playback</h2>
      <Col>
        {statsToRender.map((stat, idx) => (
          <p key={idx}>
            {stat.key}: {stat.value}
          </p>
        ))}
      </Col>
    </Row>
  );
};
