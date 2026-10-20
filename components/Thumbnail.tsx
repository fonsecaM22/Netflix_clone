"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { modalState, movieState } from "@/atoms/modalAtoms";
import type { Movie } from "@/typings";

function Thumbnail({ movie }: { movie: any }) {
   
  const [showModal, setShowModal] = useAtom(modalState);
  const [currentMovie, setCurrentMovie] = useAtom(movieState);
  
    return (
        <div className="relative h-28 min-w-45 cursor-pointer transition duration-200 ease-out 
        md:h-36 md:min-w-65 md:hover:scale-105"
         onClick={() => {
          if (!movie) return;
            setCurrentMovie(movie)
            setShowModal(true)
          }}>
            <Image
            alt={movie.title || movie.name || movie.original_name}
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
        </div>
    );
}

export default Thumbnail;