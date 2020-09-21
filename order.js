var orderList = [];
var pzaList = [];
var sndwList = []; 
var drkList = [];

function valInfo() {
    var contactFName = document.getElementById("fname");
    var contactLName = document.getElementById("lname");
    var contactAddress = document.getElementById("address");
    var contactPhone = document.getElementById("phone");
    var contactEmail = document.getElementById("email");
    
    // variable to contain error message (if any exists)
    var message = "";
	
    /*if(first){
    localStorage.setItem("Info", orderList);
    }
    */
    //
    // firstname check
    //
    var NameValid= contactFName.value;
    var boolFirstNameCheck =(NameValid.length>0);
    
    if(!boolFirstNameCheck) {
        message += "'First name' is required\n";
        changeClass(contactFName, "error");
        
    } else {
        changeClass(contactFName, "");
	}
	//
	//Check last name
	//
	var LNameValid= contactLName.value;
	var boolLastNameCheck =(LNameValid.length >0);
	
	
	if(!boolLastNameCheck) {
		message += "'Last name'is required\n";
		changeClass(contactLName, "error");
	
	} else {
		changeClass(contactLName, "");
	}
	//
	//Phone Check
	//
    var phone=document.getElementById("phone").value;
	
	if (contactPhone.value==""){
		var boolPhoneCheck = false;
	}
	else {
		boolPhoneCheck=phone.match(/\d/g).length===10 ||phone.length==0;
	}
	
	if(!boolPhoneCheck) {
		message += "'Mobile Phone' is required\n";
		changeClass(contactPhone, "error");
	
	} else {
		changeClass(contactPhone, "");
	}
	
	//https://tylermcginnis.com/validate-email-address-javascript/
	//Check Email
	var email=document.getElementById("email").value;
	//var boolEmailCheck = /\S+@\S+\.\S+/.test(email)
	
	var boolEmailCheck =email.match(/\S+@\S+\.\S+/);
	//var boolEmailCheck = checkField(contactEmail.value);
	if(!boolEmailCheck) {
		message += "'Email' is required\n";
		changeClass(contactEmail, "error");
	
	} else {
		changeClass(contactEmail, "");
	}
	
	//
	// Address check
	//
	var AddresValid= document.getElementById("address").value;
	var boolAddressCheck =AddresValid.length>0;
	
	if(!boolAddressCheck) {
		message += "'Address' is required\n";
		changeClass(contactAddress, "error");
		
	} else {
		changeClass(contactAddress, "");
	}

	if(boolEmailCheck&&boolFirstNameCheck&&boolLastNameCheck&&boolPhoneCheck&&boolAddressCheck) {
		
		var contactFName = document.getElementById("fname");
		var contactLName = document.getElementById("lname");
		var contactAddress = document.getElementById("address");
		var contactPhone = document.getElementById("phone");
		var contactEmail = document.getElementById("email");
		
		var total=0;
		for (i in pzaList){
			total+=pzaList[i].price;
		}
		
		for (j in sndwList){
			total+=sndwList[j].price;
		}
		for (k in drkList){
			total+=drkList[k].price;
		}	
		
		
		var orderObject = {
		"Name":contactFName.value, 
		"LastName":contactLName.value,
		"Address":contactAddress.value,
		"Phone":contactPhone.value,
		"Email":contactEmail.value,
		"PizzaList":pzaList,
		"SandwichList":sndwList,
		"DrinkList":drkList,
		"Total":total
		};
		
		var orderInfo = JSON.stringify(orderObject);
	
		//Get saved dat from sessionStorage
		//localStorage.setItem("Info", orderInfo);
		// save data to sessionStorage
		sessionStorage.setItem("Info", orderInfo);
		
		//Get saved dat from sessionStorage
		var sessionData = sessionStorage.getItem("Info");
		// get saved data from localStorage
		var localData = localStorage.getItem("Info");
		//
		//Retrieve order from session data and list of order from local data
		//
		var order = JSON.parse(sessionData);
		
		//checking if it is first order to save, local data is null
		if(localData==null){
			orderList.push(order);
		}
		else{
			orderList=JSON.parse(localData);		
			orderList.push(order);
		}
		//
		var orderListStr = JSON.stringify(orderList);
		//
		//Pushing new order to the list orders in local storage
		localStorage.setItem("Info", orderListStr);
		//
		//Extracting data and printing
		//Costumer Info
		//
		var ContactDetails = "<div class=\"box\"><h2>Customer Info:</h2>";
		ContactDetails += "<p> Name: " +order.Name+ " "+order.LastName+ "<br/>"; 
		ContactDetails += "Email: " +order.Email+ "<br/>";
		ContactDetails +=  "Address: "+order.Address+ "<br/>";
		ContactDetails += "Phone: "+order.Phone+ "<br/><hr/>";
		ContactDetails += "<h2>Order</h2><br/> ";
		
		
		//Printing Pizza List
		ContactDetails += "<table class=\"box\"><tr><th> Pizza: </th><th></th><tr>";
		
		for (i in order.PizzaList) {
			ContactDetails += "<tr><td>"+order.PizzaList[i].quantity +" x "+order.PizzaList[i].size+", "+order.PizzaList[i].type+"(ingredients: "+order.PizzaList[i].extras+"):</td>"+
			"<td>$"+order.PizzaList[i].price+"</td></tr>";
		}
		//Printing Sandwich List
		ContactDetails += "<tr><th>Sandwich: </th><th></th><tr>";
		
		for (i in order.SandwichList) {
			ContactDetails += "<tr><td>"+ order.SandwichList[i].quantity +" x  "+order.SandwichList[i].type+"</td>"+
			"<td>$"+order.SandwichList[i].price+"</td></tr>";
		}
		
		//Printing Drink List
		ContactDetails += "<tr><th>Drinks: </th><th></th><tr>";
		for (i in order.DrinkList) {
			ContactDetails += "<tr><td>"+ order.DrinkList[i].quantity +" x "+order.DrinkList[i].size+", "+order.DrinkList[i].type+"<td>$"+parseFloat(order.DrinkList[i].price).toFixed(2)+"</td></tr><hr/>";
		}
		ContactDetails += "<tr><th>Order Total: </th><th>$"+parseFloat(order.Total).toFixed(2)+"</th></tr></table></div>";
		document.getElementById("printOrder").innerHTML= ContactDetails;
		
		//
		//Clearing global pizza,sandwich and drink list to prepare for new order
		//
		pzaList=[];
		sndwList=[]; 
		drkList=[];
		document.getElementById("mySubmit").disabled = true;
	  
	}
	else 
	{
		alert(message);
	
	}
	
	
	return false;
}

