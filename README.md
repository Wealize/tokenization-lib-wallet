# Tokenization library

Librería para aplicaciones web y movil que centraliza la lógica de:

1. Generación y parsing de QRs para Ciudadanos y Comercios.
2. Interacción con el contrato ERC20 "izToken"
3. Llamada al backend para procesar tickets.

## Configuración de Variables de Entorno

La librería necesita inicializar las variables de entorno una vez al inicio de la aplicación (antes de usar cualquier funcionalidad).

#### Método

```
initTokenizationLibEnvVars(newVars: Partial<{ BACK_END_URL: string; BLOCKCHAIN_RPC_URL: string; SMART_CONTRACT_ADDRESS: string }>): void
```

Este método debe llamarse una sola vez al iniciar la app (por ejemplo en el App.tsx de tu aplicación), y es necesario para que la librería tenga acceso al backend y blockchain. Esta función fusiona las variables proporcionadas con la configuración interna. Puedes llamarla varias veces, pero lo recomendable es hacerlo solo una vez al inicio.

```ts
import { initTokenizationLibEnvVars } from "tokenization-library";

initTokenizationLibEnvVars({
  BACK_END_URL: "https://api.example.com",
  SMART_CONTRACT_ADDRESS: "0x123456789abcdef",
  BLOCKCHAIN_RPC_URL: "https://rpc.sepolia.org",
});
```

## Funcionalidades

### 1. Generación y parsing de QRs para Ciudadanos y Comercios.

Generación de strings para posterior utilización en generación de QRs

#### Métodos

- generateCitizenQR(did: string) > Genera un QR para identificar a un ciudadano.

- generateMechantQR(merchantDID: string, citizenDID: string, CID: string) > Genera un QR para pagos de comerciantes. El CID sera utilizado posteriormente por el ciudadano para obtener el desglose del ticket.

- parseMerchOrCitizenQR(qr: string) > Util que parsea un QR generado por generateMechantQR() o generateCitizenQR() y valida su estructura. Para ciudadanos retorna el DID que viene en el QR y para comerciantes los datos originales enviados por parametro (merchantDID: string, citizenDID: string, CID: string)

### 2. Interacción con el contrato ERC20 "izToken"

Integra ethers.js para comunicarse con los typechains pre generados del contrato izToken.

#### Métodos

- getTokenBalance(address: string) > Obtiene el balance de tokens del usuario en formato legible
- getCitizenAidType(citizenAddress: string) > Retorna el tipo de beneficio asociado al usuario: 0 = NONE, 1 = STATIONERY, 2 = GROCERY.
- getMerchantName(merchantAddress: string) > Retorna el nombre de la tienda asociada a esa direccion.
- getPartyPermission(address: string) > Devuelve el rol actual del usuario: 0 = NONE, 1 = CITIZEN, 2 = MERCHANT.
- sendTokens(privateKey: string, toAddress: string, amount: number, eventData?: string) > Envía tokens a otra dirección con data opcional. Devuelve el hash de la transacción.
- burnTokens(privateKey: string, amount: number, eventData?: string) > Realiza un burn de tokens en el balance del usuario. Devuelve el hash de la transacción.

### 3. Llamada al backend para procesar tickets.

Envia tickets en formato File | Blob | RNFileType (Ver definicion de types) a la API de backend.

#### Método

- processTicketImage(aid_id: AidCodeType, imageFile: TicketProcessingFileType, authorization: string): Envía una imagen de un ticket al backend para procesar sus productos y calcular la ayuda económica.

#### Prametros de entrada

- aid_id (0 | 1 | 2 ) > Identificador del tipo de ayuda (1 = STATIONERY, 2 = GROCERY).
- imageFile (File | Blob | RNFileType) > Imagen en formato File, Blob o React Native { uri, name, type }.
- authorization (string) > String con credenciales (Bearer o Basic Auth).

#### Respuesta

La respuesta es un objeto con:

- payment_amount > importe total.

- aid_amount > importe subvencionado.

- aid_products > array de productos aplicables con su nombre y precio.

## Build

Para hacer build de la librería:

```bash
npm run build
```

## Testing

Para ejecutar los tests:

```bash
npm run test
```
