var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "password",
    database: "bamazon"
});

var amountOwed;


connection.connect(function(err){
	if (err) throw err;
	console.log('connected as id: ' + connection.threadId)
});

function showProducts(){
	connection.query('SELECT * FROM products', function(err, res){
		if (err) throw err;
		console.log('=================================================');
		console.log('=================Items in Store==================');
		console.log('=================================================');

		for(i=0;i<res.length;i++){
			console.log('Item ID:' + res[i].id + ' Product Name: ' + res[i].ProductName + ' Price: ' + '$' + res[i].Price + '(Quantity left: ' + res[i].StockQuantity + ')')
		}
		console.log('=================================================');
		placeOrder();
		})
}

function placeOrder(){
	inquirer.prompt([{
		name: 'selectId',
		message: 'Please enter the ID of the product you wish to purchase',
		validate: function(value){
			var valid = value.match(/^[0-9]+$/)
			if(valid){
				return true
			}
				return 'Please enter a valid Product ID'
		}
	},{
		name:'selectQuantity',
		message: 'How many of this product would you like to order?',
		validate: function(value){
			var valid = value.match(/^[0-9]+$/)
			if(valid){
				return true
			}
				return 'Please enter a numerical value'
		}
	}]).then(function(answer){
	connection.query('SELECT * FROM products WHERE id = ?', [answer.selectId], function(err, res){
		if(answer.selectQuantity > res[0].StockQuantity){
			console.log('Insufficient Quantity');
			console.log('This order has been cancelled');
			console.log('');
			newOrder();
		}
		else{
			amountOwed = res[0].Price * answer.selectQuantity;
			currentDepartment = res[0].DepartmentName;
			console.log('Thanks for your order');
			console.log('You owe $' + amountOwed);
			console.log('');
			connection.query('UPDATE products SET ? Where ?', [{
				StockQuantity: res[0].StockQuantity - answer.selectQuantity
			},{
				id: answer.selectId
            }], function(err, res){});
            
			newOrder();
		}
	})

}, function(err, res){})
};

function newOrder(){
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Would you like to place another order?'
	}]).then(function(answer){
		if(answer.choice){
			placeOrder();
		}
		else{
			console.log('Thank you for shopping at Bamazon!');
			connection.end();
		}
	})
};

showProducts();

//look in 10-nodejs/activities/25-inquirer_intro and the next one

//if I make changes, just run the "DROP DATABASE IF EXISTS whateverDB" instead of updating