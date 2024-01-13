# Plant ID

(https://plant-id-front-end.onrender.com)

This application uses the trefle api to retreive data on plants, and the plantnet api to get a plant name based on an uploaded image. A user can upload a photo and get information on that plant based on the photo. Plants can be added/deleted to user-created lists. Lists are tied to user accounts and will be remembered!

Features Implemented:

- Sign Up
- Log In
- Log Out
- Authentication
- Identify plant based on user uploaded photo
- View data about a plant
- Create lists to add plants to

User Flow:

- Sign up or log in to view user's lists of plants
- Logged in users can add/delete plants
- Users can identify a plant by uploading a photo
- Lists are tied to user accounts so they will persist when user logs in
- Logged in users can edit their profile

APIs:

- https://docs.trefle.io/reference (plant data)
- https://my.plantnet.org/doc/openapi (photo recognition)

Tech Stack:

- Front-end: React, CSS
- Back-end: Node
- Database: PostgreSQL
