import { fetcher } from "@/utils/fetcher";
import {  useState } from "react";
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
    <div>
      <h1>Upload Page</h1>
      <input value={name} onChange={handleChange} />
      <input
        type="file"
        id="single"
        accept="video/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />
    </div>
  );
};

export default Browse;
