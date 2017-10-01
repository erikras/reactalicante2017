import React, { Component } from 'react'
import { Provider } from 'react-redux'
import initStore from './redux/initStore'

const page = WrappedComponent => {
  class Page extends Component {
    static async getInitialProps(context) {
      const store = initStore()
      const otherProps = WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps({ ...context, store })
        : {}
      return { ...otherProps, initialState: store.getState() }
    }

    constructor(props) {
      super(props)
      this.store = initStore(props.initialState)
    }
    render() {
      const { initialState, ...rest } = this.props
      return (
        <Provider store={this.store}>
          <WrappedComponent {...rest} />
        </Provider>
      )
    }
  }

  return Page
}

export default page
