import Link from "next/link";
import axios from "axios";

//everytime my app is initialize, I want check my wishlist and call discord if it find a matching perk
//I can use soemthing similar for any wishlist I would like
export async function getWishlist () {

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dbd/wishlist`);
    return response.data;
  } catch (error) {
    console.log(error)
    return [];
  }

}


//call the shrine
export async function callShrine() {
  try {
    const response = await axios.get('https://dbd.tricky.lol/api/shrine?includeperkinfo');
    const shrine = response.data;
    const shrineData = shrine.perks;

    const checkDBDWishlist = await getWishlist();

    //map shrine perk name
    const perksInShrine = shrineData.map(item => item.name);

    // check if one of your wishlist perk is the same as the shrine
    const perksInWishlist = checkDBDWishlist.filter(perk => perksInShrine.includes(perk.perkName));

    if (perksInWishlist.length > 0) {
      console.log('Found perks in wishlist:', perksInWishlist);
    } else {
      console.log('No perks from the wishlist found in the shrine this week.');
    }

    return shrineData;
  } catch (error) {
    console.log(`Cannot fetch shrine from tricky: `, error);
  }
}


export default async function Home() {

  //call the wishlist here
  const checkDBDWishlist = await callShrine();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <span className="text-5xl md:text-7xl text-amber-500 font-protest-strike pb-8">
        Gamerboard
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full max-w-5xl">
        <Link
          href="/dbd"
          className="deadByDaylight bg-dbd bg-cover bg-center h-64 md:h-80 w-full block transform hover:scale-110 transition duration-700 rounded"
        />
        <Link
          href="/classicwow"
          className="wowClassic bg-wow-classic bg-cover bg-center h-64 md:h-80 w-full block transform hover:scale-110 transition duration-700 rounded"
        />
      </div>
    </div>
  );
}
