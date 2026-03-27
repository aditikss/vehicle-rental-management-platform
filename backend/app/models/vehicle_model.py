from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.db import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String)
    model = Column(String)
    price_per_hour = Column(Float)
    price_per_day = Column(Float)
    available = Column(Boolean, default=True)
