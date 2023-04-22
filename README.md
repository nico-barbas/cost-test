# CostTest

## Dev run

`npm install` then `npm start` to start the application locally (opened on `localhost:4200/`)

## Design

The app is composed of 3 components and 1 service:

### Components:

- `FormComponent`: The component that hold the form to add new Items. The validations are done when the form gets submitted but validation messages get outputted as the inputs are changed.
- `ListComponent`: The component that displays a list of all the Items currently saved. It fetches the items through the `ItemsService` on init and whenever new ones are posted.
- `ItemComponent`: The component that displays the actual value of an item.

### Services:

- `ItemsService`: The service that has the responsibility to manage the items (CRUD actions). Every time there is a change in the data, it pushes the new item list to all the subscribed listeners (currently only `ListComponent`). The service is designed as a singleton for ease of use and because there should always only be one list of items at the same time.
  For persistent storage, the browser's `localStorage` is used to emulate a database and a backend.
