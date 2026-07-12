-- Reference schema for the `users` table.
-- NOT executed automatically - spring.jpa.hibernate.ddl-auto=update creates
-- and evolves this table for you on startup. Keep this file for manual
-- database setup, migrations tooling, or documentation purposes.

CREATE DATABASE IF NOT EXISTS preppilot;
USE preppilot;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    CONSTRAINT uq_users_email UNIQUE (email)
);
