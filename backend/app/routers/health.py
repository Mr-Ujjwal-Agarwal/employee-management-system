from fastapi import APIRouter
from app.config import APP_NAME, APP_VERSION

router = APIRouter(
    prefix="/health",
    tags=["Health"]
)


@router.get("/")
def health_check():
    return {
        "success": True,
        "application": APP_NAME,
        "version": APP_VERSION,
        "status": "healthy"
    }