const list = [
    {
      "id": 1,
      "title": "Lean On",
      "duration": 433,
      "has_solo": null,
      "date": "1981-04-18T19:06:26.000Z",
      "is_tiresome": true,
      "place": "Paris",
      "partition_path": "/partoche.pdf",
      "created_at": "2024-04-26T12:52:21.000Z",
      "updated_at": null,
      "band_id": 1,
      "style_id": 1,
      "mood_id": 4
    },
    {
      "id": 2,
      "title": "Lean On Jazz",
      "duration": 310,
      "has_solo": true,
      "date": "1981-04-18T19:06:26.000Z",
      "is_tiresome": null,
      "place": "Paris",
      "partition_path": "/partocheJazz.pdf",
      "created_at": "2024-04-26T12:52:48.000Z",
      "updated_at": null,
      "band_id": 1,
      "style_id": 2,
      "mood_id": 2
    },
    {
      "id": 3,
      "title": "Trust in me",
      "duration": 250,
      "has_solo": true,
      "date": "1981-04-18T19:06:26.000Z",
      "is_tiresome": null,
      "place": "Montreuil",
      "partition_path": "/trust.pdf",
      "created_at": "2024-04-26T12:53:15.000Z",
      "updated_at": null,
      "band_id": 1,
      "style_id": 1,
      "mood_id": null
    },
    {
      "id": 4,
      "title": "Rock",
      "duration": 112,
      "has_solo": true,
      "date": "1981-04-18T19:06:26.000Z",
      "is_tiresome": null,
      "place": "Montreuil",
      "partition_path": "/trust.pdf",
      "created_at": "2024-04-26T12:58:54.000Z",
      "updated_at": null,
      "band_id": 1,
      "style_id": 1,
      "mood_id": null
    },
    {
      "id": 5,
      "title": "Ah-a",
      "duration": 100,
      "has_solo": null,
      "date": null,
      "is_tiresome": null,
      "place": null,
      "partition_path": null,
      "created_at": "2024-04-29T13:11:09.000Z",
      "updated_at": null,
      "band_id": null,
      "style_id": 1,
      "mood_id": null
    },
    {
      "id": 6,
      "title": "Bravo",
      "duration": 80,
      "has_solo": null,
      "date": null,
      "is_tiresome": null,
      "place": null,
      "partition_path": null,
      "created_at": "2024-04-29T13:11:50.000Z",
      "updated_at": null,
      "band_id": 1,
      "style_id": 1,
      "mood_id": null
    },
    {
      "id": 7,
      "title": "Bravo long",
      "duration": 100,
      "has_solo": null,
      "date": null,
      "is_tiresome": null,
      "place": null,
      "partition_path": null,
      "created_at": "2024-04-29T13:12:01.000Z",
      "updated_at": null,
      "band_id": null,
      "style_id": 1,
      "mood_id": null
    },
    {
        "id": 8,
        "title": "Long",
        "duration": 50,
        "has_solo": null,
        "date": null,
        "is_tiresome": null,
        "place": null,
        "partition_path": null,
        "created_at": "2024-04-29T13:12:01.000Z",
        "updated_at": null,
        "band_id": null,
        "style_id": 1,
        "mood_id": null
      },
      {
        "id": 9,
        "title": "Truc",
        "duration": 50,
        "has_solo": null,
        "date": null,
        "is_tiresome": null,
        "place": null,
        "partition_path": null,
        "created_at": "2024-04-29T13:12:01.000Z",
        "updated_at": null,
        "band_id": null,
        "style_id": 1,
        "mood_id": null
      }
  ]


function filterByCriteria(list, c) {
    if (c.style) {
        list = list.filter((tune) => tune.style.id === c.style)
    }
    if (c.not_needed_instruments) {
        // filtrer selon les instrus
    }
    return list;
}

/**
 * 
 * @param {*} list Objet json contenant la liste des tunes
 * @param {*} maxDuration Durée max de la setlist
 * 
 * @returns Renvoie une setlist au plus près de la limite.
 * Inconvénient : le dernier morceau est souvent un morceau court.
 */
function fillSetlist(list, maxDuration, acceptedLimit) {
    const setlist = [];
    let currentDuration = 0;

    // Remplit la setlist au-delà de la limite
    while (currentDuration <= maxDuration) {
        
        const randIndex = Math.round(Math.random() * (list.length - 1))
        const tune = list[randIndex];
        currentDuration += tune.duration;
        setlist.push(tune);
        list.splice(randIndex, 1)
    }

    // Si on a presque le compte à 10 sec près
    if (currentDuration > (maxDuration - acceptedLimit) && currentDuration < (maxDuration + acceptedLimit)) {
        return setlist;
    }

    // Retire la dernière chanson et diminue la durée totale de celle-ci
    const lastTune = setlist[setlist.length - 1]
    currentDuration -= lastTune.duration;
    setlist.pop();    

    // Cherche les possibilités. Si aucune, tant pis. Sinon, ajouter une
    const possibilitiesLeft = list.filter((tune) => tune.duration <= maxDuration - currentDuration)
    
    if (possibilitiesLeft.length < 1) {
        return setlist;
    }

    const randIndex2 = (Math.round(Math.random() * (possibilitiesLeft.length - 1)))
    const lastPossibleTune = possibilitiesLeft[randIndex2];
    currentDuration += lastPossibleTune.duration;
    
    setlist.push(lastPossibleTune);
    possibilitiesLeft.splice(randIndex2, 1);
    
    return setlist;
}

// function generateSetlist(list, criteria, acceptedLimit) {
//     const filteredList = filterByCriteria(list, criteria);
//     const randomList = fillSetlist(filteredList, acceptedLimit);
//     return randomList;
// }

// console.log(generateSetlist(list, criteria, 20k))

// module.exports = generateSetlist;