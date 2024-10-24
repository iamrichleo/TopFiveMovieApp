# Movie Exploration App

If you want to use the application, it is deployed on Vercel here: [Movie Exploration App](https://top-five-movie-app.vercel.app/).

## Installation and Running Locally

To install and run the project locally, follow these steps:

1. Clone the repository:

  ```
  git clone git@github.com:iamrichleo/TopFiveMovieApp.git
  cd movie-exploration-app
  ```

2. Install dependencies:

  `npm install`

3. Run the Development Server

  `npm run dev`

4. Run the Testing Suite

  `npm run test`

## Why I Chose My Current Tech Stack

- **Vite**: Vite was the best choice for this project because it offers fast hot module replacement (HMR), which speeds up development significantly. Its lightning-fast build times and modern features like native ES modules support allow me to focus on writing code rather than waiting for builds. Vite's configuration is also straightforward, making it easy to get started quickly.

- **Avoided Redux**: For this project, I opted to avoid Redux since I did not need overly advanced state management. The app's state can be effectively managed with React's built-in hooks.

- **Radix UI**: I pulled in Radix as a flexible UI library to provide accessible components that enhance user experience while allowing for customization.

- **Animations and UI Flair**: I incorporated a variety of animations using `framer-motion` to create a dynamic interface that showcases my range in UI design.

## Areas for Improvement

- **React Router**: I plan to integrate React Router to allow users to toggle between additional top 5 lists (e.g., TV shows, books, etc.). This functionality would necessitate a broader client state management solution, possibly Redux.

- **Fix React Warnings**: I need to address all existing React warnings in the application to ensure clean code and a better development experience.

- **Smoother Search Experience**: Improving the search functionality is essential. This includes implementing more advanced query matching, adding debounce functionality, and ensuring that movies without a poster image are not displayed.

- **Favorites Section in Footer**: Moving the Favorites section into a fixed footer would allow users to see their favorites regardless of their scroll position.

- **Localization**: I plan to localize the text within the app to make it accessible to a broader audience.

- **Shareable Deeplinks**: Creating shareable deeplinks would enable the app to parse the URL to determine the user's favorites, enhancing user experience and sharing capabilities.

- **Mobile UI Improvements**: The current design shows the video play button on movie card hover, which isn’t intuitive on mobile devices. I will redesign this for a better mobile experience.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
