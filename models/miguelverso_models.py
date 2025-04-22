from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

# Base do SQLAlchemy
Base = declarative_base()

class Miguelverso(Base):
    __tablename__ = 'miguelverso'  # Nome da tabela no banco de dados

    id = Column(Integer, primary_key=True, index=True)  # Definindo uma coluna 'id' como chave primária
    nome = Column(String(100), index=True)  # Coluna 'nome' com comprimento máximo de 100 caracteres
    descricao = Column(String(255))  # Coluna 'descricao' com comprimento máximo de 255 caracteres
    foto = Column(String(255))  # Coluna 'foto' com comprimento máximo de 255 caracteres
