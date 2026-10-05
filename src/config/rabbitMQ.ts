import amqp from "amqplib";

const RABBITMQ_URL = "amqp://localhost:5672";

let connection: amqp.ChannelModel;
let channel: amqp.Channel;

export async function connectRabbitMQ() {
  connection = await amqp.connect(RABBITMQ_URL);

  channel = await connection.createChannel();

  await channel.assertQueue("booking_queue", {
    durable: true,
  });

  console.log("RabbitMQ connected");
}

export function getRabbitMQChannel() {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized");
  }

  return channel;
}