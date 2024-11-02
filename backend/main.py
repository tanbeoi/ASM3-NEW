from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import pandas as pd
from sklearn.linear_model import LinearRegression
import os

#Tan added
from fastapi.responses import FileResponse
from rain_data_analyze import generate_rain_visualizations
from flight_delay_analyze import generate_flight_delay_visualizations

app = FastAPI()

# Configure CORS
#Tan added
origins = [
    "http://localhost:3000",  # React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
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


@app.get("/database")
async def test_db(db: Session = Depends(get_db)):
    try:
        # List all users in the database
        users = db.query(User).all()
        print("Found users:", users)  # Debug print
        return {
            "message": "Database connection successful",
            "user_count": len(users),
            "users": [
                {
                    "id": user.id,
                    "email": user.email
                } 
                for user in users
            ]
        }
    except Exception as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# Update database URL after some bugs
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'test.db')}"
print(f"Database path: {DATABASE_URL}")  # Debug print

try:
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully")
except Exception as e:
    print(f"Error creating tables: {str(e)}")

try: #debug data loading
    
     csv_path = os.path.join(BASE_DIR, 'BITRE_MERGED_FLIGHT_DELAY.csv')
     df = pd.read_csv(csv_path)
     print("Data loaded successfully")
     print(f"Columns in dataset: {df.columns.tolist()}")
     print(f"First few rows:\n{df.head()}")
     
     # Convert columns to numeric
     df['Year'] = pd.to_numeric(df['Year'], errors='coerce')
     df['Departures On Time'] = pd.to_numeric(df['Departures On Time'], errors='coerce')
     df['Arrivals Delayed'] = pd.to_numeric(df['Arrivals Delayed'], errors='coerce')
     
     # Remove any rows with NaN values
     df = df.dropna()
     
     print(f"Data shape after cleaning: {df.shape}")
except Exception as e:
     print(f"Error loading/preparing data: {str(e)}")
     raise


class DelayPredictionInput(BaseModel):
    predict_year: int

@app.post("/predict_delay")
async def predict_delay(input_data: DelayPredictionInput):
    try:
        # Prepare historical data for training
        X = df[['Year', 'Departures On Time']].values  # Features
        y = df['Arrivals Delayed'].values  # Target

        # Train linear regression model
        model = LinearRegression()
        model.fit(X, y)

        # Get the latest departure_ontime value from historical data
        latest_departure = df['Departures On Time'].iloc[-1]  # Use the most recent value

        # Make prediction for the specified year
        prediction = model.predict([[input_data.predict_year, latest_departure]])[0]
        
        # Round to nearest whole number
        prediction = round(prediction)
        
        return {
            "prediction": prediction,
            "based_on_departures": latest_departure
        }
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))
    
    
# Ensure visualizations are generated when the server starts
def ensure_visualizations():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_dir = os.path.join(base_dir, 'cos30049', 'public', 'visualizations')
    required_files = [
        'box_plot.png', 'bar_plot.png', 'count_plot.png', 'bar_plot_day.png',
        'scatter_plot_delays_by_airline.png', 'line_plot_delays_over_years.png'
    ]
    
    if not all(os.path.exists(os.path.join(output_dir, file)) for file in required_files):
        generate_rain_visualizations()
        generate_flight_delay_visualizations()

ensure_visualizations()

@app.get("/visualizations/box_plot")
def get_box_plot():
    try:
        file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'cos30049', 'public', 'visualizations', 'box_plot.png')
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")
        return FileResponse(file_path)
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/visualizations/bar_plot")
def get_bar_plot():
    try:
        file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'cos30049', 'public', 'visualizations', 'bar_plot.png')
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")
        return FileResponse(file_path)
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/visualizations/count_plot")
def get_count_plot():
    try:
        file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'cos30049', 'public', 'visualizations', 'count_plot.png')
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")
        return FileResponse(file_path)
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/visualizations/bar_plot_day")
def get_bar_plot_day():
    try:
        file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'cos30049', 'public', 'visualizations', 'bar_plot_day.png')
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")
        return FileResponse(file_path)
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/visualizations/scatter_plot_delays_by_airline")
def get_scatter_plot_delays_by_airline():
    try:
        file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'cos30049', 'public', 'visualizations', 'scatter_plot_delays_by_airline.png')
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")
        return FileResponse(file_path)
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/visualizations/line_plot_delays_over_years")
def get_line_plot_delays_over_years():
    try:
        file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'cos30049', 'public', 'visualizations', 'line_plot_delays_over_years.png')
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")
        return FileResponse(file_path)
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)