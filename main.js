let stones = 0;
let wood = 0;

let messages = document.querySelector('#messages');

setInterval(() => {messages.scrollTo(0, messages.scrollHeight);}, 1000);

async function findstones() {
    // 3 seconds
    let bar = document.querySelector('#stones').querySelector('.progress-bar');
    let button = document.querySelector('#stones').querySelector('button');
    button.disabled = true;
    bar.style.width = '0%';
    for (let i = 0; i < 100; i += 2) {
        bar.style.width = `${i}%`;
        await new Promise(r => setTimeout(r, 60));
    }
    bar.style.width = `100%`;
    await new Promise(r => setTimeout(r, 500));
    button.disabled = false;
    bar.style.width = `0%`;
    let r = Math.random();
    if (r < 0.2) {
        messages.innerHTML += "<p>You couldn't find any stones in the area</p>";
    } else if (r < 0.8) {
        messages.innerHTML += "<p>You found a stone!</p>";
        ++stones;
        document.querySelector('#wood').classList.remove('d-none');
    } else {
        if (Math.random() < 0.5) {
            messages.innerHTML += "<p>You found two stones near each other and decide to grab them both.</p>";
        } else if (Math.random() < 0.9) {
            messages.innerHTML += "<p>You find a stone nearby, and while looking around, see another one.</p>";
        } else {
            messages.innerHTML += "<p>You spent a bit of time looking for stones. Your effort is rewarded when you" +
                " find two lying close by.</p>";
        }
        stones += 2;
        document.querySelector('#wood').classList.remove('d-none');
    }
    document.querySelector('#stones').querySelectorAll('.count').forEach(r => r.innerHTML  = `${stones}`);
    document.querySelector('#stones').querySelector('.plural').innerHTML = (stones == 1 ? 'stone' : 'stones');
}

async function gatherwood() {
    // 5 seconds
    let bar = document.querySelector('#wood').querySelector('.progress-bar');
    let button = document.querySelector('#wood').querySelector('button');
    button.disabled = true;
    bar.style.width = '0%';
    for (let i = 0; i < 100; i += 2) {
        bar.style.width = `${i}%`;
        await new Promise(r => setTimeout(r, 100));
    }
    if (Math.random() < 0.2) {
        // stone breaks
        if (Math.random() < 0.5) {
            // wood
            messages.innerHTML += "<p>You grab a stone and head for the tree. You manage to break off a piece of" +
                " wood," +
                " but the stone slips from your hand, rolling off into a bush.</p>";
        } else {
            // no wood
            if (Math.random() < 0.01) {
                messages.innerHTML += "<p>You grab a stone and head for the nearest tree. From the shadows, you see a" +
                    " pair of eyes looking at you. You hear some sort of animal growling. Fearing for your life, you" +
                    " run, dropping the stone.</p>";
            } else {
                messages.innerHTML += "<p>You grab a stone and head for a tree. The stone bounces off the trunk and" +
                    " is" +
                    " lost.</p>";
            }
        }
    } else {
        if (Math.random() < 0.6) {
            messages.innerHTML += "<p>You manage to hack some wood off of a tree.</p>";
            ++wood;
        } else if (Math.random() < 0.75) {
            messages.innerHTML += "<p>Your trustworthy stone helps you get some wood from a nearby tree.</p>";
            ++wood;
        } else {
            messages.innerHTML += "<p>You're quite lucky! This tree had a lot of branches, and you manage to get two" +
                " wood.</p>";
            wood += 2;
        }
    }
    bar.style.width = `100%`;
    await new Promise(r => setTimeout(r, 500));
    button.disabled = false;
    bar.style.width = `0%`;
}