
# Utils

Utils are which util in our project, especially those utils are using for Social media services which written in `expressjs`

> [!IMPORTANT]
> You must install dependance when you using util if it required, please check the util source to get them
> You also have to specific env if need

> [!NOTE]
> Please note that all are util, that may export some method wrapping the util contents inside, so before you use them, you need to `call` them first by call operator `(<params>)`. They are util so you just import and using them when you need them to not consume resource unnecessarily!
## Class
- [class directory](./class)
Contains utils may reusable for common class

### bindMethodsWithThisContext

When you have some methods in your instance of a class which lost `this` context. Eg: you add prefix `async` before its name. That is when you need this function to bind context `this` to all methods of the target instance

## Configs
- [configs directory](./configs)
Contains config utils which you can use that for `default config` and save time for you

### discovery config
- [discovery.js](./configs/discovery.js)
Contains function connectToDiscoveryServer which contains config to connect to `discovery server` which running with `eureka`
> [!TIP]
> If you are running your services in the same network or virtual network so that I recommend you make whole env variable: APP_NAME, IP_ADDRESS, HOST_NAME with the same name as the service name or else you must set the correctly env with the real IP for it

### Single connect to mongo database
- [singleMongoDb.js](./configs/singleMongoDb.js)

Contains simple function `connectToDB` to connect to `single mongo database`

> [!IMPORTANT]
> If you want to connect to multiple instance of one or multiple database, you have to find another way to do that instead of using this function

## Constants
- [Constants directory](./constants)
Contains many constants which may using in multiple services that help our services using the same convention with clean and clear codes
> [!TIP]
> I am considering about move it into other util repo which can help other services which running in other program language know which constant can be use when communication each other or maybe we can make the Front-end developer know about these constants also

### Client route
- [clientRoute.js](./constants/clientRoute.js)

Contains methods help gen clients route by params

### Communication 
- [communication.js](./constants/communication.js)

Contains constants of communication (chat, comment,...) definition types

### Kafka constants
- [kafka.js](./constants/kafka.js)

Contains kafka topic name constants

### Notification constants
- [notification.js](./constants/notification.js)

Contains notification types constants

### Socket channels
- [socketChannel.js](./constants/socketChannel.js)

Contains socket channel definition constants `name`, `prefix`

### User constants
- [users.js](./constants/users.js)
Contains user role constants

## Controllers
- [Controllers directory](./controllers)

### Basic controller
- [basicController.js](./controllers/basicController.js)
BasicController has methods response for handle error and return corresponding especially relate to [CommonException](#common-exception). Just extends your controller to extend that BasicController and then call the method handleResponseError in `catch exception`.
> [!TIP]
> You should define corresponding Exception extend CommonException and throw it when exception happening

## Eureka
- [eureka directory](./eureka)
Contains default controller and route response current service health and status for our eureka discovery server

## Exceptions
- [exceptions directory](./exceptions)
Contains some default base exception for our services

### Common exception
- [commonExceptions.js](./exceptions/commonExceptions.js)
> [!TIP]
> The best practice is to co-op with [Basic controller](#basic-controller)

## Grpc
- [grpc directory](./grpc)
Contains proto files definition and some util to communication throw grpc
> [!IMPORTANT]
> When you define your `grpc server` you should define the proto here and other proto communication with your `grpc server` here also, which save time for other service want to communicating with your service easily
> [!IMPORTANT]
> When you define new proto for your service or you are using some proto for communicating with other proto server, you must run protoc to gen proto util code in your service
Code run protoc to gen code to generated directory right inside the root source of your project (Note that these code running in npm protoc window):
1. install `grpc-tools` and `google-protobuf`:
 `npm install grpc-tools --save-dev    
npm i google-protobuf
`
2. create dir `generated` in root dir
3. run code gen right in the [grpc directory](./grpc)  `npx grpc_tools_node_protoc --js_out=import_style=commonjs,binary:../../generated --grpc_out=grpc_js:../../generated -I ./proto ./proto/*.proto`

`These gen grpc code auto generate these file:`
1. <proto_file_name>_pb.js:
This file contains the JavaScript classes for your Protocol Buffer messages. It includes:
    - Message type definitions
    - Serialization and deserialization methods
    - Utility functions for working with your defined message types


2. <proto_file_name>_grpc_pb.js:
This file contains the gRPC service definitions and client stubs. It includes:
    - Client-side stubs for making RPC calls to your defined services
    - Service interface definitions
    - Methods for setting up a gRPC server (if you're implementing the server-side in JavaScript)
### Proto
- [proto directory](./grpc/proto)

Contains .proto file

### Common
- [common.js](./grpc/common.js)

Contains some common function handle grpc such as handleGrpcError

## Kafka
- [kafka directory](./kafka)
Contains util for kafka handle

> [!IMPORTANT]
> Note that we have some conventions here: all consumer must implement service with method specific and then write the util methods in [producer.js](./kafka/producer.js) for other producer can call it easily in producer

### Kafka consumer
- [consumer.js](./kafka/consumer.js)

Contains:
1. createTopicIfNotExists
2. activeServiceConsumer which can help we auto mapping the calls from produce to service methods

### Kafka producer
- [producer.js](./kafka/producer.js)

Contains init of producer and util methods defined by the service which act as consumer. We init producer in here because we just need single instance of kafka producer in each service

## Middlewares
- [middlewares directory](./middlewares)
Contains middleware utils can be using for multiple service, or can be conventions for us

> [!IMPORTANT]
> Note that with auth we have some conventions:
> 1. every auth information must have structure: currentUser:{
    userId <string>,
    role <number>,
    username <string>
}
> 2. socket: get `token` from `handshake query` then bind `currentUser` to the socket
> 3. api: get user info from req.headers['x-current-user'] because it bound by the api gateway then set it to req.body.currentUser
> That make all service can get auth info easily

## Models
- [models directory](./models)
Contains basic structure or schema can be reuse in some services

## Services
- [services directory](./services)
Contains basic structure or schema can be reuse or extends by some services

### BasicService
- [basicService.js](./services/basicService.js)
Defines the method for get result with pagination getPaginatedResults

## Sockets
Defines utils as socket builder receive `io` and then mapping it with specific handler, usually used by socket server but keep that in [Util directory](#utils) as a convention for client when communicating with socket server

## Docker compose
[Docker compose file](./docker-compose.yaml)
Help us easily run containers of many services, just locate the terminal in the [Utils root directory](#utils) and then you can run or manager multiple instance listed in the file

> [!IMPORTANT]
> We also have a convention here that whenever you created a service that you must add Docker file and add the service docker information into [Docker compose file](./docker-compose.yaml)