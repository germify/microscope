Migrations.add({
    name: 'Add intercom hash to users.',
    version: 1,

    up: function() {
        var users = Meteor.users.find({intercomHash: {$exists: false}});
        users.forEach(function(user) {
            Meteor.users.update(user._id, {$set: {
                intercomHash: IntercomHash(user, '08f626366f2c8f92cb1beb1653d71adbc1d4b33a')
            }});
        });
    },

    down: function() {
        Meteor.users.update({}, {$unset: {intercomHash: true}}, {multi: true});
    }
});

Migrations.add({
    name: 'Add bitly shorturl to posts.',
    version: 2,

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
//Migrations.migrateTo(1);
Migrations.migrateTo(2);

// migrate down
//Migrations.migrateTo(0);