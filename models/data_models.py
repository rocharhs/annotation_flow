from pydantic import BaseModel
from typing import List

class DataPayload(BaseModel):
    data: List[str]