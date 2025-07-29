CREATE TABLE "favorites" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "favorites_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"movie_id" integer NOT NULL,
	"poster" varchar,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "favorites_user_id_movie_id_unique" UNIQUE("user_id","movie_id")
);
