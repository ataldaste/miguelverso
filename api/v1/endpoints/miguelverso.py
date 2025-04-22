import random  # Importação do módulo random

from typing import List
from fastapi import APIRouter, status, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from models.miguelverso_models import Miguelverso
from schemas.miguelverso_schema import MiguelversoSchema  
from core.deps import get_session  

router = APIRouter()

# Endpoint para criar um novo "Miguel" POST METHOD
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=MiguelversoSchema)
async def post_miguel(miguel: MiguelversoSchema, db: AsyncSession = Depends(get_session)):
    novo_miguel = Miguelverso(
        nome=miguel.nome,
        descricao=miguel.descricao,
        foto=miguel.foto
    )
    db.add(novo_miguel)
    await db.commit() 
    await db.refresh(novo_miguel) 
    return novo_miguel

# Endpoint para listar todos os "Miguel" GET METHOD
@router.get("/", response_model=List[MiguelversoSchema])
async def get_miguel(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(Miguelverso)
        result = await session.execute(query)
        miguels: List[Miguelverso] = result.scalars().all()
        return miguels



# Endpoint para atualizar um "Miguel" pelo ID PUT METHOD
@router.put("/{miguel_id}", response_model=MiguelversoSchema, status_code=status.HTTP_202_ACCEPTED)
async def put_miguel(miguel_id: int, miguel: MiguelversoSchema, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(Miguelverso).filter(Miguelverso.id == miguel_id)
        result = await session.execute(query)
        miguel_up = result.scalar_one_or_none()

        if miguel_up:
            miguel_up.nome = miguel.nome
            miguel_up.descricao = miguel.descricao
            miguel_up.foto = miguel.foto

            await session.commit()  # Commit das alterações no banco
            await session.refresh(miguel_up)  # Garantir que a versão atualizada seja retornada
            return miguel_up
        else:
            raise HTTPException(detail="Miguel não encontrado", status_code=status.HTTP_404_NOT_FOUND)

# Endpoint para deletar um "Miguel" pelo ID DELETE METHOD
@router.delete("/{miguel_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_miguel(miguel_id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(Miguelverso).filter(Miguelverso.id == miguel_id)
        result = await session.execute(query)
        miguel_del = result.scalar_one_or_none()

        if miguel_del:
            await session.delete(miguel_del)
            await session.commit()  # Commit para deletar o "Miguel"
            return Response(status_code=status.HTTP_204_NO_CONTENT)
        else:
            raise HTTPException(detail="Miguel não encontrado", status_code=status.HTTP_404_NOT_FOUND)

# 🚨 REGISTRE ESTA PRIMEIRO!
@router.get("/random", response_model=MiguelversoSchema)
async def get_random_miguel(db: AsyncSession = Depends(get_session)):
    async with db as session:
        result = await session.execute(select(Miguelverso))
        miguels: List[Miguelverso] = result.scalars().all()

        if not miguels:
            raise HTTPException(status_code=404, detail="Nenhum Miguel encontrado")

        miguel_aleatorio = random.choice(miguels)
        return MiguelversoSchema.from_orm(miguel_aleatorio)

# ✅ DEPOIS, a rota dinâmica
@router.get("/{miguel_id}", response_model=MiguelversoSchema)
async def get_miguel_by_id(miguel_id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        result = await session.execute(
            select(Miguelverso).where(Miguelverso.id == miguel_id)
        )
        miguel = result.scalar_one_or_none()

        if not miguel:
            raise HTTPException(status_code=404, detail="Miguel não encontrado")

        return MiguelversoSchema.from_orm(miguel)