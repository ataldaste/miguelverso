from fastapi import APIRouter

from api.v1.endpoints import miguelverso

api_router = APIRouter()

api_router.include_router(miguelverso.router, prefix="/miguelverso", tags=["Miguel"])
