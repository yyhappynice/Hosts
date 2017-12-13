import * as React from "react"

// interface navProps {
//   items: Array<any>
// }

export default class Nav extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  state = {
    items: ['default']
  }

  public render() {
    const { items } = this.state
    return (
      <ul>
        {items.map((value: string, index: number, arr: Array<any>) => {
          return (
            <li>{value}</li>
          )
        })}
      </ul>
    )
  }
}