import os
import uuid
import email_validator
from typing import Optional, List
import motor as motor
from bson import ObjectId, json_util
from fastapi import Response, Body
from datetime import datetime, timedelta
import uvicorn
from fastapi import Depends, FastAPI, HTTPException, status, Header
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import JSONResponse
# from jose import JWTError, jwt
from jose import JWTError
import jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from motor import motor_asyncio
from password_strength import PasswordPolicy

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

policy = PasswordPolicy.from_names(
    length=8,  # min length: 8
    uppercase=1,  # need min. 2 uppercase letters
    numbers=1,  # need min. 2 digits
    special=1,  # need min. 2 special characters
)


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
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    disabled: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "bob",
                "email": "jdoe@example.com",
                "password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
                "disabled": "True",
            }
        }


class UpdateStudentModel(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]
    disabled: Optional[str]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "bob",
                "email": "jdoe@example.com",
                "password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
                "disabled": "True",
            }
        }



class BenchmarkTimesModel(BaseModel):
    category: str
    level: str
    distance: int
    time: int

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "category": "Jr 70kg Men",
                "level": "Development 12",
                "distance": "jdoe@example.com",
                "time": "",
            }
        }

class UpdateBenchmarkTimesModel(BaseModel):
    category: Optional[str]
    level: Optional[str]
    distance: Optional[int]
    time: Optional[int]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "category": "Jr 70kg Men",
                "level": "Development 12",
                "distance": 100,
                "time": 10,
            }
        }


class Userr():

    # constructor
    def __init__(self, username, password, email):
        self.user_id = str(uuid.uuid4())
        self.username = username
        self.password = password
        self.email = email

class UserProfile():

    def __init__(self, user_id, first_name, last_name, gender, date_of_birth, weight, height, club):
        self.user_id = user_id
        self.first_name = first_name
        self.last_name = last_name
        self.gender = gender
        self.date_of_birth = date_of_birth
        self.weight = weight
        self.height = height
        self.club = club



#register a new user
@app.post("/register", response_description="Register a new user")
async def register_user(username: str = Body(...), password: str = Body(...), email: str = Body(...)):
    await check_username(username)
    await check_email(email)
    await check_email_format(email)
    await check_password(password)
    hashed_password = pwd_context.hash(password)

    user = Userr(username, hashed_password, email)
    new_user = await db["users"].insert_one(user.__dict__)
    created_user = await db["users"].find_one({"_id": new_user.inserted_id})
    created_user["_id"] = str(created_user["_id"])
    return JSONResponse(status_code=status.HTTP_201_CREATED, content='User created successfully')

# list all users
@app.get("/users", response_description="List all users")
async def list_users():
    users = await db["users"].find().to_list(1000)
    for user in users:
        user["_id"] = str(user["_id"])
    return users

#get user_id of user
@app.get("/get_user/{username}", response_description="Get a single user")
async def show_user(username: str):
    if (await db["users"].find_one({"username": username})) is not None:
        user = await db["users"].find_one({"username": username})
        user["_id"] = str(user["_id"])
        return user
    raise HTTPException(status_code=404, detail=f"User {username} not found")

#  create user profile
@app.post("/create_profile", response_description="Create a new user profile")
async def create_profile(first_name: str = Body(...), last_name: str = Body(...), gender: str = Body(...),
                         date_of_birth: str = Body(...), height: int = Body(...), weight: int = Body(...),
                         club: str = Body(...), user_id: str = Body(...)):
    user = UserProfile(user_id, first_name, last_name, gender, date_of_birth, height, weight, club)
    new_user = await db["user_profile"].insert_one(user.__dict__)
    created_user = await db["user_profile"].find_one({"_id": new_user.inserted_id})
    created_user["_id"] = str(created_user["_id"])
    print(created_user)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content='User profile created successfully')

