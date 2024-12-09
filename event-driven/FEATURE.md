# Feature

## Description

We have received a request in which we show live weather data for each field in our field table.
The producer has been updated to push weather message's to our api.

## Acceptance Criteria

- The table shows columns for weather data such as
  - Conditions (sunny, rainy, snow, etc.)
  - Precipitation percentage
  - Temperature (logic to show either Fahrenheit or Celsius depending on the message)
  - Wind speed and direction
- Icons from [weather-icons](https://erikflowers.github.io/weather-icons/) are used to concisely show weather data.
  - Conditions should use correct conditions icons
  - Wind direction should show the correct directional icon with the speed value rendered underneath
  - Temperature should use the degrees icon and the Celsius or Farenheit icon when appropriate
