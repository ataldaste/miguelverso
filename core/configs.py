from pydantic_settings import BaseSettings
from sqlalchemy.orm import declarative_base

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    DB_URL: str = "mysql+asyncmy://root:root@127.0.0.1:3306/miguelverso"

    class Config:
        case_sensitive = False
        env_file = ".env"


settings = Settings()


DBBaseModel = declarative_base()
