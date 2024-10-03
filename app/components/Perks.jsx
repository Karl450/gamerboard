"use client";

import { useState, useEffect } from "react";

export default function SearchBar_Perks({className, perks}) {

    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
    }

    const filteredPerks = perks.filter(perk => 
        perk.name.toLowerCase().includes(query.toLowerCase()) ||
        perk.role.toLowerCase().includes(query.toLowerCase())
    );


    return (
        <>
            <input onChange={handleSearch} value={query} type="text" placeholder="Search" className={`mb-4 mt-4 p-2 text-black ${className}`}  />
            <table className="table-auto w-[84rem] border border-zinc-700">
                <thead className="border-b">
                    <tr className="text-left">
                        <th className="px-4 py-4">Perk</th>
                        <th className="px-4 py-4">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPerks.map((perk, index) => {
                        return (
                            <tr key={index} className="border-y-[1px] border-zinc-700">
                                <td className="text-center px-4 py-8">
                                    {perk.name}
                                    <p>{perk.role}</p>
                                    <img
                                        src={`/images/Content/${perk.image}`}
                                        alt={perk.name}
                                        style={{ maxWidth: '150px', height: 'auto' }}
                                    />
                                </td>
                                <td className="">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: perk.desc }}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}