# SparkHope Documentation

Modern multi-language documentation site built with Astro and Starlight theme.

## 🌟 Features

- **Multi-language Support**: 7 languages - English, Dutch, Arabic, Swahili, Hindi, Farsi/Persian, and Tamil
- **Automatic Language Detection**: Detects browser language and redirects automatically
- **RTL Support**: Full right-to-left support for Arabic and Farsi
- **Dark/Light Mode**: Automatic theme switching with user preference persistence
- **Fast Search**: Language-aware search powered by Pagefind
- **Mobile Responsive**: Works perfectly on all devices
- **Fast Build Times**: Built on Astro 5.0 for lightning-fast performance
- **SEO Optimized**: Automatic sitemap, meta tags, and structured data

## 🚀 Quick Start

### Prerequisites

- Node.js 20.0.0 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
.
├── src/
│   ├── content/
│   │   ├── docs/
│   │   │   ├── guide/         # English guide content
│   │   │   ├── events/        # English events content
│   │   │   ├── resources/     # English resources content
│   │   │   ├── nl/           # Dutch content
│   │   │   │   ├── guide/
│   │   │   │   ├── events/
│   │   │   │   └── resources/
│   │   │   ├── ar/           # Arabic content
│   │   │   │   ├── guide/
│   │   │   │   ├── events/
│   │   │   │   └── resources/
│   │   │   ├── sw/           # Swahili content
│   │   │   ├── hi/           # Hindi content
│   │   │   ├── fa/           # Farsi/Persian content
│   │   │   └── ta/           # Tamil content
│   │   └── config.ts
│   ├── middleware/            # Language detection middleware
│   └── styles/               # Custom CSS and RTL overrides
├── astro.config.mjs          # Astro configuration
├── package.json
└── README.md
```

## 🌍 Language Configuration

### Supported Languages

1. **English** (en) - Default language
2. **Dutch** (nl) - Nederlands
3. **Arabic** (ar) - العربية (RTL)
4. **Swahili** (sw) - Kiswahili
5. **Hindi** (hi) - हिन्दी
6. **Farsi/Persian** (fa) - فارسی (RTL)
7. **Tamil** (ta) - தமிழ்

### Adding Content

1. **English**: Add markdown files directly in `src/content/docs/[section]/`
2. **Other languages**: Add markdown files in `src/content/docs/[lang]/[section]/`

Example:
- English guide: `src/content/docs/guide/getting-started.md`
- Dutch guide: `src/content/docs/nl/guide/getting-started.md`
- Arabic guide: `src/content/docs/ar/guide/getting-started.md`

### Automatic Language Detection

The site automatically detects the user's browser language and redirects them to the appropriate version:

- Browser language detection via `Accept-Language` header
- User preference persistence via cookies
- Manual language switching available in the UI

### Language Switcher

Users can manually switch languages using the language selector in the navigation bar. Their preference is saved for future visits.

## 🎨 Customization

### Styling

- Edit `src/styles/custom.css` for general styles
- Edit `src/styles/rtl-overrides.css` for RTL-specific styles
- Modify theme colors in `astro.config.mjs`

### Navigation

Edit the sidebar configuration in `astro.config.mjs`:

```javascript
sidebar: [
  {
    label: 'Your Section',
    translations: {
      nl: 'Jouw Sectie',
      ar: 'قسمك',
      sw: 'Sehemu Yako',
      hi: 'आपका अनुभाग',
      fa: 'بخش شما',
      ta: 'உங்கள் பிரிவு',
    },
    autogenerate: { directory: 'your-section' },
  },
]
```

## 🌐 Language Coverage

This configuration provides documentation access to approximately:

- **English**: 2+ billion speakers (L1 + L2)
- **Dutch**: 24 million native speakers
- **Arabic**: 422 million speakers across MENA region
- **Swahili**: 200+ million speakers in East Africa
- **Hindi**: 600+ million speakers in India and diaspora
- **Farsi/Persian**: 110 million speakers in Iran, Afghanistan, Tajikistan
- **Tamil**: 78 million speakers in Tamil Nadu, Sri Lanka, Singapore, Malaysia

Total potential reach: **3.5+ billion people** 🌍

## 🚀 Deployment

### Vercel

```bash
npm run build
# Deploy dist folder
```

### Netlify

```bash
npm run build
# Deploy dist folder
```

### GitHub Pages

GitHub Actions workflow is included for automatic deployment.

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on GitHub.