function changeClass(field, newValue) {
	field.setAttribute("class", newValue);
}

//
// function to validate content entered by the user
//
function checkField(fieldValue) {
	var check = true;
	
	fieldValue = fieldValue.trim();
	
	if(fieldValue.length == 0) {
		check = false;
		return check;	
	}

	return check;	
}


/* Pizza order*/
function pizzaOrder(){

	
	//creating object for current pizza
	var thispizza=new Object();
	
    //Counting checkboxes
	var checkboxes=myform.extras;
	var cont=0;   //count how many checkboxes are checked
	var extras="";
	for (var x=0; x<checkboxes.length; x++)
	{
		if (checkboxes[x].checked){
			
			cont +=1;
			extras = extras+checkboxes[x].value+",";
		}
	}
	
	//size selected and cost
	var size=document.getElementById("pizzasize").value;
	
    if (size == "Small"){
        var sizeCost=8.50;
    }
	
	if (size == "Medium"){
        var sizeCost=11.50;
    }
	if (size == "Large"){
        var sizeCost=14.00;
    }
	if (size == "Extra-large"){
        var sizeCost=16.50;
    }
	
	// getting  type of pizza
	var i;
	var pizzaType;
	
	for (i = 0; i<myform.type.length; i++) {
    if (myform.type[i].checked) {
      pizzaType= myform.type[i].value;
		
    }
  }
	
	//Getting quantity
	var quantity=document.getElementById("quantity").value;
	if(quantity==0){
		alert("Please enter a Pizza quantity >0" )
	}
	else{
		//Calculating cost
		var cost =((cont*1.75)+sizeCost)*quantity;

		//Collecting current pizza info
		thispizza.type=pizzaType;
		thispizza.size=size;
		thispizza.extras=extras;
		thispizza.quantity=quantity;
		thispizza.price=cost;
		//adding current pizza  to list
		pzaList.push(thispizza);
		alert("Pizza added to your order");
		document.getElementById("mySubmit").disabled = false;
	}
	
	
   
}

/* Sandwich order*/
function sandwichOrder(){
	
	//creating object for current pizza
	var thisSandwich=new Object();
	 	
	// getting  type of pizza
	var i;
	var sandwichType;
	
	for (i = 0; i<myform.stype.length; i++) {
    if (myform.stype[i].checked) {
     sandwichType= myform.stype[i].value;
		
    }
  }
	if (sandwichType == "All Garden Vegetarian"){
		var sandwCost=7.50;
	}
	if (sandwichType == "Big Beef on a Bun"){
		var sandwCost=8.50;
	}
	if (sandwichType == "Mixed Grill"){
		var sandwCost=9.50;
	}
	if (sandwichType == "Grilled Pork"){
		var sandwCost=9.50;
	}
	
	//Getting quantity
	var quantityS=document.getElementById("quantityS").value;
	if(quantityS==0){
		alert("Please enter a Sandwich quantity >0" )
	}
	else{ 
		//Calculating cost
		var costSandwich =sandwCost*quantityS;

		//Collecting current sandwich info
		thisSandwich.type=sandwichType;	
		thisSandwich.quantity=quantityS;
		thisSandwich.price=costSandwich;

		sndwList.push(thisSandwich);
		alert("Sandwich added to your order");
		
		document.getElementById("mySubmit").disabled = false;
	}
}

