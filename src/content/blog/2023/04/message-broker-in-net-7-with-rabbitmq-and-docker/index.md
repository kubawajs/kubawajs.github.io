---
title: Message broker in .NET 7 with RabbitMQ and Docker
description: Message brokers are an essential part of modern application architecture. In this blog post, we explore how to set up a message broker using RabbitMQ and Docker in .NET 7.
publishDate: 2023-04-11 00:00:00
img: '/assets/images/2023/04/message-broker-in-net-7-with-rabbitmq-and-docker/images/hero.jpg'
img_alt: Picture with rabbit, animal.
tags: 
  - "net-core"
  - "docker"
  - "dotnet"
  - "rabbitmq"
---

Message brokers are an essential part of modern application architecture. They help to decouple the different components of an application, making it easier to build and maintain complex distributed systems. In this blog post, we'll explore how to set up a message broker using RabbitMQ and Docker in .NET 7.

* * *

Source code: [https://github.com/kubawajs/MessageBroker](https://github.com/kubawajs/MessageBroker)

* * *

## Project setup

Start by creating a new project with the ASP.NET Core Web API template. Remove the example template endpoint from _Program.cs_ and add another simple endpoint:

```csharp
// Message broker example
app.MapGet("/api/messages", () =>
{
    return "Hello";
});
```

This simple endpoint just displays the text "Hello" on the browser. We'll extend it in the further parts of this blog post.

## Package installation

Now it's time to install the RabbitMQ packages, which will allow us to publish messages to the message broker. We need only one - **MassTransit.RabbitMQ**.

![Nuget package manager view with MassTransit.RabbitMQ library selected.](/assets/images/2023/04/message-broker-in-net-7-with-rabbitmq-and-docker/images/image.png?w=1011)

Register it with the built-in extension method in _Program.cs_:

```csharp
// Configure message broker
builder.Services.Configure<MessageBrokerSettings>(app.Configuration.GetSection(MessageBrokerSettings.SectionName));
builder.Services.AddSingleton(sp => sp.GetRequiredService<IOptions<MessageBrokerSettings>>().Value);

builder.Services.AddMassTransit(busConfigurator =>
{
    busConfigurator.SetKebabCaseEndpointNameFormatter();
    busConfigurator.UsingRabbitMq((context, configurator) =>
    {
        var settings = context.GetRequiredService<MessageBrokerSettings>();
        configurator.Host(new Uri(settings.Host), host =>
        {
            host.Username(settings.Username);
            host.Password(settings.Password);
        });
    });
});
```

This code retrieves the connection string to RabbitMQ from _appsettings.json_ (we'll update it later) using _MessageBrokerSettings_ class. Below you can find its implementation:

```csharp
public sealed class MessageBrokerSettings
{
    public static string SectionName = "MessageBroker";

    public string Host { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
```

## Docker

Now it's time to set up Docker containers for API and RabbitMQ. Start by clicking with RMB on the project in Visual Studio. Choose _Add_ and then _Container Orchestrator Support_.

![Picture with Visual Studio with Container Orchestrator Support option opened.](https://jakubwajs.files.wordpress.com/2023/02/image-3.png?w=680)

Next, select _Docker Compose_ with Linux as the target OS.

![Picture with Add Container Orchestrator Support window with Docker Compose option selected.](https://jakubwajs.files.wordpress.com/2023/02/image-4.png?w=415)

Visual Studio will automatically generate Dockerfile for your API and Docker Compose file. Half of the work is done without any effort ;)

![Picture with generated Docker compose file.](https://jakubwajs.files.wordpress.com/2023/03/image.png?w=422)

Let's edit the compose file. The missing part is our RabbitMQ container. The code presented below will pull the latest image from the Docker registry and will use the local folder to store data (_volumes_ section) so that the data contained in it will not be deleted when the container is removed. I've added also the dependency on the API container so we'll be sure that the cache container is always initialized first.

The final code of the docker-compose file should look like the below:

```yaml
version: '3.4'

services:
  messagebroker.api:
    container\_name: API
    image: ${DOCKER\_REGISTRY-}messagebrokerapi
    build:
      context: .
      dockerfile: MessageBroker.Api/Dockerfile
    ports:
      - 80:80
      - 443:443
    depends\_on:
      - messagebroker.rabbitmq

  messagebroker.rabbitmq:
    container\_name: RabbitMQ
    image: rabbitmq:management
    hostname: messagebroker-queue
    volumes:
    - ./.containers/queue/data/:/var/lib/rabbitmq
    - ./.containers/queue/log/:/var/log/rabbitmq
    environment:
      RABBITMQ\_DEFAULT\_USER: admin
      RABBITMQ\_DEFAULT\_PASS: admin
    ports:
    - 5672:5672
    - 15672:15672
```

The last thing to finish the setup is to add the RabbitMQ configuration into _appsettings.json_. It uses the hostname, username, and password defined in the Docker compose file:

```json
"MessageBroker": {
    "Host": "amqp://messagebroker-queue:5672",
    "Username": "admin",
    "Password": "admin"
}
```

## Publishing messages

### Event Bus

To publish messages to the RabbitMQ instance, we need to create an object that will be responsible for this. Let's start with creating an interface called _IEventBus_. It will have only one generic method - _PublishAsync_. As a parameter, it will take any object that can be passed as a message.

```csharp
public interface IEventBus
{
    Task PublishAsync<T>(T message, CancellationToken cancellationToken = default)
        where T : class;
}
```

Now it's time for interface implementation. It's very simple - uses _Publish_ method of the _IPublishEndpoint_ interface from the _MassTransit_ package. And that's all - everything will automatically adapt to our message broker by the configuration we provided in the _Program.cs_ file.

```csharp
internal sealed class EventBus : IEventBus
{
    private readonly IPublishEndpoint \_publishEndpoint;

    public EventBus(IPublishEndpoint publishEndpoint) => \_publishEndpoint = publishEndpoint;

    public Task PublishAsync<T>(T message, CancellationToken cancellationToken = default) where T : class
        => \_publishEndpoint.Publish(message, cancellationToken);
}
```

There's only one thing left - register the implementation in the DI container under _MassTransit_ configuration:

```csharp
builder.Services.AddScoped<IEventBus, EventBus>();
```

### Publish message

Let's add our event bus to the endpoint we created before. This simple method will create a message with the current time and publish it to RabbitMQ. In this case, we'll pass a simple event _object_ with two properties - message and timestamp.

```csharp
app.MapGet("/api/messages", async (IEventBus eventBus) =>
{
    var timeStamp = DateTime.Now;
    var message = $"Message sent to RabbitMQ - {timeStamp}";
    await eventBus.PublishAsync(new HelloEvent(message, timeStamp));
    return new { Message = message, TimeStamp = timeStamp };
});

public sealed record HelloEvent(string Message, DateTime? TimeStamp = null);
```

## Testing solution

Okay, everything's set. It's time to test our solution. Start containers by running the command in the project folder root:

```shell
docker compose up -d
```

Or by using the built-in Docker Compose runner in Visual Studio. If everything was set correctly, you should be able to see two containers in Docker Desktop as in the screenshot below.

![Screenshot with two containers running in Docker Desktop.](/assets/images/2023/04/message-broker-in-net-7-with-rabbitmq-and-docker/images/image-2.png?w=734)

Go to the swagger URL in the browser (by default: _https://localhost/swagger/index.html_) and use its _Try it out_ option to get the response from the endpoint. In the response, you should get the message and the current time stamp.

![Screenshot with the endpoint visible in the Swagger view.](/assets/images/2023/04/message-broker-in-net-7-with-rabbitmq-and-docker/images/image-1.png?w=1024)

Ok, our endpoint is running correctly, so the last thing to check is if the RabbitMQ instance received the message produced by API. To do this, open the RabbitMQ admin panel in the browser (should be running on port 15672). Sign in using the credentials provided in the docker-compose file.

![Picture with Rabbit MQ login window.](/assets/images/2023/04/message-broker-in-net-7-with-rabbitmq-and-docker/images/image-3.png?w=288)

Go to the Exchanges tab and choose an exchange with your event name - in this case _MessageBroker.Api.MessageBroker.Events:HelloEvent_. You can see that the message published when you accessed the API endpoint was received by the message broker.

![Diagram with Message Broker Events.](/assets/images/2023/04/message-broker-in-net-7-with-rabbitmq-and-docker/images/image-4.png?w=765)

### Source code

- [https://github.com/kubawajs/MessageBroker](https://github.com/kubawajs/MessageBroker)