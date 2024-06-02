# pinia-store

This project is a SPA built on pinia/typescript and with tailwind, so each element css-isolated. Allows to fetch data from newsapi, render news as cards with image (if had), title and button allowing to actually read it. App fetches 30 news, stores in local store and after that gives it to client. Each minute it checks if something changed on newsapi. if nothing - gives data from localstorage.

News shown 10 to person, but when scrolling down - they shown like infinite loading. Same works with 100 news.
Also responsive, works on each device.

Searchbar works with titles, also show news from all 30 you have.

Logic separated in different files. 

Searchbar logic was made in one branch, data-fetching in other branch. After they were merged several times, one time with conflict, cuz same main file was used in 2 different branches. It was made with purpose to show that I can work with this problem as well. 

To make data-format faster - used date-fns lib. First wanted to use axios, but fetched it with vue. 

## Instalation process:
Just download .zip, npm install to install dependencies. Npm run dev. Enjoy.
