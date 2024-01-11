# Project Proposal

1. Tech Stack: React and Node.
2. Focus: front-end and back-end? Maybe use json-server for REST api?
3. This will be a website, hopefully make it a mobile application later
4. Goal: Identify plants based on pictures and give information on that plant.
5. Demographic: Hikers, people who go outdoors, people with children and/or pets
6. Data: https://docs.trefle.io/reference and https://my.plantnet.org/doc/openapi. Both APIs should be free and provides access to their database of plants. They identify a plant based on an uploaded photo and provide helpful info on the plants.
7. Outline of approach:
   a. Database Schema:
   i. userNew: username, password, firsName, lastName, email
   ii. plantNew: plant data based on data provided by api
   iii. newList: User creates list
   b. Potential issues with API: no data on plant, reaching max number of requests
   c. Sensitive Information: user info
   d. Functionality: picture recognition, displaying info on plant, user profiles with saved lists, edit user profile
   e. User Flow: login -> upload photo -> info on plant appears -> add to new list or existing list
   f. Features that make it more than CRUD: picture recognition
