
README file

Features:-
Team Management:
1.Create new teams.
2.View team details and associated players.
3.Delete teams.
Player Management:-
1.Add players to a team (maximum 11 players per team).
2.Edit player details, including name, role, and image.
3.Delete players from a team.
Image Handling:-
1.Players can upload images by using the image URL’s.
2.A default image is used if no image is provided.
Search Functionality:-
1.Search players by Player name, Role, or Team Name.
2.View detailed player information on selection.
Responsive Design:-
1.Fully responsive for mobile, tablet, and desktop devices.
2.Styled using CSS with media queries.
Techs Used:-
Frontend:-
1.React.js: Component-based UI development.
2.Axios: API calls to interact with the backend.
3.FontAwesome: Icons for a modern UI.
Backend:-
1.JSON Server: Mock server for simulating backend APIs.
Prerequisites:-
1.Node.js: Ensure you have Node.js installed on your machine.
2.npm or yarn: Package manager to install dependencies.


Steps to Run the Project:-
Step 1 - Clone the Repository:
1.git clone https://github.com/your-repository.git
2.cd cricket-team-management
Step 2 – Install Dependencies:
1.npm install
Step 3 – Start the Frontend:
1.npm start
Step 4 – Setup and Run the Backend:
1.Install JSON Server Globally
2.Command : npm install -g json-server
Step 5 – Start the JSON Server:
1.Command :  json-server --watch db.json --port=2003
2.This server will mock the API at http://localhost:2003
API Endpoints:
Teams API:-
GET /teams: Fetch all teams.
GET /teams/:id: Fetch a specific team by ID.
POST /teams: Add a new team.
PUT /teams/:id: Update a team by ID.
DELETE /teams/:id: Delete a team by ID.
Usage Notes:
Default Player Image: If no image is uploaded for a player, a default image is used
Default Image URL: “https://th.bing.com/th/id/OIP.GKAbRpYzDlJa139WC8xPtwHaIC?w=175&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7”
