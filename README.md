# Basic SetUp

  ## Setting Up the Project
  
  Clone the Project
  ```
git clone https://github.com/ShauryaSood2003/PayWay.git
```
  Install dependency

``` 
npm install
```

## Setting Up DB

Run the following command:

- if you have docker locally installed

```sh

docker  run  -e  POSTGRES_PASSWORD="mylittlepassword"  -d  -p  5432:5432  postgres

```
- if you don't have docker locally then you can use these database providers

	[Avion](https://www.avion.io/)
	[Neon](https://neon.tech/)
	
Migrate your Database and generate the client
```sh

cd .\packages\db\

npx prisma migrate dev --name Added_your_migration_name

npx prisma generate 

```

##  To Run the Project

Run the following cmd
``` 
npm run dev
```
- Your **User_Application** will run on port **3000**
- Your **Merchant_Application** will run on port **3001**

