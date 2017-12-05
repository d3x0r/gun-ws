
# gun-ws

An extended websocket driver for Gun.

## Controlling Options

```
  var gun = new Gun( { ws: { 
                              server: &lt;A single server&gt;,
                              servers: []   // array of servers to attach to
                              address : { } // an address to listen at
                              acceptCallback : cb( protocol, headers, url )
                              
                           } 
                     } );

```

### Changelog

- 1.0.1 - fix name in readme; update gun dependency
- 1.0.0 - Initial release




