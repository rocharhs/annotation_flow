from fastapi import APIRouter, HTTPException
from models.data_models import DataPayload

router = APIRouter()

@router.post("/process-data")
async def process_data(payload: DataPayload):
    # Access the received data using payload.data
    received_data = payload.data

    # Perform any processing logic here
    # ...

    # Return a response if needed
    return {"message": "Data received successfully"}