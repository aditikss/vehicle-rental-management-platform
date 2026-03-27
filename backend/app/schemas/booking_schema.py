from pydantic import BaseModel

class BookingCreate(BaseModel):
    user_id: int
    vehicle_id: int
    hours: int
