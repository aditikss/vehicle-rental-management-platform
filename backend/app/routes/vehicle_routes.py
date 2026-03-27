from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.vehicle_model import Vehicle
from app.schemas.vehicle_schema import VehicleCreate

router = APIRouter(prefix="/vehicles")

@router.post("/")
def add_vehicle(vehicle: VehicleCreate, db: Session = Depends(get_db)):
    new_vehicle = Vehicle(**vehicle.dict())

    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)

    return {"message": "Vehicle added"}


@router.get("/")
def get_vehicles(db: Session = Depends(get_db)):
    vehicles = db.query(Vehicle).all()
    return vehicles
