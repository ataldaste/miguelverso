from typing import Optional
from pydantic import BaseModel as SCBaseModel

class MiguelversoSchema(SCBaseModel):
     
     id: Optional[int] = None
     nome: str      
     descricao: str
     foto: str 
     
     class Config:
         from_attributes = True
