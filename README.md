# NotSoSmart

Visit the hosted version of this project [here]().

NotSoSmart is a smart TODO list categorizer that takes away the hassle of having to categorize movies or series you wish to watch, books or comics you might want to read, food or products you want to buy in the future. While also providing you with more details regarding each item added to the lists using multiple APIs.

This project was developed by [Hosam Dahrooge](), [Connie Ho](), and [Sydney Sisco]().

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

!["Screenshot of Base page"](https://github.com/Just-Hosam/tweeter/blob/master/docs/Base-look.png)
!["Screenshot of Mobile version"](https://github.com/Just-Hosam/tweeter/blob/master/docs/mobile-hidden-compose.png)
!["Screenshot of no content error"](https://github.com/Just-Hosam/tweeter/blob/master/docs/no-content-error.png)
!["Screenshot of over char limit error"](https://github.com/Just-Hosam/tweeter/blob/master/docs/too-many-char-error.png)

## Known Issues/Bugs

- Safari's mobile version blows up the dropdown menu

## Future Features

- More categories to classify items into (games, activities...)

## Dependencies

- Node.js
- Express
- body-parser
- chance
- md5
