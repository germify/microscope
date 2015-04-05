Migrations.add({
    name: 'Add bitly shorturl to posts.',
    version: 1,

    up: function() {
        var posts = Posts.find({shortUrl: {$exists: false}});
        posts.forEach(function(post) {
            Posts.update(post._id, {$set: {
                shortUrl: Bitly.shortenURL(post.url)
            }});
        });
    },

    down: function() {
        Posts.update({}, {$unset: {shortUrl: true}}, {multi: true});
    }
});

// migrate up
//Migrations.migrateTo('latest');

// migrate down
//Migrations.migrateTo(0);