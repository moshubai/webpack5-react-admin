import React from 'react'
import './styles/index.scss'
import { ConfigProvider } from 'antd'

import { Provider } from 'mobx-react'
import store from './mobx'

import Router from 'routes'
import zhCN from 'antd/es/locale-provider/zh_CN'
import ErrorBoundary from 'components/error-boundary'

console.log('store', store) // log
class App extends React.PureComponent {
  render () {
    return (
      <ErrorBoundary>
        <Provider {...store}>
          <ConfigProvider locale={zhCN}>
            <Router/>
          </ConfigProvider>
        </Provider>
      </ErrorBoundary>
    )
  }
}
export default App
