import asyncpg


class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    async def _init_pool(self):
        if not hasattr(self, '_pool'):
            self._pool = await asyncpg.create_pool(
                user='myuser',
                password='mypassword',
                database='mydatabase',
                host='db',  # Docker service name as host
                port=5432,
                min_size=1,
                max_size=10  # Adjust pool size as needed
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