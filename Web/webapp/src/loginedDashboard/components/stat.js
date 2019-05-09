import React, { Component } from 'react'

export default class stat extends Component {
  render() {
    return (
         <tr>
            <td>{this.props.sessName}
            </td>
            <td>{this.props.points}
            </td>
            <td>{this.props.difficulty}
            </td>
         </tr>
    )
  }
}
