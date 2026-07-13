-- ============================================================================
-- Bistro Mali Raj — Supabase schema
--
-- HOW TO USE:
-- 1. Create a free project at https://supabase.com
-- 2. Open the SQL Editor in the Supabase dashboard
-- 3. Paste this entire file and click "Run"
-- 4. See README.md section 10 for how to create staff logins afterwards
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ADMIN ALLOWLIST
-- Having a Supabase Auth login is not enough to reach /admin on its own —
-- a user must ALSO have a row here. This lets the owner create a login for
-- someone in the Supabase dashboard without automatically handing them
-- access, and revoke access later by deleting a row here (without deleting
-- their login).
-- ----------------------------------------------------------------------------
create table if not exists public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  created_at timestamptz not null default now()
);

-- Helper used inside RLS policies below: is the current request from
-- someone logged in AND present in admin_users?
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users where id = auth.uid()
  );
$$;

alter table public.admin_users enable row level security;

create policy "Admins can view the admin list"
  on public.admin_users for select
  using (public.is_admin());

-- Note: inserting/removing admin_users rows is intentionally left to the
-- Supabase dashboard's SQL editor (owner-only) rather than exposed through
-- the app, so a compromised staff login can never grant itself more access.

-- ----------------------------------------------------------------------------
-- MENU ITEMS
-- ----------------------------------------------------------------------------
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in
    ('burgeri','pizza','rostilj','sendvici','salate','dnevna-jela','deserti','pica')),
  name text not null,
  description text not null default '',
  price numeric(6,2) not null check (price >= 0),
  image text not null default '',
  calories integer,
  allergens text[] not null default '{}',
  popular boolean not null default false,
  spicy boolean not null default false,
  vegetarian boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists menu_items_category_idx on public.menu_items (category, sort_order);

alter table public.menu_items enable row level security;

create policy "Anyone can view menu items"
  on public.menu_items for select
  using (true);

create policy "Admins can insert menu items"
  on public.menu_items for insert
  with check (public.is_admin());

