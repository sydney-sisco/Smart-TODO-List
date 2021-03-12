# NotSoSmart

Visit the hosted version of this project [here](https://notsosmart.herokuapp.com/).
It is best viewed at a zoom of 67%.

NotSoSmart is a smart TODO list categorizer that takes away the hassle of having to categorize movies or series you wish to watch, books or comics you might want to read, food or products you want to buy in the future. While also providing you with more details regarding each item added to the lists using multiple APIs.

This project was developed by [Hosam Dahrooge](https://github.com/Just-Hosam), [Connie Ho](https://github.com/connie-ho), and [Sydney Sisco](https://github.com/sydney-sisco).

<br>

## Getting Started

To run the following project on your machine please follow the steps below:

<br>

1. Create the `.env` file by using `.env.example` as a reference. You will be required to request multiple API keys from a few sites. So good luck!

2. Install all dependencies.
```
npm install
```
3. Fix to binaries for sass.
```
npm rebuild node-sass
```
4. Reset the database.
```
npm run db:reset
```
5. Run the server.
```
npm start
```
6. And finally, visit the following.
```
http://localhost:8080/
```

<br>

## Final Product

!["Screenshot of Light Mode"](https://github.com/sydney-sisco/Smart-TODO-List/blob/master/docs/Readme-Screenshots/Light%20Mode.png)
!["Screenshot of Dark Mode"](https://github.com/sydney-sisco/Smart-TODO-List/blob/master/docs/Readme-Screenshots/Dark%20Mode.png)
!["Screenshot of Details Card"](https://github.com/sydney-sisco/Smart-TODO-List/blob/master/docs/Readme-Screenshots/Dark%20Details.png)
!["GIF of Pending Bar"](https://github.com/sydney-sisco/Smart-TODO-List/blob/master/docs/Readme-Screenshots/Pending%20Bar.gif)
!["Screenshot of Mobile Version"](https://github.com/sydney-sisco/Smart-TODO-List/blob/master/docs/Readme-Screenshots/Mobile%20Version.png)

## Known Issues/Bugs

- Safari's mobile version blows up the dropdown menu

## Future Features

- More categories to classify items into (games, activities...)
- Drag and Drop
- Multi-user colaboration (family plan)
- Deadline and notification implementation

## Dependencies

- Google Natural Language
- Axios
- Bcrypt
- Body-parser
- Chalk
- Cookie-session
- Dotenv
- EJS
- Express
- Method-Override
- Node-sass-middleware
- PG
- PG-native
- Yelp-fusion
