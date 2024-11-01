"use client";

export default function DeleteBtn({ perkId }) {

    console.warn('DeleteBtn FNC', perkId);

    const handleDelete = async () => {
        const response = await fetch('/api/dbd/wishlist', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ perkId }),
        });

        if (response.ok) {
            console.log(`Perk ${perkId} deleted successfully.`);
            window.location.reload();
        } else {
            console.error("Failed to delete perk.");
        }
    };

    return (
        <>
            <button onClick={handleDelete} className="text-red-500"> X </button>
        </>
    )

}