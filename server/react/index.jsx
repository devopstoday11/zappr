import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { Provider } from 'react-redux'
import { RoutingContext } from 'react-router'

export default class Index extends React.Component {
  static propTypes = {
    js: React.PropTypes.array.isRequired,
    css: React.PropTypes.array.isRequired,
    store: React.PropTypes.object.isRequired
  }

  static createMarkup(props) {
    return {
      __html: ReactDOMServer.renderToString(
        <Provider store={props.store}>
          <RoutingContext {...props.renderProps}/>
        </Provider>
      )
    }
  }

  static createInitialState(store) {
    return {
      __html: `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`
    }
  }

  render() {
    const {js, css, ...other} = this.props
    const html = Index.createMarkup(other)
    const initialState = Index.createInitialState(other.store)

    return (
      <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
        <meta name="description" content="Approvals for Github pull requests"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>ZAPPR</title>
        <link rel="shortcut icon" href="favicon.ico"/>
        {css.map((s, i) => (<link key={i} href={`/${s}`} rel="stylesheet"/>))}
      </head>
      <body>
      <main id="main" dangerouslySetInnerHTML={html}/>
      <script dangerouslySetInnerHTML={initialState} defer/>
      {js.map((s, i) => (<script key={i} src={`/${s}`} defer/>))}
      </body>
      </html>
    )
  }
}
