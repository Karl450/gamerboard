import DBD_Nav from "./dbd_nav/page";

async function getPerks() {
    const res = await fetch('https://dbd.tricky.lol/api/perks');
    const result = await res.json();
    return result;
}

export default function DeadByDayLight() {
    return (
        <div>
            <DBD_Nav />
        </div>
    );
}
