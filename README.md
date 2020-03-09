## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Few instructions on how to use the modify-annotation page - 

1. In order to copy a text from prev_text to text - it is mandatory that the end
    of the prev_text string has to be selected (this can be customized). Only when prev_text has been selected till the very end (the start can be any point) will the user see a mouse-icon , on click of which the user will be prompoted to confirm the change.

2. In order to copy a text from next_text to text - it is mandatory that the     start of the next_text string has to be selected (this can be customized). Only when next_text has been selected from the very start (the end can be any point) will the user see a mouse-icon , on click of which the user will be prompoted to confirm the change. 

3. To change text from 'text' to 'prev_text' it is mandatory for user to select text from the start to any end-point. Similarly, to change text from 'text' to 'next_text' it is mandatory for user to select text from the end to any start-point. Only then will the user see a mouse-icon , on click of which the user will be prompoted to confirm the change. 

