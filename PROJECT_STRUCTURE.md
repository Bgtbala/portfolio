# Project Structure

```
portfolio/
├── app/
│   ├── components/
│   │   ├── About.tsx          # About section with professional summary & education
│   │   ├── Contact.tsx        # Contact section with form & contact info
│   │   ├── Experience.tsx     # Experience section with timeline design
│   │   ├── Footer.tsx         # Footer with copyright
│   │   ├── Hero.tsx          # Hero section with animated background
│   │   ├── Navbar.tsx        # Navigation bar with glass morphism
│   │   ├── Projects.tsx      # Projects showcase section
│   │   └── Skills.tsx        # Skills section with categorized tech stack
│   ├── favicon.ico           # Website favicon
│   ├── globals.css           # Global styles with custom animations
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page assembling all components
├── public/                    # Static assets folder
├── node_modules/             # Dependencies (auto-generated)
├── .next/                    # Next.js build output (auto-generated)
├── .git/                     # Git repository
├── .gitignore               # Git ignore file
├── eslint.config.mjs        # ESLint configuration
├── next-env.d.ts            # Next.js TypeScript declarations
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Locked dependency versions
├── postcss.config.mjs       # PostCSS configuration for TailwindCSS
├── tsconfig.json            # TypeScript configuration
├── README.md                # Project documentation
└── QUICK_START.md           # Quick start guide
```

## Component Breakdown

### Core Components (app/components/)

1. **Navbar.tsx**
   - Fixed navigation bar
   - Glass morphism effect on scroll
   - Responsive mobile menu
   - Smooth scroll to sections

2. **Hero.tsx**
   - Animated gradient background
   - Floating background elements
   - Personal information display
   - CTA buttons
   - Social media links
   - Scroll indicator

3. **About.tsx**
   - Professional summary
   - Education details
   - Statistics cards (years of experience, projects)
   - Key highlights with achievements

4. **Skills.tsx**
   - 5 categorized skill sections:
     * Frontend (React, Next.js, Redux, TypeScript, TailwindCSS)
     * Backend (Node.js, Express, Socket.io, JWT, APIs)
     * Databases (MongoDB, Mongoose, MySQL, Redis)
     * Cloud & DevOps (AWS, Nginx, Docker, GitHub Actions, Vercel)
     * Tools & Practices (Git, GitHub, Postman)
   - Proper icons for each technology
   - Additional expertise tags
   - Hover animations

5. **Experience.tsx**
   - Timeline design with gradient line
   - Current position indicator
   - Detailed responsibilities
   - Technology tags
   - Company information

6. **Projects.tsx**
   - 4 major projects:
     * Filmox (MERN, Sockets, Redis)
     * Vaidyog (Healthcare Job Portal)
     * GOG (Sustainability Initiative)
     * Samurai (Manufacturing System)
   - Tech stack icons
   - Project descriptions
   - GitHub and live demo links
   - Gradient accents

7. **Contact.tsx**
   - Contact information cards
   - Social media links
   - Contact form with validation
   - Animated interactions

8. **Footer.tsx**
   - Copyright information
   - Built with indicator

## Styling System

### globals.css
- CSS custom properties for colors
- Custom scrollbar styling
- Gradient text utility class
- Glass morphism utility class
- Animated gradient background
- Glow effects

### TailwindCSS
- Utility-first CSS framework
- Responsive design utilities
- Custom color scheme
- Hover and transition effects

## Technologies Used

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Icons**: Icon library
- **Lucide React**: Additional icons

## Key Features

1. **Responsive Design**: Mobile-first approach
2. **Animations**: Scroll-triggered and hover animations
3. **Glass Morphism**: Modern transparent card effects
4. **Gradient Backgrounds**: Dynamic animated backgrounds
5. **SEO Optimized**: Proper meta tags and semantic HTML
6. **Performance**: Optimized for fast loading
7. **Type Safety**: Full TypeScript implementation
8. **Modern UI/UX**: Professional and engaging design
