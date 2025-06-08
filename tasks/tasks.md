# CozyPod PoC - Task Checklist (V2)

This checklist outlines the development plan based on the updated Vite + React architecture.

### Phase 1: Project Setup
- [ ] **Initialize Vite + React Project**: Set up a new project in the root folder.
    ```bash
    npm create vite@latest . -- --template react-ts
    ```
- [ ] **Install Frontend Dependencies**:
    ```bash
    npm install framer-motion tailwindcss postcss autoprefixer
    ```
- [ ] **Initialize Tailwind CSS**:
    ```bash
    npx tailwindcss init -p
    ```
- [ ] **Configure Tailwind**: Update `tailwind.config.js` to scan `src/**/*.{js,jsx,ts,tsx}` files.
- [ ] **Project Structure**: Create the following file structure inside the `src` folder:
    - `/components`:
        - `LandingState.tsx`
        - `ProcessingState.tsx`
        - `ResultsState.tsx`
        - `EpisodeModal.tsx`
    - `App.tsx`
    - `main.tsx`
    - `App.css`
    - `index.css`
- [ ] **Setup Backend Server**:
    - Create a `server` directory in the project root.
    - Inside `server`, run `npm init -y`.
    - **Install Backend Dependencies**:
      ```bash
      cd server
      npm install express cors dotenv spotify-web-api-node @azure/openai
      cd ..
      ```
- [ ] **Setup Environment Variables**: Create a `.env` file in the `server` directory for secrets:
    ```
    # Spotify
    SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
    SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
    # The port must match the server port, and the callback route must be registered in your Spotify App Dashboard.
    SPOTIFY_REDIRECT_URI=http://127.0.0.1:8888/callback

    # Server Port
    PORT=8888

    # Azure OpenAI
    AZURE_OPENAI_ENDPOINT=YOUR_AZURE_ENDPOINT
    AZURE_OPENAI_API_KEY=YOUR_AZURE_API_KEY
    AZURE_OPENAI_DEPLOYMENT_NAME=YOUR_AZURE_DEPLOYMENT_NAME
    ```

### Phase 2: Backend Authentication & API
- [ ] **Spotify App Setup**: In the Spotify Developer Dashboard, set the Redirect URI to `http://127.0.0.1:8888/callback`.
- [ ] **Create Express Server (`server/index.js`)**:
    - Set up a basic server that uses `cors` and `dotenv`.
    - Create an instance of the `spotify-web-api-node` client.
- [ ] **Implement Spotify Auth Flow**:
    - **`/login` route**: Redirects the user to Spotify's authorization page with the required scopes (`user-read-private`, `user-top-read`).
    - **`/callback` route**: Exchanges the authorization code for an access token and refresh token. Stores tokens securely (e.g., in an HTTPOnly cookie) and redirects the user back to the frontend (`http://localhost:5173`).
- [ ] **Implement Recommendation API**:
    - **`/recommend` route (POST)**:
        - Retrieves the access token from the cookie/storage.
        - Gets the user's mood from the request body.
        - Fetches the user's top artists from Spotify.
        - Constructs a prompt and calls the Azure OpenAI API to get episode recommendations.
        - Searches Spotify for each recommended episode to get full details (URI, cover art, etc.).
        - Returns a structured JSON response to the frontend.

### Phase 3: UI Foundation & State Management
- [ ] **Main App Container (`src/App.tsx`)**:
    - Implement a state machine to manage app states: `'landing'`, `'processing'`, `'results'`.
    - Manage state for selected episode URI and modal visibility.
    - Implement logic to call the backend `/recommend` API.
    - Render the active state component (`LandingState`, `ProcessingState`, or `ResultsState`).
    - Render `EpisodeModal` when an episode is selected.
- [ ] **Global Styles (`src/index.css`)**:
    - Import and set up the pixelated font (e.g., 'Minecraft').
    - Define the global orange-to-blue gradient background for the `body`.
- [ ] **Component Styles (`src/App.css`)**:
    - Add styles for the ambient background particles/notes and their animations.

### Phase 4: Component Implementation & Animation
- [ ] **`LandingState.tsx`**:
    - Build the UI as specified (hero text, subtitle, headphone illustration, CTA).
    - The "Connect with Spotify" button should link to `http://127.0.0.1:8888/login`.
    - Animate page entrance, button glow, and floating music notes using `framer-motion`.
- [ ] **`ProcessingState.tsx`**:
    - Build the central circular element (320x320px).
    - Use `framer-motion` to create the continuous rotating text animation.
    - Implement the progress counter and loading bar.
    - Add ambient floating particles.
- [ ] **`ResultsState.tsx`**:
    - Build the header and the responsive 3-column grid for episode cards.
    - **Episode Card**:
        - Structure: Cover art, match badge, duration, title, podcast name, description.
        - Implement hover states: scale up, show play button.
        - Apply the subtle, organic rotation effect (`transform: rotate(0.5deg)`).
    - Animate the staggered entrance of the cards.
- [ ] **`EpisodeModal.tsx`**:
    - Design the modal layout (max-width 512px) with a close button.
    - For the PoC, embed the Spotify player using an `iframe`: `<iframe src="https://open.spotify.com/embed/episode/YOUR_EPISODE_URI">`. This is more feasible than building a custom player from scratch.
    - The modal should appear and disappear with a fade/scale animation. 