'use client';
import { useEffect, useRef } from 'react';
import { usePlayerStore } from './PlayerStore';

export default function AudioEngine() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentTrack, isPlaying, volume, isMuted, setProgress, setDuration, setPlaying, next, repeatMode } = usePlayerStore();

  // Create audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => setProgress(audio.currentTime));
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('ended', () => {
      if (repeatMode === 'one') { audio.currentTime = 0; audio.play(); }
      else next();
    });
    audio.addEventListener('pause', () => setPlaying(false));
    audio.addEventListener('play',  () => setPlaying(true));

    return () => { audio.pause(); audio.src = ''; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track changed
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.src = currentTrack.audio;
    audio.load();
    if (isPlaying) audio.play().catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.id]);

  // Play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying]);

  // Volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  return null;
}
