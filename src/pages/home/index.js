import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

@inject('example')
@observer
class HomePage extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    add: PropTypes.func,
    history: PropTypes.array,
    store: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  goPage = () => {
    const { history } = this.props
    console.log(this.props) // xu-log
    history.push('/count/2/3')
  }

  render () {
    console.log('this.props', this.props) // log
    const { store } = this.props
    return (
      <React.Fragment>
        {store.count}
        <button onClick={store.add}>add</button>
        <button onClick={store.down}>reduce</button>
        <button onClick={() => this.goPage()}>
          测试跳转
      </button>
      </React.Fragment>
    )
  }
}

export default HomePage
