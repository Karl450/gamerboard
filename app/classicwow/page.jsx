"use client";

import { useState, useEffect } from 'react';

export default function Classic() {

    const [realms, setRealms] = useState([]);

    useEffect(() => {
        const fetchRealms = async () => {
            try {
                const res = await fetch('/api/getRealms');
                if (!res.ok) {
                    throw new Error('Failed to fetch realms');
                }
                const data = await res.json();
                setRealms(data); 
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchRealms();
    }, [])

    return (
        <div className='flex items-center justify-center h-[48rem]'>
            <form>
                <label htmlFor="countries" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    Select a realm and search for an item
                </label>
                <div className="flex space-x-4  mb-36">
                    <select id="realms" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue>Choose your server</option>
                        {realms.map((realm) => (
                            <option key={realm.id}>
                                {realm.name}
                            </option>
                        ))}
                    </select>
                    
                    <select id="factions" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue>Choose your faction</option>
                        <option value="alliance">Alliance</option>
                        <option value="horde">Horde</option>
                    </select>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Search
                    </button>
                </div>
                
            </form>
        </div>
    );
    
}