/* Drinks order*/
function drinkOrder(){
	
	//creating object for current pizza
	var thisDrink=new Object();	 	
	// getting  type of pizza
	var i;
	var drinkType;
	
	for (i = 0; i<myform.dtype.length; i++) {
		if (myform.dtype[i].checked) {
			drinkType= myform.dtype[i].value;
		}
  }
	//size selected and cost
	var drinksize=document.getElementById("drinksize").value;
	var sizeCost;
	
	if (drinksize == "Small"){
		sizeCost=1.25;
	}
	if (drinksize == "Medium"){
		sizeCost=1.75;
	}
	if (drinksize == "Large"){
		sizeCost=2.00;
	}
	
	//Getting quantity
	
	var quantityD=document.getElementById("quantityD").value;
	if(quantityD==0){
		alert("Please enter a drink quantity >0" )
	}
	else{
		//Calculating cost
		var costdrink =sizeCost*quantityD;
	
		//Collecting current drink info
		thisDrink.type=drinkType;
		thisDrink.size=drinksize
		thisDrink.quantity=quantityD;
		thisDrink.price=costdrink;

		drkList.push(thisDrink);
		
		alert("Drinks added to your order");
		
		document.getElementById("mySubmit").disabled = false;
	}
}


function report(){
	
	//Get saved dat from sessionStorage
   //var sessionData = sessionStorage.getItem("Info");
	// get saved data from localStorage
	var localData = localStorage.getItem("Info");
	//Retriving order list from local data
	orderList = JSON.parse(localData);
	
	//Printing header
	var ContactDetails = "<h2>Orders</h2>";
	//For each order print
	var i,j;
	var num=0;

	for (i in orderList){
		num+=1;
		ContactDetails += "<table class=\"info\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><th style=\"width:80px\">Order: " +parseInt(num)+ "</th><th></th><th></th><th class=\"just\">"+"Completed<br/><input type=\"checkbox\" name=\"ordernum\" id=\""+i+"\" onclick=\"removeOrder()\"/></th></tr>"; 
		ContactDetails += "<tr><td style=\"width:80px\"> Name: " +orderList[i].Name+ "<br/>"; 
		ContactDetails += orderList[i].LastName+ "<br/>"; 
		ContactDetails += orderList[i].Address+ "<br/>";
		ContactDetails += orderList[i].Phone+ "<br/>";
		ContactDetails += orderList[i].Email+"<br/></td><td></td><td></td><td></td></tr>" ;
		//Printing Pizza List
		ContactDetails += "<tr><td style=\"width:80px\">Pizza: <br/>"
		for (j in orderList[i].PizzaList) {
			ContactDetails += orderList[i].PizzaList[j].quantity +" x "+orderList[i].PizzaList[j].size+", "+orderList[i].PizzaList[j].type+"(ingredients: "+orderList[i].PizzaList[j].extras+"):<br/></td>"+"<td>$"+orderList[i].PizzaList[j].price+"</td><td></td><td></td></tr>";
		}
		//Printing Sandwich List
		ContactDetails += "<tr><td style=\"width:80px\">Sandwich: <br/>"; 
		for (j in orderList[i].SandwichList) {
			ContactDetails += orderList[i].SandwichList[j].quantity +" x +"+orderList[i].SandwichList[j].type+"</td>"+"<td>$"+orderList[i].SandwichList[j].price+"</td><td></td><td></td></tr>";
		}
		
		//Printing Drink List
		ContactDetails += "<tr><td style=\"width:80px\">Drinks: <br/>";
		for (j in orderList[i].DrinkList) {
			ContactDetails += orderList[i].DrinkList[j].quantity +" x "+orderList[i].DrinkList[j].size+", "+orderList[i].DrinkList[j].type+"</td><td>$"+orderList[i].DrinkList[j].price+"</td><td></td><td></td></tr></table>";
		}
	}
	
	document.getElementById("printOrder").innerHTML= ContactDetails;
	
}

function removeOrder(){	
	
	var localData = localStorage.getItem("Info");
	//Retriving order list from local data
	orderList = JSON.parse(localData);
	var checkboxes=check.ordernum;
	var orderDelete;
	for (var x=0; x<checkboxes.length; x++)
	{
		if (checkboxes[x].checked){
			
			orderDelete=x;
			continue;
		}
	}
	// deleting item 
	orderList.splice(orderDelete, 1);
	
	//Store the new orderlist to local storage
	var orderListStr = JSON.stringify(orderList);
	//
	//Pushing new order to the list orders in local storage
	localStorage.setItem("Info", orderListStr);
	
	//Calling function report
	report();
	
}
