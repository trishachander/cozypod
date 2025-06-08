# Task List: CozyPod - Mood-Based Podcast Recommendation App

## Relevant Files

### Frontend
- `frontend/src/App.tsx` - Main application component with state management
- `frontend/src/main.tsx` - Application entry point
- `frontend/src/index.css` - Global CSS styles
- `frontend/src/App.css` - Component-specific styles
- `frontend/src/components/LandingState.tsx` - Initial welcome screen component
- `frontend/src/components/ProcessingState.tsx` - Loading animation component
- `frontend/src/components/ResultsState.tsx` - Podcast recommendations display
- `frontend/src/components/EpisodeModal.tsx` - Podcast player modal
- `frontend/vite.config.ts` - Vite configuration
- `frontend/tailwind.config.js` - Tailwind CSS configuration
- `frontend/package.json` - Frontend dependencies

### Backend
- `server/index.js` - Express server entry point
- `server/package.json` - Backend dependencies
- `server/.env` - Environment variables for backend
- `server/routes/auth.js` - Spotify authentication routes
- `server/routes/recommend.js` - Recommendation API routes

### Documentation
- `prd.md` - Product Requirements Document
- `tasks.md` - Detailed task breakdown
- `README.md` - Project overview and setup instructions

## Tasks

- [ ] 1.0 Project Setup and Infrastructure

  - [ ] 1.1 Initialize Git repository
    - [ ] 1.1.1 Run `git init` in project root
    - [ ] 1.1.2 Create initial commit with planning documents
    - [ ] 1.1.3 (Optional) Connect to remote repository
    
  - [ ] 1.2 Frontend Setup
    - [ ] 1.2.1 Initialize Vite + React project with TypeScript
    - [ ] 1.2.2 Install essential dependencies (Framer Motion, Tailwind)
    - [ ] 1.2.3 Configure Tailwind CSS
    - [ ] 1.2.4 Create base component structure
  
  - [ ] 1.3 Backend Setup
    - [ ] 1.3.1 Create server directory
    - [ ] 1.3.2 Initialize Node.js project
    - [ ] 1.3.3 Install backend dependencies
    - [ ] 1.3.4 Configure environment variables

- [ ] 2.0 Authentication System

  - [ ] 2.1 Spotify Developer Registration
    - [ ] 2.1.1 Create Spotify Developer account
    - [ ] 2.1.2 Register new application
    - [ ] 2.1.3 Configure redirect URI to http://127.0.0.1:8888/callback
    - [ ] 2.1.4 Note Client ID and Secret
  
  - [ ] 2.2 Backend Authentication Routes
    - [ ] 2.2.1 Implement `/login` route
    - [ ] 2.2.2 Create `/callback` route for handling OAuth response
    - [ ] 2.2.3 Set up token exchange logic
    - [ ] 2.2.4 Implement secure cookie/storage for tokens
  
  - [ ] 2.3 Frontend Authentication
    - [ ] 2.3.1 Create "Connect with Spotify" button in LandingState
    - [ ] 2.3.2 Implement redirect to backend login route
    - [ ] 2.3.3 Handle return from authentication flow

