const { error } = require("console");
const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;


app.get("https://api.ftcscout.org/graphql", async (req, res) => {
    try{
        const query = `{
            eventByCode(code: "USWAHALT", season: 2023) {
              matches {
                matchNum
                teams {
                  teamNumber
                }
              }
            }
          }
        `;
        const response = await axios.post('https://api.ftcscout.org/graphql', {
            query
        }, {
            headers: {
                'Content-Type': 'application/json',
                // Add any necessary authentication headers here
            }
        });

        const teams = response.data.data.teams;
        const teamNames = teams.map(team => team.name);

        res.json(teamNames);
    }catch (error){
        console.error('Error fetching data',error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT,() => {
})