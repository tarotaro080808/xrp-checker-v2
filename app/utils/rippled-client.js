/* eslint-disable no-console */
export function getBalance({ connection, walletAddress }) {
  return new Promise(resolve => {
    connection
      .send({
        command: 'account_info',
        account: walletAddress
      })
      .then(response => {
        if (response.status === 'error' || !response.account_data) {
          resolve(null)
        } else {
          resolve(
            !isNaN(response.account_data.Balance)
              ? Number(response.account_data.Balance) / 1000 / 1000
              : null
          )
        }
      })
  })
}

export function getTransactions({ connection, walletAddress, limit }) {
  return new Promise(resolve => {
    connection
      .send({
        command: 'account_tx',
        account: walletAddress,
        limit,
        ledger_index_min: -1,
        ledger_index_max: -1
      })
      .then(response => {
        resolve(response.transactions || {})
      })
  })
}

export function getLocalStorageWallet() {
  return JSON.parse(localStorage.getItem('walletAddress')) || []
}

export function compatibilityCheck() {
  return JSON.parse(localStorage.getItem('localStorageVer')) || 1
}

export async function compatibilityCorrection({ connection }) {
  const walletAddress = JSON.parse(localStorage.getItem('walletAddress')) || []
  const newWalletAddress = []
  for (let i = 0; i < walletAddress.length; i++) {
    if (walletAddress[i].indexOf('r') === 0) {
      const balance = await getBalance({
        connection,
        walletAddress: walletAddress[i]
      })
      if (balance !== null) {
        newWalletAddress.push({
          label: '',
          address: walletAddress[i],
          value: balance,
          isAddress: true
        })
      }
    } else {
      // is not address
      newWalletAddress.push({
        label: '',
        address: '',
        value: Number(walletAddress[i]),
        isAddress: false
      })
    }
  }
  localStorage.setItem('walletAddress', JSON.stringify(newWalletAddress))
  localStorage.setItem('localStorageVer', JSON.stringify(2))
  return newWalletAddress
}
