CREATE TABLE IF NOT EXISTS public.service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES public.organization(organization_id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

INSERT INTO public.service_project (organization_id, title, description, location, date)
VALUES
(1, 'Community Health Campaign', 'Provide basic health services to families in need.', 'Lima, Peru', '2026-11-15'),
(1, 'Blood Donation Drive', 'Organize a community blood donation event.', 'Cusco, Peru', '2026-11-20'),
(1, 'First Aid Training', 'Teach basic first aid skills to community members.', 'Arequipa, Peru', '2026-11-25'),
(1, 'Emergency Preparedness', 'Help families prepare for natural disasters.', 'Quillabamba, Peru', '2026-12-01'),
(1, 'Medical Supplies Collection', 'Collect medical supplies for local health centers.', 'Lima, Peru', '2026-12-05'),
(2, 'School Supply Drive', 'Collect school supplies for children.', 'Cusco, Peru', '2026-11-16'),
(2, 'Children Literacy Program', 'Promote reading and literacy among children.', 'Lima, Peru', '2026-11-21'),
(2, 'Clean Water Initiative', 'Support access to clean drinking water.', 'Puno, Peru', '2026-11-26'),
(2, 'Youth Education Workshop', 'Provide educational workshops for young people.', 'Arequipa, Peru', '2026-12-02'),
(2, 'Children Nutrition Program', 'Promote healthy nutrition for children.', 'Quillabamba, Peru', '2026-12-06'),
(3, 'Food Distribution', 'Distribute food to families in need.', 'Cusco, Peru', '2026-11-17'),
(3, 'Community Kitchen', 'Prepare meals for vulnerable community members.', 'Lima, Peru', '2026-11-22'),
(3, 'Elderly Care Program', 'Provide support and companionship to elderly people.', 'Arequipa, Peru', '2026-11-27'),
(3, 'Clothing Donation Drive', 'Collect and distribute clothing to families.', 'Quillabamba, Peru', '2026-12-03'),
(3, 'Community Support Project', 'Organize volunteers to assist local families.', 'Puno, Peru', '2026-12-07');