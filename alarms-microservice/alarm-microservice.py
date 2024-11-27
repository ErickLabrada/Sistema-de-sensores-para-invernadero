import asyncio
import websockets

# WebSocket server handler
async def handle_esp32(websocket):
    print(f"ESP32 connected! Path: ")  # This will show the 'path' argument
    try:
        while True:
            # Receive data from the ESP32
            message = await websocket.recv()
            print(f"Message from ESP32: {message}")

            # Send a response back to the ESP32
            response = f"Server received: {message}"
            await websocket.send(response)
            print(f"Sent to ESP32: {response}")
    except websockets.exceptions.ConnectionClosed:
        print("Connection with ESP32 closed.")

# Start the WebSocket server
async def start_server():
    server = await websockets.serve(handle_esp32, "192.168.0.109", 80)
    print("WebSocket server running on ws://192.168.0.109:80")
    await server.wait_closed()

# Run the server using asyncio.run
if __name__ == "__main__":
    asyncio.run(start_server())
