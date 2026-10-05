import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import SubmitPersonal
from asgiref.sync import sync_to_async


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"services_{self.room_name}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        print("Connected:", self.room_name)

        

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        print("Disconnected:", self.room_name)
        

    async def submitInfo(self, event):

        print("EVENT RECEIVED:", event)

        await self.send(
            text_data=json.dumps({
                "type": "get_Data",
                "id": event["id"],
                "name": event["name"],
                "age": event["age"],
                "phone": event["phone"],
                "file": event["file"],
                "address": event["address"],
                "reserve_date": event["reserve_date"],
                "date": event["date"],
                "services": event["services"],
                "price": event["price"],
            })
        )

    async def postConsent(self, event):

        print("EVENT RECEIVED:", event)

        await self.send(
            text_data=json.dumps({
                "type": "get_Data_Consent",
                "name": event["name"],
                "age": event["age"],
                "phone": event["phone"],
                "file": event["file"],
                "address": event["address"],
                "date": event["date"],
                "services": event["services"],
                "price": event["price"],
                "explain": event["explain"],
                "id": event["id"],
            })
        )