# react-count-number-turnover
An npm package that counts a number with a turnover effect

![ani1](https://user-images.githubusercontent.com/17702664/36627610-74791b52-1988-11e8-84fe-9d0ad6390f5f.gif)

You can start the counting animation when it's visible

![ani2](https://user-images.githubusercontent.com/17702664/36627611-75767414-1988-11e8-9f28-d18ea0cedd2d.gif)

## Installation

```
  npm install react-count-number-turnover
```

## How to use

### &lt;TurnOverSequence />

```
<TurnOverSequence
  visibilitySensorOn={true}
  speed={50}
  springConfig={{
    stiffness: 100,
    damping: 10,
  }}
  style={{
    fontSize: '60px',
    fontWeight: 300,
    color: '#1f4d6a',
    marginTop: '50px',
  }}
>
  123,123,123
</TurnOverSequence>
```

* visibilitySensorOn: Whether to start the counting animation when it's visible on browser.
* speed: Time to turnover each number in ms. Set to 0 to stop.
* springConfig: Configuration for [react-motion](https://github.com/chenglou/react-motion.git).
* style: Styles for each number

### &lt;TurnOverNumber />

```
<TurnOverNumber
  visibilitySensorOn={true}
  speed={200}
  springConfig={{
    stiffness: 100,
    damping: 10,
  }}
  style={{
    fontSize: '60px',
    fontWeight: 300,
    color: '#1f4d6a',
    marginTop: '50px',
  }}
>
  8
</TurnOverNumber>
```

* visibilitySensorOn: Whether to start the counting animation when it's visible on browser.
* start: The number from which it turnovers.
* speed: Time to turnover each number in ms. Set to 0 to stop.
* springConfig: Configuration for [react-motion](https://github.com/chenglou/react-motion.git).
* onEnd: Callback function after the animation ends.
* style: Styles for each number

## Getting Started

Clone repo

````
git clone https://github.com/hobincar/react-count-number-turnover.git
````

Install dependencies

`npm install` or `yarn install`

Start development server

`npm start` or `yarn start`

Runs the demo app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Library files

All library files are located inside `src/lib`  

## Demo app

Is located inside `src/demo` directory, here you can test your library while developing

## Build library

`npm run build` or `yarn run build`

Produces production version of library under the `build` folder.

## License

[MIT](https://github.com/hobincar/react-count-number-turnover/blob/master/LICENSE)
