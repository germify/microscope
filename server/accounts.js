Accounts.onCreateUser(function(options, user) {
    user.intercomHash = IntercomHash(user, '08f626366f2c8f92cb1beb1653d71adbc1d4b33a');

    if (options.profile)
        user.profile = options.profile;

    return user;
});