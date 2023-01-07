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

CREATE TABLE "orders" (
	"id" SERIAL PRIMARY KEY,
	"clientId" INTEGER NOT NULL REFERENCES "clients"("id"),
	"cakeId" INTEGER NOT NULL REFERENCES "cakes"("id"),
	"quantity" INTEGER NOT NULL CHECK(quantity>0 AND quantity<5),
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	"totalPrice" NUMERIC NOT NULL
);