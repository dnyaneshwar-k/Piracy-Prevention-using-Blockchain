if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

abi = JSON.parse('[{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"},{\"name\":\"_productname\",\"type\":\"string\"}],\"name\":\"transfer\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"balances\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_target\",\"type\":\"address\"}],\"name\":\"check_balance\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_productname\",\"type\":\"string\"},{\"name\":\"amount\",\"type\":\"uint256\"},{\"name\":\"LicenseID\",\"type\":\"uint256\"},{\"name\":\"validity\",\"type\":\"uint256\"}],\"name\":\"organization\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_productname\",\"type\":\"string\"}],\"name\":\"buy\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_name\",\"type\":\"string\"},{\"name\":\"_emailid\",\"type\":\"string\"},{\"name\":\"_company\",\"type\":\"string\"}],\"name\":\"Register\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Sent\",\"type\":\"event\"}]')
detectionContract = web3.eth.contract(abi);
contractInstance = detectionContract.at('0xbdfff13720ec20df3071fbc2be944763dc7e7eeb');


var org_address;

function check_balance(){
  var balance=contractInstance.check_balance(user_address);
  document.write(balance);
}

function Register(){
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  var confirm_password = document.getElementById("confirm_password").value;
  if (password==confirm_password){
    var address=web3.personal.newAccount("test");
    address="" + address +"";
    alert(address);
    web3.personal.unlockAccount(address, "test",60000000);
    web3.personal.unlockAccount(web3.eth.coinbase, "vimal1993",60000000);
    web3.eth.sendTransaction({from:web3.eth.coinbase,to:address,value: web3.toWei(5, 'ether')});
    window.location = "file:///home/fractaluser/Test/demo.html?name="+name;
    return false;
  }
  else{
    alert("Check your password");
    return false;
  }
}

function org_validate(){
  var org_address = document.getElementById("org_address").value;
  var password = document.getElementById("org_password").value;
  if ( org_address == web3.eth.accounts[1] && password == 'newOne'){
  	web3.personal.unlockAccount(web3.eth.accounts[1], "newOne",60000000);
    alert ("Login successfully");
    window.location = "file:///home/fractaluser/Test/demo3.html";
    return false;
  }
  else{
    alert("Enter Valid Address and password");
  return false;
  }
}

function create_product(){
  var created_product = document.getElementById("product_name").value;
  var amount= document.getElementById("amount").value;
  var LicenseID = document.getElementById("LicenseID").value;
  var validity  = document.getElementById("validity").value;
  contractInstance.organization(created_product,amount,LicenseID,validity, {from: web3.eth.accounts[1]});
  alert("Product created successfully");
}

var user_address;

function user_validate(){
  user_address = $("#user_address").val();
  var password = document.getElementById("user_password").value;
  if ( (user_address == web3.eth.accounts[2]) || (user_address == web3.eth.accounts[3]|| (user_address == web3.eth.accounts[4])||(user_address == web3.eth.accounts[5]) || (user_address == web3.eth.accounts[6]) || (user_address == web3.eth.accounts[7])) && password == 'test'){
      alert ("Login successfully");
    	window.location = "file:///home/fractaluser/Test/demo1.html?user_addr="+user_address;
    return false;
  }
  else{
    alert("Enter Valid Address and password");
  return false;
  }
}


function transfer_ownership(){	
  var url=window.location.href;
  url=url.split('?')[1];
  var user_address=url.split('=')[1];
  var target_address=  document.getElementById("target_address").value;
  var selected_product = document.getElementById("product_name").value;
  user_address="" + user_address +"";
  contractInstance.transfer(target_address,selected_product , {from: user_address});
  alert("successfully transaction");
}

function buy_products(){
    var url=window.location.href;
    url=url.split('?')[1];
    var user_address=url.split('=')[1];
    var selected_product = document.getElementById("product_name").value;
    user_address="" + user_address + "";
    contractInstance.buy(selected_product, {from:user_address});
    alert("Successful transaction");
  }




function getTransactionsByAccount() {
  var url=window.location.href;
  url=url.split('?')[1];
  var myaccount=url.split('=')[1]
  myaccount="" + myaccount + "";

  //myaccount="0x8c7ee25440342c31b0ba4cb10e8893f34653fb0f";
  var endBlockNumber;
  var startBlockNumber;
  if (endBlockNumber == null) {
    endBlockNumber = web3.eth.blockNumber;
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 30;
    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  for ( i = startBlockNumber; i <= endBlockNumber; i++) {
    if (i % 1000 == 0) {
      console.log("Searching block " + i);
    }
    var block = web3.eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
      block.transactions.forEach( function(e) {
        if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
          input_data=e.input;
          // console.log("  tx hash          : " + e.hash + "\n"
          //   + "   nonce           : " + e.nonce + "\n"
          //   + "   blockHash       : " + e.blockHash + "\n"
          //   + "   blockNumber     : " + e.blockNumber + "\n"
          //   + "   transactionIndex: " + e.transactionIndex + "\n"
          //   + "   from            : " + e.from + "\n" 
          //   + "   to              : " + e.to + "\n"
          //   + "   value           : " + e.value + "\n"
          //   + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
          //   + "   gasPrice        : " + e.gasPrice + "\n"
          //   + "   gas             : " + e.gas + "\n"
          //   + "   input           : " + e.input);

            $.ajax({
                      "url": 'http://localhost:3003/api/ether',
                      "data": {
                                "hash": input_data
                            },
                            "method": "POST"
                        }).done(function (data) {
                            //sort the names in asc order.
                            console.log('success');
                            console.log("data", data);
                        }).fail(function (error) {
                    console.log('error', error);
                })


        }
      })
    }
  }
}


