import React, {Component} from "react"
import {Button} from "antd-mobile"

class NotFound extends Component {
  render() {
    return (
      <div>
        <h2>404,页面未找到</h2>
        <Button type="primary"
                onClick={() => this.props.history.replace("/")}
        >回到首页</Button>
      </div>
    )
  }
}
