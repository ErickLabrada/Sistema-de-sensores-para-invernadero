import pika, sys, os
from twilio.rest import Client


account_sid = 'sid'
auth_token = 'token'
client = Client(account_sid, auth_token)

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel() 

channel.queue_declare(queue='ALARM_QUEUE', durable=True) 


import json

def callback(ch, method, properties, body):
    try:
        # Decode and parse the body
        message = json.loads(body.decode('utf-8'))
    
    # Safely access the phone field
        phone = message.get("data", {}).get("phone")
        msg = message.get("data", {}).get("msg")        
        # Check if the message pattern is "Alarm"
        if message.get("pattern") == "Alarm":
            # Example SMS sending logic (commented for demonstration)
            #client.messages.create(
             #   body=msg,
              #  from_='+14172323849', 
               # to=phone          
            #)
            print(f"Message sent successfully: {msg}")
            ch.basic_ack(delivery_tag=method.delivery_tag)  # Acknowledge message
        else:
            print(f"Ignoring message as pattern is not 'Alarm': {body}")
            ch.basic_ack(delivery_tag=method.delivery_tag)  # Acknowledge but ignore
    except json.JSONDecodeError as json_error:
        print(f"Failed to decode JSON: {json_error}")
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)  # Dead-letter invalid JSON
    except Exception as e:
        print(f"Failed to process message: {e}")
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)  # Requeue message
 

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