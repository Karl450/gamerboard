import Navbar from "@/app/components/Navbar";

async function getEvents() {

    const res = await fetch('https://dbd.tricky.lol/api/events');
    const result = await res.json();
    if (result) {
      return result;
    }
    else {
      return null
    }
}

export default async function DeadByDayLight() {

    const eventsData = await getEvents();
    const currentDate = new Date().toISOString().slice(0, 10);

    const activeEvents = eventsData
    .map(event => {
        return {
        name: event.name,
        multiplier: event.multiplier,
        start: new Date(event.start * 1000).toISOString().slice(0, 10),
        end: new Date(event.end * 1000).toISOString().slice(0, 10)
        };
    })
    .filter(event => event.start <= currentDate && event.end >= currentDate);

    // const activeEvents = [
    //     {
    //         name: 'BLOODHUNT!',
    //         multiplier: 3,
    //         start: '2024-09-24',
    //         end: '2024-10-08'
    //     },
    //     {
    //         name: 'CHAOS SHUFFLE',
    //         multiplier: 0,
    //         start: '2024-09-24',
    //         end: '2024-10-08'
    //     }
    // ]

    const navLinks = [
        { href: '/', name: 'Home' },
        { href: '/dbd/perks', name: 'Perks' },
    ];

    return (
        <>
            <Navbar links={navLinks} />
            <h1 className="flex justify-center item-center font-bold py-[100px] text-4xl">Current events</h1>
            <div className="flex justify-center item-center text-2xl">
                {activeEvents.length > 0 ? (
                    activeEvents.map((event, index) => (
                        <div key={index} className="p-4 mb-4 w-80 text-center">
                            <p className="text-xlg font-bold">{event.name}</p>
                            {event.multiplier > 0 && (
                                <p className="text-lg mt-2 font-semibold">
                                    Multiplier: {event.multiplier}
                                </p>
                            )}
                            <p className="text-lg mt-2">Start: {event.start}</p>
                            <p className="text-lg">End: {event.end}</p>
                        </div>
                    ))
                ) : (
                    <p>No active events</p>
                )}
            </div>
        </>
    );
}
