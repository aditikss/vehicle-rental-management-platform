from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.schemas.booking_schema import BookingCreate
from app.models.booking_model import Booking
from app.models.vehicle_model import Vehicle
from app.services.pricing_service import calculate_price

router = APIRouter(prefix="/booking")

@router.post("/")
def book_vehicle(data: BookingCreate, db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == data.vehicle_id).first()

    cost = calculate_price(data.hours, vehicle.price_per_hour, vehicle.price_per_day)

    booking = Booking(
        user_id=data.user_id,
        vehicle_id=data.vehicle_id,
        total_cost=cost
    )

    db.add(booking)
    db.commit()

    return {"message": "Booked", "total_cost": cost}
