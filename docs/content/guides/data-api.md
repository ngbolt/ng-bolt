@ngdoc content
@module guides
@name Data API Configuration
@sortorder 4
@description

# ngBoltJS Data API Configuration Guide 

* [Overview](/#/guides/data-api#overview)
  * [Before You Begin](/#/guides/data-api#before-you-begin)
* [Installation](/#/guides/data-api#installation)
* [Configuring the Data Service](/#/guides/data-api#configuring-the-data-service)
  * [Profiles](/#/guides/data-api#profiles)
  * [Routes](/#/guides/data-api#routes)
* [Using the Data Service](/#/guides/data-api#using-the-data-service)
  * [Connecting the Data Service](/#/guides/data-api#connecting-the-data-service)
  * [Connection State, Messges, and Callbacks](/#/guides/data-api#connection-state-messages-and-callbacks)
  * [Making Requests](/#/guides/data-api#making-requests)

-------------------------------------------------------------------------------

## Overview 

The ngBoltJS data service provides a unified interface for interacting with various data sources external to an application. Architecturally, think of it as an intermediary between the services that provide the supported data sources and your application's code, handling external data requests by your application in a consistent and controlled manner regardless of the supported data source in use. 

The data service accomplishes this by allowing the application developer to define configuration files for common data source routes and different application {@link blt_appProfile profiles} for each desired deployment environment. This allows application developers to deploy to multiple environments and interface with different data sources without having to change application code, (hopefully) speeding development time.

Learning how to include the data service into your application, how to configure it, and how to use it will be covered in the following sections and sub-pages. Please pay attention to any highlighted sections, as using the data service will force you to consider how you interact with the data sources your application needs.

### Before You Begin 

Before using the ngBoltJS data service, familiarize yourself with the following topics or gain a rudimentary understanding of them to make your life easier when using this service: 
* Asynchronous programming 
* [AngularJS](https://angularjs.org/) 
* [AngularJS Promises](https://docs.angularjs.org/api/ng/service/$q) 

-------------------------------------------------------------------------------

## Installation

Getting the data service into your project requires that the appropriate properties be selected in the ngBoltJS {@link blt_config build configuration} file. The data sources available to the data service will depend on which options are selected in the build configuration file. For example, if your application requires REST and WAMP, but not SQLite, the following configuration will only allow REST and WAMP to be included in your application: 

```json 
"components": {
  "data": {
    "http": true,
    "sqlite": false,
    "wamp": true
  }
}
```

<div class="note-info">
**Note** If your application does not require the data service, setting all of the data options in the build configuration to false will disable it entirely. 
</div>

Once the desired data sources have been included in the application build configuration, getting the data service available for use in your application is as simple as injecting the 'BltData' module into your application code that will be using the data service. 

```javascript
angular
  .module('someModule', [])
  .controller('SomeController', SomeController);

// Inject the BltData service
SomeController.$inject = ['BltData'];
function SomeController(BltData) { ... };
```

-------------------------------------------------------------------------------

## Configuring the Data Service 

To use the data service in your application, it must first be configured.  This requires that a few files be created:

* at least one profile that describes the data protocol to use and the data sources in use 
* a routes file that describes the routes that the data service will use to construct requests to the sources defined in the profile. 

These files are located in the config directory under your project root. 

### Profiles

Applications using the data service may have more than one profile. Each profile should represent a separate run-time environment. As an example, your application could use different data sources during development and testing than in production. Therefore, you would create at least two service profiles: one for development and one for production.

**{@link blt_appProfile Create a Profile}**

### Routes 

Applications using the data service must define all of their routes so that the data service knows how to construct the requests to each data source an application is using. 

**{@link blt_dataRoutes Create Routes}** 

------------------------------------------------------------------------------- 

## Using the Data Service 

Once the data service has been configured, given at least one profile, and has had the routes defined, it can then be used in application code. The data service exposes several methods and data members that application code can use to interface with the data sources that the service has been configured to support. Each method in the data service's interface returns a promise, so that application code can enforce an ordered resolution of requests. 

### Connecting the Data Service 

Before any of the methods will invoke successfully, the data service must first be initialized and connected. This creates the connections and interfaces required to communicate with the data source the service has been configured to use. Where this connection takes place is ultimately up to the application developer, however it is recommended that the data service be connected in either the constructor of the main controller or the initialization/activation function of the main controller.

**Data Service Initialization** 

```javascript 
(function() {
  'use strict';
  
  angular
    .module('myModule', [])
    .controller('MyController', MyController);
  
  MyController.$inject = ['BltData'];
  
  function MyController(BltData) {
    var ctrl = this;
  
    /* Other controller code... */
  
    BltData.connect();
  }
})();
``` 

<div class="note-warning">
**Important** The data service will defer all requests until the service has been connected. However, the data service does not queue those requests. When they resolve is up to when the delayed requests resolve. Therefore, consider the order in which delayed requests are resolved as undefined. If a specific order of calls is required, chain the requests using their returned promises. 
</div>

### Connection State, Messages, and Callbacks 

When the data service connects to a data source or the connection to the data service is lost, a message will be emitted on the ngBoltJS message bus. These messages can be used in application code to respond to changes in the data service's connection state. 

| State Change  | Channel   | Message      | 
| ------------- | --------- | ------------ | 
| On Connect    | `bltData` | connected    | 
| On Disconnect | `bltData` | disconnected | 
| On Failed     | `bltData` | failed       | 

For information on how to subscribe to these messages, see {@link BltApi#subscribe BltApi#subscribe}.

In addition to the messages published on the ngBoltJS message bus, two public data members exist as places to hook into the data service and respond to connection state changes by invoking a callback. The callbacks assigned to these members must have a method signature that returns nothing and takes no arguments. 

| Member       | Invoked | 
| ------------ | ------- | 
| onconnect    | Invoked when the data service connects. | 
| ondisconnect | Invoked when the data service disconnects. | 
| onfailed     | Invoked when the data service exceeds the connection attempt limit. | 

When the data service disconnects from a data source, in addition to publishing a message and invoking a callback (if any), the data service will be set to an unconnected/uninitialized state and all requests will exhibit the same deferred behavior as described above. It is up to the application developer to re-initiate the connection to the data source. 

```javascript 
BltData.ondisconnect = function() {
  /* Application-specific disconnect code... */
}
  
BltData.onconnect = function() {
  /* Application-specific connect code (init application data, etc.)... */
}
``` 

<div class="note-info">
**Note:** The connection state events only occur once per state change. For example, if the application code is attempting to re-connect after the service is disconnected and that re-connection attempt ultimately fails, another disconnect state change message will not be fired. Attempting to connect again after a failed connection attempt will have to be handled by the application code. This is only required when the data service enters the failed state. If your application is using REST and the connection to the STOMP server fails, the data service will still allow REST requests to execute. However, any requests that make use of the STOMP service will fail or produce undefined results. 
</div>

### Making Requests 

Making requests from the data service is as simple as invoking the desired method of the data service. However, there are a few things to be aware of with regard to what requests are allowed to be used when the data service is configured to use the different supported data services and how those requests return data.

#### Allowed Requests

Since the data service interfaces with several data sources but provides the same API for all of those sources, what requests are allowed by the data service depend on the protocol the data service is configured to use. How to handle a disallowed request will depend on the application developer and is outside of the responsibility of the data service. 

| Method         | WAMP    | REST    | SQLite  | 
| -------------- | ------- | ------- | ------- | 
| `call`         | **Yes** | **Yes** | **Yes** | 
| `publish`      | **Yes** | **Yes** | No      | 
| `subscribe`    | **Yes** | **Yes** | No      | 
| `unsubscribe`  | **Yes** | **Yes** | No      | 
| `register`     | **Yes** | No      | No      | 
| `unregister`   | **Yes** | No      | No      | 

#### **Returned Objects** 

Regardless of the protocol being used by the data service, each request will return the same object when the request succeeds or fails. 

| Property | Description     | Notes     | 
| ---------| --------------- | --------- | 
| `status` | Status of the request | "OK" or "ERROR" | 
| data     | The data returned from the request | Undefined or a formatted object based on return type. See {@link blt_dataRoutes routes} for more information. |
| details  | An object whose properties describe the request | `details.call` is a string that is set to the requested route name. <br> `details.message` is a string that is set to the description of the result of the call. |

This allows all three data protocols to be handled the same, provided that they all return data formatted in an identical fashion across all data sources used. For example: 

```javascript 
BltData.call("getImportantData")
  .then(function(response){
    BltApi.info("Status:", response.status, "Details:", response.details);
    // Do something with response.data
  })
  .catch(function(response) {
    BltApi.error("Something went wrong!", response.details.message);
  });
``` 

#### API Reference

To see the documentation on the various requests that the data service can make, see the {@link BltData API Reference}.