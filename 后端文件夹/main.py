from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from students_routes import router as students_router
from awards_routes import router as awards_router
from position_routes import router as position_router

app = FastAPI()

app.include_router(students_router)
app.include_router(awards_router)
app.include_router(position_router)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)