# MyMusicBingo

**Musical Bingo Generator** with Spotify integration to create bingo cards from playlists.

## How It Works

- Users must **log in** with email and password. (Future support for Google login.)  
- Users can **link their Spotify account** via OAuth to use **private playlists**.  
- Users can **select a Spotify playlist** (public playlists work without OAuth using a centralized client ID/secret).  
- Users can **generate bingo cards** using the songs from the selected playlist.  
- Each bingo card is **unique**, and all songs appear at least once (configurable).  
- Users can **play bingo** using the generated cards. (Future: digital gameplay with live song tracking.)

## Features

- **User Authentication:** Secure login using Django authentication.  
- **Spotify Integration:** Supports public playlists via centralized credentials and private playlists via user OAuth (requires Spotify production permission).  
- **Customizable Bingo Cards:** Users can select the number of cards, apply themes, and customize visual elements.  
- **Preview and Download:** Users can preview and download bingo cards before playing.  
- **History:** Users can view previously generated bingo cards.  
- **Future Integrations:** Song tracking during the game, music recognition, full digital bingo gameplay, and additional login methods.

## Technology Stack

- **Backend:** Django + Django Rest Framework  
- **Frontend:** React / Node.js  
- **Spotify API:**  
  - Public playlists → Client Credentials Flow  
  - Private playlists → OAuth (requires Spotify production permission)

## User Flow / UX

1. **Landing Page:** Introduces the app, explains capabilities, and includes a prominent login button.  
2. **Dashboard/Home:** Shows previously created bingo cards and provides a “Create New Bingo Card” button.  
3. **Card Generation Flow:**  
   - Select playlist  
   - Choose number of cards/participants  
   - Choose theme and customize visual elements  
   - Configure additional options (minimum song repetitions, etc.)  
   - Generate and preview unique bingo cards  
4. **Game Play:** Users can play bingo with the songs from the selected playlist.

## Future Plans

- **Song tracking during gameplay** using music recognition services.  
- **Digital bingo gameplay** with real-time interaction.  
- **Additional authentication methods** (Google OAuth, etc.)  
- **Enhanced card customization** and sharing options.
