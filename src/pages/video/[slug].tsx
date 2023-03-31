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
    <div>
      <h1>Browse Page</h1>
      <video src={video?.url} controls />
    </div>
  );
};

export default Browse;
