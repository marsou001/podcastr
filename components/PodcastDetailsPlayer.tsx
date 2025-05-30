"use client";

import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import useAudio from '@/hooks/useAudio';
import { PodcastDetailPlayerProps } from "@/types";
import LoaderSpinner from "./LoaderSpinner";
import { Button } from "./ui/button";
import { toast } from "sonner";

const PodcastDetailPlayer = ({
  audioURL,
  podcastTitle,
  author,
  imageURL,
  podcastId,
  isOwner,
  authorImageURL,
  authorId,
}: PodcastDetailPlayerProps) => {
  const router = useRouter();
  const { setAudio } = useAudio();
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const deletePodcast = useMutation(api.podcasts.deletePodcast);

  const handleEdit = async () => {
    router.push(`/podcasts/${podcastId}/edit`);
  };

  const handleDelete = async () => {
    try {
      await deletePodcast({ podcastId });
      toast("Podcast deleted");
      router.push("/");
    } catch (error) {
      console.error("Error deleting podcast", error);
      toast("Error deleting podcast");
    }
  };

  const handlePlay = () => {
    setAudio({
      title: podcastTitle,
      audioURL,
      imageURL,
      author,
      podcastId,
    });
  };

  if (!imageURL || !authorImageURL) return <LoaderSpinner />;

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={imageURL}
          width={250}
          height={250}
          alt="Podcast image"
          className="aspect-square rounded-lg"
        />
        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-[32px] font-extrabold tracking-[-0.32px] text-white-1">
              {podcastTitle}
            </h1>
            <figure
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                router.push(`/profile/${authorId}`);
              }}
            >
              <Image
                src={authorImageURL}
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <figcaption className="text-base font-normal text-white-3">{author}</figcaption>
            </figure>
          </article>

          <Button
            onClick={handlePlay}
            className="text-base w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1"
          >
            <Image
              src="/icons/Play.svg"
              width={20}
              height={20}
              alt="random play"
            />
            &nbsp; Play podcast
          </Button>
        </div>
      </div>
      {isOwner && (
        <div className="relative mt-2">
          <Image
            src="/icons/three-dots.svg"
            width={20}
            height={30}
            alt="Three dots icon"
            className="cursor-pointer"
            onClick={() => setShowOptionsMenu((prev) => !prev)}
          />
          {showOptionsMenu && (
            <>
              <div
                className="bg-black-6 overflow-hidden absolute -top-1 -left-24 z-10 w-23 rounded-md"
              >
                <button className="bg-black-6 hover:bg-black-2 flex items-center gap-x-1 w-full py-1.5 pl-2 cursor-pointer" onClick={handleEdit}>
                  <Image
                    src="/icons/delete.svg"
                    width={18}
                    height={18}
                    alt="Edit icon"
                  />
                  <h2 className="text-base font-normal text-white-1">Edit</h2>
                </button>
                <button className="bg-black-6 hover:bg-black-2 flex items-center gap-x-1 w-full py-1.5 pl-2 cursor-pointer" onClick={handleDelete}>
                  <Image
                    src="/icons/delete.svg"
                    width={18}
                    height={18}
                    alt="Delete icon"
                  />
                  <h2 className="text-base font-normal text-white-1">Delete</h2>
                </button>
              </div>
              {/* <div
                className="absolute -left-32 -top-2 z-10 flex w-32 cursor-pointer justify-center gap-2 rounded-md bg-black-6 py-1.5 hover:bg-black-2"
                onClick={handleDelete}
              >
                <Image
                  src="/icons/delete.svg"
                  width={16}
                  height={16}
                  alt="Delete icon"
                />
                <h2 className="text-base font-normal text-white-1">Delete</h2>
              </div> */}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PodcastDetailPlayer;