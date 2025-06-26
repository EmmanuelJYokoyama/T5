
#  WorldBeauty - ATIV 5

Como rodar o projeto:

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```
Na pasta src/ crie um arquivo .env e adicione a seguinte linha:
```bash
DATABASE_URL = "mysql://usuario:senha@wbdb"
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

---
