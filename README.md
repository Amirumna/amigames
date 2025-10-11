# 🎮 AmiVerse

A modern universal portfolio and file management system built with Next.js 15, featuring Google Drive integration, gaming profiles, and a sleek dark-themed UI.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-orange?style=for-the-badge&logo=cloudflare)

## ✨ Features

### 🎯 Gaming Portfolio
- **Game Profiles**: Dedicated pages for Genshin Impact, Honkai Star Rail, Wuthering Waves, Valorant, and more
- **Character Showcases**: Detailed character profiles with stats, builds, and achievements
- **Team Compositions**: Character team setups and strategies with effectiveness ratings
- **World Exploration**: Game world progress tracking and completion status
- **Achievement System**: Gaming achievements with rarity levels and point systems
- **Gaming Statistics**: Comprehensive stats including playtime, levels, and rankings
- **Game Reviews**: Personal game reviews with ratings, pros/cons, and recommendations
- **Gaming Setup**: Hardware and software configuration details

### 📁 File Management (Kertas)
- **Multiple Google Drive Folders**: Support for multiple root folders with different access levels
- **Password Protection**: Secure folder access with JWT-based authentication
- **Session Management**: 24-hour session tokens with automatic expiration
- **File Preview**: Support for images, videos, PDFs, audio, text, JSON files
- **Search Functionality**: Full-text search across all files with pagination
- **Secure Downloads**: HMAC-signed download tokens with resumable support
- **Pretty URLs**: SEO-friendly folder navigation (`/kertas/drive-name/folder-name`)
- **Grid/List Views**: Toggle between different viewing modes
- **Rate Limiting**: Built-in rate limiting for API protection
- **CORS Support**: Proper cross-origin request handling

### 🎨 Modern UI/UX
- **Dark Theme**: Consistent dark mode design with plasma background effects
- **Responsive Design**: Mobile-first approach with smooth animations
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Accessibility**: ARIA labels and keyboard navigation support
- **Cursor Trail**: Interactive cursor trail effects
- **Plasma Background**: Dynamic plasma background with mouse interaction
- **Loading States**: Skeleton loading and progress indicators

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
   # Google Drive Integration (Required)
   GOOGLE_PROJECT_ID=your_project_id
   GOOGLE_PRIVATE_KEY_ID=your_private_key_id
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_CLIENT_EMAIL=your_service_account@project.iam.gserviceaccount.com
   GOOGLE_CLIENT_ID=your_client_id
   GDRIVE_HMAC_SECRET=your_hmac_secret

   # Multiple Drive Configuration (Required)
   ROOT_FOLDER_ID_PUBLIC=your_public_folder_id
   ROOT_FOLDER_ID_PRIVATE=your_private_folder_id
   ROOT_FOLDER_ID_WORK=your_work_folder_id
   ROOT_FOLDER_ID_PERSONAL=your_personal_folder_id

   # Drive Passwords (Plain text - will be validated against stored passwords)
   DRIVE_PASSWORD_PRIVATE=your_private_password
   DRIVE_PASSWORD_WORK=your_work_password
   DRIVE_PASSWORD_PERSONAL=your_personal_password

   # Session Management (Required)
   SESSION_SECRET=your_session_secret_key

   # Email Service (Required for contact form)
   RESEND_API_KEY=your_resend_api_key
   CONTACT_TO_EMAIL=contact@yourdomain.com

   # CORS Configuration (Optional)
   NEXT_PUBLIC_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Setting Up Multiple Drives

### 1. Configure Drive IDs
Set up your Google Drive folder IDs in the environment variables:
- `ROOT_FOLDER_ID_PUBLIC` - Public folder (no password required)
- `ROOT_FOLDER_ID_PRIVATE` - Private folder (password protected)
- `ROOT_FOLDER_ID_WORK` - Work folder (password protected)
- `ROOT_FOLDER_ID_PERSONAL` - Personal folder (password protected)

