# Flash Sale Ticket Booking System

A backend system designed to handle high-concurrency ticket bookings during flash sales while preventing ticket overselling.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MySQL
- Redis
- RabbitMQ
- k6

## Features

- Event and ticket booking APIs
- Atomic MySQL inventory updates
- Race-condition handling
- Redis caching with TTL and cache invalidation
- Redis-based rate limiting
- RabbitMQ asynchronous booking processing
- Background booking worker
- Concurrent load testing with k6

## Architecture

Client
  ↓
Express API
  ↓
Redis Rate Limiter
  ↓
RabbitMQ Queue
  ↓
Booking Worker
  ↓
MySQL
  ↓
Atomic Inventory Update