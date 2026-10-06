import { getRabbitMQChannel } from "../config/rabbitMQ.js";
import { createBookingService } from "../services/booking.service.js";

interface BookingMessage {
  eventId: number;
  customerId: string;
  quantity: number;
}

export async function startBookingWorker() {
  const channel = getRabbitMQChannel();

  await channel.consume("booking_queue", async (message) => {
    if (!message) {
      return;
    }

    try {
      const booking: BookingMessage = JSON.parse(
        message.content.toString()
      );

      console.log("Processing booking:", booking);

      await createBookingService(
        booking.eventId,
        booking.customerId,
        booking.quantity
      );

      channel.ack(message);

      console.log("Booking processed successfully");
    } catch (error) {
      console.error("Booking processing failed:", error);

      channel.nack(message, false, false);
    }
  });

  console.log("Booking worker started");
}