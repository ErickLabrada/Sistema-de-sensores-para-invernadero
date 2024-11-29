import pika, sys, os
from twilio.rest import Client


account_sid = 'AC3b3b4ac26718cf5e9ca05a5982bd8b28'
auth_token = 'b858cc2f40420783b0fded6ac011bf1b'
client = Client(account_sid, auth_token)

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel() 

channel.queue_declare(queue='ALARM_QUEUE', durable=True) 


def callback(ch, method, properties, body):
    try:
        client.messages.create(
            body=body,
            from_='+14172323849', 
            to='+526681163510'          
        )
        print(f"Message sent successfully: {body}")
        ch.basic_ack(delivery_tag=method.delivery_tag)  
    except Exception as e:
        print(f"Failed to send SMS: {e}")
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)  

def main():
    channel.basic_consume(queue='ALARM_QUEUE', on_message_callback=callback)
    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        connection.close()  
        sys.exit(0)











#import asyncio
#import websockets

#async def handle_esp32(websocket):
#    print(f"ESP32 connected! Path: ") 
#    try:
#        while True:
#            message = await websocket.recv()
#            print(f"Message from ESP32: {message}")

#            response = f"Server received: {message}"
#            await websocket.send(response)
#            print(f"Sent to ESP32: {response}")
#    except websockets.exceptions.ConnectionClosed:
#        print("Connection with ESP32 closed.")

#async def start_server():
#    server = await websockets.serve(handle_esp32, "192.168.0.109", 80)
#    print("WebSocket server running on ws://192.168.0.109:80")
#    await server.wait_closed()

#if __name__ == "__main__": 
#    asyncio.run(start_server())
