# FINAL PROYECT / ECOMMERCE PS5 WEB STORE
## Backend Course/ Hugo Abraham Vasquez

### PARA ARRANCAR LA APLICACION:
- Una vez clonado el repositorio, corra el comando: npm install
- Quite la extension (.copy) de los archivos .env.copy  .env.development.copy y .env.production.copy 
- Ingrese la credenciales de goggle en archivo .env.development y .env.production 
- Para arrancar la aplicacion en modo development, corra el comando: npm run dev 
- Para arrancar la aplicacion en modo Production, corra el comando: npm run start 

## DEVELOPMENT MODE / MONGODB = testDB
### PREMIUM USER
#### Para agregar productos en Development Mode, use un premium user:
- USER= juan@g.com
- PASSWORD= 123
#### ADMIN CONTROLS / Para borrar productos y acceder al panel de administrador (USERS DATABASE) en Development Mode ingrese un admin user:
- USER= adminCoder@coder.com
- PASSWORD= adminCod3r123

## PRODUCTION MODE / MONGODB = productionDB
### PREMIUM USER
#### Para agregar productos en Production Mode use un premium user:
- USER= luna@g.com
- PASSWORD= 123
#### ADMIN CONTROLS / Para borrar productos y acceder al panel de administrador (USERS DATABASE) en Production Mode ingrese un admin user:
- USER= adminCoder@coder.com
- PASSWORD= adminCod3r123

### ADMIN PANEL 
#### desde un usario admin acceda a: 
- http://localhost:8080/api/users/admincontrol 

### DOCUMENTATION
#### Documentacion Swagger Products y Carts: 
- http://localhost:8080/api/docs/

### TEST
- Para correr cart.test y products.test primero cambie el puerto del archivo .env.development  a 8081 
- Corra en una terminal el comando npm run dev
- Abra una segunda terminal y corra el comando npm run test 