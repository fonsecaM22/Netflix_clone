"use client";

import MuiModal from "@mui/material/Modal";
import { useAtom } from "jotai";
import { modalState, movieState } from "@/atoms/modalAtoms";
import { HandThumbUpIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Genre } from "../typings";
import ReactPlayer from "react-player";
import { FaPlay, FaVolumeOff, FaVolumeUp } from "react-icons/fa";

export default function Modal() {
  const [showModal, setShowModal] = useAtom(modalState);
  const [movie] = useAtom(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!movie) return;

    const controller = new AbortController();
    setTrailer("");
    setGenres([]);

    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${
            movie?.media_type === "tv" ? "tv" : "movie"
          }/${movie?.id}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&language=en-US&append_to_response=videos`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`TMDB request failed: ${response.status}`);
        }

        const data = await response.json();

        if (data?.videos) {
          const trailerVideo = data.videos.results.find(
            (element: { type: string; site: string; key: string }) =>
              element.type === "Trailer" && element.site === "YouTube"
          );

          setTrailer(
            trailerVideo?.key
              ? `https://www.youtube.com/watch?v=${trailerVideo.key}`
              : ""
          );
        }
        if (data?.genres) {
          setGenres(data.genres);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") console.error(err);
      }
    }

    fetchMovie();
    return () => controller.abort();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed top-7! left-0 right-0 z-50 mx-auto w-full max-w-5xl max-h-[calc(100vh-1.75rem)]! overflow-y-auto rounded-md scrollbar-hide"
    >
      <div className="bg-[#181818] text-white">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 z-40 flex h-9 w-9 items-center justify-center rounded-full border-0 bg-[#181818] text-white transition hover:bg-[#333333]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {trailer && (
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              src={trailer}
              style={{ position: "absolute", top: 0, left: 0 }}
              width="100%"
              height="100%"
              playing
              muted={muted}
            />
          </div>
        )}

        <div className="flex w-full items-center justify-between bg-[#181818] px-10 py-4">
          <div className="flex space-x-2">
            {/* <button className="flex items-center gap-x-2 rounded bg-white px-8 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
              <FaPlay className="h-7 w-7 text-black" />
              Play
            </button> */}

            <button className="modalButton">
              <PlusIcon className="h-7 w-7" />
            </button>

            <button className="modalButton">
              <HandThumbUpIcon className="h-7 w-7" />
            </button>
          </div>

          <button className="modalButton" onClick={() => setMuted(!muted)}>
            {muted ? (
              <FaVolumeOff className="h-6 w-6" />
            ) : (
              <FaVolumeUp className="h-6 w-6" />
            )}
          </button>
        </div>

        <div className="rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {Math.round((movie?.vote_average ?? 0) * 10)}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
            <p className="w-5/6">{movie?.overview}</p>
            <div className="flex flex-col space-y-3 text-sm">
              <div>
                <span className="text-[gray]">Genres: </span>
                {genres.map((genre) => genre.name).join(", ")}
              </div>
              <div>
                <span className="text-[gray]">Original Language: </span>
                {movie?.original_language}
              </div>
              <div>
                <span className="text-[gray]">Total Votes: </span>
                {movie?.vote_count}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MuiModal>
  );
}