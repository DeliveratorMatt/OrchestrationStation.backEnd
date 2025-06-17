DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS instruments;
DROP TABLE IF EXISTS instruments_musicians;
DROP TABLE IF EXISTS instruments_excerpts;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS bibliography;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username text UNIQUE NOT NULL,
    password text NOT NULL,
    email text UNIQUE NOT NULL,    
    admin boolean NOT NULL DEFAULT false,
    member_since timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP   
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


CREATE TABLE instruments (
    id serial PRIMARY KEY,
    family text NOT NULL,
    instrument_name text NOT NULL,
    description text NOT NULL,
    range text NOT NULL,
    history text NOT NULL
);

CREATE TABLE instruments_musicians (
    instrument_id integer PRIMARY KEY NOT NULL,
    famous_musicians text NOT NULL,
    famous_musicians_url text NOT NULL,
    FOREIGN KEY (instrument_id) REFERENCES instruments(id) ON DELETE CASCADE
);

CREATE TABLE instruments_excerpts (
    instrument_id integer PRIMARY KEY NOT NULL,
    famous_excerpts text NOT NULL,
    famous_excerpts_url text NOT NULL,
    score_url text NOT NULL,
    FOREIGN KEY (instrument_id) REFERENCES instruments(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
    user_id integer NOT NULL,
    instrument_id integer NOT NULL,
    PRIMARY KEY (user_id, instrument_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (instrument_id) REFERENCES instruments(id) ON DELETE CASCADE
);

CREATE TABLE feedback (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    content text NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE bibliography (
    id serial PRIMARY KEY,
    title text NOT NULL,
    category text NOT NULL,
    author text,
    publication_year integer,
    url text NOT NULL,
);