import random
from typing import List
from fastapi import APIRouter, status, Depends, HTTPException, Response, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from models.miguelverso_models import Miguelverso
from schemas.miguelverso_schema import MiguelversoSchema
from core.deps import get_session

router = APIRouter()

# POST - cria novo Miguel
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

# GET - lista todos
@router.get("/", response_model=List[MiguelversoSchema])
async def get_miguel(db: AsyncSession = Depends(get_session)):
    async with db as session:
        result = await session.execute(select(Miguelverso))
        miguels: List[Miguelverso] = result.scalars().all()
        return miguels

# PATCH - atualiza parcialmente
@router.patch("/{miguel_id}", response_model=MiguelversoSchema)
async def patch_miguel(miguel_id: int, miguel: MiguelversoSchema = Body(...), db: AsyncSession = Depends(get_session)):
    async with db as session:
        result = await session.execute(select(Miguelverso).where(Miguelverso.id == miguel_id))
        miguel_up = result.scalar_one_or_none()

        if not miguel_up:
            raise HTTPException(status_code=404, detail="Miguel não encontrado")

        for field, value in miguel.dict(exclude_unset=True).items():
            setattr(miguel_up, field, value)

        await session.commit()
        await session.refresh(miguel_up)
        return miguel_up

# DELETE - remove por ID
@router.delete("/{miguel_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_miguel(miguel_id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        result = await session.execute(select(Miguelverso).where(Miguelverso.id == miguel_id))
        miguel_del = result.scalar_one_or_none()

        if miguel_del:
            await session.delete(miguel_del)
            await session.commit()
            return Response(status_code=status.HTTP_204_NO_CONTENT)
        else:
            raise HTTPException(detail="Miguel não encontrado", status_code=status.HTTP_404_NOT_FOUND)

# GET - retorna um Miguel aleatório
@router.get("/random", response_model=MiguelversoSchema)
async def get_random_miguel(db: AsyncSession = Depends(get_session)):
    async with db as session:
        result = await session.execute(select(Miguelverso))
        miguels: List[Miguelverso] = result.scalars().all()

        if not miguels:
            raise HTTPException(status_code=404, detail="Nenhum Miguel encontrado")

        miguel_aleatorio = random.choice(miguels)
        return MiguelversoSchema.from_orm(miguel_aleatorio)

# GET - retorna um Miguel por ID
@router.get("/{miguel_id}", response_model=MiguelversoSchema)
async def get_miguel_by_id(miguel_id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        result = await session.execute(select(Miguelverso).where(Miguelverso.id == miguel_id))
        miguel = result.scalar_one_or_none()

        if not miguel:
            raise HTTPException(status_code=404, detail="Miguel não encontrado")

        return MiguelversoSchema.from_orm(miguel)