/* Atoms go here */
import { atom } from 'recoil';
import { Song } from '../types/song';

export const songListAtom = atom<Song[]>({
    key: "songList",
    default: []
});

export const filterAtom = atom({
    key: "filter",
    default: "notQueued"
});