Let me review the current state of the key files to write an accurate, detailed prompt.

Read key component files

Read [](file:///e%3A/Project/sadia-therapy/src/components/Navbar.jsx)

Read [](file:///e%3A/Project/sadia-therapy/src/components/Hero.jsx)

Read [](file:///e%3A/Project/sadia-therapy/tailwind.config.js)

Read [](file:///e%3A/Project/sadia-therapy/src/components/About.jsx)

Read [](file:///e%3A/Project/sadia-therapy/src/components/Packages.jsx)

Read [](file:///e%3A/Project/sadia-therapy/src/pages/Appointment.jsx)

Read [](file:///e%3A/Project/sadia-therapy/src/api/api.js)

Read [](file:///e%3A/Project/sadia-therapy/src/index.css)

Read [](file:///e%3A/Project/sadia-therapy/index.html)

Let me also check the backend API structure to understand available endpoints for the logo.

Fetched https://github.com/mizanur75/tuba-api

Fetched https://github.com/mizanur75/tuba-api/blob/master/routes/api.php

Fetched https://github.com/mizanur75/tuba-api/blob/master/app/Http/Controllers/Api/ApiController.php

Fetched https://github.com/mizanur75/tuba-api/tree/master/database/migrations

Fetched https://github.com/mizanur75/tuba-api/tree/master/app/Models

Here's the final prompt:

---

## Final Implementation Prompt

> **Project:** Sadia Therapy — React 19 + Vite 7 + Tailwind CSS 3.4 frontend  
> **Backend:** Laravel REST API — `https://www.app.sadiatherapy.org/api/v1` (GitHub: https://github.com/mizanur75/tuba-api.git)  
> **Rule:** No backend changes — frontend only. All changes must be within the React project.

---

### 1. Dynamic Logo from API

**Current state:** The Navbar (Navbar.jsx) uses a hardcoded gradient circle with "ST" text and static text "Sadia Therapy / Solution-Focused Hypnotherapy".

**Backend status:** There is currently **no `/settings` or `/logo` API endpoint** in the Laravel backend. The existing models are: Video, About, Step, Package, Appointment, Testimonial. No `Setting` model exists.

**Required changes:**

- In api.js, add a new function:
  ```js
  export const getSettings = () => fetchAPI("/settings");
  ```
- In Navbar.jsx:
  - Fetch settings data on mount using `getSettings()`.
  - Replace the hardcoded gradient circle logo with a dynamic `<img>` tag that loads the logo from the API response: `baseURL + "storage/" + settings.logo`.
  - Replace the static "Sadia Therapy" and "Solution-Focused Hypnotherapy" text with `settings.site_name` and `settings.tagline` from the API response.
  - Keep a sensible fallback: if API fails or data is not yet loaded, show the current "ST" gradient circle and static text as defaults.
  - The logo image should be `w-12 h-12 rounded-full object-cover` to match the current circle shape.

> **Note to backend developer:** You need to create a `settings` table (with fields like `logo`, `site_name`, `tagline`, `favicon`, etc.), a `Setting` model, a `GET /api/v1/settings` endpoint in `ApiController`, and an admin CRUD for managing site settings.

---

### 2. Professional Menu/Navbar Redesign

**Current state:** The Navbar is a basic white bar with simple text links and a plain purple "Appointment" button. The mobile menu uses broken `<a href="#">` links instead of React Router `<Link>` components. Mobile menu doesn't close on link click.

**Required changes:**

- **Desktop nav:**
  - Add a subtle bottom border or backdrop blur effect (`backdrop-blur-md bg-white/90`) for a glass-morphism look.
  - Style nav links with a hover underline animation (e.g., an `after` pseudo-element that scales from 0 to full width on hover) using Tailwind + custom CSS.
  - Add an active link indicator that highlights the current route/section.
  - Improve the "Appointment" CTA button with a gradient (`bg-gradient-to-r from-purple-700 to-pink-600`), slight shadow, and hover scale effect.
  - Add smooth transitions on all interactive elements.

- **Mobile nav:**
  - Replace all `<a href="#">` tags with proper React Router `<Link>` components (matching the desktop links: Home `/`, Packages `/#packages`, Contact `/#contact`, Appointment `/appointment`).
  - Close the mobile menu when any link is clicked (`setOpen(false)` on click).
  - Replace the plain "☰" button with an animated hamburger icon (three lines that transition to an X when open).
  - Add a slide-down animation for the mobile menu panel.
  - Style mobile links with padding, dividers, and touch-friendly sizing (min 44px tap target).

---

### 3. Full-Display Video in Hero Section

**Current state:** Hero section (Hero.jsx) has `min-h-[500px] md:h-[520px]` — the video does not fill the full viewport.

**Required changes:**

- Change the hero `<section>` to be full viewport height: `h-screen` (or `min-h-screen`).
- Ensure the `<video>` element covers the entire section using `absolute inset-0 w-full h-full object-cover`.
- Add a dark gradient overlay on top of the video for text readability: a `<div>` with `absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent` (or `bg-black/40`).
- Remove the fixed height restrictions from `index.css` (`.hero-viewport { height: 520px; }`).
- Adjust the content positioning to be vertically centered in the full viewport.

---

### 4. Responsive Video Overlay Text

**Current state:** The text boxes on the video use fixed text sizes like `text-2xl sm:text-3xl md:text-4xl` and have purple/dark background boxes. The layout has a fixed `md:ml-32` left margin.

**Required changes:**

- Make all text fully responsive across all breakpoints:
  - **Subtitle:** `text-xs sm:text-sm md:text-base lg:text-lg`
  - **Title/Heading:** `text-xl sm:text-2xl md:text-3xl lg:text-5xl`
  - **Description:** `text-xs sm:text-sm md:text-base`
  - **Button:** Scale padding and font size responsively.
- Replace the left margin `md:ml-32` with responsive padding: `px-6 sm:px-10 md:px-16 lg:px-24`.
- On mobile, the content should be centered or left-aligned with appropriate padding — no overflow or text clipping.
- Ensure the subtitle and title background boxes (`bg-[#5b1462]`) use `inline` or `inline-block` display so they wrap naturally with the text on smaller screens.
- Add a max-width constraint that scales: `max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl`.
- Add subtle entry animations (fade-in + translate-up) when slides change, using CSS transitions or the existing `.overlay-panel` animation from `index.css`.

---

### 5. "Explore" Google Font for About Section Headings

**Current state:** The About section (About.jsx) headings use the default Montserrat font. The `<h2>` tags have classes like `text-2xl text-purple-700 font-bold`.

**Required changes:**

- In index.html, add the **Explore** font from Google Fonts to the existing `<link>` tag:

  ```html
  <link
    href="https://fonts.googleapis.com/css2?family=Explore&family=Montserrat:wght@300;500;700&family=Playfair+Display:wght@600;700&display=swap"
    rel="stylesheet"
  />
  ```

  _(Note: Verify that "Explore" is available on Google Fonts. If not available, use a similar decorative/display font like "Cinzel", "Cormorant Garamond", or "Italiana" and name the CSS class accordingly.)_

- In index.css, add a utility class:

  ```css
  .font-explore {
    font-family: "Explore", serif;
  }
  ```

- In About.jsx, apply this font class to both `<h2>` heading elements:
  - First section heading: `"Know Your Hero"` / `aboutData?.title1`
  - Second section heading: `"Explore My Therapy"` / `aboutData?.title2`
  - Add the class `font-explore` alongside existing classes. Optionally increase the heading size to `text-3xl` or `text-4xl` to showcase the decorative font.

---

### 6. Smart & Professional Date/Time Picker in Appointment Page

**Current state:** The Appointment page (Appointment.jsx) uses a plain HTML `<input type="date">` and a plain `<select>` dropdown for time slots. The available time window is 4:00 PM – 6:00 PM in 15-minute intervals. Booked slots are fetched from the API and filtered out. Weekends are blocked.

**Required changes:**

- **Date Picker redesign:**
  - Replace the plain `<input type="date">` with a custom inline calendar component (build with React, no external library needed).
  - Show a monthly calendar grid with: month/year header, prev/next month navigation arrows, day-of-week headers (Mon–Sun), and clickable date cells.
  - Style the calendar: selected date gets a purple filled circle (`bg-purple-700 text-white rounded-full`), today's date has a ring/outline (`ring-2 ring-purple-400`), past dates and weekends are greyed out and disabled (`opacity-40 cursor-not-allowed`).
  - Calendar should be compact and sit nicely within the form layout.

- **Time Slot redesign:**
  - Replace the `<select>` dropdown with a visual **time slot grid** — a grid of clickable buttons/chips.
  - Each slot shows the time (e.g., "4:00 PM", "4:15 PM") in 12-hour format for readability.
  - **Available slots:** White/light background with purple border, clickable.
  - **Selected slot:** Solid purple background (`bg-purple-700 text-white`).
  - **Booked/unavailable slots:** Grey background with strikethrough or "Booked" badge, not clickable.
  - Grid layout: `grid grid-cols-3 sm:grid-cols-4 gap-2` for responsive display.
  - Show a message "Please select a date first" if no date is chosen.
  - Show "No slots available" in a styled card if all slots are booked.

- **Layout:** Place the calendar and time slot grid side by side on desktop (`grid grid-cols-1 md:grid-cols-2 gap-6`) and stacked on mobile.

- **Preserve all existing logic:** weekend blocking, past-time filtering for today, booked slot fetching from API, and the hidden form field values for `date` and `time` that feed into `handleSubmit`.

---

### 7. Smart & Professional Package Cards Redesign

**Current state:** The Packages section (Packages.jsx) shows a simple 4-column grid of white cards with basic shadow. Each card shows price (£), name, description, and a "Free Discovery Call" button.

**Required changes:**

- **Card redesign — modern elevated style:**
  - Add a colored top accent bar or gradient header strip at the top of each card (purple gradient `from-purple-700 to-pink-600`, ~4px height or a full header section).
  - Display the package name prominently at the top in bold (`text-lg font-bold text-gray-800`).
  - Show the price in a large, eye-catching style: `text-3xl font-extrabold text-purple-700` with a small "£" prefix and optional "/session" suffix in smaller text.
  - Description in `text-sm text-gray-500` with a fixed height or line-clamp to keep cards uniform.
  - Add a horizontal divider line between the description and the CTA button.
  - CTA button: full-width, rounded, gradient background (`bg-gradient-to-r from-purple-700 to-pink-600 text-white`), with hover scale-up effect (`hover:scale-105 transition-transform`).

- **Card interactions:**
  - On hover: lift the card with increased shadow (`hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`).
  - Optionally highlight one card as "Most Popular" with a badge/ribbon and a distinct border (`border-2 border-purple-700`).

- **Grid layout:** Keep `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (3 columns is more balanced than 4 for professional cards). If there are 4+ packages, `lg:grid-cols-4` is acceptable.

- **Section header:** Style the "Packages" title with the decorative font, add a small purple underline accent below the heading, and improve the subtitle styling.

---

### General Guidelines

- **No backend modifications.** All changes are in the React frontend.
- Use **Tailwind CSS utility classes** as much as possible. Add custom CSS in index.css only when Tailwind can't achieve the effect (e.g., animations, pseudo-elements).
- Maintain all **existing API integrations and business logic** — fetching, filtering, form submission, etc.
- Ensure all changes are **fully responsive** (mobile-first).
- Use **existing color palette**: purple-700 (`#7e22ce` / `#5b1462`), pink-600, white, gray tones.
- Keep the code **clean and consistent** with the existing patterns (functional components, useState/useEffect hooks, React Router `<Link>`).

---
