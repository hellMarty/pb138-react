// Selectors go here
// if you have too many selectors feel free to split them into multiple files based on their purpose
import { selector } from 'recoil';
import { filterAtom, songListAtom } from './atom';
import { Song } from '../types/song';

export const songListSelector = selector({
    key: "songListSelector",
    get: ({ get }) => {
        const songs = get(songListAtom);
        const filter = get(filterAtom);
        
        switch (filter) {
            case "notQueued":
                return songs.filter((song: Song) => (!song.inQueue));
            default:
                return songs;
        }
    }
});

export const songQueueSelector = selector({
    key: "songQueueSelector",
    get: ({ get }) => {
        const songs = get(songListAtom);
        return songs.filter((song: Song) => (song.inQueue));
    }
});

export const queueLengthSelector = selector({
    key: "queueLengthSelector",
    get: ({ get }) => {
        const songs = get(songListAtom);
        return songs
                .filter((s: Song) => s.inQueue)
                .map((s: Song) => s.length)
                .reduce((prev, current) => prev + current, 0) 
    }
})

export const songsQueuedSelector = selector({
    key: "songsQueuedSelector",
    get: ({ get }) => {
        const songs = get(songListAtom);
        return songs
                .filter((s: Song) => s.inQueue)
                .reduce((prev) => prev + 1, 0) 
    }
})

export const songsPlayedSelector = selector({
    key: "songsPlayedSelector",
    get: ({ get }) => {
        const songs = get(songListAtom);
        return songs
                .filter((s: Song) => s.played)
                .reduce((prev) => prev + 1, 0) 
    }
})

export const firstInQueueSelector = selector({
    key: "firstInQueueSelector",
    get: ({ get }) => {
        const songs = get(songListAtom);
        return songs.filter((s: Song) => s.inQueue).at(0);
    }
})

export const nextInQueueSelector = selector({
    key: "nextInQueueSelector",
    get: ({ get }) => {
        const songs = get(songListAtom);
        return songs.filter((s: Song) => s.inQueue).at(1);
    }
})
