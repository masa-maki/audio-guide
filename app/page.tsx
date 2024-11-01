'use client';
import { type NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

const guide = {
  title: 'Guide 01',
  audio: './music.mp3',
  imageUrl: '/bg_img.png',
  imagesize: 300,
};


const Home: NextPage = () => {
  const maxVol = 1;
  const step = 0.1;
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioVolume, setAudioVolume] = useState(maxVol);
  const audioRef = useRef<HTMLAudioElement>(null);


  const [audio] = useState(
    new Audio(guide.audio)
  );

  // Update play / pause
  useEffect(() => {
    if (audioPlaying) {
      audio.play().catch(() => {
        throw new Error("Audio file not found");
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [audio, audioPlaying]);

  // Set ended status when the audio ended
  useEffect(() => {
    const onEnded = () => {
      setAudioPlaying(false);
      audio.pause();
    };

    audio.addEventListener("ended", onEnded);
    return () => {
      audio.addEventListener("ended", onEnded);
    };
  }, [audio, audioPlaying]);

// Update play time
  useEffect(() => {
    const onTimeupdate = () => {
      setAudioCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", onTimeupdate);
    return () => {
      audio.removeEventListener("timeupdate", onTimeupdate);
    }
  }, [audio, setAudioCurrentTime]);

  // Get value for Time bar
  const getTimeStringFromSeconds = (seconds: number): string => {
    const floorSeconds = Math.floor(seconds);
    const mm = String((floorSeconds / 60) % 60).padStart(2, "0");
    const ss = String(floorSeconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  // Jump to specific time
  const audioJump = (targetSecond: number) => {
    if (!isNaN(targetSecond) && isFinite(targetSecond)) {
      audio.currenttime = targetSecond;
    }
  }


  return (
    <>
      <main className="flex h-screen sm:h-full w-full flex-col items-center justify-center p-0 sm:p-4">
        <div className="bg-accent flex h-screen sm:h-full w-full sm:max-w-fit sm:rounded-lg bg-gray-100 pb-4 text-center shadow">
          <div className="w-full flex flex-col space-y-0">
            <Image
              width={guide.imagesize}
              height={guide.imagesize}
              className="w-full h-auto flex-shrink-1 rounded-t-lg pb-2"
              src={guide.imageUrl}
              alt="waves"
            />
            <dl className="mt-1 flex flex-col p-4 ">
              <dd className="text-lg text-zinc-900">{guide.title}</dd>
            </dl>

            <div className="flex">
              <input
                type="range"
                className="mr-2 mx-auto w-full accent-cyan-700"
                min={0}
                max={audio.duration}
                onChange={audioJump}
                value={audioCurrentTime}
              />
            </div>
            {getTimeStringFromSeconds(audioCurrentTime)}
            <div className="flex flex-col items-center justify-center">
              <button
                // onClick={toggleAudio}
                onClick = {() => {
                  setAudioPlaying((prev) => !prev,)
                }}
                type="button"
                className="bg-cyan-700 rounded-full p-2 text-white shadow-s"
              >
                {!audioPlaying ? (
                  <PlayIcon className="h-8 w-8" aria-hidden="true" />
                ) : (
                  <PauseIcon className="h-8 w-8" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        <audio ref={audioRef} src={guide.audio} />
      </main>
    </>
  );
};

export default Home;
