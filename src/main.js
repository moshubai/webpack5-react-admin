import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import App from './App.js'
const EL = document.getElementById('root')

let render = () => {
  ReactDOM.render(
    <App />,
    EL
  )
}

if (__DEV__) {
  if (module.hot) {
    console.log('33333'); //log
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default
      ReactDOM.render(<RedBox error={error} />, EL)
    }
    render = () => {
      try {
        renderApp()
      } catch (e) {
        renderError(e)
        console.error(e)
      }
    }
    module.hot.accept('./App.js', () => Promise.resolve()
      .then(() => ReactDOM.unmountComponentAtNode(EL))
      .then(render)
      .then(res => {
        console.log('更新了'); //log
      })
    )
    // module.hot.accept([
    //   './App',
    //   // './mobx'
    // ], () => Promise.resolve()
    //   .then(() => ReactDOM.unmountComponentAtNode(EL))
    //   .then(render)
    //   .then(res=>{
    //     console.log('更新了'); //log
    //   })
    // )
  }
}

render()
