create table flowers(
    id serial primary key,
    name varchar(255) not null,
    price int not null,
    img varchar(255) not null,
    category varchar(255) not null,
    description varchar(255)
);

create table users(
    id serial primary key,
    email varchar(255) not null,
    password varchar(255) not null
);