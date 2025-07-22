import asyncpg
import os



class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    async def _init_pool(self):
        if not hasattr(self, '_pool'):
          self._pool = await asyncpg.create_pool(
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME'),
            host=os.getenv('DB_HOST'),
            port=int(os.getenv('DB_PORT', 5432)),  # valor por defecto si no está definida
            min_size=1,
            max_size=10
        )

    async def get_pool(self):
        if not hasattr(self, '_pool'):
            await self._init_pool()
        return self._pool

    async def execute(self, query, *args):
        pool = await self.get_pool()
        async with pool.acquire() as connection:
            return await connection.execute(query, *args)

    async def fetch(self, query, *args):
        pool = await self.get_pool()
        async with pool.acquire() as connection:
            return await connection.fetch(query, *args)
