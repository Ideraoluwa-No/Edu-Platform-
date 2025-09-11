import { useState, useEffect } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  // Load profile: check localstorage
  const fetchProfile = async () => {
    try {
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        setProfile(parsed);
        setForm({ name: parsed.name, email: parsed.email });
      } else {
        // Fetch new user if nothing in localstorage
        const res = await fetch("https://randomuser.me/api/");
        const data = await res.json();
        const user = data.results[0];

        const profileData = {
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          picture: user.picture.large,
        };

        setProfile(profileData);
        setForm({ name: profileData.name, email: profileData.email });

        localStorage.setItem("userProfile", JSON.stringify(profileData));
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = () => {
    const updatedProfile = {
      ...profile,
      name: form.name,
      email: form.email,
    };
    setProfile(updatedProfile);
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    setEditing(false);
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shawdow">
      <div className="flex items-center space-x-4">
        <img
          src={profile.picture}
          alt={profile.picture}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h1 className="text-xl font-bold">{profile.name}</h1>
          <p className="text-gray-500">{profile.email}</p>
        </div>
      </div>

      {editing ? (
        <div className="mt-4 space-y-2 ">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={handleSave}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
