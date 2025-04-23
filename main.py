from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.configs import settings
from api.v1.api import api_router

app = FastAPI(title="miguelverso")

# centraliza as origins pra reaproveitar
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:5500",
    "http://localhost:5173",
]

# adiciona CORS com as origins centralizadas
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# rotas da API v1
app.include_router(api_router, prefix=settings.API_V1_STR)

# executa local se for chamado diretamente
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info", reload=True)
