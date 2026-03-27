from pydantic import BaseModel

class VehicleCreate(BaseModel):
    brand: str
    model: str
    price_per_hour: float
    price_per_day: float
