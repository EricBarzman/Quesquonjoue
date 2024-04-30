BEGIN;

DROP TABLE IF EXISTS
instruments,
styles,
type_of_gigs,
moods,
costumes,
tunes,
setlists,
bands,
users CASCADE;

CREATE TABLE IF NOT EXISTS users (
    pk INT NOT NULL AUTO_INCREMENT,
    id UUID NOT NULL,
    username VARCHAR(128) NOT NULL,
    mail VARCHAR(128),
    role VARCHAR(64),
    password VARCHAR(255),
    avatar_path VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(pk),
    UNIQUE(id)
);

CREATE TABLE IF NOT EXISTS bands (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS instruments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    family VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS styles (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS moods (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS type_of_gigs (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS costumes (
    id INT NOT NULL AUTO_INCREMENT,
    label VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS tunes (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    band_id INT,
    duration TIME,
    partition_path VARCHAR(255),
    has_solo BOOLEAN,
    is_tiresome BOOLEAN,
    style_id INT,
    mood_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (style_id) REFERENCES styles(id),
    FOREIGN KEY (mood_id) REFERENCES moods(id),
    FOREIGN KEY (band_id) REFERENCES bands(id)
);

CREATE TABLE IF NOT EXISTS setlists (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    band_id INT,
    duration TIME,
    date DATETIME,
    place VARCHAR(255),
    costume_id INT,
    user_creator_id INT,
    user_gig_leader_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (user_gig_leader_id) REFERENCES users(pk),
    FOREIGN KEY (user_creator_id) REFERENCES users(pk),
    FOREIGN KEY (costume_id) REFERENCES costumes(id),
    FOREIGN KEY (band_id) REFERENCES bands(id)
);

CREATE TABLE IF NOT EXISTS user_has_instrument (
    instrument_id INT,
    user_id INT,
    FOREIGN KEY (instrument_id) REFERENCES instruments(id),
    FOREIGN KEY (user_id) REFERENCES users(pk)
);

CREATE TABLE IF NOT EXISTS user_creates_setlist (
    user_id INT,
    setlist_id INT,
    FOREIGN KEY (user_id) REFERENCES users(pk),
    FOREIGN KEY (setlist_id) REFERENCES setlists(id)
);

CREATE TABLE IF NOT EXISTS user_is_in_a_band (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    band_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(pk),
    FOREIGN KEY (band_id) REFERENCES bands(id)
);

CREATE TABLE IF NOT EXISTS tune_does_not_have_instrument (
    instrument_id INT,
    tune_id INT,
    FOREIGN KEY (instrument_id) REFERENCES instruments(id),
    FOREIGN KEY (tune_id) REFERENCES tunes(id)
);

CREATE TABLE IF NOT EXISTS setlist_list_of_tunes (
    id INT NOT NULL AUTO_INCREMENT, 
    setlist_id INT,
    tune_id INT,
    position INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (setlist_id) REFERENCES setlists(id),
    FOREIGN KEY (tune_id) REFERENCES tunes(id)
);

COMMIT;