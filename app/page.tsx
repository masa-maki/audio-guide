'use client';
import { type NextPage } from 'next';
import React, { useRef, useState } from 'react';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

const sound = {
  title: 'Guide 01',
  waveType: 'music.mp3',
  imageUrl: '/bg_img.png',
  imagesize: 200,
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
    if(audioRef.current){
      audioRef.current.volume = volume;
    }
  }

  const getUserLocation = () => {
    console.log("loading location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error get user location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    } 
  };


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
            <div className="center">
                <div className="btn-margin text-white text-xs">
                  <button
                    onClick={getUserLocation}
                    type="button"
                    className="font-bold py-2 px-4 rounded text-white mt-4 mb-2 bg-blue-500 hover:bg-blue-700"
                  >
                    Get location
                  </button>
                </div>
                {userLocation && (
                  <div className="txt-margin text-white text-xs">
                    <p>Latitude: <span id="latitude">{userLocation.latitude}</span></p>
                    <p>Longitude: <span id="longitude">{userLocation.longitude}</span></p>
                 </div>
                )}
            </div>
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
