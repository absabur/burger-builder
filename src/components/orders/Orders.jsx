import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrders } from '../../redux/action'
import LoadingPage from '../loading/LoadingPage'
import Order from './Order'
const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    loading: state.orderLoading,
    error: state.orderLoadErrorMessage,
    token: state.token,
    userId: state.userId,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
  }
}

export class Orders extends Component {
  componentDidMount = () => {
    this.props.getOrders(this.props.token, this.props.userId)
  }
  render() {
    return (
      <div className='container'>
        {this.props.loading ? <LoadingPage /> : <>
          {this.props.error ? <h1 style={{textAlign: "center"}}>{this.props.error}<br />Couldn't Load Orders</h1> : <>
            {this.props.orders.length === 0 && <h1 style={{textAlign: 'center'}}>You Have No Order</h1>}
            {this.props.orders.map(item => (
              <Order key={item.id} order={item}/>
            ))}
          </>}
        </>}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)