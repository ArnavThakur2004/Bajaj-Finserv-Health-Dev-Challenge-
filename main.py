from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Union

app = FastAPI()

class DataInput(BaseModel):
    data: List[Union[str, int]]

@app.post("/bfhl")
def process_data(request: DataInput):
    user_id = "john_doe_17091999"
    email = "john@xyz.com"
    roll_number = "ABCD123"

    numbers = []
    alphabets = []
    
    for item in request.data:
        str_item = str(item)
        if str_item.isdigit():
            numbers.append(str_item)
        elif str_item.isalpha():
            alphabets.append(str_item.upper())

    highest_alphabet = [max(alphabets)] if alphabets else []

    return {
        "is_success": True,
        "user_id": user_id,
        "email": email,
        "roll_number": roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highest_alphabet
    }

@app.get("/bfhl")
def get_operation_code():
    return {"operation_code": 1}
