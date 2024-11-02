'use client';

import { type NextPage } from 'next';
import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
// import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

interface GuideData {
  title: string,
  audioFile: string,
  imageUrl: string;
}

const guide: GuideData = {
  title: 'Guide 01',
  audioFile: './tenkai-yashiro.mp3',
  // imageUrl: '/4584224_m.jpg',
  imageUrl: '/iwato-image.png',
};

const Home: NextPage = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && guide.audioFile) {
      audioRef.current.src = guide.audioFile;
    }
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const seekTime = (Number(e.target.value) / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
  
    audio.currentTime += seconds;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <main className="flex min-h-dvh sm:min-h-screen w-full flex-col items-center justify-center p-0 text-white">
        <div className="flex h-full sm:max-h-[812px] w-full sm:max-w-[375px] sm:rounded-lg text-center shadow bg-[#2B1A36]">
          <div className="w-full flex flex-col space-y-0">
            <section id="image" className="w-full h-4/6 overflow-hidden rounded-b-3xl">
            {/*style={{width: "100%", height: "70%", borderRadius: "0 0 20px 20px", overflow: "hidden"}*/}
              <Image
                width={500}
                height={500}
                className="w-full h-full flex-shrink-1 p-0 object-cover"
                src={guide.imageUrl}
                alt={guide.title}
              />
            </section>
            
            <section id="information" className="flex w-full h-2/6 flex-col justify-items-center justify-center">
              <h2 className="mt-1 flex flex-col p-1 mb-8 text-2xl">{guide.title}</h2>

              <div>
                <div className="flex mx-4 mb-2">
                  <input
                    type="range"
                    className="mr-2 mx-auto w-full accent-cyan-700"
                    min={0}
                    max={duration}
                    onChange={handleSeek}
                    value={currentTime}
                  />
                </div>
                <p>{formatTime(currentTime)}</p>
              </div>
              <div id="player" className="pt-8 flex flex-row gap-x-4 items-center justify-center">
                <button 
                  onClick={ () => skipTime(-10) } 
                  className="bg-white rounded-full p-2 text-white shadow-s"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 14 14" fill="none">
                    <path d="M7.00006 13.6007C10.2638 13.6007 12.9766 10.8937 12.9766 7.62422C12.9766 4.74147 10.8673 2.29797 8.13081 1.75922V0.926717C8.13081 0.510717 7.84381 0.399217 7.52156 0.627967L5.65231 1.93447C5.38881 2.12197 5.38281 2.40322 5.65231 2.59672L7.51556 3.90922C7.84381 4.14347 8.13081 4.03222 8.13081 3.61022V2.77272C10.3458 3.27647 11.9746 5.25122 11.9746 7.62422C11.9773 8.27852 11.8505 8.92689 11.6015 9.53198C11.3526 10.1371 10.9864 10.6869 10.524 11.1499C10.0616 11.6128 9.51217 11.9797 8.90737 12.2294C8.30258 12.4791 7.65436 12.6066 7.00006 12.6047C4.23431 12.6047 2.01381 10.3897 2.01956 7.62422C2.02531 5.96022 2.83406 4.48947 4.08206 3.59897C4.32231 3.41722 4.39856 3.14172 4.24606 2.89572C4.10556 2.65572 3.78331 2.59097 3.52531 2.79022C2.01381 3.88597 1.02356 5.65547 1.02356 7.62422C1.02356 10.8937 3.73056 13.6007 7.00006 13.6007ZM8.41206 10.091C9.38481 10.091 10.0236 9.17097 10.0236 7.76497C10.0236 6.34697 9.38481 5.41522 8.41206 5.41522C7.43931 5.41522 6.80081 6.34697 6.80081 7.76497C6.80081 9.17122 7.43956 10.091 8.41206 10.091ZM5.35956 10.0207C5.58781 10.0207 5.73456 9.86247 5.73456 9.61647V5.93097C5.73456 5.64372 5.58206 5.46222 5.31831 5.46222C5.16006 5.46222 5.04881 5.51472 4.83781 5.65547L4.02356 6.20047C3.89456 6.29422 3.83006 6.39972 3.83006 6.54047C3.83006 6.73372 3.98256 6.89772 4.17006 6.89772C4.28131 6.89772 4.33406 6.87422 4.45131 6.79222L4.99631 6.39372V9.61622C4.99631 9.85672 5.14281 10.0207 5.35956 10.0207ZM8.41181 9.38197C7.89631 9.38197 7.56231 8.76697 7.56231 7.76497C7.56231 6.74522 7.89031 6.12422 8.41181 6.12422C8.93931 6.12422 9.25556 6.73947 9.25556 7.76497C9.25556 8.76672 8.93331 9.38197 8.41181 9.38197Z" fill="#2B1A36"/>
                  </svg>
                </button>
                <button
                  onClick = {togglePlayPause}
                  type="button"
                  className="bg-white rounded-full p-2 text-white shadow-s"
                >
                  {!isPlaying ? (
                    <PlayIcon className="h-10 w-10 text-[#2B1A36]" aria-hidden="true" />
                  ) : (
                    <PauseIcon className="h-10 w-10 text-[#2B1A36]" aria-hidden="true" />
                  )}
                </button>
                <button 
                  onClick={ () => skipTime(10) } 
                  className="bg-white rounded-full p-2 text-white shadow-s"
                >
                  <svg width="28" height="28" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.00006 13.6004C10.2638 13.6004 12.9766 10.8934 12.9766 7.62394C12.9766 5.65519 11.9806 3.88569 10.4746 2.78994C10.2171 2.59069 9.89456 2.65519 9.74806 2.89544C9.60156 3.14144 9.67781 3.41694 9.91206 3.59869C11.1603 4.48919 11.9746 5.95994 11.9806 7.62394C11.9863 10.3899 9.75981 12.6044 7.00006 12.6044C4.23431 12.6044 2.02531 10.3894 2.02531 7.62394C2.02531 5.25094 3.65431 3.27644 5.86931 2.77244V3.61619C5.86931 4.03219 6.15631 4.14369 6.47256 3.91494L8.34756 2.60244C8.61131 2.42094 8.61731 2.13969 8.34756 1.94619L6.47856 0.63369C6.15606 0.39944 5.86931 0.51069 5.86931 0.93269V1.75869C3.12681 2.29194 1.02356 4.74119 1.02356 7.62394C1.02356 10.8934 3.73056 13.6004 7.00006 13.6004ZM8.41806 10.0907C9.39056 10.0907 10.0236 9.17069 10.0236 7.76469C10.0236 6.34669 9.39056 5.41494 8.41806 5.41494C7.44556 5.41494 6.80681 6.34669 6.80681 7.76469C6.80681 9.17094 7.44531 10.0907 8.41806 10.0907ZM5.35931 10.0204C5.58781 10.0204 5.74031 9.86219 5.74031 9.61619V5.93069C5.74031 5.64344 5.58206 5.46194 5.31831 5.46194C5.16006 5.46194 5.05481 5.51444 4.83781 5.65519L4.02931 6.20019C3.89456 6.29394 3.83606 6.39944 3.83606 6.54019C3.83606 6.73344 3.98831 6.89744 4.17581 6.89744C4.28131 6.89744 4.33981 6.87394 4.45706 6.79194L5.00206 6.39344V9.61594C5.00206 9.85644 5.14231 10.0204 5.35931 10.0204ZM8.41831 9.38169C7.89681 9.38169 7.56856 8.76669 7.56856 7.76469C7.56856 6.74494 7.89106 6.12394 8.41831 6.12394C8.93981 6.12394 9.25606 6.73919 9.25606 7.76469C9.25606 8.76644 8.93381 9.38169 8.41831 9.38169Z" fill="#2B1A36"/>
  </svg>

                </button>
              </div>
            </section>
          </div>
        </div>
        <audio ref={audioRef} src={guide.audioFile} />
      </main>
    </>
  );
};

export default Home;
