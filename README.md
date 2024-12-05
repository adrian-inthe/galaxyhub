# GalaxyHub

This project is a Single Page Application (VueJS 3) presenting data from SWAPI, The Star Wars API.

## Assumptions

This is a first version (v0), developed under tight time constraints. While I aim to cover all
relevant aspects, I will prioritize certain features and mention others here, recognizing that this should be an
iterative process. Below are the assumptions guiding this development:

### Design

- **Specifications**: For expediency, I will assume that all specifications and requirements have been discussed and
  validated with the team, including wireframes, mockups, and prototypes.
- **Libraries**: I will leverage established libraries like PrimeVue and Tailwind CSS to enhance the project's
  scalability and accelerate the design process. PrimeVue offers a collection of commonly used components, ensuring a
  consistent and user-friendly experience.
- **UI/UX/Responsiveness/Dark mode**: No specific UI/UX requirements have been provided. Given that this project is
  focused on frontend development, I will allocate time to create an appealing desktop UI. Due to timing constraints,
  other devices and screen sizes will not be considered. I always design frontends with responsivity in mind so a basic
  level of responsivity is ensured. Also, the component library used (PrimeVue) already ensures some level of
  responsivity out-of-the-box (and was also chosen for this purpose). Dark mode is supported and lightly integrated into
  the application.
- All media assets used in this project, including images, icons, fonts, and favicons, are free for non-commercial use.

### SWAPI & Data

- **SWAPI**: To ensure data reliability, robust validation (e.g., with Yup), data sanitization (e.g.,
  against injection attacks) and error handling (e.g. retries, user notifications, error logging) are essential,
  especially for a third-party API. For v0, minimal error handling will be implemented to address basic
  issues, as comprehensive reliability measures are out of scope.

- **Unique Identifiers**: Since SWAPI does not provide unique IDs, the URL field, unique and available on all resources,
  will be used as a reliable identifier for managing favorite items and caching resources.

- **Data Fetching Performance**: A basic cache (localStorage) will store fetched resources to demonstrate performance
  improvement. Advanced caching strategies are out of scope.

### Front-end Performance

- **First Level Performance**: Optimization involves careful component design, leveraging reactivity for responsive
  interfaces without delays, and media optimization (using SVGs and optimized PNGs for load times and bandwidth).
- **Data Fetching**: The most impactful factor on UI performance in this project is data fetch time. To address this, a
  simple caching mechanism has been implemented.
- **Build Optimization**: Vue and Vite handle browser-optimized builds using techniques like tree-shaking, deferred
  scripts, versioning and more. Advanced configuration, use of middleware tools at build, etc., are out of scope.

### Internationalization (i18n)

- Internationalization is relevant for this kind of website, I will assume it is not needed in a v0.

### Accessibility

- While accessibility is important, I will assume it is not needed in a v0.

### SEO

- Since this website is designed for public discovery, SEO will play a crucial role. However,
  optimizing SEO for SPA is inherently complex and requires the integration of specialized
  tools and technologies. It involves thoughtful planning and implementation, such as static pages generation or
  server-side rendering (SSR), and other advanced techniques. I will assume it is not needed in a v0.

### Documentation

- **Code Readability**: Variable and function/class/method names will be self-explanatory, minimal SoC will be
  implemented using dedicated services or distinct files. Code should be simple to read and understand, so comments will
  be included only when necessary. The well-known and widely used code formatter library, Prettier, is employed to
  format the code, ensuring it is consistent and easy to read for the majority of developers.
- **Documentation**: I will assume it is not needed for this exercise.

### Tests

- Various types of tests will be implemented for demonstration purposes, including a component test, a unit test, and an
  end-to-end (e2e) test. While the overall code coverage should be much higher in a fully robust application, these
  tests will primarily showcase different testing approaches in frontend development.

### Continuous Integration

- Setting up Continuous Integration (CI) is beyond the scope of this exercise, but the foundations are in place,
  including a versioning tool (Git), the GitHub platform, Docker for containerization and a test environment setup.

## Instructions to Build and Run

These steps guide you through building, running, and testing the Vue.js frontend using Docker and Docker Compose.

### Prerequisites

- **Docker** and **Docker Compose** are required to build and run the container.
- Ensure Docker is running on your machine.

### Cloning the Repository

    git clone https://github.com/adrian-inthe/galaxyhub.git

### Project Structure

    galaxyhub
    │
    ├── Vue.js source files
    ├── Dockerfile
    ├── docker-compose.yml
    └── README.md

### Build and Run the Applications with Docker

Open a terminal and navigate to the project root directory (where the `docker-compose.yml` file is located).
Build and start the Docker containers:

    docker compose up --build -d

This command will build the image for the Vue.js frontend and start the service.

### Accessing the frontend

Open your browser and go to [http://localhost](http://localhost)

### Stop the Applications

    docker compose down

### Run and Test the Applications locally

#### Prerequisites

- Up-to-date **Node.js** and **NPM** are required to build and run the applications locally.
- Open a terminal and navigate to the project's directory.

  npm install

  # To start run:
  npm run dev
  # then open http://localhost:5173

  # To test run:
  npm test

## Thoughts on the Development Next Steps

The following are additional thoughts on useful iterative improvements for the current solution:

### UI Improvements

- Implement search, sorting, and filtering in the data table (not covered due to time constraints).
- Enable navigation between related resources (e.g., jump from a person's starship to its detailed resource).
- Display the resource item details progressively as they load, rather than showing them all at once.
- Address SWAPI issues with both invisible actions (e.g., automatic retries) and visible feedback (e.g., warnings or
  user retry options).
- Add user accounts to store favorite items.
- Integrate dark mode support.
- Replace remaining PNGs with SVG icons and/or use build-time middleware to generate optimized formats (e.g., WebP).
  Move them to assets folder so they could be versionned.

### Data Handling

- Advanced caching for improved data management and performance (TTLs, IndexedDB and more).

### Logging

- Refactor console logs into a dedicated Logging service.
- Improve logging capabilities with a comprehensive monitoring and analytics system like Datadog.

### Security

- Handle favorites with accounts.

### Testing

- Improve test coverage, particularly for complex frontend components (e.g., PrimeVue DataTable).
- Enhance e2e tests with API mocking to make them more robust.

### Production

- **Performance Optimization**: Additional improvements, particularly for a production environment, include
  using CDNs, edge servers to enhance proximity to users, and advanced caching strategies. 
