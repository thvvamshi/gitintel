# GitIntel

GitIntel is a GitHub profile analytics platform that transforms public GitHub profiles into meaningful developer insights. It analyzes profile data, repository activity, programming language usage, and repository popularity to generate actionable metrics for developers.

**Live API:** https://gitintel-api.onrender.com

**GitHub Repository:** https://github.com/thvvamshi/gitintel

## Live Demo

### API Base URL

```text
https://gitintel-api.onrender.com
```

### Repository

```text
https://github.com/thvvamshi/gitintel
```

### Quick Test

Health Check:

```http
GET https://gitintel-api.onrender.com/health
```

Analyze Profile:

```http
POST https://gitintel-api.onrender.com/api/profiles/analyze
```

Request Body:

```json
{
  "username": "thvvamshi"
}
```

Get All Profiles:

```http
GET https://gitintel-api.onrender.com/api/profiles
```

Get Profile By Username:

```http
GET https://gitintel-api.onrender.com/api/profiles/gaearon
```

Delete Profile:

```http
DELETE https://gitintel-api.onrender.com/api/profiles/gaearon
```


## Features

### Profile Analysis

* Analyze any public GitHub profile using a username
* Fetch profile information directly from the GitHub API
* Store analyzed profiles in MySQL for future access

### Developer Insights

* Followers Count
* Following Count
* Public Repository Count
* Public Gist Count
* Account Age (Years)
* Followers-to-Repository Ratio

### Repository Analytics

* Total Stars Across Repositories
* Most Starred Repository
* Top Programming Language

### Data Management

* Retrieve all analyzed profiles
* Retrieve a specific analyzed profile
* Delete analyzed profiles
* Prevent duplicate profile analysis

### Reliability Features

* GitHub user validation
* Duplicate profile detection
* Database initialization on startup
* Error handling and validation

---

## Architecture

```text
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
MySQL Database
```

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub REST API
* Axios

---

## Project Structure

```text
gitintel
│
├── database
│   └── schema.sql
│
├── src
│   ├── config
│   │   ├── db.js
│   │   └── initDb.js
│   │
│   ├── controllers
│   │   └── profile.controller.js
│   │
│   ├── repositories
│   │   └── profile.repository.js
│   │
│   ├── routes
│   │   └── profile.routes.js
│   │
│   ├── services
│   │   └── github.service.js
│   │
│   ├── utils
│   │   ├── calculateInsights.js
│   │   └── repositoryInsights.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── package.json
└── README.md
```

---

## API Endpoints

### Health Check

```http
GET /health
```

Response:

```json
{
  "success": true,
  "message": "GitIntel API Running"
}
```

---

### Analyze GitHub Profile

```http
POST /api/profiles/analyze
```

Request:

```json
{
  "username": "gaearon"
}
```

Response:

```json
{
  "success": true,
  "message": "Profile analyzed successfully",
  "data": {
    "username": "gaearon",
    "followers": 90810,
    "publicRepos": 296,
    "totalStars": 3426,
    "topLanguage": "JavaScript",
    "mostStarredRepo": "flux-react-router-example",
    "accountAgeYears": 15,
    "followersRepoRatio": 306.79
  }
}
```

---

### Get All Profiles

```http
GET /api/profiles
```

---

### Get Profile By Username

```http
GET /api/profiles/:username
```

Example:

```http
GET /api/profiles/gaearon
```

---

### Delete Profile

```http
DELETE /api/profiles/:username
```

Example:

```http
DELETE /api/profiles/gaearon
```

---

## Database Schema

The database schema is available in:

```text
database/schema.sql
```

Key stored attributes:

* GitHub ID
* Username
* Profile Metadata
* Followers
* Public Repositories
* Public Gists
* Total Stars
* Top Language
* Most Starred Repository
* Account Age
* Followers/Repository Ratio

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

---

## Local Setup

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd gitintel
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

```bash
cp .env.example .env
```

Run the application:

```bash
npm run dev
```

Server:

```text
http://localhost:5000
```

---

## Future Enhancements

* Repository Activity Score
* Contribution Analytics
* Organization Insights
* Historical Profile Tracking
* Developer Ranking System
* REST API Rate Limiting
* Redis Caching

---

## License

This project is available for educational and personal use.
