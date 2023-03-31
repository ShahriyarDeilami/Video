import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import Avatar from "./Avatar";
import { setUser } from "@/slices/userSlice";
import { useDispatch } from "react-redux";
import { fetcher } from "@/utils/fetcher";

type Database = any;
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

const Account = ({ session }: { session: Session }) => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [website, setWebsite] = useState<Profiles["website"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getProfile();
  }, [session, dispatch]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const profile = await fetcher("profiles", "find", {
        id: session?.user.id,
      });

      if (profile) {
        dispatch(
          setUser({
            id: profile.id,
            email: session.user.email || "",
            name: profile.username,
            avatarUrl: profile.avatar_url,
          })
        );
        setUsername(profile.username);
        setWebsite(profile.website);
        setAvatarUrl(profile.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: Profiles["username"];
    website: Profiles["website"];
    avatar_url: Profiles["avatar_url"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      dispatch(
        setUser({
          id: user?.id || "",
          email: session.user.email || "",
          name: username,
          avatarUrl: avatar_url,
        })
      );
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <Avatar
        uid={user?.id as string}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ username, website, avatar_url: url });
        }}
        readOnly={false}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={session.user.email}
          disabled
          className=" text-gray-900 w-full placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm "
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className=" text-gray-900 w-full placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm "
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          className=" text-gray-900 w-full placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm "
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block "
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Account;
