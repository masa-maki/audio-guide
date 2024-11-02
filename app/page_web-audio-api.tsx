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

// const AutoPlayAudio = ({ audioUrl }) => {
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (audioUrl && audioRefRef.current) {
//       audioRef.current.play();
//     }
//   }, [audioUrl]);

//   return (
//     <audio ref={audioRef} controls>
//       <source src={audioUrl} type="audio/mpeg" />
//       Your browser does not support the audio element.
//     </audio>
//   );
// };

const AutoPlayAudio = ({ audioUrl }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
    }
  }, [audioUrl]);

  return (
    <audio ref={audioRef} controls>
      <source src={audioUrl} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};


const Home: NextPage = () => {
  const maxVol = 1;
  const step = 0.1;
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(maxVol);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    const generateAudio = async () => {
      const newAudioUrl = './music.mp3';
      setAudioUrl(newAudioUrl);
    };

    generateAudio();
  }, []);
  // useEffect(() => {
  //   const generateAudio = async () => {
  //     const newAudioUrl = '/bg_img.png';
  //     setAudioUrl(newAudioUrl);
  //   };

  //   generateAudio();
  // }, []);

  function toggleAudio(): void {
    if (play) {
      audioRef.current?.pause();
      setPlay(false);
    } else {
      void audioRef.current?.play();
      setPlay(true);
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

            {/* <div className="flex">
              <input
                type="range"
                className="mr-2 mx-auto w-full accent-cyan-700"
                min={0}
                max={maxVol}
                step={step}
                value={volume}
                onChange={(e) => handleVolume(e)}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={toggleAudio}
                type="button"
                className="bg-cyan-700 rounded-full p-2 text-white shadow-s"
              >
                {!play ? (
                  <PlayIcon className="h-8 w-8" aria-hidden="true" />
                ) : (
                  <PauseIcon className="h-8 w-8" aria-hidden="true" />
                )}
              </button>
            </div> */}
            {audioUrl && <AutoPlayAudio audioUrl={audioUrl} />}
          </div>
        </div>
        {/* <audio ref={audioRef} src={guide.audio} /> */}
      </main>
    </>
  );
};

export default Home;
