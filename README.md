# Promoções de hoje

Open source project that displays all the major portuguese retailer's products with discounted price for the current day.

The app runs on the client side with no backend. For this to be possible, a cornjob is setup with github actions which runs every night at 3am. It consists of a series of nodejs scripts that run and scrap the websites of each retailer, collecting and processing the data on to json payloads which then get built and served with the React app.

Visit here:
https://andrefcasimiro-vakt.github.io/promocoes.github.io/

