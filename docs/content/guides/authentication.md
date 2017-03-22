@ngdoc content
@module guides
@name Authentication
@sortorder 4
@description

# Authenticating an ngBoltJS Application

* [Generic WAMP Authentication](/#/guides/authentication#generic-wamp-authentication)
  * [WAMP with Login](/#/guides/authentication#wamp-with-login)
  * [WAMP without Login](/#/guides/authentication#wamp-without-login)
* [Custom Authentication](/#/guides/authentication#custom-authentication)
* [Development Authentication](/#/guides/authentication#development-authentication)

---

## Generic WAMP Authentication 

### WAMP with Login 

WAMP user authentication provides an authentication layer between your application and your WAMP services. The user will be presented with a login screen where they will enter a username and password. To use this type of authentication, you'll need to enable the WAMP protocol in the {@link BltData Data API}, connect to a WAMP server that is configured with `ticket` authentication, and specify WAMP RPC endpoints to acquire WAMP authentication tickets. 

The process is as follows: 
1. Application loads. Auth module reports state of `unauthenticated`. Login screen is presented. 
2. Data API connected to WAMP server with an anonymous connection.
3. The user enters their credentials and submits login form. 
4. The Data API will invoke the `login` RPC endpoint with the credentials and will expect a response containing an authid and ticket to use for establishing a secure WAMP connection. 
5. Assuming the `login` endpoint returned successfully, the WAMP authentication service will stash the login response in a cookie and inject the authentication configuration into the {@link BltData Data API} which will trigger a {@link BltData#connect reconnect}.
6. The {@link BltData Data API} will drop its anonymous connection to the WAMP server, connect with the `authid` established in the login phase, and will specify `ticket` as the auth method. We will respond to the onchallenge callback with the ticket from the login phase.
7. Assuming success up to this point, the {@link BltData Data API} will now have an authenticated connection to the WAMP server. 

To enable WAMP user authentication, set the `auth` and `login` flags to `true` in your {@link blt_config build components settings}, specify `WampAuthService` and your `authService` in your {@link blt_appProfile application profile}, and specify RPC endpoints for at a minimum the `login` RPC in your {@link blt_dataRoutes routes}.

**Example WAMP Authentication Profile Settings** 

```json 
{
  "data": {
    "protocol": "wamp",
    "retryDelay": 5000
  },
  "auth": {
    "authService": "WampAuthService",
    "wampAuthMethod": "ticket"
  },
  "servers": {
    "wamp": {
      "url": "ws://localhost:8080",
      "realm": "realm"
    }
  }
}
``` 

**Example WAMP Authentication Routes** 

```json 
{
  "routes": {
    "login": {
      "return": "object",
      "wamp": {
        "rpc": "f.realm.login",
        "args": [
          "username",
          "password"
        ],
        "kargs": []
      }
    },
    "logout": {
      "return": "text",
      "wamp": {
        "rpc": "f.realm.logout",
        "args": [],
        "kargs": []
      }
    }
  }
}
```

### WAMP without Login

WAMP static authentication provides a way to establish an authenticated connection to a WAMP server without having to provide user login. To use this type of authentication, you'll need to enable the WAMP protocol in the {@link BltData Data API} and connect to a WAMP server that is configured with `ticket` or `wampcra` authentication. 

The process is as follows: 
1. Application loads. Authentication framework injects static authentication config into {@link BltData Data API}.
2. The {@link BltData Data API} will connect with the `authid` and `authmethod` configured in your {@link blt_appProfile profile} and will respond to the onchallenge callback with the secret from the login phase. 
3. Assuming success up to this point, the {@link BltData Data API} will now have an authenticated connection to the WAMP server. 

To enable WAMP user authentication, set the `auth` flag to true in your {@link blt_config build components settings} and specify `WampAuthService` and your `authService` in your {@link blt_appProfile application profile}. 

**Example WAMP Static Profile Settings**

```json 
{
  "data": {
    "protocol": "wamp",
    "retryDelay": 5000
  },
  "auth": {
    "authService": "WampAuthService",
    "wampAuthMethod": "ticket",
    "authKey": "someAuthId",
    "authSecret": "someTicket"
  },
  "servers": {
    "wamp": {
      "url": "ws://localhost:8080",
      "realm": "realm"
    }
  }
}
``` 

---

## Custom Authentication 

To write your own custom authentication implementation, you'll most likely want to copy the following skeleton service as a starting point. 

**Empty Custom Auth Service**

```javascript 
(function () {
  'use strict';
 
  angular.module('blt.auth')
    .factory('CustomAuthService', CustomAuthService)
  ;
 
  CustomAuthService.$inject = ['$q'];
 
  function CustomAuthService($q){
 
    var srv = {
      login: login,
      logout: logout,
      hasCredentials: hasCredentials,
      activate: activate,
      authenticated: false
    }
 
    return srv;
 
    //// Public Service Functions /////////////////////////////////////////////
 
    /**
     * This function should perform whatever operations are necessary to check 
     * the given username and password for authentication. The "BltAuthStorage" 
     * service can be used to save session cookies using the output of this
     * function. See the DevAuthService for examples.
     */
    function login(username, password){
      return $q.reject('Not implemented');
    }
 
    /**
     * This function should perform whatever operations are necessary to inform 
     * the server (if one exists) that the current user session is invalidated. 
     * This function should also clear any session cookie that may have been 
     * stored for this session.
     */
    function logout(){
      return $q.reject('Not implemented');
    }
 
    /**
     * Reject if you don't have credentials (either collected from login screen, 
     * or pulled in from your application config) or a session cookie indicating 
     * an successful login. Resolve if you have credentials or a session cookie.
     */
    function hasCredentials(){
      return $q.reject('Not implemented');
    }
  
    /**
     * Activate this service. Set the initial authenticated state.
     */
    function activate(){
        //Examine current context and set initial "authenticated state".
    }
  }
})();
```

You'll then specify your `CustomAuthService` in the `auth` property of your {@link blt_appProfile application profile}. The authentication framework will leverage your implementation for authentication. 

---

## Development Authentication 

If you want to experiment with the authentication framework or don't have a backend authentication system available during development, you can simply leverage the `DevAuthService`. 

<div class="note-info">
**NOTE** The DevAuthService does not depend on any {@link BltData Data API} protocol, so those settings can be changed without affecting the DevAuthService. 
</div>
