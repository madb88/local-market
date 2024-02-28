create policy "Enable insert for authenticated users only"
on "public"."favorite_offers"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."favorite_offers"
as permissive
for select
to authenticated
using (true);


create policy "Enable update for users based on id"
on "public"."favorite_offers"
as permissive
for delete
to authenticated
using ((requesting_user_id() = user_id));



