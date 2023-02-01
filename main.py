import os
import random
from typing import Optional, List
import motor as motor
from bson import ObjectId
from fastapi import Response, Body
from datetime import datetime, timedelta
import uvicorn
from fastapi import Depends, FastAPI, HTTPException, status, Header
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import JSONResponse
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from motor import motor_asyncio

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
]
client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
db = client.college

app = FastAPI(middleware=middleware)


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class StudentModel(BaseModel):
    # id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    # id: PyObjectId = Field(random.randint(0,10000))
    username: str = Field(...)
    full_name: str = Field(...)
    hashed_password: str = Field(...)
    disabled: bool = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "alice": {
                "username": "alice",
                "full_name": "Alice Wonderson",
                "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
                "disabled": False,
            }
        }


class UpdateStudentModel(BaseModel):
    username: Optional[str]
    full_name: Optional[str]
    hashed_password: Optional[str]
    disabled: Optional[bool]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "alice": {
                "username": "alice",
                "full_name": "Alice Wonderson",
                "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
                "disabled": False,
            }
        }


# @app.post("/", response_description="Add new student", response_model=StudentModel)
@app.post("/", response_description="Add new student")
async def create_student(student: StudentModel = Body(...)):
    print(student)
    student = jsonable_encoder(student)
    new_student = await db["students"].insert_one(student)
    created_student = await db["students"].find_one({"_id": new_student.inserted_id})
    # return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_student)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content='created_student')


@app.get(
    "/", response_description="List all students", response_model=List[StudentModel]
)
async def list_students():
    students = await db["students"].find().to_list(1000)
    print(students)
    return students


@app.post("/remove")
async def removeAllStudents():
    # iterate through all students and delete them
    students = await db["students"].find().to_list(1000)
    for student in students:
        await db["students"].delete_one({"_id": student["_id"]})
    return {"message": "All students removed"}


# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=4000)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    # username: str | None = None
    username: str


class User(BaseModel):
    username: str
    # email: str | None = None
    email: str
    # full_name: str | None = None
    full_name: str
    # disabled: bool | None = None
    disabled: bool


class UserInDB(User):
    hashed_password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


# def create_access_token(data: dict, expires_delta: timedelta | None = None):
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# async def get_current_user(token: str = Depends(oauth2_scheme)):
def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    print(current_user)
    return current_user


@app.post("/token", response_model=Token)
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
async def login_for_access_token(username: str = Body(..., embed=True), password: str = Body(..., embed=True)):
    user = authenticate_user(fake_users_db, username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return False
        token_data = TokenData(username=username)
    except JWTError:
        return False
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        return False
    return True


@app.post("/verify_user")
async def verify_user(token: str = Body(..., embed=True)):
    return verify_access_token(token)


@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


async def get_token(x_token: str = Header(None)):
    if x_token is None:
        raise HTTPException(status_code=400, detail="X-Token header missing")
    return x_token


@app.get("/users/me/items/")
# async def read_own_items(token: str = Body(..., embed=True)):
async def read_own_items(token: str = Depends(get_token)):
    if not verify_access_token(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    print(token)
    current_user = get_current_user(token)
    return [{"item_id": current_user.email, "owner": current_user.username}]


@app.post("/login")
def login(response: Response):
    print("okd")
    # response.headers['Content-Type'] = "application/json"
    return {"message": "ok"}


@app.get("/dashboard")
def dashboard(token: str = Depends(get_token)):
    if token is None:
        raise HTTPException(status_code=400, detail="User not found")
    current_user = get_current_user(token)
    return {"message": f"{current_user.username} signed in "}


class Item(BaseModel):
    # vcaraible that can be any type
    item: str


@app.post("/submit")
async def endpoint(param: str = Body(..., embed=True), param2: str = Body(..., embed=True)):
    # logic to process param here
    login_for_access_token(param, param2)
    return {"usr": param, "pwd": param2}