# check if username already exists in users collection
async def check_username(username: str):
    existing_user = await db["users"].find_one({"username": username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

# check if email already exists in users collection
async def check_email(email: str):
    existing_email = await db["users"].find_one({"email": email})
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")

# check if email is valid format
async def check_email_format(email: str):
    try:
        email_validator.validate_email(email)
    except email_validator.EmailNotValidError as e:
        raise HTTPException(status_code=400, detail="Invalid email format")

async def check_password(password: str):
    password_test = policy.test(password)
    if len(password_test) > 0:
        raise HTTPException(status_code=400, detail="Password does not meet requirements")



# get results when given age category and level
@app.get("/benchmarkTimes/{category}/{level}", response_description="Get results")
async def get_results(category: str, level: str):
    category_name = category.replace(" ", "")
    collection_name = category_name+"BenchmarkTimes"
    print(collection_name)
    students_data = await db[collection_name].find({"level": level}).to_list(1000)
    students = [BenchmarkTimesModel(**student) for student in students_data]

    if students:
        return students
    raise HTTPException(status_code=404, detail=f"{collection_name} not found")

# get benchmark times for an age category and weight class
@app.get("/benchmarkTimes/{category}", response_description="Get benchmark times")
async def get_benchmark_times(category: str):
    category_name = category.replace(" ", "")
    collection_name = category_name+"BenchmarkTimes"
    print(collection_name)
    students_data = await db[collection_name].find().to_list(1000)
    students = [BenchmarkTimesModel(**student) for student in students_data]

    if students:
        return students
    raise HTTPException(status_code=404, detail=f"{collection_name} not found")

# Get benchmark times for a specific category, level, and distance
@app.get("/benchmarkTimes/{category}/{level}/{distance}", response_description="Get benchmark times")
async def get_benchmark_times(category: str, level: str, distance: str):
    category_name = category.replace(" ", "")
    collection_name = category_name+"BenchmarkTimes"
    print(collection_name)
    students_data = await db[collection_name].find({"level": level, "distance": int(distance)}).to_list(1000)
    students = [BenchmarkTimesModel(**student) for student in students_data]

    if students:
        return students
    raise HTTPException(status_code=404, detail=f"{collection_name} not found")
@app.get("/deleteAllCollections", response_description="Delete all collections")
async def delete_all_collections():
    collections = await db.list_collection_names()
    for collection in collections:
        await db.drop_collection(collection)
    print("All collections deleted.")
@app.post("/deleteMenBenchmarkTimes", response_description="Delete benchmark times")
async def delete_benchmark_times():
    collection  = db["EliteHeavyweightMenBenchmarkTimes"]
    await collection.drop()
    return "Deleted"

@app.get("/getBenchmarkTimes", response_description="Get benchmark times")
async def get_benchmark_times():
    students_data = await db["Elite70KgWomenBenchmarkTimes"].find().to_list(1000)
    students = [BenchmarkTimesModel(**student) for student in students_data]
    return students

@app.post("/", response_description="Add new student", response_model=StudentModel)
async def create_student(student: StudentModel = Body(...)):
    student = jsonable_encoder(student)
    new_student = await db["students"].insert_one(student)
    created_student = await db["students"].find_one({"_id": new_student.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_student)

@app.get(
    "/", response_description="List all students", response_model=List[StudentModel]
)
async def list_students():
    students_data = await db["students"].find().to_list(1000)
    students = [StudentModel(**student) for student in students_data]
    return students

@app.get("/get/{student_name}", response_description="Get a single student")
async def show_student(student_name: str):
    if (student := await db["students"].find_one({"name": student_name})) is not None:
        # get the student password
        student_password = student["password"]
        await login_for_access_token(student_name, 'secret')
        return student_password


@app.post("/remove")
async def removeAllStudents():
    # iterate through all students and delete them
    students = await db["students"].find().to_list(1000)
    for student in students:
        await db["students"].delete_one({"_id": student["_id"]})
    return {"message": "All students removed"}


# to get a string like this run:
# openssl rand -hex 32
# SECRET_KEY = 'random_secret_key'
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

SECRET_KEY = "secret-key"
ALGORITHM = "HS256"


fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": 'False',
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": 'False',
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
        print(user_dict)
        return UserInDB(**user_dict)

# get user from users mongo collection
async def get_user_from_db(username: str):
    user = await db["users"].find_one({"username": username})
    print(user)
    if user:
        return UserInDB(**user)


#get id from token
def get_id_from_token(token):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])['sub']
    



def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


# def create_access_token(data: dict, expires_delta: timedelta | None = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

def create_access_token(data, expires_delta=None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload["sub"]['name']
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user_from_db(token_data.username)
    if user is None:
        raise credentials_exception
    return user


@app.get("/current_user")
async def get_cur_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload["sub"]['username']
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user_from_db(username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# get user with username from database
async def get_user_from_db(username: str):
    user = await db["users"].find_one({"username": username})
    user["_id"] = str(user["_id"])
    if user is None:
        return None
    return user

@app.post("/token", response_model=Token)
async def login_for_access_token(username: str = Body(..., embed=True), password: str = Body(..., embed=True)):
    user = await get_user_from_db(username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # check password
    if not verify_password(password, user.get('password')):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # generate token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user}, expires_delta=access_token_expires
    )

    check = verify_access_token(access_token)
    print('access', check)
    print(access_token)
    return {"access_token": access_token, "token_type": "bearer"}

# async def verify_access_token(token: str):
#     try:
#         print('tok', token)
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             return False
#         token_data = TokenData(username=username)
#     except JWTError as e:
#         print(e)
#         return False
#     user = get_user(fake_users_db, username=token_data.username)
#     if user is None:
#         return False
#     return True

def verify_access_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.exceptions.InvalidTokenError:
        return False
    return True

@app.post("/verify_user")
def verify_user(token: str = Body(None, embed=True)):
    if token is None or token == '':
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"message": "Invalid access token"},
        )
    check = verify_access_token(token)
    if check is False:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"message": "Invalid access token"},
        )
    return JSONResponse(status_code=status.HTTP_200_OK,
                        content={"message": "Access token verified"})


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
    tok = await verify_access_token(token)
    if not tok:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    print(token)
    current_user = await get_current_user(token)
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
