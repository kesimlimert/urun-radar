"use client";
import React, { useState } from 'react';

export default function TagsInput() {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setTags((prevTags) => [inputValue.trim(), ...prevTags]);
            setInputValue('');
            event.preventDefault();
        }
    };

    const handleTagRemove = (tag: string) => {
        setTags((prevTags) => prevTags.filter((t) => t !== tag));
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className='rounded-md px-4 py-2 bg-inherit border'
            />
            <input className='hidden' value={tags} readOnly name='tags' />
            <ul>
                {tags.map((tag) => (
                    <li key={tag} className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-5 mr-2'>
                        {tag}
                        <button onClick={() => handleTagRemove(tag)} className='ml-2 text-red-400'>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}