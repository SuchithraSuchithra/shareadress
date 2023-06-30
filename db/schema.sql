

CREATE DATABASE shareadress;

CREATE TABLE user_account(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    username VARCHAR(100),
    password_digest VARCHAR(150),
    date_joined date DEFAULT NOW()::timestamp(0),
    email VARCHAR(100),
    last_login date,
    photo_url VARCHAR(500)
);

CREATE TABLE dress(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    price DECIMAL,
    photo_url VARCHAR(500),
    posted_by  INTEGER REFERENCES user_account(id),
    posted_at date DEFAULT NOW()::timestamp(0)
);

CREATE TABLE follow (
    id INTEGER REFERENCES user_account(id),
    follower INTEGER REFERENCES user_account(id),
    PRIMARY KEY (id, follower)
);

CREATE TABLE wishlist (
    user_id INTEGER REFERENCES user_account(id),
    dress_id INTEGER REFERENCES dress(id),
    added_at date DEFAULT NOW()::timestamp(0),
    PRIMARY KEY (user_id, dress_id)
);
