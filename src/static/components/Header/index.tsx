import Link from "next/link";
import Avatar from "@/components/Avatar";
import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { setUser, UserState } from "@/slices/userSlice";
import { fetcher } from "@/utils/fetcher";
import { useSelector, useDispatch } from "react-redux";
const Header = ({}) => {
  const user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  } = useSelector((state: { user: UserState }) => state.user);
  const supabase = useSupabaseClient<any>();
  const session = useSession();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    console.log(session, user.id);
    if (session && !user?.id) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      if (!user) throw new Error("No user");
      console.log("heher");
      const profile = await fetcher("profiles", "find", {
        id: session?.user?.id,
      });

      if (profile) {
        dispatch(
          setUser({
            id: profile.id,
            email: session?.user.email || "",
            name: profile.username,
            avatarUrl: profile.avatar_url,
          })
        );
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    }
  }

  return (
    <header
      style={{
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "spaceBetween",
        padding: "16px",
        position: "sticky",
        top: "0",
        zIndex: "10",
        transition: "height 0.3s",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Link href="/">Home</Link>
        <Link href="/browse">Browse</Link>
        <Link href="/upload">Upload</Link>

        {session ? (
          <div style={{ cursor: "pointer" }} onClick={toggleDropdown}>
            <Avatar
              uid={user?.id}
              url={user?.avatarUrl}
              size={40}
              onUpload={() => {}}
              readOnly={true}
            />
          </div>
        ) : (
          <Link href="/login">Login</Link>
        )}

        {showDropdown && (
          <div
            style={{
              marginTop: "10rem",
              marginLeft: "-3rem",
              display: "block",
              zIndex: 1,
              minWidth: "2rem",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "0.25rem",
            }}
          >
            <Link
              href="/login"
              onClick={toggleDropdown}
              style={{
                display: "block",
                padding: "0.5rem",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
            >
              Acoount Page
            </Link>
            <div
              onClick={() => {
                supabase.auth.signOut();
                setShowDropdown(false);
              }}
              style={{
                display: "block",
                padding: "0.5rem",
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
            >
              Log Out
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
