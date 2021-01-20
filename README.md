<img src="https://user-images.githubusercontent.com/62586450/105201950-685e1280-5b7c-11eb-8676-f77b2f5dc3e7.png" width="128" height="128">

# Todobubu

Todobubu, a light weight daily todo list application. It focus on planning daily workflow, making your day become more productive. It is a cloud-based, cross-platform application which you can access your todos everywhere with your phones, tablets or desktops.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It is now host with netlify on [Todobubu](https://todobubu.laporatory.com/). 

## Getting Started

If you are interested in this project, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Features
- Adding Todos
- Responsive & Clean UI/UX Design
- Cross Platform Support

### Adding Todos
As a todo list application, Todobubu provided a simple and handy way for users to add a todo. Unlike other todo lists, each todo inside Todobubu occupies its own timeslot, which is assigned with a  starting time and an ending time or a duration. 

Todobubu will help the users to sort the todos and give users a brief schedule of the day. Plan well before you start the journey. Well scheduled will definitely help to increase the productivity of the day.

![Todobubu-Mockup](https://user-images.githubusercontent.com/62586450/105208978-45376100-5b84-11eb-872e-c5a1c500c610.png)

### Responsive & Clean UI/UX Design
With a bright and smart blue color, Todobubu enlights your whole day. The entire application use only the color #A9BCEE, its shaded color #414F75, muted color #B5C1DE, and achromatic colors with different grayscale.

![Color-palette](https://user-images.githubusercontent.com/62586450/105208674-ea056e80-5b83-11eb-9b2e-ab9ee7da3305.png)

The design on mobile-first approach while it also fit on desktop. Thinking that most of the users will use it on their phones, this design give great experience when users is using it on PWA. Designing before coding is important for me. I tend to design the layout or even prototype on Figma before start coding. 

![figma-mockup](https://user-images.githubusercontent.com/62586450/105212929-048e1680-5b89-11eb-9a45-40e41c524248.png)

### Cross-platform Support
Todobubu is a web application. Which means that it can be access anywhere with internet and browser. Also, Todobubu is also a progressive web application (PWA). For phone user, PWA is provided to enjoy the fullscreen native application experience and shortcut on homescreen for quick access. 

For desktop, Todobuub is working on another a [electron project](https://github.com/IamMrandrew/Todobubu-electron) which provided dmg and exe as desktop app. As I mentioned before, data of Todobubu can be stored on cloud. 

And of course, Todobubu's data can also be stored on local storage. To understand more, can take a look on the implementation section of Firebase Integration.

## Implementations 
- React Framework
- Firebase Integration

### React Framework
Being the most popular js framework, this web application is built by [React](https://github.com/facebook/react). Using React, components can be reused without write repetitively, like Timeslot, Todo components. This keep the code more clean and structeed in an intuitive way.

```
sortedTodos.map((todo) => <Timeslot key={todo.id} todo={todo} />
```

As this is my first react project, passing props through compoents is a bit messy at first. At last, I utilized context api to provide props that is used around entire project. I am not sure if it is the best practise for my project but it works in some way.

Using states for array of object (Todo) is a new perspective for me. React render the UI only when the state have changes. Here is an example of how a new todo is added. (Spread operator in ES6 javascript is useful here)

```
setTodos([
        ...todos,
        {
          id: uuid(),
          title: inputTitle,
          desc: inputDesc,
          start: inputStart,
          end: duration ? inputEndDur : inputEnd,
          dur: inputDur,
          duration: duration,
          complete: false,
        },
      ]);
```

### Firebase Integration
To achieve the cloud based service, Firebase Cloud Firestore & Authentication is used in this project. Firebase provided a rather simple way to link the database with my react app. With firebase and react-firebase-hooks, I can fetch the query in the database with few lines of code.

```
  const cloudTodosRef = firestore.collection("todos");
  const query = cloudTodosRef.orderBy("start");

  const [cloudTodos] = useCollectionData(query, { idField: "id" });
```

For authentication, using the `useAuthState` can identify if the user is logged in or not throughout the entire applications. I chose to use the Google and Github sign-in this time while Firebase provided various options for developers. 

## Contributing
This app is built within 1-2 weeks only with design and implementation. There may be some bugs or functions not working well. Feel free to leave comments or even fork it and create a pull request. I will be happy about it!!!
