import { store } from "@/store";
import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const sorter = {
  MV: (a, b) => b.views - a.views,
  LV: (a, b) => a.views - b.views,
  MR: (a, b) =>
    new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf(),
  LR: (a, b) =>
    new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf(),
};

const Browse = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("MR");
  const router = useRouter();

  useEffect(() => {
    const callback = async () => {
      const videos = await fetcher("videos", "list", {});
      setVideos(videos);
    };

    callback();
  }, []);

  const handleVideoClick = (id: string) => {
    router.push("/video/" + id);
  };

  const deleteVideo = async (id: string) => {
    const data = await fetcher("videos", "delete", { id });
    if (data) setVideos(videos.filter((v) => v.id !== id));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <h1>Browse Page</h1>
      <input value={search} onChange={handleSearchChange} />
      <select value={sort} onChange={handleSortChange}>
        <option value={"MV"}>Most Views</option>
        <option value={"LV"}>Least Views</option>
        <option value={"MR"}>Most Recent</option>
        <option value={"LR"}>Least Recent</option>
      </select>
      {videos
        .filter((v) => v.title.toLowerCase().includes(search.toLowerCase()))
        .sort(sorter[sort])
        .map((video) => (
          <div>
            <video src={video.url} onClick={() => handleVideoClick(video.id)} />
            {video.title}
            <button onClick={() => deleteVideo(video.id)}>delete</button>
          </div>
        ))}
    </div>
  );
};

export default Browse;
