define(["jQuery", 'Backbone','Underscore',], function($, Backbone, _){ListItemView = Backbone.View.extend({        tagName: "li",        template: _.template($('#tmpList').html()),        events: {            "dblclick .listItem span:nth-child(2)": "edit",            "click .listItem span:nth-child(1)": "clear",            "keypress .editListItem input": "updateOnEnter",            "blur .editListItem input": "close",        },        //Listen if a model change or is deleted.        initialize: function (opt) {            this.model.bind('change', this.render, this);            this.model.bind('destroy', this.remove, this);        },        //Render the template        render: function () {            $(this.el).html(this.template(this.model.toJSON()));            return this;        },        //Switch classes hide and show functionallity.        //Then give the inputfield focus.        edit: function () {            this.$('.listItem').addClass('hide');            this.$('.editListItem').addClass('editing');            this.$('input').focus();        },        //Remove element from scene.        remove: function () {            $(this.el).remove();        },        //When the input(edit listtitle) loses focus, we make it        //disappear with the help of Css.        close: function () {            $('.listItem').removeClass('hide');            $('.editListItem').removeClass('editing');        },        //Destroy this model        clear: function () {            this.model.destroy();        },        //Check if the user clicked Enter and then save if        //a value exists in the input field. Remove the added classes         //to show and hide the correct fields.        updateOnEnter: function (e) {            if (e.keyCode == 13) {                if (this.$('input').val() != '') {                    this.model.save({                        title: this.$('input').val(),                    });                }                this.close();            }        },    });	return ListItemView;});