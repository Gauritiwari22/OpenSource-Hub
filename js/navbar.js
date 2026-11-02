// js/navbar.js
document.addEventListener("DOMContentLoaded", () => {
    // Check login state (Default is false unless set in localStorage)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const navbarHTML = `
        <nav class="navbar" style="border-bottom: 1px solid var(--border); padding: 1rem 0; background: #ffffff;">
            <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
                <a href="index.html" class="logo" style="font-weight: 800; font-size: 1.25rem; text-decoration: none; color: var(--text);">OpenSource Hub</a>
                <ul class="nav-links" style="display: flex; list-style: none; gap: 1.5rem; align-items: center; margin: 0;">
                    <li><a href="index.html" style="text-decoration: none; color: var(--text-muted); font-weight: 500;">Home</a></li>
                    <li><a href="projects.html" style="text-decoration: none; color: var(--text-muted); font-weight: 500;">Projects</a></li>
                    <li><a href="guides.html" style="text-decoration: none; color: var(--text-muted); font-weight: 500;">Guides</a></li>
                    ${isLoggedIn ? `
                        <li><a href="community.html" style="text-decoration: none; color: var(--text-muted); font-weight: 500;">Community</a></li>
                        <li><a href="dashboard.html" style="text-decoration: none; color: var(--text-muted); font-weight: 500;">Dashboard</a></li>
                    ` : ''}
                    <div style="display: flex; gap: 0.75rem; margin-left: 1rem;">
                        ${isLoggedIn ? `
                            <button id="logoutBtn" class="btn" style="padding: 0.5rem 1rem; border-radius: 8px; background: #f1f5f9;">Logout</button>
                        ` : `
                            <a href="login.html" class="btn btn-primary" style="text-decoration: none; padding: 0.5rem 1rem; border-radius: 8px; color: #ffffff;">Login</a>
                            <a href="register.html" class="btn btn-primary" style="text-decoration: none; padding: 0.5rem 1rem; border-radius: 8px; color: #ffffff;">Register</a>
                        `}
                    </div>
                </ul>
            </div>
        </nav>
    `;

    const footerHTML = `
        <footer style="border-top: 1px solid var(--border); padding: 2rem 0; margin-top: 4rem; text-align: center; color: var(--text-muted); background: #ffffff;">
            <div class="container">
                <p>© 2026 OpenSource Hub. Built for student developers worldwide.</p>
            </div>
        </footer>
    `;

    const navbarDiv = document.getElementById("navbar");
    if (navbarDiv) navbarDiv.innerHTML = navbarHTML;

    const footerDiv = document.getElementById("footer");
    if (footerDiv) footerDiv.innerHTML = footerHTML;

    // Handle logout action
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "index.html";
        });
    }
});