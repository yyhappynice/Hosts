import * as React from "react"

// interface navProps {
//   items: Array<any>
// }

export default class Nav extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  state = {
    items: ['default', 'test1', 'test2']
  }

  public render() {
    const { items } = this.state
    return (
      <ul>
        {items.map((value: string, index: number, arr: Array<any>) => {
          return (
            <li key={index}>{value}</li>
          )
        })}
      </ul>
    )
  }
}