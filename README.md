# 🎮 AmiVerse

A modern universal portfolio and file management system built with Next.js 15, featuring Google Drive integration and a sleek dark-themed UI.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-orange?style=for-the-badge&logo=cloudflare)

## ✨ Featuress

### 🎯 Gaming Portfolio
- **Game Profiles**: Dedicated pages for Genshin Impact, Honkai Star Rail, Wuthering Waves, Valorant, Other
- **Character Showcases**: Detailed character profiles with stats and achievements
- **Team Compositions**: Character team setups and strategies
- **World Exploration**: Game world progress tracking
- **Achievement System**: Gaming achievements and progress monitoring

### 📁 File Management
- **Google Drive Integration**: Complete file system navigation
- **File Preview**: Support for images, videos, PDFs, audio, text, JSON files
- **Search Functionality**: Full-text search across all files
- **Secure Downloads**: Token-based download system with resumable support
- **Pretty URLs**: SEO-friendly folder navigation (`/kertas/folder-name`)
- **Grid/List Views**: Toggle between different viewing modes

### 🎨 Modern UI/UX
- **Dark Theme**: Consistent dark mode design
- **Responsive Design**: Mobile-first approach with smooth animations
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Cloud Platform account with Drive API enabled
- Cloudflare account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amirumna/amiverse.git
   cd amiverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local .env
   ```
   
   Fill in your environment variables:
   ```env
   # Google Drive Integration
   GOOGLE_PROJECT_ID=your_project_id
   GOOGLE_PRIVATE_KEY_ID=your_private_key_id
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_CLIENT_EMAIL=your_service_account@project.iam.gserviceaccount.com
   GOOGLE_CLIENT_ID=your_client_id
   ROOT_FOLDER_ID=your_root_folder_id
   GDRIVE_HMAC_SECRET=your_hmac_secret

   # Email Service
   RESEND_API_KEY=your_resend_api_key
   RESEND_FROM=noreply@yourdomain.com
   CONTACT_TO_EMAIL=contact@yourdomain.com

   # CORS (optional)
   NEXT_PUBLIC_ALLOWED_ORIGINS=https://yourdomain.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technology Stack

### Core Framework
- **Next.js 15.5.4** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript 5** - Type-safe JavaScript
- **Turbopack** - Fast development builds

### Styling & UI
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Geist Font** - Modern typography

### Backend & APIs
- **Google APIs** - Google Drive integration
- **Resend** - Email service
- **Node.js** - Server-side runtime

### Deployment
- **Cloudflare Workers** - Serverless deployment
- **OpenNext.js** - Next.js to Cloudflare adapter
- **Wrangler** - Cloudflare CLI tool

## 📁 Project Structure

```
amigames/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── gdrive-file/   # File serving endpoint
│   │   ├── gdrive-list/   # Folder listing endpoint
│   │   ├── gdrive-search/ # File search endpoint
│   │   ├── gdrive-download/ # Secure download endpoint
│   │   ├── file-viewer/   # File preview endpoint
│   │   └── send/          # Contact form endpoint
│   ├── games/             # Gaming profile pages
│   │   ├── genshin-impact/
│   │   ├── honkai-star-rail/
│   │   ├── wuthering-waves/
│   │   └── valorant/
│   ├── kertas/            # File browser pages
│   │   └── [slug]/        # Dynamic folder pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── maintanance/       # Maintenance page
├── components/            # React components
│   ├── gaming/           # Gaming-specific components
│   ├── ui/               # Reusable UI components
│   ├── gdrive-list.tsx   # Main file browser component
│   ├── site-header.tsx   # Navigation component
│   └── hero.tsx          # Landing hero component
├── lib/                  # Utility libraries
│   ├── gdrive.ts         # Google Drive API client
│   ├── gaming-data.ts    # Gaming statistics
│   ├── genshin-api.ts    # Genshin Impact data
│   ├── config.ts         # Site configuration
│   └── utils.ts          # Utility functions
├── styles/               # Global styles
├── public/               # Static assets
└── middleware.ts         # Next.js middleware
```

## 🔧 API Endpoints

### Google Drive Integration
- `GET /api/gdrive-file?fileId=...` - Serve individual files
- `GET /api/gdrive-list?folderId=...` - List folder contents
- `GET /api/gdrive-search?q=...` - Search files
- `GET /api/gdrive-download?token=...` - Secure file downloads
- `GET /api/file-viewer?fileId=...` - File preview endpoint

### Contact & Communication
- `POST /api/send` - Contact form submission

## 🚀 Deployment

### Cloudflare Workers

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare**
   ```bash
   npm run deploy
   ```

3. **Preview deployment**
   ```bash
   npm run preview
   ```

### Environment Variables for Production
Make sure to set all required environment variables in your Cloudflare Workers dashboard or via Wrangler:

```bash
wrangler secret put GOOGLE_PROJECT_ID
wrangler secret put GOOGLE_PRIVATE_KEY
wrangler secret put GOOGLE_CLIENT_EMAIL
# ... and so on for all secrets
```

## 🔒 Security Features

- **CORS Headers**: Proper cross-origin request handling
- **Security Headers**: XSS protection, content type validation
- **Token-based Downloads**: HMAC-signed download tokens
- **Range Requests**: Resumable download support
- **Input Validation**: Request parameter sanitization
- **Environment Variables**: Secure configuration management

## 📊 Performance Features

- **Turbopack**: Fast development builds
- **Image Optimization**: Next.js automatic image optimization
- **Lazy Loading**: Component-level lazy loading
- **Caching**: Proper cache headers for static assets
- **Analytics**: Vercel Analytics and Speed Insights integration

## 🎮 Gaming Features

### Supported Games
- **Genshin Impact**: Character profiles, team compositions, world exploration
- **Honkai Star Rail**: Character showcases and achievement tracking
- **Wuthering Waves**: Character profiles and progress tracking
- **Valorant**: Gaming statistics and achievement system

### Character Management
- Character profiles with detailed stats
- Team composition builder
- Achievement tracking system
- World exploration progress
- Gaming statistics dashboard

## 📱 File Management Features

### Supported File Types
- **Images**: JPEG, PNG, GIF, WebP
- **Videos**: MP4, WebM, MOV
- **Documents**: PDF, TXT, JSON
- **Audio**: MP3, WAV, OGG
- **Archives**: ZIP, RAR, 7Z

### File Operations
- **Preview**: In-browser file preview
- **Download**: Secure, resumable downloads
- **Search**: Full-text search across files
- **Navigation**: Breadcrumb navigation with back button
- **Sharing**: Direct file sharing links

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For deployment and analytics
- **Cloudflare** - For serverless hosting
- **Google** - For Drive API integration
- **Radix UI** - For accessible components
- **Tailwind CSS** - For utility-first styling

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/amirumna/amiverse/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact us via the contact form on the website

---

**Made with ❤️ by AmiNET Development**
