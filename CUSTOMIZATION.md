# Customization Guide

This guide will help you customize your portfolio to make it truly yours.

## 🔗 Update Your Links

### 1. LinkedIn URL
Update in two files:

**app/components/Hero.tsx** (line ~134):
```tsx
<motion.a
  href="https://linkedin.com/in/your-profile"  // ← Update this
  target="_blank"
  rel="noopener noreferrer"
```

**app/components/Contact.tsx** (line ~115):
```tsx
<motion.a
  href="https://linkedin.com/in/your-profile"  // ← Update this
  target="_blank"
  rel="noopener noreferrer"
```

### 2. GitHub URL
Update in two files:

**app/components/Hero.tsx** (line ~143):
```tsx
<motion.a
  href="https://github.com/your-username"  // ← Update this
  target="_blank"
  rel="noopener noreferrer"
```

**app/components/Contact.tsx** (line ~125):
```tsx
<motion.a
  href="https://github.com/your-username"  // ← Update this
  target="_blank"
  rel="noopener noreferrer"
```

### 3. Project Links
Update in **app/components/Projects.tsx**:

For each project in the `projects` array, update:
```tsx
{
  title: 'Filmox',
  // ... other properties
  github: 'https://github.com/your-username/filmox',  // ← Update
  live: 'https://filmox.example.com',  // ← Update or remove if no live demo
}
```

## 🎨 Customize Colors

### Option 1: Update CSS Variables
Edit **app/globals.css**:

```css
:root {
  --background: #0a0a0a;        /* Main background */
  --foreground: #ededed;         /* Text color */
  --primary: #3b82f6;           /* Primary blue */
  --primary-dark: #2563eb;      /* Darker blue */
  --accent: #8b5cf6;            /* Purple accent */
  --accent-dark: #7c3aed;       /* Darker purple */
}
```

### Option 2: Update Gradient Colors
Find and replace gradient classes in components:

- `from-blue-500 to-purple-500` → Your preferred gradient
- `from-blue-500 to-cyan-500` → Your preferred gradient
- etc.

## 📝 Update Content

### 1. Personal Information

**app/components/Hero.tsx**:
```tsx
// Update name
<span className="gradient-text">Your Name</span>

// Update title
<h2>Your Professional Title</h2>

// Update description
<p>Your professional summary...</p>

// Update contact info
<FiMail /> your.email@example.com
<FiPhone /> +1234567890
<FiMapPin /> Your City, Country
```

### 2. About Section

**app/components/About.tsx**:
```tsx
// Update professional summary
<p className="text-gray-300 leading-relaxed text-lg">
  Your professional summary...
</p>

// Update statistics
<div className="text-3xl font-bold gradient-text">X+</div>
<div className="text-gray-400 text-sm">Years Experience</div>

// Update education
<h4>Your Degree</h4>
<p>Your Major</p>
<p>Your University</p>
<p className="text-blue-400 font-semibold">GPA: X.XX/X</p>
<p>Month Year – Month Year</p>

// Update highlights
{[
  'Your achievement 1',
  'Your achievement 2',
  // ...
].map((highlight, index) => (
  // ...
))}
```

### 3. Skills

**app/components/Skills.tsx**:

Add or remove skills from the `skillCategories` array:
```tsx
{
  title: 'Your Category',
  color: 'from-color-500 to-color-500',
  skills: [
    { name: 'Skill Name', icon: IconComponent, color: '#HEX' },
    // Add more skills
  ],
}
```

### 4. Experience

**app/components/Experience.tsx**:

Update job details:
```tsx
<h3>Your Job Title</h3>
<p>Your Company Name</p>

// Update dates
<span>Month Year – Present</span>

// Update location
<span>Your City, Country</span>

// Update responsibilities
const responsibilities = [
  'Your responsibility 1',
  'Your responsibility 2',
  // ...
];

// Update tech stack
{['Tech1', 'Tech2', 'Tech3'].map((tech, index) => (
  // ...
))}
```

### 5. Projects

**app/components/Projects.tsx**:

Update the `projects` array:
```tsx
{
  title: 'Your Project Name',
  subtitle: 'Project Tagline',
  description: 'Detailed project description...',
  tech: ['Tech1', 'Tech2', 'Tech3'],
  icons: [Icon1, Icon2, Icon3],
  github: 'https://github.com/your-username/project',
  live: 'https://project-demo.com',
  gradient: 'from-blue-500 to-cyan-500',
}
```

## 🖼️ Add Your Photo

### 1. Add Photo to Public Folder
Place your photo in the `public` folder:
```
public/
  └── profile.jpg  (or .png)
```

### 2. Update Hero Component
Add to **app/components/Hero.tsx**:

```tsx
import Image from 'next/image';

// Inside the component, add:
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="mb-8"
>
  <Image
    src="/profile.jpg"
    alt="Balagangatharan M"
    width={200}
    height={200}
    className="rounded-full border-4 border-blue-500 glow mx-auto"
  />
</motion.div>
```

## 📄 Add Resume Download

### 1. Add Resume to Public Folder
```
public/
  └── resume.pdf
```

### 2. Update Hero Component
Change the "View Projects" button in **app/components/Hero.tsx**:

```tsx
<motion.a
  href="/resume.pdf"
  download
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-8 py-3 glass rounded-full font-semibold text-white hover:bg-white/10 transition-all flex items-center gap-2"
>
  <FiDownload />
  Download Resume
</motion.a>
```

## 🎯 Add More Sections

### Create a New Component
1. Create file: `app/components/YourSection.tsx`
2. Follow the pattern of existing components
3. Import and add to `app/page.tsx`:

```tsx
import YourSection from './components/YourSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <YourSection />  {/* ← Add here */}
      <Contact />
      <Footer />
    </main>
  );
}
```

## 🔧 Advanced Customization

### Add New Animations
Use Framer Motion variants:

```tsx
const customVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

<motion.div
  variants={customVariants}
  initial="hidden"
  animate="visible"
>
  Your content
</motion.div>
```

### Add New Icons
1. Find icons at [React Icons](https://react-icons.github.io/react-icons/)
2. Import: `import { IconName } from 'react-icons/fi';`
3. Use: `<IconName size={24} />`

### Modify Responsive Breakpoints
Use TailwindCSS breakpoints:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)

Example:
```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## 📱 Test Your Changes

After making changes:
1. Save the file
2. Check the browser (auto-refreshes with Next.js)
3. Test on different screen sizes
4. Verify all links work
5. Check animations are smooth

## 🚀 Deploy After Customization

Once you're happy with your changes:

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel
```

---

Need help? Check the [Next.js Documentation](https://nextjs.org/docs) or [TailwindCSS Documentation](https://tailwindcss.com/docs)
