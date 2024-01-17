from fastapi import APIRouter, BackgroundTasks
from models.data_models import DataPayload, DataJobStatus
import uuid
import time

router = APIRouter()

processed_results = {}
KEY_LIST_SIZE = 'list_size'
KEY_PROCESSED = 'processed_messages'

@router.post("/process-data")
async def process_data(payload: DataPayload, background_tasks: BackgroundTasks) -> str:
    # Access the received data using payload.data
    received_data = payload.data

    # Perform any processing logic here
    # ...

    # Return a response if needed
    result_id = str(uuid.uuid4())

    # Store the identifier and initiate background processing
    processed_results[result_id] = {
        KEY_LIST_SIZE:len(received_data),
        KEY_PROCESSED:[]
    }

    background_tasks.add_task(process_data_background, payload.data, result_id)

    # Return the result identifier to the client
    return result_id

@router.get('/get_result/{job_id}')
async def get_result(job_id: str) -> DataPayload:
    if job_id not in processed_results:
        print("Not processed")
        return DataPayload(data=[])
    if len(processed_results[job_id][KEY_PROCESSED]) < processed_results[job_id][KEY_LIST_SIZE]:
        print("Not finished")
        return DataPayload(data=[])
    payload = DataPayload(
        data=processed_results[job_id][KEY_PROCESSED])
    return payload

@router.get('/job-status/{job_id}')
async def get_status(job_id: str) -> DataJobStatus:
    if not job_id in processed_results:
        return DataJobStatus(job_id=job_id, job_status='Unrecognized', job_progress=0)
    else:
        job = processed_results[job_id]
        progress = len(job[KEY_PROCESSED])/job[KEY_LIST_SIZE]
        return DataJobStatus(job_id=job_id, job_status='In Progress', job_progress=progress)


def process_data_background(data, result_id):
    for item in data:
        processed_results[result_id][KEY_PROCESSED].append(item + "_processed")
        time.sleep(10)