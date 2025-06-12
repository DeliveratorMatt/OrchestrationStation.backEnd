DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS instruments;
DROP TABLE IF EXISTS feedback;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username text UNIQUE NOT NULL,
    password text NOT NULL,
    email text UNIQUE NOT NULL,    
    admin boolean NOT NULL DEFAULT false,
    member_since timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP   
);

CREATE TABLE instruments (
    id serial PRIMARY KEY,
    family text NOT NULL,
    instrument_name text NOT NULL,
    description text NOT NULL,
    range text NOT NULL,
    famous_musicians text NOT NULL,
    famous_excerpts text NOT NULL,
    score_url text NOT NULL,
    history text NOT NULL
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

CREATE TABLE feedback (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    content text NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE bibliography (
    id serial PRIMARY KEY,
    source_name text NOT NULL,
    author text NOT NULL,
    publication_year integer NOT NULL,
    url text NOT NULL
);