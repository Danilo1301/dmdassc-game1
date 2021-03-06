class CGApi {
  static Auth;
  static UserInfo = {};


  static SignIn() {
    return new Promise(function(resolve, reject) {
      CGApi.Auth.signIn().then(()=>{
        resolve(true);
      }).catch(()=>{
        resolve(false);
      });
    });

  }

  static SignOut() {
    this.Auth.signOut();
  }

  static GetProfile() {
    if( !CGApi.Auth.isSignedIn.get() ) { return }


    var user = CGApi.Auth.currentUser.get();
    var id = user.getId();
    var profile = user.getBasicProfile();

    CGApi.UserInfo = {
      id: id,
      name: profile.getName(),
      url: profile.getImageUrl()
    }
  }

  static Load() {
    return new Promise(function(resolve, reject) {
      gapi.load('auth2', function() {
        gapi.auth2.init({
          client_id: "959981766504-9m4sm16bkc2572ki2umr4r86rmvpecdu.apps.googleusercontent.com",
          scope: 'profile'
        }).then((auth)=>{
          CGApi.Auth = auth;
          CGApi.GetProfile();

          resolve(auth.isSignedIn.get());
        });
      });
    });
  }


}
