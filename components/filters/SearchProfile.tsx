"use client";
import React, { useState } from "react";

type Props = {
  profiles: any[];
};

export default function SearchProfile({ profiles }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    setFilteredProfiles(
      profiles.filter((profile) =>
        profile.display_name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex items-center gap-2">
        <input
          className="rounded-md px-2 md:px-4 md:py-2 py-2 md:text-base text-xs bg-inherit border"
          name="display_name"
          placeholder="Display name"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="rounded-md md:text-base text-xs px-2 md:px-4 whitespace-nowrap py-2 text-black bg-gray-200 hover:bg-white"
          onClick={handleSearchClick}
        >
          Search profile
        </button>
      </div>
      {filteredProfiles.map((profile, index) => (
        <div key={index} className="p-2">
          <p>{profile.display_name} - {profile.points} Points </p>
        </div>
      ))}
    </div>
  );
}
