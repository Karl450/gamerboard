"use client";

import { useState, useEffect } from "react";

export default function SearchBar_Perks({className, perks}) {

    const [query, setQuery] = useState('');
    const [wishlist, setWishlist] = useState(new Set());

    const handleSearch = (e) => {
        setQuery(e.target.value);
    }

    const filteredPerks = perks.filter(perk => {
        if (perk.name != undefined && perk.name.toLowerCase().includes(query.toLowerCase()) || perk.role != undefined && perk.role.toLowerCase().includes(query.toLowerCase())) {
            return true
        }
    });

    const formatDescription = (desc, tunables) => {
        return desc.replace(/{(\d+)}/g, (match, index) => {
            const idx = parseInt(index, 10);
            if (tunables[idx]) {
                return tunables[idx].join('/');
            }
            return match;
        });
    };

    const handleWishlist = (perk) => {
        setWishlist((prevWishlist) => {

            const newWishlist = new Set(prevWishlist);
    
            if (newWishlist.has(perk)) {
                console.log(`${perk} is already in wishlist`);
                return prevWishlist;
            } else {
                newWishlist.add(perk);
                return newWishlist;
            }
        });
    };

    const sendWishlistToDS = async (perkName) => {
        try {
            const response = await fetch("/api/discordWebhook", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ perkName }),
            });
            if (!response.ok) {
                console.log('Failed to send message to Discord');
            }
        } catch (error) {
            console.log(`Failed to send wishlist to Discord: ${error}`);
        }
    };



    return (
        <>
            <input onChange={handleSearch} value={query} type="text" placeholder="Search" className={`mb-4 mt-16 p-2 text-black text-center ${className}`}  />
            <table className="table-auto w-[84rem] border border-zinc-700">
                <thead className="border-b">
                    <tr className="text-left">
                        <th className="px-4 py-4 text-center">Perk</th>
                        <th className="px-4 py-4">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPerks.map((perk, index) => {

                        let formattedDesc = perk.desc;
                        if (Array.isArray(perk.tunables)) {
                            formattedDesc = formatDescription(formattedDesc, perk.tunables);
                        } else {
                            console.warn(`Tunables for ${perk.name} is not an array:`, perk.tunables);
                        }

                        return (
                            <tr key={index} className="border-y-[1px] border-zinc-700">
                                <td className="relative px-4 py-8 whitespace-nowrap flex flex-col items-center">
                                    {/* wishlist btn */}
                                    <form onSubmit={(e) => { 
                                        e.preventDefault();
                                        sendWishlistToDS(perk.name);
                                    }}>
                                        <button
                                            onClick={() => handleWishlist(perk.name)}
                                            type="submit" // Ensure the button is of type submit
                                            className="absolute left-[-200px] top-32 text-white py-1 px-4 rounded border"
                                        >
                                            Add to Wishlist
                                        </button>
                                    </form>

                                    {/* perks */}
                                    <span className="text-sky-400">{perk.name}</span>
                                    <span>
                                    {perk.role.charAt(0).toUpperCase() + perk.role.slice(1).toLowerCase()} - Add Character Here
                                    </span>
                                    <img
                                    src={`/images/Content/${perk.image}`}
                                    alt={perk.name}
                                    className="max-w-full"
                                    style={{ maxWidth: '150px', height: 'auto' }}
                                    />
                                </td>

                                <td>
                                    <div dangerouslySetInnerHTML={{ __html: formattedDesc }} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}