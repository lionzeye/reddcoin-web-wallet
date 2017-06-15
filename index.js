const bitcore = require('reddcore');
const electrum = require('./node_modules/reddcoin-electrum-js/electrum');
const reddcoin = {

    /*
      Create basic wallet
     */
    wallet: electrum.WalletFactory.standardWallet(),
    monitor: false,

    /*
      Outputs the addresses to console
     */
    render: function () {

      var addresses = this.wallet.getAddresses();
      var transactions = this.wallet.getTransactions();

      for(var i = 0; i < addresses.length; i++){
        var addr = addresses[i];
        var val = bitcore.util.formatValue(addr.confirmed) + ' RDD';
        console.log('Address ('+ addr.address  +') #' + i + ': ' + val);
      }

    },

    /**
     * Recovers account from seed, if account does not exist they will be created
     * @param  string seed     [
     * @param  string password
     * @return null
     */
    create: function (seed, password) {

        var monitor = electrum.NetworkMonitor;

        // setup wallet password
        this.wallet.buildFromMnemonic(seed.trim(), password.trim());

        // response layer
        this.monitor = monitor.start(this.wallet);

        // init the wallet? need to confirm
        this.wallet.activateAccount();

        // output data
        this.render();
    },

    /**
     * Send a transaction - TODO: Test
     * @return null
     */
    send: function () {
        var addr = $("#toAddress").val(),
            amount = $("#amount").val();
        this.wallet.send(amount, addr, this.monitor);
    },

    /**
     * Get Current Wallet Instance
     * @return object
     */
    get: function(){
      return this.wallet;
    },

    /**
     * Generate a new BIP39 Seed and return
     * @return string
     */
    generateSeed: function(){
      return this.wallet.getNewSeed();
    }

}

/*
  EG: Creating a new wallet, generate a new seed
  reddcoin.generateSeed()

  This setup below is simply to demonstrate repeatable accounts and balances with access.
 */

reddcoin.create('victory pilot network forward trend cup glass grape weird license melody shy', 'Asecurepassword@11');


