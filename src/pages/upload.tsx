import { fetcher } from "@/utils/fetcher";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const Browse = () => {
  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const supabase = useSupabaseClient();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an video to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `video-${Math.random()}.${fileExt}`;

      let { error: uploadError, data } = await supabase.storage
        .from("videos")
        .upload(fileName, file, { upsert: true });

      const urlData = supabase.storage
        .from("videos")
        .getPublicUrl((data as { path: string })?.path);

      console.log(urlData);

      if (uploadError) {
        throw uploadError;
      } else {
        fetcher("videos", "create", {
          title: name,
          url: urlData.data.publicUrl,
        });
      }
      alert("uploaded successfully");
    } catch (error) {
      alert("Error uploading video!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-zinc-200  p-6 flex flex-col  gap-6 h-screen">
      <h1 className="text-4xl font-semibold mb-6">Upload Page</h1>
      <section className="flex flex-col space-y-6 flex-grow-0">
        <input
          // className="text-gray-900 w-96 placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-sm h-24  pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          className=" text-gray-900 w-full placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm "
          value={name}
          onChange={handleChange}
          placeholder="Write a title for your video..."
        />
        <input
          // className="text-gray-900 w-64 placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-sm py-4 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          className=" text-gray-900 w-full placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm "
          type="file"
          id="single"
          accept="video/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </section>
    </div>
  );
};

export default Browse;
