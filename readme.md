# Switch shmups database API rest

- This project is an API rest that returns the list of physical shmup (shoot em up games) released in Nintendo Switch console.

- Idea is to store the list of all games in a Mongo database and save all the important info about them: display orientation, native resolution, action buttons, tricks, story, developer, publisher, stages, etc...

## Endpoints:

### Game endpoints (By now):

- `shmups/list` (GET) - Get all shmups list

#### Info returned

- `name` : Name of the game / compilation
- `imgSquare` : Game art in 4:3 proportion, picture comes from url in nintendo.co.jp store
- `imgWide` : Game art in 16:9 proportion, picture comes from url in nintendo.co.jp store
- `screen` : Display orientation vertical/horizontal
- `tate` : Boolean that determines if screen can be rotated to play vertical games in 3:4 / 9:16

#### Format:

```
shmups = [

{
    name: "Game Name",
    imgSquare: "url",
    imgWide: "url",
    screen: "horizontal",
    tate: false,
},

{
    ...
},
];`

```
