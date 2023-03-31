import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
interface video {
  views: number;
  created_at: string;
  id: string;
  title: string;
  url: string;
}
type sortKeys = "MV" | "LV" | "MR" | "LR";
const sorter = {
  MV: (a: video, b: video) => b.views - a.views,
  LV: (a: video, b: video) => a.views - b.views,
  MR: (a: video, b: video) =>
    new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf(),
  LR: (a: video, b: video) =>
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
    const data: [video] = await fetcher("videos", "delete", { id });
    if (data) setVideos(videos.filter((v: video) => v.id !== id));
  };

  const handleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSort(e.target.value);
  };

  return (
    <div className="bg-zinc-200  p-6 flex flex-col  gap-6">
      <h1 className="text-4xl font-semibold  ">Browse Page</h1>
      <section className="flex justify-between items-center mx-16 gap-3">
        <input
          className=" text-gray-900 w-full placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm "
          placeholder="Search for anything..."
          value={search}
          onChange={handleSearchChange}
          name="search"
        />

        <select
          className="  py-3   shadow-sm focus:outline-none text-gray-900 placeholder:italic placeholder:text-slate-400  bg-white  border border-slate-300 rounded-md  pl-9 pr-3  focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm "
          value={sort}
          onChange={handleSortChange}
        >
          <option value={"MV"}>Most Views</option>
          <option value={"LV"}>Least Views</option>
          <option value={"MR"}>Most Recent</option>
          <option value={"LR"}>Least Recent</option>
        </select>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
        {videos
          .filter((v:video) => v.title.toLowerCase().includes(search.toLowerCase()))
          .sort(sorter[sort as sortKeys])
          .map((video :video) => (
            <div
              key={video.id}
              className="flex flex-col gap-8  bg-neutral-100  shadow-sm   rounded"
            >
              <div className="">
                {/* //on hover show play  */}
                <video
                  className=" rounded cursor-pointer hover:opacity-80 "
                  src={video.url}
                  onClick={() => handleVideoClick(video.id)}
                />
                <p className="mh-6 p-4  text-lg ">
                  {video.title ? video.title : `No titles`}{" "}
                </p>
              </div>
              <button
                className="w-full p-3 bg-delete-500 text-white rounded-b hover:bg-gray-700"
                onClick={() => deleteVideo(video.id)}
              >
                delete
              </button>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Browse;
