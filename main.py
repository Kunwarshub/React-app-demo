from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI()

# User details (Replace with actual details)
USER_ID = "kunwar_abhey_01012000"  # Format: full_name_ddmmyyyy
EMAIL = "22bcs16256@cuchd.in"
ROLL_NUMBER = "22BCS16256"

# Request Body Model
class DataRequest(BaseModel):
    data: List[str]

# POST /bfhl - Process Data
@app.post("/bfhl")
def process_data(request: DataRequest):
    numbers = [x for x in request.data if x.isdigit()]
    alphabets = [x for x in request.data if x.isalpha()]
    highest_alphabet = [max(alphabets, key=lambda x: x.lower())] if alphabets else []
    
    response = {
        "is_success": True,
        "user_id": USER_ID,
        "email": EMAIL,
        "roll_number": ROLL_NUMBER,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highest_alphabet
    }
    return response

# GET /bfhl - Return operation_code
@app.get("/bfhl")
def get_operation_code():
    return {"operation_code": 1}

# Run the server (only for local testing)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
