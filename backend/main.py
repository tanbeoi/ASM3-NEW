from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr, validator
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import os


# Import your ML model here
# from model import predict_delay

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#database setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'test.db')}" 
#print(f"Database path: {DATABASE_URL}") #debug database path
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

# Create tables
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        # Check if email already exists
        db_user = db.query(User).filter(User.email == user.email).first()
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        new_user = User(
            email=user.email,
            password=user.password
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"message": "User created successfully"}
    except Exception as e:
        print(f"Error creating user: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/signin")
def signin(user: UserLogin, db: Session = Depends(get_db)):
    try:
        print(f"Login attempt for email: {user.email}")  # Debug print
        
        # Query the database for the user
        db_user = db.query(User).filter(User.email == user.email).first()
        print(f"Found user in DB: {db_user}")  # Debug print
        print(f"DB password: {db_user.password if db_user else 'No user found'}")  # Debug print
        print(f"Provided password: {user.password}")  # Debug print
        
        # Check if user exists
        if not db_user:
            raise HTTPException(status_code=401, detail="User not found")
        
        # Check password
        if db_user.password != user.password:
            raise HTTPException(status_code=401, detail="Incorrect password")
        
        print("Login successful")  # Debug print
        return {"message": "Login successful"}
        
    except Exception as e:
        print(f"Login error: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))

# Add after your database setup
@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    try:
        # List all users in the database
        users = db.query(User).all()
        return {
            "message": "Database connection successful",
            "user_count": len(users),
            "users": [
                {
                    "id": user.id,
                    "email": user.email,
                    # Don't return passwords in production!
                    "password": user.password  
                } 
                for user in users
            ]
        }
    except Exception as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# Update your database URL to be more explicit
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'test.db')}"
print(f"Database path: {DATABASE_URL}")  # Debug print

# Make sure tables are created
try:
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully")
except Exception as e:
    print(f"Error creating tables: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)