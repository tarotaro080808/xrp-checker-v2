export function getBalance({ connection, walletAddress }) {
  return new Promise(resolve => {
    connection
      .send({
        command: 'account_info',
        account: walletAddress
      })
      .then(response => {
        resolve(
          !isNaN(response.account_data.Balance)
            ? Number(response.account_data.Balance) / 1000 / 1000
            : 0
        )
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
