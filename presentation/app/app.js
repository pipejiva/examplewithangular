var app = angular.module('Products',['ngResource']);

app.factory('Product',function($resource){
	return $resource('/api/product/:code',{ code:'@code' },{
		update:{ method:'PUT'}
	});
});

app.controller('productController',function($scope,Product){
	
	$scope.product = new Product();
	var refresh = function(){
		$scope.products = Product.query();
		$scope.product = "";
	}
	refresh();
	
	$scope.remove = function(product){
		product.$delete(function(){
			refresh();
		});
	}
	
	$scope.add = function(product){
		Product.save(product,function(product){
			refresh();
		});
	}
	
	$scope.edit = function(code){
		$scope.product = Product.get({code:code});
	}
	
	$scope.update = function(product){
		product.$update(function(){
			refresh();
		});
	}
});