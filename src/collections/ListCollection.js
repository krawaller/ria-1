define(['Backbone','ListModel'], function(Backbone,ListModel){	ListCollection = Backbone.Collection.extend({        model: ListModel,        //Save lists to localstorage. Use url        //pointing serverscript if you use a         //nosql database.	        localStorage: new Store("lists"),        //This function maintain the collection        //in sorting order.        comparator: function (list) {            return list.get('order');        },        //This function returns the finished lists.         getChecked: function () {            return this.filter(function (list) {                return list.get('checked');            });        },    });	return ListCollection});    