from pydantic import BaseModel
from typing import List

class DataPayload(BaseModel):
    data: List[str]

class DataJobStatus(BaseModel):
    job_id: str
    job_status: str
    job_progress: float