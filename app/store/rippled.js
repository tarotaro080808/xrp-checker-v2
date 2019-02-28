/* eslint-disable no-console */
import RippledWsClient from 'rippled-ws-client'
import _ from 'lodash'
import * as types from './mutation-types'
import * as utils from '@/utils/rippled-client'

export const state = () => ({
  isRippledWsLoading: false,
  totalBalance: 0,
  yourWallet: []
})

export const getters = {
  isRippledWsLoading(state) {
    return state.isRippledWsLoading
  },
  yourWallet(state) {
    return state.yourWallet
  },
  totalBalance(state) {
    return state.totalBalance
  }
}

export const actions = {
  async connectRippleClient({ commit }, { walletAddresses }) {
    const walletData = []
    try {
      commit(types.IS_RIPPLED_WS_LOADING, true)
      const connection = await new RippledWsClient('wss://s2.ripple.com')
      for (let i = 0; i < walletAddresses.length; i++) {
        const wallet = walletAddresses[i]
        if (wallet.isAddress) {
          const p = []
          p.push(
            utils.getBalance({
              connection,
              walletAddress: wallet.address
            })
          )
          p.push(
            utils.getTransactions({
              connection,
              walletAddress: wallet.address,
              limit: 10
            })
          )
          const [balance, transactions] = await Promise.all(p)
          const newWallet = Object.assign(wallet, {
            index: i,
            balance,
            transactions
          })
          walletData.push(newWallet)
          commit(types.SET_TOTAL_BALANCE, { walletBalance: balance })
        } else {
          const newWallet = Object.assign(wallet, {
            index: i,
            balance: wallet.value,
            transactions: {}
          })
          walletData.push(newWallet)
          commit(types.SET_TOTAL_BALANCE, { walletBalance: wallet.value })
        }
      }
      // Just to be sure.
      const newWalletData = _.orderBy(walletData, ['index'], ['asc'])
      commit(types.SET_YOUR_WALLET, { wallet: newWalletData })
      commit(types.IS_RIPPLED_WS_LOADING, false)
    } catch (error) {
      console.error(error)
    }
  }
}

export const mutations = {
  [types.IS_RIPPLED_WS_LOADING](state, payload) {
    state.isRippledWsLoading = payload
  },
  [types.SET_YOUR_WALLET](state, { wallet }) {
    state.yourWallet = wallet
  },
  [types.SET_TOTAL_BALANCE](state, { walletBalance }) {
    state.totalBalance += walletBalance
  }
}
