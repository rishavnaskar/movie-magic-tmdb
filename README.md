# Movie Magic TMDB

[![GitHub stars](https://img.shields.io/github/stars/rishavnaskar/movie-magic-tmdb)](https://github.com/rishavnaskar/movie-magic-tmdb/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/rishavnaskar/movie-magic-tmdb)](https://github.com/rishavnaskar/movie-magic-tmdb/network)
[![GitHub issues](https://img.shields.io/github/issues/rishavnaskar/movie-magic-tmdb)](https://github.com/rishavnaskar/movie-magic-tmdb/issues)

Movie Magic TMDB is a mobile application built using React Native, leveraging The Movie Database (TMDB) API to provide users with comprehensive movie information, including latest releases, popular movies, top-rated films, and upcoming movies. This project is designed to enhance your movie browsing experience with a sleek and user-friendly interface.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Setup](#setup)
- [API Integration](#api-integration)
- [User Interface](#user-interface)
- [Additional Features](#additional-features)
- [Styling and Responsiveness](#styling-and-responsiveness)
- [Code Quality](#code-quality)
- [Testing](#testing)
- [Contact](#contact)

## Features

- Browse latest, popular, top-rated, and upcoming movies
- Search for movies across all categories
- View detailed movie information, including title, content and rating
- Favourite movies and view a list of favourites
- Responsive design for optimal viewing on various devices

## Demo

Check out a live demo of the application

https://github.com/user-attachments/assets/a3c17ce7-b64b-48ab-b13b-2018d3281009

## Setup

1. Initialize a new React Native project using either the React Native CLI or Expo:
   ```bash
   npx react-native init MovieMagicTMDB
   # or with Expo
   npx expo init MovieMagicTMDB
   ```

2. Clone the repository:
   ```bash
   git clone https://github.com/rishavnaskar/movie-magic-tmdb.git
   cd movie-magic-tmdb
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Get a new API Access token from - https://developer.themoviedb.org/reference/intro/authentication
   - Create a `.env` file in the root directory and add your TMDB API key: <br /><br />
   ```plaintext
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```

6. Change the DNS settings to bypass the TMDB block in India:
   - Use Cloudflare DNS: `1.1.1.1`
   - Use Google DNS: `8.8.8.8`
   - Follow instructions [here](https://www.hellotech.com/guide/for/how-to-change-dns-server-windows-mac)
   - Alternatively, use a free VPN

7. Start the development server:
   ```bash
   npm start
   ```

## API Integration

This project integrates APIs from TMDB. Find theme here:

- For fetching Movie Lists
   - [Now Playing](https://developer.themoviedb.org/reference/movie-now-playing-list)
   - [Popular](https://developer.themoviedb.org/reference/movie-popular-list)
   - [Top Rated](https://developer.themoviedb.org/reference/movie-top-rated-list)
   - [Upcoming](https://developer.themoviedb.org/reference/movie-upcoming-list)

- For searching movies
   - [Searching movies](https://developer.themoviedb.org/reference/search-movie)

- For Authentication (required to add favorites)
   - [User authentication](https://developer.themoviedb.org/reference/intro/authentication)
   - [Creating a request token](https://developer.themoviedb.org/reference/authentication-create-request-token)
   - [Authenticating the user](https://developer.themoviedb.org/reference/authentication-how-do-i-generate-a-session-id)
   - [Creating a session id](https://developer.themoviedb.org/reference/authentication-create-session)

- For adding favorites
   - [Add movie to favorites](https://developer.themoviedb.org/reference/account-add-favorite)
   - [Get favorite movies](https://developer.themoviedb.org/reference/account-get-favorites)

## User Interface

  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/7b8ec376-1145-438d-b483-21c63b86a37d" alt="Image 1" height=400 >
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/88e77b58-6b6d-4fa4-a445-d0c8095d2eb9" alt="Image 2" height=400 >
    </td>
     <td>
      <img src="https://github.com/user-attachments/assets/c0b84ce7-ac99-4b97-9545-37ac176df2af" alt="Image 2" height=400 >
    </td>
     <td>
      <img src="https://github.com/user-attachments/assets/0ef33690-3498-4462-af75-23fde4fde311" alt="Image 2" height=400 >
    </td>
     <td>
      <img src="https://github.com/user-attachments/assets/68aa4902-d494-4ee1-9df0-c4af3ea23a2a" alt="Image 2" height=400 >
    </td>
  </tr>
</table>

- A tabbed interface to switch between different movie lists (Now Playing, Popular, Top Rated, Upcoming).
- Each movie item displays:
  - Movie poster
  - Movie title
  - Release date
  - Average rating
- Detailed view for each movie, displaying:
  - Movie poster (larger view)
  - Movie title
  - Release date
  - Average rating
  - Overview/Description

## Additional Features

- Search functionality to search for movies across all categories.
- Favourite movies and view a list of favourites.
- Pagination or infinite scrolling for movie lists.
- Animations or transitions for a better user experience.

## Styling and Responsiveness

- Visually appealing design for a good user experience.
- Responsive layout for both small and large screen devices.

## Code Quality

- Organized and modular codebase.
- Use of state management (Redux along with Redux Saga).
- Graceful handling of API errors with appropriate user feedback.
- Code comments explaining complex logic or decisions.

## Testing

- Unit tests for components and utility functions.
- Integration or end-to-end tests if possible.

## Contact

For any questions or inquiries, please contact:

- **Name:** Rishav Naskar
- **Email:** [rishavnaskar.r@gmail.com](mailto:rishavnaskar.r@gmail.com)
- **LinkedIn:** [rishavnaskar](https://www.linkedin.com/in/rishavnaskar)
