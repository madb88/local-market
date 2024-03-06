alter table "public"."offers" add column "expired_at" timestamp with time zone;

create policy "Enable delete for users based on user_id"
on "public"."companies"
as permissive
for delete
to anon
using (true);


create policy "Enable delete for users based on user_id"
on "public"."offers"
as permissive
for delete
to anon
using (true);



