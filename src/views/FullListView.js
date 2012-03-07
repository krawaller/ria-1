define(['Backbone','Underscore',"jQuery" ,"TodoView"], function(Backbone,_,$, TodoView){

	FullListView = Backbone.View.extend({

        el: $("#container"),

        template: _.template($("#todoDataTemplate").html()),

        //Events
        events: {
            "keypress #newTodo": "createOnEnter",
			"click #todoButton": "createWithButton",
            "keyup #newTodo": "updateCounter"
        },

        initialize: function (opt) {

			_.bindAll(this, "render", "createOnEnter", 'createWithButton', 'createItem', 'addOne', 'addAll');
            this.collection.bind('add', this.addOne, this);
            this.collection.bind('reset', this.addAll, this);
            this.collection.bind('change', this.render, this);
            this.collection.bind('all', this.render, this);
            this.collection.fetch();

            //This handles the drag and drop functionality
            //with help of the, by default created, cid.	
            this.$("#todos").sortable({
                update: function (event, ui) {
                    $('div.todo', this).each(function (i) {
                        var cid = $(this).attr('todo-cid');
                        listItem = opt.collection.getByCid(cid);
                        listItem.save({
                            order: i + 1
                        });
                    });
                }
            });
        },

        render: function () {
            sorted = this.collection.getTodosByCid(this, list.id);
            this.$('#todosData').html(this.template({
                total: sorted.length,
                remaining: this.collection.getChecked().length,
            }));
            return this;
        },

        addOne: function (todo) {

            var view = new TodoView({
                model: todo
            });
            this.$('#todos').append(view.render().el);
        },

        //Get the clicked models id and sort out the todos for that list.
        //Create a new view for each.
        addAll: function () {

            sorted = this.collection.getTodosByCid(this, list.id);
            _.each(sorted, function (todos, key) {

                var view = new TodoView({
                    model: todos
                });
                this.$('#todos').append(view.render().el);
            });
        },

        nextOrder: function () {
            if (!this.collection.length) return 1;
            return this.collection.length + 1;
        },

        //Create a new item by hitting the enter key
        createOnEnter: function (e) {
            var todo = $('#newTodo').val();
            if (!todo || e.keyCode != 13){
				return;
			} 
			this.createItem();
        },

		// Create an item by clicking the button
		createWithButton: function() {
			var todo = $('#newTodo').val();
            if (!todo){
				return;
			} 
			this.createItem();
		},

		// Create a new item in list
		createItem: function() {
			var todo = $('#newTodo').val();
            if(todo.length > 30) return;
            todo = this.validate(todo);
            this.collection.create({
                todo: todo,
                listModelId: list.id,
                order: this.nextOrder()
            });
            this.$('#newTodo').val('');
            $('#todoCounter').html('30');
		},

        validate: function(string) {            if(string){
               var mydiv = document.createElement("div");
               mydiv.innerHTML = string;
 
                if (document.all) // IE Stuff
                {
                    return mydiv.innerText;
               
                }   
                else // Mozilla does not work with innerText
                {
                    return mydiv.textContent;
                }                           
          }        },
        updateCounter: function(e) {

            //if not a enter push, then change counter
            if(e.keyCode != 13){
                var title = $('#newTodo').val();
                var left = 30 - title.length;
                $('#todoCounter').html(left);
            }
        }
    });

	return FullListView;
});
