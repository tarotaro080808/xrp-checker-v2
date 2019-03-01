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
  isRippledWsLoading: state => state.isRippledWsLoading,
  yourWallet: state => state.yourWallet,
  totalBalance: state => state.totalBalance
}

export const actions = {
  async connectRippleClient({ commit }, { walletAddresses }) {
    const walletData = []

    // Compatibility
    // localStorage name: walletAddress
    // ["rxxxx","rxxxxx","1111.11","1111.1111","300"]

    try {
      commit(types.IS_RIPPLED_WS_LOADING, true)
      const connection = await new RippledWsClient('wss://s2.ripple.com')

      // backward compatibility
      const lsVer = utils.compatibilityCheck()
      const lsWalletAddresses =
        lsVer === 2
          ? utils.getLocalStorageWallet()
          : utils.compatibilityCorrection({ connection })
      for (let i = 0; i < lsWalletAddresses.length; i++) {
        const wallet = lsWalletAddresses[i]
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
