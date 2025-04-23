# Certifique-se que o MiguelversoSchema tenha os campos corretos e esteja validando os dados.
from pydantic import BaseModel

class MiguelversoSchema(BaseModel):
    id: int
    nome: str
    descricao: str
    foto: str  
    
    class Config:
        from_attributes = True
