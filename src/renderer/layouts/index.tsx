import * as React from "react"
import Nav from '../containers/nav/nav'

export default class App extends React.Component<any, any> {
  public render() {
    return (
      <main>
        <Nav />
      </main>
    )
  }
}