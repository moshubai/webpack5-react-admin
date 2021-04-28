import { observable, action, computed, makeObservable } from 'mobx'
// import Api from 'api'
class Store {
  constructor () {
    makeObservable(this)
  }

  @observable count = 2
  @observable todos = [{
    title: '列表1',
    done: false
  }, {
    title: '列表2',
    done: true
  }, {
    title: '列表3',
    done: true
  }]

  @action add = () => {
    console.log('add') // log
    this.count = this.count + 1
  }

  @action down = () => {
    console.log('down') // log
    let num = this.count
    this.count = (num -= 1)
  }

  @action getDate = () => {
    return new Promise((resolve, reject) => {
      resolve('好好学习，天天向上')
    })
  }
}

export default new Store()
