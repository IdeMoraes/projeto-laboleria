CREATE DATABASE "la_boleria";

CREATE TABLE "cakes" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR UNIQUE NOT NULL CHECK (LENGTH("name")>=2),
	"price" NUMERIC NOT NULL CHECK (price>0),
	"image" VARCHAR NOT NULL,
	"description" TEXT
);

CREATE TABLE "clients" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL,
	"address" VARCHAR NOT NULL,
	"phone" VARCHAR NOT NULL CHECK (LENGTH("phone")>=10 AND LENGTH("phone")<=11)
);