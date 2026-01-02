---
trigger: always_on
---

Introduction:
MyMusicBingo is a web application built with Django and React/Node.js. Its main purpose is to allow users to generate musical bingo cards from Spotify playlists. The app ensures that each bingo card is unique, all selected songs appear at least once (configurable by the user), and users can personalize cards with themes. The application supports future features such as tracking songs played during the game and enabling full digital bingo gameplay. The app is designed to be intuitive, responsive, and engaging for users who enjoy music and interactive games.

Authentication and Users:
Users must log in to use the service. The current authentication method is Django email and password, with Google login planned for the future. Inside settings, users have the option to link their Spotify account. Connecting via Spotify OAuth allows users to generate bingo cards from their own private playlists. Currently, this feature is not available to users because Spotify requires permission to use OAuth for production without whitelisting users in the Spotify Developer settings. For public playlists, the app uses a centralized Spotify Client ID and Secret, allowing users to generate bingo cards without individual Spotify OAuth. In summary, users log in to the app with Django credentials, optionally connect Spotify to access private playlists in the future, and can always use public playlists through the centralized credentials.

Bingo Card Generation:
Users can generate bingo cards by following these steps: 1) Select a playlist, choosing either a public playlist (using centralized credentials) or, in the future, a private playlist via OAuth; 2) Choose the number of cards/participants; 3) Select a theme and personalize the bingo card (colors, icons, visual elements); 4) Additional options such as ensuring each card is unique and setting the minimum number of times a song appears; 5) Generate cards, previewing them before downloading or printing. The system must guarantee that each card is different and that all songs are included according to the user’s settings.

Song tracking with AI:
Users can check songs that have been played during a bingo game using AI-powered analysis to verify matches and track progress. The AI will analyze audio or lyrics to confirm if a song has been called and check the song in the songs list.
User Flow and UX:

- Landing Page: Clearly explain the app features, including card bingo creation from playlists, song tracking during gameplay (future integration), and emphasize the “Login” button.

- Dashboard/Home: Show the user’s history of created bingo cards and provide a prominent “Create New Bingo Card” button.

- Card Creation Flow: 
1) Select playlist and validate it has enough songs; 
2) Set number of cards/participants; 
3) Choose theme and visual customization; 
4) Configure additional options like minimum song repetitions; 
5) Generate cards ensuring uniqueness, with a preview before download.

- UX Guidelines: Use a step-by-step interface (Playlist → Participants → Theme → Generate), provide immediate visual feedback (errors, confirmations, progress bar), ensure responsive design for mobile and desktop, and allow access to previously created cards for reuse.


Future Integrations:
Planned features include tracking songs played during the game using a music recognition service, enabling digital bingo gameplay with real-time interaction, and adding additional login methods such as Google OAuth.

Technical Notes:

- Backend: Django + Django Rest Framework
- Frontend: React / Node.js
- Spotify API: Public playlists use Client Credentials Flow with centralized credentials; private playlists will use user OAuth (requires Spotify permission)
- Card Generation: Ensure each card is unique and all songs appear at least once, configurable by the user.
- UX: Maintain a linear, step-by-step flow to minimize user errors.