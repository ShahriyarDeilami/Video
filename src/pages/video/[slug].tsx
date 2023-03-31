import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Browse = () => {
  const router = useRouter();
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    const callback = async () => {
      const video = await fetcher("videos", "find", { id: router.query.slug });
      setVideo(video);
      fetcher("videos", "update", { ...video, views: video.views + 1 });
    };

    callback();
  }, []);

  return (
    <div className="bg-zinc-200 p-6 gap-6 h-screen">
      <h1 className="text-4xl font-semibold  ">Browse Page</h1>
      <section className="grid place-content-center mx-auto w-2/5 h-full  place-items-center">
        <video className="w-full" src={video?.url} controls />
      </section>
    </div>
  );
};

export default Browse;
