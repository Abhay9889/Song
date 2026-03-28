'use client';
import { create } from 'zustand';
import { Track } from '@/lib/types';

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  queueIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: 'none' | 'all' | 'one';
  setTrack: (track: Track, queue?: Track[], index?: number) => void;
  togglePlay: () => void;
  setPlaying: (v: boolean) => void;
  setProgress: (v: number) => void;
  setDuration: (v: number) => void;
  next: () => void;
  prev: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  queueIndex: 0,
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 0.8,
  isMuted: false,
  isShuffled: false,
  repeatMode: 'none',

  setTrack: (track, queue = [], index = 0) => set({
    currentTrack: track, queue, queueIndex: index, isPlaying: true, progress: 0
  }),

  togglePlay: () => set(s => ({ isPlaying: !s.isPlaying })),
  setPlaying: (v) => set({ isPlaying: v }),
  setProgress: (v) => set({ progress: v }),
  setDuration: (v) => set({ duration: v }),

  next: () => {
    const { queue, queueIndex, isShuffled, repeatMode } = get();
    if (!queue.length) return;
    let nextIdx: number;
    if (isShuffled) {
      nextIdx = Math.floor(Math.random() * queue.length);
    } else if (repeatMode === 'one') {
      nextIdx = queueIndex;
    } else {
      nextIdx = (queueIndex + 1) % queue.length;
    }
    set({ currentTrack: queue[nextIdx], queueIndex: nextIdx, progress: 0, isPlaying: true });
  },

  prev: () => {
    const { queue, queueIndex, progress } = get();
    if (progress > 3) { set({ progress: 0 }); return; }
    if (!queue.length) return;
    const prevIdx = queueIndex > 0 ? queueIndex - 1 : queue.length - 1;
    set({ currentTrack: queue[prevIdx], queueIndex: prevIdx, progress: 0, isPlaying: true });
  },

  toggleShuffle: () => set(s => ({ isShuffled: !s.isShuffled })),
  toggleRepeat: () => set(s => ({
    repeatMode: s.repeatMode === 'none' ? 'all' : s.repeatMode === 'all' ? 'one' : 'none'
  })),
  setVolume: (v) => set({ volume: v, isMuted: v === 0 }),
  toggleMute: () => set(s => ({ isMuted: !s.isMuted })),
}));
