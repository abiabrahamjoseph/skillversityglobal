import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_template" AS ENUM('home', 'about', 'admissions', 'contact', 'placements', 'mentors', 'campus-life', 'skillfolio', 'privacy', 'custom');
  CREATE TYPE "public"."enum_pages_skillversity_hero_theme" AS ENUM('light', 'cool', 'warm', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_template" AS ENUM('home', 'about', 'admissions', 'contact', 'placements', 'mentors', 'campus-life', 'skillfolio', 'privacy', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_skillversity_hero_theme" AS ENUM('light', 'cool', 'warm', 'dark');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TABLE "pages_skillversity_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"color" varchar DEFAULT 'var(--brand-blue)'
  );
  
  CREATE TABLE "pages_skillversity_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"color" varchar DEFAULT 'var(--brand-blue)'
  );
  
  CREATE TABLE "pages_skillversity_content_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_skillversity_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_skillversity_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_skillversity_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "_pages_v_version_skillversity_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"color" varchar DEFAULT 'var(--brand-blue)',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_skillversity_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"color" varchar DEFAULT 'var(--brand-blue)',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_skillversity_content_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_skillversity_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_skillversity_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_skillversity_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "programs_stat_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"color" varchar DEFAULT 'var(--brand-blue)'
  );
  
  CREATE TABLE "programs_modules_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar NOT NULL
  );
  
  CREATE TABLE "programs_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "programs_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "programs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer
  );
  
  ALTER TABLE "pages" ADD COLUMN "template" "enum_pages_template" DEFAULT 'custom';
  ALTER TABLE "pages" ADD COLUMN "skillversity_hero_eyebrow" varchar;
  ALTER TABLE "pages" ADD COLUMN "skillversity_hero_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "skillversity_hero_highlight" varchar;
  ALTER TABLE "pages" ADD COLUMN "skillversity_hero_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "skillversity_hero_theme" "enum_pages_skillversity_hero_theme" DEFAULT 'light';
  ALTER TABLE "pages" ADD COLUMN "skillversity_hero_primary_cta_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "skillversity_hero_primary_cta_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "skillversity_hero_secondary_cta_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "skillversity_hero_secondary_cta_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_template" "enum__pages_v_version_template" DEFAULT 'custom';
  ALTER TABLE "_pages_v" ADD COLUMN "version_skillversity_hero_eyebrow" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_skillversity_hero_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_skillversity_hero_highlight" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_skillversity_hero_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_skillversity_hero_theme" "enum__pages_v_version_skillversity_hero_theme" DEFAULT 'light';
  ALTER TABLE "_pages_v" ADD COLUMN "version_skillversity_hero_primary_cta_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_skillversity_hero_primary_cta_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_skillversity_hero_secondary_cta_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_skillversity_hero_secondary_cta_url" varchar;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'admin' NOT NULL;
  ALTER TABLE "programs" ADD COLUMN "hero_gradient" varchar;
  ALTER TABLE "programs" ADD COLUMN "market" varchar DEFAULT 'India + GCC';
  ALTER TABLE "programs" ADD COLUMN "certification_label" varchar;
  ALTER TABLE "programs" ADD COLUMN "overview_heading" varchar;
  ALTER TABLE "programs" ADD COLUMN "overview_subhead" varchar;
  ALTER TABLE "programs" ADD COLUMN "overview_body" varchar;
  ALTER TABLE "programs" ADD COLUMN "overview_callout_title" varchar;
  ALTER TABLE "programs" ADD COLUMN "overview_callout_body" varchar;
  ALTER TABLE "programs" ADD COLUMN "salary_india" varchar;
  ALTER TABLE "programs" ADD COLUMN "salary_india_desc" varchar;
  ALTER TABLE "programs" ADD COLUMN "salary_gulf" varchar;
  ALTER TABLE "programs" ADD COLUMN "salary_gulf_desc" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "common_cta_primary_label" varchar DEFAULT 'Book Free Counselling Call';
  ALTER TABLE "site_settings" ADD COLUMN "common_cta_primary_url" varchar DEFAULT '/contact';
  ALTER TABLE "site_settings" ADD COLUMN "common_cta_secondary_label" varchar DEFAULT 'WhatsApp Now';
  ALTER TABLE "site_settings" ADD COLUMN "common_cta_secondary_url" varchar DEFAULT 'https://wa.me/919946033355?text=Hi%20Skillversity';
  ALTER TABLE "site_settings" ADD COLUMN "lead_form_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "analytics_google_analytics_id" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "analytics_meta_pixel_id" varchar;
  ALTER TABLE "pages_skillversity_stats" ADD CONSTRAINT "pages_skillversity_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_skillversity_feature_cards" ADD CONSTRAINT "pages_skillversity_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_skillversity_content_sections_items" ADD CONSTRAINT "pages_skillversity_content_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_skillversity_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_skillversity_content_sections" ADD CONSTRAINT "pages_skillversity_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_skillversity_steps" ADD CONSTRAINT "pages_skillversity_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_skillversity_faqs" ADD CONSTRAINT "pages_skillversity_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_skillversity_stats" ADD CONSTRAINT "_pages_v_version_skillversity_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_skillversity_feature_cards" ADD CONSTRAINT "_pages_v_version_skillversity_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_skillversity_content_sections_items" ADD CONSTRAINT "_pages_v_version_skillversity_content_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_skillversity_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_skillversity_content_sections" ADD CONSTRAINT "_pages_v_version_skillversity_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_skillversity_steps" ADD CONSTRAINT "_pages_v_version_skillversity_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_skillversity_faqs" ADD CONSTRAINT "_pages_v_version_skillversity_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_stat_boxes" ADD CONSTRAINT "programs_stat_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_modules_topics" ADD CONSTRAINT "programs_modules_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs_modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_modules" ADD CONSTRAINT "programs_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_faqs" ADD CONSTRAINT "programs_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_skillversity_stats_order_idx" ON "pages_skillversity_stats" USING btree ("_order");
  CREATE INDEX "pages_skillversity_stats_parent_id_idx" ON "pages_skillversity_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_skillversity_feature_cards_order_idx" ON "pages_skillversity_feature_cards" USING btree ("_order");
  CREATE INDEX "pages_skillversity_feature_cards_parent_id_idx" ON "pages_skillversity_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_skillversity_content_sections_items_order_idx" ON "pages_skillversity_content_sections_items" USING btree ("_order");
  CREATE INDEX "pages_skillversity_content_sections_items_parent_id_idx" ON "pages_skillversity_content_sections_items" USING btree ("_parent_id");
  CREATE INDEX "pages_skillversity_content_sections_order_idx" ON "pages_skillversity_content_sections" USING btree ("_order");
  CREATE INDEX "pages_skillversity_content_sections_parent_id_idx" ON "pages_skillversity_content_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_skillversity_steps_order_idx" ON "pages_skillversity_steps" USING btree ("_order");
  CREATE INDEX "pages_skillversity_steps_parent_id_idx" ON "pages_skillversity_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_skillversity_faqs_order_idx" ON "pages_skillversity_faqs" USING btree ("_order");
  CREATE INDEX "pages_skillversity_faqs_parent_id_idx" ON "pages_skillversity_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_skillversity_stats_order_idx" ON "_pages_v_version_skillversity_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_version_skillversity_stats_parent_id_idx" ON "_pages_v_version_skillversity_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_skillversity_feature_cards_order_idx" ON "_pages_v_version_skillversity_feature_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_version_skillversity_feature_cards_parent_id_idx" ON "_pages_v_version_skillversity_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_skillversity_content_sections_items_order_idx" ON "_pages_v_version_skillversity_content_sections_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_skillversity_content_sections_items_parent_id_idx" ON "_pages_v_version_skillversity_content_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_skillversity_content_sections_order_idx" ON "_pages_v_version_skillversity_content_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_version_skillversity_content_sections_parent_id_idx" ON "_pages_v_version_skillversity_content_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_skillversity_steps_order_idx" ON "_pages_v_version_skillversity_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_version_skillversity_steps_parent_id_idx" ON "_pages_v_version_skillversity_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_skillversity_faqs_order_idx" ON "_pages_v_version_skillversity_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_version_skillversity_faqs_parent_id_idx" ON "_pages_v_version_skillversity_faqs" USING btree ("_parent_id");
  CREATE INDEX "programs_stat_boxes_order_idx" ON "programs_stat_boxes" USING btree ("_order");
  CREATE INDEX "programs_stat_boxes_parent_id_idx" ON "programs_stat_boxes" USING btree ("_parent_id");
  CREATE INDEX "programs_modules_topics_order_idx" ON "programs_modules_topics" USING btree ("_order");
  CREATE INDEX "programs_modules_topics_parent_id_idx" ON "programs_modules_topics" USING btree ("_parent_id");
  CREATE INDEX "programs_modules_order_idx" ON "programs_modules" USING btree ("_order");
  CREATE INDEX "programs_modules_parent_id_idx" ON "programs_modules" USING btree ("_parent_id");
  CREATE INDEX "programs_faqs_order_idx" ON "programs_faqs" USING btree ("_order");
  CREATE INDEX "programs_faqs_parent_id_idx" ON "programs_faqs" USING btree ("_parent_id");
  CREATE INDEX "programs_rels_order_idx" ON "programs_rels" USING btree ("order");
  CREATE INDEX "programs_rels_parent_idx" ON "programs_rels" USING btree ("parent_id");
  CREATE INDEX "programs_rels_path_idx" ON "programs_rels" USING btree ("path");
  CREATE INDEX "programs_rels_testimonials_id_idx" ON "programs_rels" USING btree ("testimonials_id");
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_lead_form_id_forms_id_fk" FOREIGN KEY ("lead_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_lead_form_idx" ON "site_settings" USING btree ("lead_form_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_skillversity_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_skillversity_feature_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_skillversity_content_sections_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_skillversity_content_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_skillversity_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_skillversity_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_skillversity_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_skillversity_feature_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_skillversity_content_sections_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_skillversity_content_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_skillversity_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_skillversity_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_stat_boxes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_modules_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programs_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_skillversity_stats" CASCADE;
  DROP TABLE "pages_skillversity_feature_cards" CASCADE;
  DROP TABLE "pages_skillversity_content_sections_items" CASCADE;
  DROP TABLE "pages_skillversity_content_sections" CASCADE;
  DROP TABLE "pages_skillversity_steps" CASCADE;
  DROP TABLE "pages_skillversity_faqs" CASCADE;
  DROP TABLE "_pages_v_version_skillversity_stats" CASCADE;
  DROP TABLE "_pages_v_version_skillversity_feature_cards" CASCADE;
  DROP TABLE "_pages_v_version_skillversity_content_sections_items" CASCADE;
  DROP TABLE "_pages_v_version_skillversity_content_sections" CASCADE;
  DROP TABLE "_pages_v_version_skillversity_steps" CASCADE;
  DROP TABLE "_pages_v_version_skillversity_faqs" CASCADE;
  DROP TABLE "programs_stat_boxes" CASCADE;
  DROP TABLE "programs_modules_topics" CASCADE;
  DROP TABLE "programs_modules" CASCADE;
  DROP TABLE "programs_faqs" CASCADE;
  DROP TABLE "programs_rels" CASCADE;
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_lead_form_id_forms_id_fk";
  
  DROP INDEX "site_settings_lead_form_idx";
  ALTER TABLE "pages" DROP COLUMN "template";
  ALTER TABLE "pages" DROP COLUMN "skillversity_hero_eyebrow";
  ALTER TABLE "pages" DROP COLUMN "skillversity_hero_title";
  ALTER TABLE "pages" DROP COLUMN "skillversity_hero_highlight";
  ALTER TABLE "pages" DROP COLUMN "skillversity_hero_description";
  ALTER TABLE "pages" DROP COLUMN "skillversity_hero_theme";
  ALTER TABLE "pages" DROP COLUMN "skillversity_hero_primary_cta_label";
  ALTER TABLE "pages" DROP COLUMN "skillversity_hero_primary_cta_url";
  ALTER TABLE "pages" DROP COLUMN "skillversity_hero_secondary_cta_label";
  ALTER TABLE "pages" DROP COLUMN "skillversity_hero_secondary_cta_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_template";
  ALTER TABLE "_pages_v" DROP COLUMN "version_skillversity_hero_eyebrow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_skillversity_hero_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_skillversity_hero_highlight";
  ALTER TABLE "_pages_v" DROP COLUMN "version_skillversity_hero_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_skillversity_hero_theme";
  ALTER TABLE "_pages_v" DROP COLUMN "version_skillversity_hero_primary_cta_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_skillversity_hero_primary_cta_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_skillversity_hero_secondary_cta_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_skillversity_hero_secondary_cta_url";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "programs" DROP COLUMN "hero_gradient";
  ALTER TABLE "programs" DROP COLUMN "market";
  ALTER TABLE "programs" DROP COLUMN "certification_label";
  ALTER TABLE "programs" DROP COLUMN "overview_heading";
  ALTER TABLE "programs" DROP COLUMN "overview_subhead";
  ALTER TABLE "programs" DROP COLUMN "overview_body";
  ALTER TABLE "programs" DROP COLUMN "overview_callout_title";
  ALTER TABLE "programs" DROP COLUMN "overview_callout_body";
  ALTER TABLE "programs" DROP COLUMN "salary_india";
  ALTER TABLE "programs" DROP COLUMN "salary_india_desc";
  ALTER TABLE "programs" DROP COLUMN "salary_gulf";
  ALTER TABLE "programs" DROP COLUMN "salary_gulf_desc";
  ALTER TABLE "site_settings" DROP COLUMN "common_cta_primary_label";
  ALTER TABLE "site_settings" DROP COLUMN "common_cta_primary_url";
  ALTER TABLE "site_settings" DROP COLUMN "common_cta_secondary_label";
  ALTER TABLE "site_settings" DROP COLUMN "common_cta_secondary_url";
  ALTER TABLE "site_settings" DROP COLUMN "lead_form_id";
  ALTER TABLE "site_settings" DROP COLUMN "analytics_google_analytics_id";
  ALTER TABLE "site_settings" DROP COLUMN "analytics_meta_pixel_id";
  DROP TYPE "public"."enum_pages_template";
  DROP TYPE "public"."enum_pages_skillversity_hero_theme";
  DROP TYPE "public"."enum__pages_v_version_template";
  DROP TYPE "public"."enum__pages_v_version_skillversity_hero_theme";
  DROP TYPE "public"."enum_users_role";`)
}
