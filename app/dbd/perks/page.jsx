import Navbar from "@/app/components/Navbar";
import Perks from "@/app/components/Perks";

async function getPerks() {

    const res = await fetch('https://dbd.tricky.lol/api/perks');
    const result = await res.json();

    if (result) {
      return result;
    }
    else {
      return null
    }
}

export default async function DBD_Perks() {

    const navLinks = [
        { href: '/', name: 'Home' },
        { href: '/dbd', name: 'DBD' },
        { href: '/dbd/shrine', name: 'Shrine' },
        { href: '/dbd/perks', name: 'Perks' },
    ];

    const jsonObject = {
        Ace_In_The_Hole: {
          name: "Ace in the Hole",
          description: "Lady Luck always seems to be throwing something good your way.<br><br>When retrieving an item from a chest, there is a {0}% chance that a Very Rare (or lower) add-on will be attached to it.<br><br>{1}% chance of finding an add-on of Uncommon rarity (or lower).<br><br>When escaping, keep any add-ons your item has.",
          role: "Survivor",
          tunables: [ [ '100' ], [ '10', '25', '50' ] ],
          image: "UI/Icons/Perks/Cannibal/iconPerks_BBQAndChili.png"
        },
        Adrenaline: {
          name: "Adrenaline",
          description: "You are fuelled by unexpected energy when on the verge of escape.<br><br>This perk activates when the exit gates are powered.<br><br>Instantly heal one health state if you are injured or in the dying state and sprint at {0}% of your normal running speed for {1} seconds.<br><br>Adrenaline ignores the Exhausted status effect. Causes the <b>Exhausted</b> status effect for {2} seconds.<br><br>Exhausted prevents Survivors from activating exhausting perks.",
          role: "Survivor",
          tunables: [ [ '150' ], [ '3' ], [ '60', '50', '40' ] ],
          image: "UI/Icons/Perks/Cannibal/iconPerks_BBQAndChili.png"
        },
        BarbecueAndChili: {
          name: "Barbecue & Chili",
          description: "A deep bond with The Entity unlocks potential in one's aura reading ability.<li>After hooking a Survivor, all other Survivors' auras are revealed to you for {0} seconds when they are further than {1} meters from the hook.</li>",
          role: "Killer",
          tunables: [ [ '5' ], [ '60', '50', '40' ] ],
          image: "UI/Icons/Perks/Cannibal/iconPerks_BBQAndChili.png"
        }
    };

    const data = await getPerks();
      
    const perkArray = Object.values(data);

    const perkData = perkArray.map((perk) => {
        return {
            name: perk.name,
            role: perk.role,
            desc: perk.description,
            tunables: perk.tunables,
            image: perk.image
        }
    })

    return (
        <>
            <Navbar links={navLinks} />
            <div className="flex flex-col min-h-screen justify-center items-center">
                <Perks className={""} perks={perkData} />
            </div>
        </>
    );
}