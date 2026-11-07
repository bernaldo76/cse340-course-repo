
CREATE TABLE IF NOT EXISTS public.organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

ALTER TABLE public.organization
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS contact_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS logo_filename VARCHAR(255);

INSERT INTO public.organization (
    organization_id, name, description, contact_email, logo_filename
)
VALUES
(1, 'BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
(2, 'GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
(3, 'UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png')
ON CONFLICT (organization_id)
DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    contact_email = EXCLUDED.contact_email,
    logo_filename = EXCLUDED.logo_filename;

SELECT setval(
    pg_get_serial_sequence('public.organization', 'organization_id'),
    (SELECT MAX(organization_id) FROM public.organization)
);

CREATE TABLE IF NOT EXISTS public.service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES public.organization(organization_id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

INSERT INTO public.service_project (
    project_id, organization_id, title, description, location, date
)
VALUES
(1, 1, 'Community Housing Renovation', 'Renovate homes for families in need using sustainable construction practices.', 'Lima, Peru', '2026-11-15'),
(2, 1, 'School Infrastructure Improvement', 'Repair and improve school facilities to provide safer learning environments.', 'Cusco, Peru', '2026-11-20'),
(3, 1, 'Community Center Construction', 'Build a community center for educational and neighborhood activities.', 'Arequipa, Peru', '2026-11-25'),
(4, 1, 'Sustainable Building Workshop', 'Teach sustainable construction techniques to local community members.', 'Quillabamba, Peru', '2026-12-01'),
(5, 1, 'Public Playground Restoration', 'Restore public playgrounds to create safe recreational spaces for children.', 'Lima, Peru', '2026-12-05'),
(6, 2, 'Community Urban Garden', 'Develop urban gardens to improve access to fresh and healthy food.', 'Cusco, Peru', '2026-11-16'),
(7, 2, 'Organic Farming Workshop', 'Teach organic farming techniques and sustainable food production.', 'Lima, Peru', '2026-11-21'),
(8, 2, 'Sustainable Irrigation Project', 'Install efficient irrigation systems for community agricultural projects.', 'Puno, Peru', '2026-11-26'),
(9, 2, 'School Gardening Program', 'Help students learn gardening and environmental sustainability.', 'Arequipa, Peru', '2026-12-02'),
(10, 2, 'Urban Composting Initiative', 'Promote composting to reduce organic waste and enrich urban soil.', 'Quillabamba, Peru', '2026-12-06'),
(11, 3, 'Community Food Distribution', 'Distribute donated food to families experiencing hardship.', 'Cusco, Peru', '2026-11-17'),
(12, 3, 'Volunteer Community Kitchen', 'Coordinate volunteers to prepare meals for vulnerable residents.', 'Lima, Peru', '2026-11-22'),
(13, 3, 'Elderly Assistance Program', 'Provide companionship and practical assistance to elderly residents.', 'Arequipa, Peru', '2026-11-27'),
(14, 3, 'Clothing Donation Campaign', 'Collect and distribute clothing to families in need.', 'Quillabamba, Peru', '2026-12-03'),
(15, 3, 'Community Volunteer Support', 'Organize volunteers to support local charities and community initiatives.', 'Puno, Peru', '2026-12-07')
ON CONFLICT (project_id)
DO UPDATE SET
    organization_id = EXCLUDED.organization_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    location = EXCLUDED.location,
    date = EXCLUDED.date;

SELECT setval(
    pg_get_serial_sequence('public.service_project', 'project_id'),
    (SELECT MAX(project_id) FROM public.service_project)
);

CREATE TABLE IF NOT EXISTS public.category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO public.category (name)
VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.project_category (
    project_id INTEGER NOT NULL REFERENCES public.service_project(project_id),
    category_id INTEGER NOT NULL REFERENCES public.category(category_id),
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO public.project_category (project_id, category_id)
SELECT p.project_id, c.category_id
FROM (
    VALUES
    (1, 'Community Service'),
    (2, 'Educational'),
    (3, 'Community Service'),
    (4, 'Educational'),
    (5, 'Community Service'),
    (6, 'Environmental'),
    (7, 'Educational'),
    (8, 'Environmental'),
    (9, 'Educational'),
    (10, 'Environmental'),
    (11, 'Community Service'),
    (12, 'Community Service'),
    (13, 'Community Service'),
    (14, 'Community Service'),
    (15, 'Community Service')
) AS assignments(project_id, category_name)
JOIN public.service_project p
    ON p.project_id = assignments.project_id
JOIN public.category c
    ON c.name = assignments.category_name
ON CONFLICT (project_id, category_id) DO NOTHING;
