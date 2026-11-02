-- =====================================================
-- OpenSource Hub - seed_projects.sql (Day 2, Gunika)
-- Run ONCE in Supabase SQL Editor. Running twice creates duplicates.
-- =====================================================

insert into public.projects (title, description, category, language, difficulty, github_url) values
('First Contributions', 'A hands-on tutorial that walks you through making your very first pull request on GitHub.', 'Education', 'Markdown', 'Beginner', 'https://github.com/firstcontributions/first-contributions'),
('freeCodeCamp', 'Free curriculum, articles and projects to learn web development, used by millions of learners.', 'Education', 'JavaScript', 'Beginner', 'https://github.com/freeCodeCamp/freeCodeCamp'),
('Public APIs', 'A curated list of free APIs for software and web development, perfect for adding links and fixes.', 'Resources', 'Python', 'Beginner', 'https://github.com/public-apis/public-apis'),
('MDN Web Docs Content', 'The content behind MDN, the most trusted documentation for HTML, CSS and JavaScript.', 'Documentation', 'Markdown', 'Beginner', 'https://github.com/mdn/content'),
('The Algorithms - Python', 'Implementations of popular algorithms and data structures in Python for learning.', 'Algorithms', 'Python', 'Beginner', 'https://github.com/TheAlgorithms/Python'),
('The Algorithms - JavaScript', 'Algorithms and data structures implemented in JavaScript for education.', 'Algorithms', 'JavaScript', 'Beginner', 'https://github.com/TheAlgorithms/JavaScript'),
('The Algorithms - Java', 'Collection of algorithms and data structures written in Java.', 'Algorithms', 'Java', 'Beginner', 'https://github.com/TheAlgorithms/Java'),
('Flask', 'A lightweight Python web framework with a friendly community and clear contribution guide.', 'Web Development', 'Python', 'Beginner', 'https://github.com/pallets/flask'),
('Excalidraw', 'A virtual whiteboard for sketching hand-drawn style diagrams, built with React.', 'Web Development', 'TypeScript', 'Intermediate', 'https://github.com/excalidraw/excalidraw'),
('Svelte', 'A compiler-based UI framework that builds fast web apps with less code.', 'Web Development', 'JavaScript', 'Intermediate', 'https://github.com/sveltejs/svelte'),
('Vue', 'The progressive JavaScript framework for building user interfaces.', 'Web Development', 'TypeScript', 'Intermediate', 'https://github.com/vuejs/core'),
('Django', 'The high-level Python web framework for building secure, maintainable websites.', 'Web Development', 'Python', 'Intermediate', 'https://github.com/django/django'),
('Supabase', 'The open-source Firebase alternative with Postgres, auth and storage.', 'Backend', 'TypeScript', 'Intermediate', 'https://github.com/supabase/supabase'),
('scikit-learn', 'Machine learning in Python with simple and efficient tools for data analysis.', 'Machine Learning', 'Python', 'Intermediate', 'https://github.com/scikit-learn/scikit-learn'),
('Home Assistant Core', 'Open-source home automation that puts local control and privacy first.', 'Home Automation', 'Python', 'Intermediate', 'https://github.com/home-assistant/core'),
('React', 'The library for building web and native user interfaces from components.', 'Web Development', 'JavaScript', 'Advanced', 'https://github.com/facebook/react'),
('Next.js', 'The React framework for production-grade full stack web applications.', 'Web Development', 'TypeScript', 'Advanced', 'https://github.com/vercel/next.js'),
('Visual Studio Code', 'The open-source code editor from Microsoft used by millions of developers.', 'Developer Tools', 'TypeScript', 'Advanced', 'https://github.com/microsoft/vscode'),
('TensorFlow', 'An end-to-end open-source platform for machine learning.', 'Machine Learning', 'C++', 'Advanced', 'https://github.com/tensorflow/tensorflow'),
('Godot Engine', 'A feature-packed 2D and 3D game engine, free and open source.', 'Game Development', 'C++', 'Advanced', 'https://github.com/godotengine/godot');

-- Check: select count(*) from public.projects;   -- should be 20