import { getRabbitMQChannel } from "../config/rabbitMQ.js";

interface BookingMessage{
    eventId:number;
    customerId:string;
    quantity:number;
}

export function publishBooking(  eventId: number,
  customerId: string,
  quantity: number
){
    const channel = getRabbitMQChannel();
      const message: BookingMessage = {
    eventId,
    customerId,
    quantity,
  };
    channel.sendToQueue(
        "booking_queue",
        Buffer.from(JSON.stringify(message)),
        {
            persistent:true,
        }
    );
    console.log("Booking added to queue:",message)
}
