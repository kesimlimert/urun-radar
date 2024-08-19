import React from 'react';

type FilterProps = {
  tags: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
};

export default function Filter({ tags, selectedTag, onTagChange }: FilterProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <label htmlFor="tag-filter" className="font-bold">Filter by tag:</label>
      <select
        id="tag-filter"
        value={selectedTag}
        onChange={(e) => onTagChange(e.target.value)}
        className="py-2 pl-2 pr-5 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        <option value="">All</option>
        {tags.map(tag => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>
    </div>
  );
}