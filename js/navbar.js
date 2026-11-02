// js/navbar.js
document.addEventListener("DOMContentLoaded", () => {
    const navbarHTML = `
        <nav class="navbar" style="border-bottom: 1px solid #eee; padding: 1rem 0;">
            <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
                <a href="index.html" class="logo" style="font-weight: bold; font-size: 1.25rem; text-decoration: none; color: inherit;">OpenSource Hub</a>
                <ul class="nav-links" style="display: flex; list-style: none; gap: 1.5rem; align-items: center; margin: 0;">
                    <li><a href="index.html" style="text-decoration: none; color: inherit;">Home</a></li>
                    <li><a href="projects.html" style="text-decoration: none; color: inherit;">Projects</a></li>
                    <li><a href="guides.html" style="text-decoration: none; color: inherit;">Guides</a></li>
                    <li><a href="community.html" style="text-decoration: none; color: inherit;">Community</a></li>
                    <div style="display: flex; gap: 0.75rem;">
                        <li><a href="login.html" class="btn btn-primary" style="text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; color: #ffffff;">Login</a></li>
                        <li><a href="register.html" class="btn btn-primary" style="text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; color: #ffffff;">Register</a></li>
                    </div>
                </ul>
            </div>
        </nav>
    `;

    const footerHTML = `
        <footer style="border-top: 1px solid #eee; padding: 1.5rem 0; margin-top: 3rem; text-align: center; color: #666;">
            <div class="container">
                <p>© 2026 OpenSource Hub. Built for open-source learners.</p>
            </div>
        </footer>
    `;

    // Inject into the placeholder divs if they exist
    const navbarDiv = document.getElementById("navbar");
    if (navbarDiv) navbarDiv.innerHTML = navbarHTML;

    const footerDiv = document.getElementById("footer");
    if (footerDiv) footerDiv.innerHTML = footerHTML;
});