### 2. Set Drive Passwords
Configure plain text passwords for protected drives:
- `DRIVE_PASSWORD_PRIVATE` - Password for private drive
- `DRIVE_PASSWORD_WORK` - Password for work drive
- `DRIVE_PASSWORD_PERSONAL` - Password for personal drive

### 3. Generate Session Secret
Generate a secure session secret for JWT tokens:

```bash
# Generate a random session secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Drive Access Control
- **Public drives**: No authentication required
- **Protected drives**: Require password authentication via JWT tokens
- **Session duration**: 24 hours (configurable)
- **Automatic logout**: Sessions expire automatically
- **Token validation**: HMAC-signed tokens for secure downloads

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
- **Plasma Background** - Dynamic background effects
- **Cursor Trail** - Interactive cursor effects

### Backend & APIs
- **Google APIs** - Google Drive integration
- **Resend** - Email service
- **JWT Authentication** - Secure session management
- **HMAC Signing** - Secure download tokens
- **Rate Limiting** - API protection

### State Management & Forms
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Jose** - JWT token handling
- **Bcryptjs** - Password hashing

### Deployment
- **Cloudflare Workers** - Serverless deployment
- **OpenNext.js** - Next.js to Cloudflare adapter
- **Wrangler** - Cloudflare CLI tool
- **Vercel Analytics** - Performance monitoring

## 📁 Project Structure

```
amigames/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── gdrive/        # Google Drive API endpoint
│   │   ├── drive-auth/    # Drive authentication endpoint
│   │   └── send/          # Contact form endpoint
│   ├── games/             # Gaming profile pages
│   │   ├── genshin-impact/
│   │   ├── honkai-star-rail/
│   │   ├── wuthering-waves/
│   │   └── valorant/
│   ├── kertas/            # File browser pages
│   │   ├── [drive]/       # Drive selection page
│   │   └── [drive]/[...folders]/ # Dynamic folder pages
│   ├── about/             # About page
│   ├── maintenance/       # Maintenance page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── gaming/           # Gaming-specific components
│   │   ├── achievement-showcase.tsx
│   │   ├── character-profile.tsx
│   │   ├── game-library-grid.tsx
│   │   ├── game-profile-card.tsx
│   │   ├── gaming-stats-card.tsx
│   │   ├── gaming-status-indicator.tsx
│   │   ├── main-team-showcase.tsx
│   │   ├── team-composition.tsx
│   │   └── world-exploration.tsx
│   ├── ui/               # Reusable UI components
│   │   ├── alert-dialog.tsx
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── cursor-trail.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── progress.tsx
│   │   └── select.tsx
│   ├── drive-selection-grid.tsx
│   ├── drive-password-modal.tsx
│   ├── gdrive-list.tsx   # Main file browser component
│   ├── site-header.tsx   # Navigation component
│   ├── hero.tsx          # Landing hero component
│   ├── plasma.tsx        # Plasma background component
│   └── contact-form.tsx  # Contact form component
├── lib/                  # Utility libraries
│   ├── gdrive.ts         # Google Drive API client
│   ├── gaming-data.ts    # Gaming statistics
│   ├── gaming-types.ts   # Gaming type definitions
│   ├── genshin-api.ts    # Genshin Impact data
│   ├── config.ts         # Site configuration
│   ├── drives-config.ts  # Drive configuration
│   ├── auth-utils.ts     # Authentication utilities
│   ├── drive-utils.ts    # Drive utility functions
│   ├── node-to-web-stream.ts # Stream conversion
│   └── utils.ts          # Utility functions
├── hooks/                # Custom React hooks
│   ├── contact-email.tsx # Contact email template
│   └── cursor-trail.ts   # Cursor trail hook
├── styles/               # Global styles
│   ├── globals.css       # Global CSS
│   └── plasma.css        # Plasma effects CSS
├── public/               # Static assets
│   ├── icons/            # App icons
│   ├── images/           # Game and tech images
│   └── videos/           # Video assets
├── middleware.ts         # Next.js middleware
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
├── wrangler.jsonc        # Cloudflare Workers config
└── package.json          # Dependencies and scripts
```

## 🔧 API Endpoints

### Google Drive Integration (`/api/gdrive`)
- `GET ?action=list&driveSlug=...&folderId=...` - List folder contents
- `GET ?action=search&q=...` - Search files across all drives
- `GET ?action=stream&fileId=...` - Stream/serve files with range support
- `GET ?action=download&fileId=...&expiry=...&token=...` - Secure downloads with HMAC tokens
- `HEAD ?action=stream&fileId=...` - Get file metadata and headers
- `OPTIONS` - CORS preflight handling

### Drive Authentication (`/api/drive-auth`)
- `POST` - Authenticate with drive password (returns JWT token)
- `GET` - Verify current authentication status

### Contact & Communication (`/api/send`)
- `POST` - Contact form submission with email validation

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
   npm run dev
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

- **JWT Authentication**: Secure session management with 24-hour expiration
- **HMAC Token Validation**: Secure download tokens with IP binding
- **CORS Headers**: Proper cross-origin request handling
- **Security Headers**: XSS protection, content type validation, HSTS
- **Rate Limiting**: Built-in API rate limiting (100 requests/minute)
- **Input Validation**: Request parameter sanitization with Zod schemas
- **Password Protection**: Drive-level password authentication
- **Range Requests**: Resumable download support with proper headers
- **Environment Variables**: Secure configuration management
- **Middleware Protection**: Route-level authentication checks

## 📊 Performance Features

- **Turbopack**: Fast development builds with hot reloading
- **Image Optimization**: Next.js automatic image optimization
- **Lazy Loading**: Component-level lazy loading with Suspense
- **Streaming**: Node.js to Web Stream conversion for file serving
- **Caching**: Proper cache headers for static assets and API responses
- **Pagination**: Efficient file listing with page tokens
- **Range Requests**: Resumable downloads for large files
- **Analytics**: Vercel Analytics and Speed Insights integration
- **Preloading**: Asset preloading for better performance

## 🎮 Gaming Features

### Supported Games
- **Genshin Impact**: AR 60, character profiles, team compositions, world exploration
- **Honkai Star Rail**: Trailblaze Level 70, character showcases, achievement tracking
- **Wuthering Waves**: Union Level 90, character profiles, progress tracking
- **Valorant**: Diamond rank, gaming statistics, competitive achievements
- **Honkai Impact 3rd**: Level 88, action RPG with fast-paced combat
- **Mobile Legends**: Mythic rank, strategic team battles

### Character Management
- **Character Profiles**: Detailed stats, builds, and equipment
- **Team Compositions**: Strategic team setups with effectiveness ratings
- **Achievement System**: Rarity-based achievements with point systems
- **World Exploration**: Progress tracking and completion status
- **Gaming Statistics**: Comprehensive stats dashboard
- **Game Reviews**: Personal reviews with ratings and recommendations
- **Gaming Setup**: Hardware and software configuration details

## 📱 File Management Features (Kertas)

### Supported File Types
- **Images**: JPEG, PNG, GIF, WebP, SVG
- **Videos**: MP4, WebM, MOV, AVI
- **Documents**: PDF, TXT, JSON, DOC, DOCX
- **Audio**: MP3, WAV, OGG, FLAC
- **Archives**: ZIP, RAR, 7Z, TAR
- **Code**: JS, TS, HTML, CSS, PY, JSON

### File Operations
- **Preview**: In-browser file preview with proper MIME type handling
- **Download**: Secure, resumable downloads with HMAC tokens
- **Search**: Full-text search across all files with pagination
- **Navigation**: Breadcrumb navigation with folder support
- **Sharing**: Direct file sharing links with expiration
- **Authentication**: Drive-level password protection
- **Rate Limiting**: Built-in protection against abuse
- **CORS Support**: Cross-origin request handling

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
