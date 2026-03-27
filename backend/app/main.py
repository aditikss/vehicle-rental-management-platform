from fastapi import FastAPI
from app.database.db import Base, engine

from app.routes import auth_routes, vehicle_routes, booking_routes

# create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_routes.router)
app.include_router(vehicle_routes.router)
app.include_router(booking_routes.router)

@app.get("/")
def home():
    return {"message": "Backend Running 🚀"}
