# Switch shmups API rest

- This project is an API rest that returns the list of physical shmup (shoot em up games) released in Nintendo Switch console.

- Idea is to store the list of all games in a Mongo database and save all the important info about them: name, display orientation, native resolution, action buttons, number of players, tricks, story, developer, publisher, stages, etc...

## Endpoints:

### Game endpoints (By now):

- `shmups/list` (GET) - Get all shmups list

#### Info returned

- `name` : Name of the game / compilation
- `imgSquare` : Game art in 1:1 proportion (346 x 346 resolution), picture comes from url in nintendo.co.jp store
- `imgWide` : Game art in 16:9 proportion (1368 × 770 resolution), picture comes from url in nintendo.co.jp store
- `screen` : Display orientation vertical/horizontal
- `tate` : Boolean that determines if screen can be rotated to play vertical games in 3:4 / 9:16

#### Format returned in JSON:

```
{
  "shmups" = [

  {
    "id":"GameId"
    "name": "Game Name",
    "imgSquare": "url",
    "imgWide": "url",
    "screen": "horizontal",
    "tate": false,
  },

  {
    ...
  },
  ];
}`

```
