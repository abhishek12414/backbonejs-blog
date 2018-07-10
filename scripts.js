//Backbone Model

let Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }
});

//Backbone Collection

let Blogs = Backbone.Collection.extend({});

//Initiate blogs

// let blog1 = new Blog({
//     author: 'Abhay',
//     title: 'Life in delhi',
//     url: 'lidabhay.in'
// });

// let blog2 = new Blog({
//     author: 'Naveen J',
//     title: 'My first job in bangalore',
//     url: 'jobnaveen.in'
// });

//Initiate a collection
let blogs = new Blogs();

//Backbone views
//for one blog
let BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function () {
        this.template = _.template($('.blog-list-template').html());
    },
    events: {
        'click .edit-blog': 'edit',
        'click .update-blog': 'update',
        'click .cancel': 'cancel',
        'click .delete-blog': 'delete'
    }, 
    edit: function() {
        $('.edit-blog').hide();
        $('.delete-blog').hide();
        this.$('.update-blog').show();
        this.$('.cancel').show();

        let author = this.$('.author').html();
        let title = this.$('.title').html();
        let url = this.$('.url').html();

        this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">')
        this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">')
        this.$('.url').html('<input type="text" class="form-control url-update" value="' + url + '">')
    },
    update: function() {
        this.model.set('author', $('.author-update').val());
        this.model.set('title', $('.title-update').val());
        this.model.set('url', $('.url-update').val());
    },
    cancel: function() {
        blogsView.render();
    },
    delete: function() {
        this.model.destroy();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

//for all blogs
let BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blog-list'),
    initialize: function () {
        let self = this;
        this.model.on('add', this.render, this);
        this.model.on('change', function(){
            setTimeout(function(){
                self.render();
            }, 30);
        }, this);
        this.model.on('remove', this.render, this);
    },
    render: function () {
        const self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(blog){
            self.$el.append((new BlogView({model: blog})).render().$el)
        });
        return this;
    }
});

let blogsView = new BlogsView();

$(document).ready(function() {
    $('.add-blog').on('click', function(){
        let blog = new Blog({
            author: $('.author-input').val(),
            title: $('.title-input').val(),
            url: $('.url-input').val()
        });
        $('.author-input').val('');
        $('.title-input').val('');
        $('.url-input').val('');
        blogs.add(blog);
    });
});