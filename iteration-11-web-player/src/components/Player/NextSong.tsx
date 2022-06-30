import { useRecoilValue } from 'recoil';
import { nextInQueueSelector } from '../../state/selectors';
import type {Song} from '../../types';

export const NextSong = () => {
  // @todo retrieve from Recoil
  const nextSong: Song | undefined = useRecoilValue(nextInQueueSelector);
  return <span>Next: {nextSong ? nextSong.name : "Empty song"}</span>;
};
