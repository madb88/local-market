drop policy "Enable read access for all users" on "public"."favorite_offers";

create policy "Enable read access for all users"
on "public"."favorite_offers"
as permissive
for select
to public
using (true);



