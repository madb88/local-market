create table "public"."favorite_companies" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" text default requesting_user_id(),
    "company_id" bigint
);


alter table "public"."favorite_companies" enable row level security;

CREATE UNIQUE INDEX favorite_companies_pkey ON public.favorite_companies USING btree (id);

alter table "public"."favorite_companies" add constraint "favorite_companies_pkey" PRIMARY KEY using index "favorite_companies_pkey";

alter table "public"."favorite_companies" add constraint "public_favorite_companies_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."favorite_companies" validate constraint "public_favorite_companies_company_id_fkey";

grant delete on table "public"."favorite_companies" to "anon";

grant insert on table "public"."favorite_companies" to "anon";

grant references on table "public"."favorite_companies" to "anon";

grant select on table "public"."favorite_companies" to "anon";

grant trigger on table "public"."favorite_companies" to "anon";

grant truncate on table "public"."favorite_companies" to "anon";

grant update on table "public"."favorite_companies" to "anon";

grant delete on table "public"."favorite_companies" to "authenticated";

grant insert on table "public"."favorite_companies" to "authenticated";

grant references on table "public"."favorite_companies" to "authenticated";

grant select on table "public"."favorite_companies" to "authenticated";

grant trigger on table "public"."favorite_companies" to "authenticated";

grant truncate on table "public"."favorite_companies" to "authenticated";

grant update on table "public"."favorite_companies" to "authenticated";

grant delete on table "public"."favorite_companies" to "service_role";

grant insert on table "public"."favorite_companies" to "service_role";

grant references on table "public"."favorite_companies" to "service_role";

grant select on table "public"."favorite_companies" to "service_role";

grant trigger on table "public"."favorite_companies" to "service_role";

grant truncate on table "public"."favorite_companies" to "service_role";

grant update on table "public"."favorite_companies" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."favorite_companies"
as permissive
for delete
to authenticated
using ((requesting_user_id() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."favorite_companies"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."favorite_companies"
as permissive
for select
to public
using (true);