create policy "Admins can update menu items"
  on public.menu_items for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete menu items"
  on public.menu_items for delete
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- WEEKLY MENU (7 fixed days, each with a soup + several main dishes)
-- ----------------------------------------------------------------------------
create table if not exists public.weekly_menu_days (
  id uuid primary key default gen_random_uuid(),
  day text not null unique check (day in
    ('Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak','Subota','Nedjelja')),
  day_order integer not null,
  soup text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.weekly_menu_mains (
  id uuid primary key default gen_random_uuid(),
  day_id uuid not null references public.weekly_menu_days (id) on delete cascade,
  name text not null,
  description text not null default '',
  price numeric(6,2) not null check (price >= 0),
  sort_order integer not null default 0
);

create index if not exists weekly_menu_mains_day_idx on public.weekly_menu_mains (day_id, sort_order);

alter table public.weekly_menu_days enable row level security;
alter table public.weekly_menu_mains enable row level security;

create policy "Anyone can view weekly menu days"
  on public.weekly_menu_days for select using (true);
create policy "Admins can update weekly menu days"
  on public.weekly_menu_days for update using (public.is_admin()) with check (public.is_admin());

create policy "Anyone can view weekly menu mains"
  on public.weekly_menu_mains for select using (true);
create policy "Admins can insert weekly menu mains"
  on public.weekly_menu_mains for insert with check (public.is_admin());
create policy "Admins can update weekly menu mains"
  on public.weekly_menu_mains for update using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete weekly menu mains"
  on public.weekly_menu_mains for delete using (public.is_admin());

-- ============================================================================
-- SEED DATA — migrated from the original src/lib/data/menu.ts and weekly.ts
-- Safe to re-run: it clears and reloads these two tables only.
-- ============================================================================
truncate table public.menu_items restart identity cascade;
truncate table public.weekly_menu_days restart identity cascade;

insert into public.menu_items
  (category, name, description, price, image, calories, allergens, popular, spicy, vegetarian, sort_order)
values
  ('burgeri','Mali Raj Burger','180g domaći pljeskavica burger, dimljeni cheddar, karamelizirani luk, iceberg, umak od raja.',8.90,'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',780,'{gluten,mlijeko,jaja}',true,false,false,1),
  ('burgeri','Dimni BBQ Burger','Govedina 200g, hrskava slanina, BBQ umak, prstenovi luka, gouda.',9.90,'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?q=80&w=1200&auto=format&fit=crop',890,'{gluten,mlijeko}',true,false,false,2),
  ('burgeri','Double Cheese Burger','Dva pljeskavica odreska, dvostruki cheddar, umak kuće, kiseli krastavci.',10.50,'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1200&auto=format&fit=crop',950,'{gluten,mlijeko}',false,false,false,3),
  ('burgeri','Veggie Burger','Burger od leće i povrća, rukola, avokado krema, rajčica.',8.50,'https://images.unsplash.com/photo-1600688640154-9619e002df30?q=80&w=1200&auto=format&fit=crop',610,'{gluten}',false,false,true,4),
  ('burgeri','Crispy Chicken Burger','Pohana pileća prsa, hrskavi kupus salata, ljuti majoneza.',8.50,'https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1200&auto=format&fit=crop',720,'{gluten,jaja}',false,true,false,5),

  ('pizza','Margherita','Rajčica San Marzano, mozzarella, svježi bosiljak, maslinovo ulje.',6.90,'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop',640,'{gluten,mlijeko}',false,false,true,1),
  ('pizza','Pizza Mali Raj','Pršut, gljive, rukola, parmezan pahuljice, tartufni umak — kućni specijalitet.',9.50,'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1200&auto=format&fit=crop',780,'{gluten,mlijeko}',true,false,false,2),
  ('pizza','Diavola','Ljuta kulen kobasica, feferoni, mozzarella, rajčica umak.',8.50,'https://images.unsplash.com/photo-1571066811602-716837d681de?q=80&w=1200&auto=format&fit=crop',820,'{gluten,mlijeko}',false,true,false,3),
  ('pizza','Quattro Formaggi','Mozzarella, gorgonzola, parmezan, ementaler, krema vrhnja.',8.90,'https://images.unsplash.com/photo-1613564834361-9436948817d1?q=80&w=1200&auto=format&fit=crop',900,'{gluten,mlijeko}',false,false,true,4),
  ('pizza','Vrtna pizza','Tikvice, patlidžan, paprika, cherry rajčica, mozzarella, pesto.',8.20,'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1200&auto=format&fit=crop',590,'{gluten,mlijeko}',false,false,true,5),

  ('rostilj','Ćevapi (10 kom)','Domaći mljeveni ćevapi, lepinja, kajmak, luk, ajvar.',8.90,'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',850,'{gluten,mlijeko}',true,false,false,1),
  ('rostilj','Pljeskavica','300g domaća pljeskavica, lepinja, kajmak, luk, ajvar, salata.',9.90,'https://images.unsplash.com/photo-1633436375795-12b3b339712f?q=80&w=1200&auto=format&fit=crop',920,'{gluten,mlijeko}',true,false,false,2),
  ('rostilj','Vešalica na žaru','Svinjski vrat, marinada od začina, prilog po izboru.',10.90,'https://images.unsplash.com/photo-1616252980327-ec70572e5df9?q=80&w=1200&auto=format&fit=crop',780,'{}',false,false,false,3),
  ('rostilj','Mali Raj Mix plata','Ćevapi, pileći ražnjić, vešalica, kobasica, prženi krumpir, kupus salata — za dvije osobe.',22.90,'https://images.unsplash.com/photo-1508615263227-c5d58c1e5821?q=80&w=1200&auto=format&fit=crop',1800,'{gluten}',true,false,false,4),
  ('rostilj','Pileći ražnjići','Marinirani pileći ražnjići s roštilja, prilog po izboru.',8.90,'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1200&auto=format&fit=crop',620,'{}',false,false,false,5),

  ('sendvici','Sendvič s piletinom','Grilana piletina, svježa salata, rajčica, majoneza umak, tost kruh.',5.90,'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=1200&auto=format&fit=crop',480,'{gluten,jaja}',false,false,false,1),
  ('sendvici','Tuna sendvič','Tuna salata, kukuruz, jaje, svježa zelena salata.',5.50,'https://images.unsplash.com/photo-1481070414801-51fd732d7184?q=80&w=1200&auto=format&fit=crop',430,'{gluten,riba,jaja}',false,false,false,2),
  ('sendvici','Club Sendvič','Tri kriške tosta, piletina, slanina, jaje, salata, rajčica.',6.90,'https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?q=80&w=1200&auto=format&fit=crop',650,'{gluten,jaja,mlijeko}',false,false,false,3),

  ('salate','Cezar salata','Piletina, parmezan, kroutoni, cezar dressing, zelena salata.',6.90,'https://images.unsplash.com/photo-1556386734-4227a180d19e?q=80&w=1200&auto=format&fit=crop',420,'{mlijeko,gluten,jaja}',false,false,false,1),
  ('salate','Grčka salata','Feta sir, masline, krastavac, rajčica, crveni luk, origano.',6.50,'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=1200&auto=format&fit=crop',380,'{mlijeko}',false,false,true,2),
  ('salate','Domaća kupus salata','Svježi bijeli kupus, mrkva, ulje, ocat — savršena uz roštilj.',3.20,'https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1200&auto=format&fit=crop',90,'{}',false,false,true,3),

  ('dnevna-jela','Gulaš s njokima','Domaći gulaš od junetine, mekani njoki, kruh.',6.50,'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',710,'{gluten,jaja}',false,false,false,1),
  ('dnevna-jela','Sarma','Domaća sarma u kiselom kupusu s dimljenim mesom, pire krumpir.',6.90,'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1200&auto=format&fit=crop',680,'{}',false,false,false,2),

  ('deserti','Palačinke s Nutellom','Domaće palačinke, Nutella, mljeveni lješnjak, šlag.',4.50,'https://images.unsplash.com/photo-1757635964104-67218db55bca?q=80&w=1200&auto=format&fit=crop',520,'{gluten,mlijeko,jaja,lješnjak}',false,false,true,1),
  ('deserti','Kuglice sladoleda (3 kom)','Vanilija, čokolada, jagoda — domaći sladoled.',3.50,'https://images.unsplash.com/photo-1724805053604-4f189fb90dff?q=80&w=1200&auto=format&fit=crop',310,'{mlijeko}',false,false,true,2),
  ('deserti','Kolač od tvarog','Domaći cheesecake s voćnim preljevom po izboru.',3.90,'https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?q=80&w=1200&auto=format&fit=crop',430,'{gluten,mlijeko,jaja}',false,false,true,3),

  ('pica','Domaća limunada','Svježe cijeđeni limun, metvica, soda.',3.00,'https://images.unsplash.com/photo-1555949366-819808d99159?q=80&w=1200&auto=format&fit=crop',90,'{}',false,false,true,1),
  ('pica','Craft pivo 0.5l','Izbor lokalnih craft pivara, pitajte konobara za ponudu.',4.20,'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=1200&auto=format&fit=crop',210,'{gluten}',false,false,false,2),
  ('pica','Espresso / Cappuccino','100% arabica, pržena za Bistro Mali Raj.',1.60,'https://images.unsplash.com/photo-1572286258217-40142c1c6a70?q=80&w=1200&auto=format&fit=crop',5,'{mlijeko}',false,false,true,3);

-- Weekly menu days + mains
with days as (
  insert into public.weekly_menu_days (day, day_order, soup) values
    ('Ponedjeljak', 1, 'Pileća juha s rezancima'),
    ('Utorak',      2, 'Goveđa juha s domaćim rezancima'),
    ('Srijeda',      3, 'Juha od povrća'),
    ('Četvrtak',     4, 'Pileća juha s rezancima'),
    ('Petak',        5, 'Riblja juha'),
    ('Subota',       6, 'Goveđa juha'),
    ('Nedjelja',     7, 'Pileća juha s domaćim rezancima')
  returning id, day
)
insert into public.weekly_menu_mains (day_id, name, description, price, sort_order)
select id, main.name, main.description, main.price, main.sort_order
from days
join (values
  ('Ponedjeljak', 'Grah s kobasicom', 'Domaći grah kuhan s dimljenom kobasicom i povrćem.', 5.90, 1),
  ('Ponedjeljak', 'Pileći file s povrćem', 'Pileći file na žaru, dinstano sezonsko povrće.', 6.50, 2),
  ('Utorak', 'Gulaš s njokima', 'Domaći gulaš od junetine, mekani njoki.', 6.50, 1),
  ('Utorak', 'Punjena paprika', 'Paprika punjena mesom i rižom u rajčica umaku, pire krumpir.', 6.20, 2),
  ('Srijeda', 'Sarma', 'Domaća sarma u kiselom kupusu, pire krumpir.', 6.90, 1),
  ('Srijeda', 'Piletina s vrhnjem', 'Pileći medaljoni u umaku od vrhnja i gljiva, tjestenina.', 6.80, 2),
  ('Četvrtak', 'Đuveč s piletinom', 'Riža s povrćem i komadima piletine.', 6.20, 1),
  ('Četvrtak', 'Svinjski odrezak', 'Panirani svinjski odrezak, pire krumpir, salata.', 6.90, 2),
  ('Petak', 'Riba na žaru', 'Oslić na žaru, blitva s krumpirom.', 7.90, 1),
  ('Petak', 'Ćevapi (5 kom)', 'Domaći ćevapi, lepinja, kajmak, luk.', 5.90, 2),
  ('Subota', 'Pečena piletina', 'Pečena piletina s krumpirom iz pećnice, sezonska salata.', 6.90, 1),
  ('Subota', 'Mješano meso s roštilja', 'Izbor od tri vrste mesa, prilog po izboru.', 9.90, 2),
  ('Nedjelja', 'Nedjeljni ručak: Pečenka', 'Domaća svinjska pečenka, mlinci, sezonsko povrće.', 8.90, 1),
  ('Nedjelja', 'Punjena piletina', 'Piletina punjena sirom i pršutom, pire krumpir.', 7.90, 2)
) as main(day, name, description, price, sort_order)
  on main.day = days.day;
