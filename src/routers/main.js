<<<<<<< HEAD
define(['Backbone','Underscore',"jQuery","ListCollectionView","ListCollection","TodoCollection","FullListView"],function(Backbone,_,$,ListCollectionView,ListCollection,TodoCollection,FullListView){		MainRouter = Backbone.Router.extend({        routes: {            '': 'index'        },        initialize: function () {            this.lists = new ListCollection();            this.listCollectionView = new ListCollectionView({                collection: this.lists            });            this.listCollectionView.bind("showlist", this.showList, this);        },        index: function () {            this.listCollectionView.render();        },        //When user click list title, we show them the todos        //for that list.        showList: function (cid) {            list = this.lists.getByCid(cid);            $('#hide').removeAttr('id');            $('#todoContainer input').attr('id', 'newTodo');            $('#todoCounter').removeAttr('class', 'hide');            $('.todoItem').empty();            todos = new TodoCollection();            //Send the model so you can save the todos with the correct id, to            //connect it to a specific list.            this.todosView = new FullListView({                collection: todos,                model: list            });            this.todosView.render();        }    });		return MainRouter;});
=======
define(['Backbone','Underscore',"jQuery","ListCollectionView","ListCollection","TodoCollection","FullListView"], function(Backbone,_,$,ListCollectionView,ListCollection,TodoCollection,FullListView){		MainRouter = Backbone.Router.extend({        routes: {            '': 'index'        },        initialize: function () {            this.lists = new ListCollection();            this.listCollectionView = new ListCollectionView({                collection: this.lists            });            this.listCollectionView.bind("showlist", this.showList, this);
			this.listCollectionView.bind("removeAllTodosInList", this.removeTodoList, this);        },        index: function () {            this.listCollectionView.render();        },        //When user click list title, we show them the todos        //for that list.        showList: function (cid) {            list = this.lists.getByCid(cid);
            $('#hide').removeAttr('id');            $('#todoContainer input').attr('id', 'newTodo');            $('#todoCounter').removeAttr('class', 'hide');
			$('#todoInputLabel').removeAttr('class', 'hide');
			$('#todoButtonHolder').removeAttr('class', 'hide');            $('.todoItem').empty();
			            todos = new TodoCollection();            //Send the model so you can save the todos with the correct id, to            //connect it to a specific list.            this.todosView = new FullListView({                collection: todos,                model: list            });            this.todosView.render();
			$('#todoContainer').show();        },

		// Shall remove all todos in list, when
		// the user clicked on the X for the list.
		// But right now the purpose of it, is only
		// to hide the todoContainer.
		removeTodoList: function()
		{
			$('#todoContainer').hide();
		}    });		return MainRouter;});
>>>>>>> 7d51262104b9e9f095fbc2e3442d739fd77f97a3