- [ ] 3.0 Core UI Implementation

  - [ ] 3.1 Global Styling
    - [ ] 3.1.1 Set up pixelated "Minecraft" font
    - [ ] 3.1.2 Create orange-to-blue gradient background
    - [ ] 3.1.3 Implement global animations and transitions
  
  - [ ] 3.2 Landing State Component
    - [ ] 3.2.1 Create hero text with gradient styling
    - [ ] 3.2.2 Add subtitle description
    - [ ] 3.2.3 Implement headphone illustration/emoji
    - [ ] 3.2.4 Style connect button with animations
    - [ ] 3.2.5 Add floating musical notes background
  
  - [ ] 3.3 Processing State Component
    - [ ] 3.3.1 Create 320x320px circular element
    - [ ] 3.3.2 Implement rotating text animation
    - [ ] 3.3.3 Add central progress counter (0-100%)
    - [ ] 3.3.4 Create progress bar (256px width)
    - [ ] 3.3.5 Add ambient floating particles
  
  - [ ] 3.4 Results State Component
    - [ ] 3.4.1 Implement header with title
    - [ ] 3.4.2 Create "New Search" button
    - [ ] 3.4.3 Build responsive 3-column grid
    - [ ] 3.4.4 Create episode cards with:
      - [ ] 3.4.4.1 Cover art (120x120px)
      - [ ] 3.4.4.2 Play button overlay on hover
      - [ ] 3.4.4.3 Mood match percentage badge
      - [ ] 3.4.4.4 Duration badge
      - [ ] 3.4.4.5 Episode title (2 lines max)
      - [ ] 3.4.4.6 Podcast name
      - [ ] 3.4.4.7 Description preview (2 lines max)
    - [ ] 3.4.5 Apply subtle rotation to cards
    - [ ] 3.4.6 Implement hover states and animations
    - [ ] 3.4.7 Add staggered entrance animation
  
  - [ ] 3.5 Episode Modal Component
    - [ ] 3.5.1 Create modal layout (max-width 512px)
    - [ ] 3.5.2 Add close button
    - [ ] 3.5.3 Display cover art (256x256px)
    - [ ] 3.5.4 Show episode metadata
    - [ ] 3.5.5 Implement Spotify embedded player via iframe
    - [ ] 3.5.6 Add entrance/exit animations

- [ ] 4.0 State Management and Application Logic

  - [ ] 4.1 App Component Setup
    - [ ] 4.1.1 Implement state machine for app phases
    - [ ] 4.1.2 Create state for selected episode
    - [ ] 4.1.3 Add auth state tracking
    - [ ] 4.1.4 Implement conditional rendering based on app state
  
  - [ ] 4.2 API Integration
    - [ ] 4.2.1 Create fetch utilities for backend communication
    - [ ] 4.2.2 Implement mood submission logic
    - [ ] 4.2.3 Handle recommendation data retrieval and formatting

- [ ] 5.0 Backend API Development

  - [ ] 5.1 Express Server Setup
    - [ ] 5.1.1 Configure CORS for frontend communication
    - [ ] 5.1.2 Set up middleware for request parsing
    - [ ] 5.1.3 Implement environment variable loading
  
  - [ ] 5.2 Spotify API Integration
    - [ ] 5.2.1 Create spotify-web-api-node instance
    - [ ] 5.2.2 Implement user profile retrieval
    - [ ] 5.2.3 Set up top artists/tracks fetching
    - [ ] 5.2.4 Create podcast episode search functionality
  
  - [ ] 5.3 Azure OpenAI Integration
    - [ ] 5.3.1 Configure Azure OpenAI client
    - [ ] 5.3.2 Create prompt construction with mood and artist data
    - [ ] 5.3.3 Implement response parsing for episode recommendations
    - [ ] 5.3.4 Set up error handling and retry logic
  
  - [ ] 5.4 Recommendation Engine
    - [ ] 5.4.1 Implement `/recommend` endpoint (POST)
    - [ ] 5.4.2 Process mood input text
    - [ ] 5.4.3 Generate recommendations via Azure OpenAI
    - [ ] 5.4.4 Enrich recommendations with Spotify data
    - [ ] 5.4.5 Return formatted episode data to frontend

- [ ] 6.0 Animations and Interactive Elements

  - [ ] 6.1 Background Elements
    - [ ] 6.1.1 Implement floating particles/notes
    - [ ] 6.1.2 Add subtle gradient shifts
  
  - [ ] 6.2 Component Transitions
    - [ ] 6.2.1 Create smooth transitions between app states
    - [ ] 6.2.2 Implement staggered animations for cards
  
  - [ ] 6.3 Interactive Feedback
    - [ ] 6.3.1 Add hover effects for buttons and cards
    - [ ] 6.3.2 Implement loading state animations
    - [ ] 6.3.3 Create focus and active states

