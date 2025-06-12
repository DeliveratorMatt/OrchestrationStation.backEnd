DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS instruments;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username text UNIQUE NOT NULL,
    password text NOT NULL  
);

CREATE TABLE instruments (
    id serial PRIMARY KEY,
    instrument_name text NOT NULL,
    description text NOT NULL,
    range text NOT NULL,
    famous_musicians text NOT NULL,
    famous_excerpts text NOT NULL,
    score_links text NOT NULL,
    history text NOT NULL,
    image_url text NOT NULL
);


CREATE TABLE comments (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    category text NOT NULL,
    content text NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    instrument_id integer NOT NULL,
    FOREIGN KEY (instrument_id) REFERENCES instruments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
    user_id integer NOT NULL,
    instrument_id integer NOT NULL,
    PRIMARY KEY (user_id, instrument_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (instrument_id) REFERENCES instruments(id) ON DELETE CASCADE
);