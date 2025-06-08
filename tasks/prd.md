# CozyPod: AI-Powered Podcast Recommendations

## 1. Overview

CozyPod is a proof-of-concept web application that provides personalized podcast episode recommendations based on a user's current mood and their Spotify listening history. It aims to deliver a "cozy", lofi-inspired user experience. This document outlines the product requirements for a 2.5-hour development sprint.

## 2. Goals & Objectives

*   **Primary Goal:** Create a functional local prototype that demonstrates the core user flow: mood input -> AI processing -> podcast recommendations.
*   **Key Objectives:**
    *   Integrate with Spotify for user authentication and taste analysis.
    *   Use Azure OpenAI to generate mood-based recommendations.
    *   Develop a dynamic and interactive UI inspired by the provided mockups, with a "minecrafty/lofi" theme.
    *   Ensure the application runs locally.

## 3. Target Audience

This is a proof-of-concept for personal use and demonstration.

## 4. Features & Scope (Minimum Critical Path)

| Feature                  | Description                                                                                                                              | Priority |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **Spotify Authentication** | User can connect their Spotify account using OAuth. The application will require `user-read-private` and `user-top-read` scopes.         | P0       |
| **Mood Input**           | User can input their current mood via a text field. A voice input can be a stretch goal if time permits.                                   | P0       |
| **AI Recommendation Engine** | An API endpoint will take the user's mood and Spotify data (top artists/tracks) and use Azure OpenAI to generate a list of relevant podcast episode suggestions. | P0       |
| **Results Display**      | The app will display the recommended episodes in a grid layout, showing cover art, title, and podcast name, similar to the mockup.         | P0       |
| **UI/UX**                | Implement the UI based on the provided images, including the color scheme, layout, and "minecrafty/lofi" aesthetic with a pixelated font. | P0       |
| **Loading Animation**    | A spinning, circular loading animation will be displayed while recommendations are being generated.                                        | P1       |
| **Podcast Player Modal** | Clicking on an episode will open a modal with an embedded Spotify player.                                                                | P1       |

## 5. Technical Stack

*   **Framework:** Next.js (React)
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion / CSS Animations
*   **Authentication:** `next-auth` with the Spotify Provider
*   **AI:** Azure OpenAI API
*   **Deployment:** Local development server (`npm run dev`)

## 6. Architecture & Design

*   **Decoupling:** The application will be a monolithic Next.js app, but will be architecturally decoupled. Frontend components will be in `/components` and backend logic will be in `/pages/api`. This separates concerns while maintaining development speed.
*   **Observability:** For this PoC, observability will be handled through structured `console.log` statements to trace API calls and data flow.
*   **Authentication Flow:**
    1.  User clicks "Connect with Spotify".
    2.  User is redirected to Spotify's OAuth page.
    3.  After authorization, Spotify redirects back to the app with an auth code.
    4.  `next-auth` handles the token exchange and creates a session.
*   **Recommendation Flow:**
    1.  Frontend sends the user's mood to a backend API route (e.g., `/api/recommend`).
    2.  The backend retrieves the user's Spotify access token from the session.
    3.  It calls the Spotify API to get the user's top artists.
    4.  It constructs a prompt with the mood and artist data and sends it to Azure OpenAI.
    5.  It parses the AI's text response.
    6.  For each recommendation, it calls the Spotify Search API to find the actual episode and get its URI and details.
    7.  It returns the list of formatted episode data to the frontend.

## 7. UI/UX Details

*   **Color Palette:** Primary colors will be warm oranges and cool blues, creating a soft gradient background as seen in the mockups.
*   **Font:** "Minecraft" by Craftron Gaming or a similar open-source pixelated font (e.g., from Google Fonts).
*   **Interactivity:** Buttons and cards will have hover effects. The UI will smoothly transition between states (welcome, input, loading, results). 