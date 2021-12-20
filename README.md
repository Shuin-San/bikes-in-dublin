# Dublin Bike Station For Noloco 🚲

## _A noloco.io challenge_

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShuin-San%2Fbikes-in-dublin.git)
or
[Run a dev environment locally](#Installation)

## Features

- Lists the Bike stations
- Preview number of available stands and bikes
- View on google maps button
- Filter By stations name / Address, number of available stands, number of available bikes
- Can set favorites and puts them first while still respecting alphabetical order

## Stack

Created using CREATE REACT APP

- ReactJS
- Redux Toolkit - An overkill for this application, used it for fun
- Axios
- MUI v5- material ui graphical library (to speed up design process)
- React Router v6

## Installation

Clone this repository,
Install the dependencies and start the server.
Start a dev environment

```sh
git clone https://github.com/Shuin-San/bikes-in-dublin.git
cd bikes-in-dublin
yarn install
yarn start
```

## About

_Technical decisions_

In order to save time, I decided to use libraries I am familiar with such as MUI to speed up the process of designing (I didn't have to spend too much time on taking design-related decisions)

I decided to go with Redux Toolkit, even though this was an overkill for this app size, but it made my life easier because I could avoid props drilling to leaf components. (FavStationsList and StationsList). Other than the obvious time benefit, it also future proofs our application and opens the door to better State management, should the application evolve to something bigger. We can implement RTK Query for data caching, and create various slices of state to separate concerns between different app features.

I went with Axios for data fetching instead of the native fetch because of 2 main reasons :

- Browser compatibility : Axios is supported by more (mainly older) browsers than fetch.
- Better developer experience : Axios has built-in interceptors that make it easier to intercept http requests compared to fetch() (where workarounds can be implemented) and also makes it easier to manage timeouts and simultaneous requests without the need of writting huge code blocks

_How it functions_

Stations contains the filters and acts as a placeholder for the FavStations and StationsList components
FavStations and StationsList Components receive the filters from Stations then use Redux store data and do all the filtering (sorry for the one liners)

The Stations are displayed using the StationCard component, its properties consist of the station data passed by FavStations and StationsList during the Array.map() method used to iterate through the array of available stations.

In the station card, we have a button to open the link to google maps with the correct coordinates, and a favorite button manages the state of favorite stations.

_If this was a real product, what would I implement_

- TypeScript : typing data prevents future errors, bonus : IDE autocompletes :)
- As already expressed , Redux Toolkit Query -> data caching, data fetching and slice creation all in one. Because this would obviously need more features. More features = more state to manage
- Express backend / nextjs application where the provided static JSON file could've been used to generate a real API where data could've been filtered and endpoints would've been created to load only what's needed
- I guess real time data would've been loaded (instead of a static json file). For that case we could leverage GraphQL as an option here with its subscriptions, schemas and types
- Maybe also leverage the service workers for offline availability
- Add data persistence, if no database available, on localStorage or use a DB to persist favorites and even go further and create user accounts stored on a noSQL db (eg mongoDB + Realm + Apollo)

_Functionalities I would add_

- More Filters (station status, services offered etc)
- Display station status / services with color coded icons
- Offer choice between Map View / List View
- Show distance based on current location (never done that, would be great to learn how to do that)
- Offer a better UI / color theme
