class GenerateSetlist {
	
	listToSearch = [];
	criteria = {};
	currentDuration = 0;
  maxDuration = 0;
  acceptedLimit = 0;
  setlist = [];

  constructor(list, criteria, maxDuration, acceptedLimit) {
    this.listToSearch = list;
    this.criteria = criteria;
    this.maxDuration = maxDuration;
    this.acceptedLimit = acceptedLimit;
  }

  pickRandomTuneAndRemoveItFromList() {
    // Choisit un morceau dans la liste au hasard
    const randomIndex = Math.round(Math.random() * (this.listToSearch.length - 1))
    const tune = this.listToSearch[randomIndex];
    // Met à jour la durée de la setlist en cours de création
    this.currentDuration += tune.duration;
    // Ajoute le morceau
    this.setlist.push(tune);
    // Retire à la liste le morceau qui a déjà été ajouté
    this.listToSearch.splice(randomIndex, 1)
  }

	/**
	 * 
	 * @returns Renvoie une setlist au plus près de la limite.
	 * Inconvénient : le dernier morceau est souvent un morceau court.
	 */
	fillSetlist() {
		
    // Tant qu'on n'est pas dans la fourchette...
		while (!(this.currentDuration >= (this.maxDuration - this.acceptedLimit) &&
            this.currentDuration <= (this.maxDuration + this.acceptedLimit)) && this.listToSearch.length > 0)
    {
      // On ajoute une chanson au hasard et on la retire de la liste
      this.pickRandomTuneAndRemoveItFromList();

      // Si on a dépassé la limite :
      // on retire la dernière chanson de la setlist (et elle a déjà été retirée de la liste)
      if (this.currentDuration > (this.maxDuration + this.acceptedLimit)) {
        const lastTune = this.setlist[this.setlist.length - 1]
		    this.currentDuration -= lastTune.duration;
		    this.setlist.pop(); 
      }

      // Dans tous les cas, on ne garde dans la liste que les chansons ayant une durée assez courte
      this.listToSearch = this.listToSearch.filter(
        (tune) => tune.duration <= this.maxDuration + this.acceptedLimit - this.currentDuration
      )
		}

    return this.setlist;   
	}
};

function filterByCriteria(list, c) {
    if (c.style) {
        list = list.filter((tune) => tune.style.id === c.style)
    }
    if (c.mood) {
      list = list.filter((tune) => tune.mood_id === c.mood)
    }
    if (c.not_needed_instruments) {
        // filtrer selon les instrus
    }
    return list;
}


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

const generation = new GenerateSetlist(list, {}, 600, 10);

const newSetlist = generation.fillSetlist();


// module.exports = generateSetlist;