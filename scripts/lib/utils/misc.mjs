

export function pickRandomlyFromList(list) {
    return list[Math.floor(Math.random()*list.length)];
}

export function pickRandomColor() {
    const colors = [ "#F36565", "#3a5f8c", "#754185", "#589c4f", "#d1c647", "#d17547" ];
    return pickRandomlyFromList(colors);
}



// UNIT TEST
function test() {
    for(let i = 0; i < 10; i++) console.log(pickRandomColor());
}

// test();