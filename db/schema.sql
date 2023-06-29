

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
    photo_url VARCHAR(100)
);


CREATE TABLE dress(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    price DECIMAL,
    photo_url VARCHAR(100),
    posted_by  INTEGER REFERENCES user_account(id),
    posted_at date DEFAULT NOW()::timestamp(0)
);

CREATE TABLE following (
    id INTEGER REFERENCES user_account(id),
    followed_by INTEGER REFERENCES user_account(id),
    PRIMARY KEY (id, followed_by)
);




-- INSERT INTO user_account (first_name, last_name, username, email, photo_url) VALUES ()


INSERT INTO user_account (first_name, last_name, username, email, photo_url) VALUES ('Rachel', 'Zoe', 'rachelzoe', 'rachelzoe@gmail.com', 'https://hairstyles.thehairstyler.com/hairstyle_views/front_view_images/13216/original/Rachel-Zoe-long-wavy-hairstyle.jpg');



INSERT INTO user_account (first_name, last_name, username, email, photo_url) VALUES ('Anna', 'Wintour', 'annawintour', 'annawintour@gmail.com', 'https://upload.wikimedia.org/wikipedia/commons/8/85/Anna_Wintour.jpg')




