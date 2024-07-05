CREATE DATABASE org;

\c org;

CREATE USER admin WITH PASSWORD 'admin';

GRANT ALL PRIVILEGES ON DATABASE org TO admin;

CREATE TABLE "User" (
    "userId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20)
);

CREATE TABLE "Organisation" (
    "orgId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT
);

CREATE TABLE "UserOrganisation" (
    "userId" UUID REFERENCES "User"("userId") ON DELETE CASCADE,
    "orgId" UUID REFERENCES "Organisation"("orgId") ON DELETE CASCADE,
    PRIMARY KEY ("userId", "orgId")
);

GRANT ALL PRIVILEGES ON TABLE "User", "Organisation", "UserOrganisation" TO admin;
