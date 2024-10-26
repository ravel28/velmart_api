#### VELMART API ####

***
#### Requirement ####
- nodejs >= 21.x
- yarn >= 1.22.x

***
#### Setup Installation ####
1. Clone repository :
   ```bash
   $ git clone -b dev-ravel-28 https://github.com/ravel28/velmart_api.git
   ```
#### File Location ####
2. Go to project folder : 
   ```bash
   $ cd velmart-backend-nestjs
   ```

#### Install Application Depedency ####
3. Install all dependencies :
   ```bash
   $ yarn install
   ```

#### Running Database ####
4. Create prisma typeScript ORM :
   ```bash
   $ yarn prisma:generate:schema
   $ yarn prisma db push
   $ yarn prisma db seed
   ```

#### Running Application ####
5. Run the web server :
   ```bash
   $ yarn run start:dev
   ```

#### API Documentation ####
6. After running the web server, open this address in your client API : http://127.0.0.1:3000/api

***
#### Contributors ####
- Muhammad Reza Ravelinno 

### Contact Me ####
- ravelinno9@gmail.com