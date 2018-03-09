pragma solidity ^0.4.18;

contract detection {

	address public owner ;
	
	struct userinfo{
		mapping(string => bool) ownership;
		mapping(string => uint) LicenseID;
		mapping(string => uint) validity;
		mapping(string => uint) startdate;
	}
	struct productinfo{
		mapping(string => bool) ismade;
		mapping(string => uint) LicenseID;
		mapping(string => uint) amount;
		mapping(string => uint) validity;
	}
	mapping(address => userinfo) user_info;
	mapping(address => bool) Registered;
	mapping(address => uint ) public balances;
	mapping(string  => productinfo) product_info;

	event Sent(address from, address to, uint amount);

	function detection() public {
		owner = msg.sender;
	}
	function check_balance(address _target) public view returns(uint){
		return balances[_target];
	}

	function Register(string _name) public {
		balances[msg.sender]=50000;
		Registered[msg.sender]=true;
	}
  
	function organization(string _productname,uint amount,uint LicenseID,uint validity) public {
		if(msg.sender==owner){
			product_info[_productname].LicenseID[_productname]=LicenseID;
			product_info[_productname].amount[_productname] = amount;
			product_info[_productname].validity[_productname]=validity;
		}
		else{
			revert();
		}
	}

	function buy(string _productname) public {
		if (balances[msg.sender] < product_info[_productname].amount[_productname]) return;
		if (product_info[_productname].ismade[_productname]==true){
        	balances[msg.sender] -= product_info[_productname].amount[_productname];
        	balances[owner] += product_info[_productname].amount[_productname];
        	Sent(msg.sender, owner, product_info[_productname].amount[_productname]);
			user_info[msg.sender].LicenseID[_productname]=product_info[_productname].LicenseID[_productname];
			user_info[msg.sender].validity[_productname]=product_info[_productname].validity[_productname];
			user_info[msg.sender].startdate[_productname]=now;
		}
		else{
			revert();
		}
	}

	function transfer(address newOwner,string _productname) public {
    	if (msg.sender != owner) revert();
    		if(user_info[msg.sender].ownership[_productname]==true){
    			user_info[newOwner].ownership[_productname] = true;
    			balances[msg.sender] += product_info[_productname].amount[_productname];
        		balances[newOwner] -= product_info[_productname].amount[_productname];
	}
}

}