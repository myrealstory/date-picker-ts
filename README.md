# Getting Started with Gordon Date-Picker Test

* Pick up time with display current start or end date
* Range time pickup was available
* Today date showing with yellow color
* Month select available 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### generate days

Get first day of month and last day of month base of currentMonth, and setup start day and end day of week, 0 as Sunday, 1 as Monday and more. If have to fill full boxes, we have to print the previous month's day and maybe we have next month's day.

so we use 3 kind of for looping to fill up the array name dates.
1. startDayOfWeek was render last month's day, would render from end of last month. Push into date and not set isCurrentMonth as false to set text-light gray color.
2. Second one make currentMonth push but set isCurrentMonth as true.
3. endDayOfWeek should print only next 7 days.

### isInRange && handleDateClick

isInRange was check the date range from startDate and endDate on date value from mapping.
handleDateClick was designed when startDate, endDate have value to check is that same , if yea, then turn state as null.
when date doesnt equal current startDate or endDate, then update value.

### jest unit test 

1. test and check render UI
2. check calendar left right button rendering 
3. check left right button feature