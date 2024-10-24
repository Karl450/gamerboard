import Navbar from "@/app/components/Navbar";
async function getShrine() {

  const res = await fetch('https://dbd.tricky.lol/api/shrine?includeperkinfo');
  const result = await res.json();
  if (result && result.perks) {
    return result.perks;
  }
  else {
    return null
  }
}

export default async function DBD_Shrine() {
  const shrineData = await getShrine();
  const shrineArray = Object.values(shrineData);

  const navLinks = [
    { href: '/', name: 'Home' },
    { href: '/dbd', name: 'DBD' },
    { href: '/dbd/perks', name: 'Perks' },
  ];

  //could happen on Tuesday
  if (!shrineData) {
    return <h1 className="flex flex-col items-center justify-center min-h-screen text-xl">Oups, the shrine was not found, please try later</h1>;
  }

  return (
    <>
      <Navbar links={navLinks} />
      <div className="flex flex-col justify-center min-h-screen overflow-hidden">
        {/* Top Element */}
        <div className="flex justify-center mb-4">
          <div className="transform rotate-45">
            <div className="transform -rotate-45 w-[10rem]">
              <div className="text-center text-lg">{shrineArray[0].name}</div>
              <img
                className="inline max-w-[18px] h-auto mr-1"
                src={`/images/shard.png`}
              />
              <span className="text-center mr-1">{shrineArray[0].shards}</span>
              <img
                className="inline max-w-[18px] h-auto mr-1"
                src={`/images/bloodpoint.png`}
              />
              <span className="text-center mr-1">{shrineArray[0].bloodpoints}</span>
              <img
                src={`/images/Content/${shrineArray[0].image}`}
                alt={shrineArray[0].name}
                style={{ maxWidth: '150px', height: 'auto' }}
              />
            </div>
          </div>
        </div>
    
        {/* Middle Elements */}
        <div className="flex justify-center mb-4">
          {/* Left Element */}
          <div className="transform rotate-45 mr-28">
            <div className="transform -rotate-45 w-[10rem]">
            <div className="text-center text-lg">{shrineArray[1].name}</div>
              <img
                className="inline max-w-[18px] h-auto mr-1"
                src={`/images/shard.png`}
              />
              <span className="text-center mr-1">{shrineArray[1].shards}</span>
              <img
                className="inline max-w-[18px] h-auto mr-1"
                src={`/images/bloodpoint.png`}
              />
              <span className="text-center mr-1">{shrineArray[1].bloodpoints}</span>
              <img
                src={`/images/Content/${shrineArray[1].image}`}
                alt={shrineArray[1].name}
                style={{ maxWidth: '150px', height: 'auto' }}
              />
            </div>
          </div>
    
          {/* Right Element */}
          <div className="transform rotate-45 ml-28">
            <div className="transform -rotate-45 w-[10rem]">
            <div className="text-center text-lg">{shrineArray[2].name}</div>
              <img
                className="inline max-w-[18px] h-auto mr-1"
                src={`/images/shard.png`}
              />
              <span className="text-center mr-1">{shrineArray[2].shards}</span>
              <img
                className="inline max-w-[18px] h-auto mr-1"
                src={`/images/bloodpoint.png`}
              />
              <span className="text-center mr-1">{shrineArray[2].bloodpoints}</span>
              <img
                src={`/images/Content/${shrineArray[2].image}`}
                alt={shrineArray[2].name}
                style={{ maxWidth: '150px', height: 'auto' }}
              />
            </div>
          </div>
        </div>
    
        {/* Bottom Element */}
        <div className="flex justify-center">
          <div className="transform rotate-45">
            <div className="transform -rotate-45 w-[10rem]">
            <div className="text-center text-lg">{shrineArray[3].name}</div>
              <img
                className="inline max-w-[18px] h-auto mr-1"
                src={`/images/shard.png`}
              />
              <span className="text-center mr-1">{shrineArray[3].shards}</span>
              <img
                className="inline max-w-[18px] h-auto mr-1"
                src={`/images/bloodpoint.png`}
              />
              <span className="text-center mr-1">{shrineArray[3].bloodpoints}</span>
              <img
                src={`/images/Content/${shrineArray[3].image}`}
                alt={shrineArray[3].name}
                style={{ maxWidth: '150px', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
      </>
    );
}