'use client';
import { type NextPage } from 'next';
import React, { useRef, useState } from 'react';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

const sound = {
  title: 'Card Title',
  waveType: 'music.mp3',
  imageUrl: '/bg_img.png',
  imagesize: 200,
};

const Home: NextPage = () => {
  const maxVol = 1;
  const step = 0.1;
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(maxVol);
  const audioRef = useRef<HTMLAudioElement>(null);

  function toggleAudio(): void {
    if (play) {
      audioRef.current?.pause();
      setPlay(false);
    } else {
      void audioRef.current?.play();
      setPlay(true);
    }
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    setVolume(Number(value));
    // const volume = Number(value) / maxVol;
    audioRef.current.volume = volume;
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900">
        <div className="bg-accent flex h-fit MAX-w-fit flex-col rounded-lg border-2 border-cyan-700 pb-4 text-center shadow">
          <div className="relative flex flex-col space-y-0">
            <Image
              width={sound.imagesize}
              height={sound.imagesize}
              className="mx-auto MAX-h-48 w-full flex-shrink-0 rounded-t-lg pb-2"
              src={sound.imageUrl}
              alt="waves"
            />
            <button
              onClick={toggleAudio}
              type="button"
              className="absolute right-5 left-0 top-[15%] m-auto w-9 rounded-full p-2 text-white shadow-sm"
            >
              {!play ? (
                <PlayIcon className="h-12 w-12" aria-hidden="true" />
              ) : (
                <PauseIcon className="h-12 w-12" aria-hidden="true" />
              )}
            </button>
            <dl className="mt-1 flex flex-col p-4 ">
              <dd className="text-lg text-white">{sound.title}</dd>
            </dl>
            <div className="mx-4 flex">
              <input
                type="range"
                className="mr-2 w-full accent-cyan-700"
                min={0}
                max={maxVol}
                step={step}
                value={volume}
                onChange={(e) => handleVolume(e)}
              />
              <SpeakerWaveIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <audio ref={audioRef} src={'/music.mp3'} />
      </main>
    </>
  );
};

export default Home;