- [ ] 7.0 Testing and Optimization

  - [ ] 7.1 Functionality Testing
    - [ ] 7.1.1 Test authentication flow
    - [ ] 7.1.2 Verify recommendation generation
    - [ ] 7.1.3 Test episode playback
  
  - [ ] 7.2 UI/UX Review
    - [ ] 7.2.1 Verify responsive layouts
    - [ ] 7.2.2 Check animations for performance
    - [ ] 7.2.3 Review accessibility
  
  - [ ] 7.3 Optimization
    - [ ] 7.3.1 Optimize image loading
    - [ ] 7.3.2 Improve animation performance
    - [ ] 7.3.3 Refine API requests

- [ ] 8.0 Final Review and Documentation

  - [ ] 8.1 Code Review
    - [ ] 8.1.1 Check for code quality and consistency
    - [ ] 8.1.2 Review error handling
  
  - [ ] 8.2 Documentation Update
    - [ ] 8.2.1 Update README with setup instructions
    - [ ] 8.2.2 Document API endpoints
    - [ ] 8.2.3 Add comments to complex code sections
  
  - [ ] 8.3 Final Testing
    - [ ] 8.3.1 Perform end-to-end testing
    - [ ] 8.3.2 Verify all requirements are met

## Enhanced UI Implementation Based on Screenshots

- [ ] 10.0 Enhanced UI Implementation

  - [ ] 10.1 Welcome Screen
    - [ ] 10.1.1 Implement gradient background with warm, cozy colors
    - [ ] 10.1.2 Create CozyPod logo and app title with proper typography
    - [ ] 10.1.3 Add headphones illustration
    - [ ] 10.1.4 Implement styled "Connect with Spotify" button
    - [ ] 10.1.5 Add subtle animations for text and background elements
  
  - [ ] 10.2 Voice Input Interface
    - [ ] 10.2.1 Create "What's your vibe?" headline with animations
    - [ ] 10.2.2 Implement circular microphone button with proper states
    - [ ] 10.2.3 Add pulsing animation for active listening state
    - [ ] 10.2.4 Implement subtle gradient background transitions
    - [ ] 10.2.5 Add instructional text below microphone
  
  - [ ] 10.3 Processing Animation
    - [ ] 10.3.1 Create circular progress indicator with percentage
    - [ ] 10.3.2 Implement rotating text animation around the circle
    - [ ] 10.3.3 Add descriptive status labels ("analyzing", "finding episodes", etc.)
    - [ ] 10.3.4 Create progress bar with "Almost Ready" text
    - [ ] 10.3.5 Add subtle particle animations in background
  
  - [ ] 10.4 Results Display
    - [ ] 10.4.1 Create "Perfect Matches for You" section with description
    - [ ] 10.4.2 Implement grid layout for podcast episode cards
    - [ ] 10.4.3 Add match percentage badges to each card
    - [ ] 10.4.4 Implement episode duration labels
    - [ ] 10.4.5 Create hover and focus states for cards
    - [ ] 10.4.6 Add "New Search" button for starting over
  
  - [ ] 10.5 Episode Detail Modal
    - [ ] 10.5.1 Create modal overlay with backdrop blur
    - [ ] 10.5.2 Implement episode cover art display
    - [ ] 10.5.3 Add episode title, podcast name, and description
    - [ ] 10.5.4 Create media player controls (play, skip, timeline)
    - [ ] 10.5.5 Implement volume slider
    - [ ] 10.5.6 Add close button and click-outside behavior
    - [ ] 10.5.7 Create smooth open/close animations

### Notes

- This project uses Vite + React for the frontend and Express for the backend
- Authentication is handled through Spotify OAuth
- Azure OpenAI is used for generating podcast recommendations based on mood
- The UI features a Minecraft-style pixelated font with a lofi Japanese aesthetic
- All development is for local use only; no deployment is required
- The application should be completed within a 2.5-hour timeframe 