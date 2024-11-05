"use client";

import { useState, useEffect } from "react";

export default function SearchBar_Perks({className, perks}) {

    const [query, setQuery] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [wishlist, setWishlist] = useState([]);

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

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch('/api/dbd/wishlist');
                if (!response.ok) throw new Error('Failed to fetch wishlist');
                const data = await response.json();
                setWishlist(data);
                
                const clickedState = {};
                data.forEach(item => {
                    clickedState[item.perkName] = true;
                });
                setIsClicked(clickedState);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlist();
    }, []);

    // Add perk to the wishlist
    const addPerkToWishlist = async (perk) => {
        try {
            const response = await fetch('/api/dbd/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ perkName: perk }),
            });
    
            if (!response.ok) {
                const data = await response.json();
                console.error(`Failed to add ${perk} to wishlist:`, data.message);
            } else {
                console.log(`${perk} successfully added to wishlist`);
                setIsClicked((prev) => ({ ...prev, [perk]: true }));
            }
        } catch (error) {
            console.error(`Error while adding ${perk} to wishlist:`, error);
        }
    };

    
    // Send wishlist perk to DS if found
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
            <input
                onChange={handleSearch}
                value={query}
                type="text"
                placeholder="Search"
                className={`mb-4 mt-4 p-2 text-black text-center ${className}`}
            />
            <table className="table-auto w-full max-w-5xl border border-zinc-700">
                <thead className="border-b">
                <tr className="text-left">
                    <th className="px-2 py-2 text-center">Perk</th>
                    <th className="px-2 py-2">Description</th>
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
                    <tr key={perk.id} className="border-y border-zinc-700">
                        <td className="relative px-2 py-4 whitespace-nowrap flex flex-col items-center text-sm">
                            <form
                                onSubmit={(e) => {
                                e.preventDefault();
                                }}
                            >
                                <button
                                    onClick={() => addPerkToWishlist(perk.name)}
                                    type="button"
                                    className={`mb-2 py-1 px-2 rounded border text-xs ${
                                        isClicked[perk.name] ? 'bg-green-500 text-white' : 'text-white'
                                    }`}
                                >
                                    {isClicked[perk.name] ? 'On Wishlist' : 'Add to Wishlist'}
                                </button>
                            </form>
                            <span className="text-sky-400">{perk.name}</span>
                            <span className="text-xs">
                                {perk.role.charAt(0).toUpperCase() + perk.role.slice(1).toLowerCase()} - Add Character Here
                            </span>
                            <img
                                src={`/images/Content/${perk.image}`}
                                alt={perk.name}
                                className="w-20 h-auto"
                            />
                            </td>
                            <td className="px-2 py-4 text-sm">
                            <div dangerouslySetInnerHTML={{ __html: formattedDesc }} />
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </>
    )
}