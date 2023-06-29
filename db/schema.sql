

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

CREATE TABLE follow (
    id INTEGER REFERENCES user_account(id),
    follower INTEGER REFERENCES user_account(id),
    PRIMARY KEY (id, follower)
);




-- INSERT INTO user_account (first_name, last_name, username, email, photo_url) VALUES ()



-- USERS
INSERT INTO user_account (first_name, last_name, username, email, photo_url) VALUES ('Rachel', 'Zoe', 'rachelzoe', 'rachelzoe@gmail.com', 'https://hairstyles.thehairstyler.com/hairstyle_views/front_view_images/13216/original/Rachel-Zoe-long-wavy-hairstyle.jpg');


INSERT INTO user_account (first_name, last_name, username, email, photo_url) VALUES ('Anna', 'Wintour', 'annawintour', 'annawintour@gmail.com', 'https://upload.wikimedia.org/wikipedia/commons/8/85/Anna_Wintour.jpg');


INSERT INTO user_account (first_name, last_name, username, email, photo_url) VALUES ('Karl', 'Lagerfeld', 'karllagerfeld', 'karllagerfeld@gmail.com', 'https://cdnuploads.aa.com.tr/uploads/Contents/2019/02/19/thumbs_b_c_9dee174bf0271dcbe08074653f3e2aae.jpg?v=190652');

-- DRESSES
Zoe - 5
'Zimmermann Floral Dress' 'https://www.net-a-porter.com/variants/images/1647597316896946/in/w920_q60.jpg'
'Oroton Lace Top' 'https://www.net-a-porter.com/variants/images/1647597316896952/fr/w920_q60.jpg'

Anna - 6
'White Satin Dress' 'https://www.net-a-porter.com/variants/images/1647597311343062/ou/w2000_q60.jpg'


Karl - 7
'Victoria Beckham' 'https://www.net-a-porter.com/variants/images/1647597306704716/in/w2000_q80.jpg'



'ChicWish' 'https://aus.chicwish.com/media/catalog/product/cache/789a34736ead3066d85296b038a5aa03/2/0/20707mm.69.jpg'

Zoe follows Anna and Karl
Anna follows Karl