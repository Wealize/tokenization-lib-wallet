# Tokenization library

Librería para aplicaciones web y movil que centraliza la lógica de:

1. Generación y parsing de QRs para Ciudadanos y Comercios.
2. Interacción con el contrato ERC20 "izToken"
3. Llamada al backend para procesar tickets.

## 1. Generación y parsing de QRs para Ciudadanos y Comercios.

### Funcionalidaes

Generación de strings para posterior utilización en generación de QRs

#### Métodos

- generateCitizenQR(did: string) > Genera un QR para identificar a un ciudadano.

- generateMechantQR(walletAddress: string, amount: string, concept: string) > Genera un QR para pagos de comerciantes.

- parseMerchantQR(qr: string) > Util que prsea un QR generado por generateMechantQR() y valida su estructura. Retorna: { walletAddress, amount, concept }.

## 2. Interacción con el contrato ERC20 "izToken"

### Funcionalidaes

Integra ethers.js para comunicarse con los typechains pre generados del contrato izToken.

#### Métodos

- getTokenBalance(address: string) > Obtiene el balance de tokens del usuario en formato legible
- getCitizenBenefitsType(address: string) > Retorna el tipo de beneficio asociado al usuario: 0 = NONE, 1 = STATIONERY, 2 = GROCERY.
- getPartyPermission(address: string) > Devuelve el rol actual del usuario: 0 = NONE, 1 = CITIZEN, 2 = MERCHANT.
- sendTokens(privateKey: string, toAddress: string, amount: number, eventData?: string) > Envía tokens a otra dirección con data opcional. Devuelve el hash de la transacción.
- burnTokens(privateKey: string, amount: number, eventData?: string) > Realiza un burn de tokens en el balance del usuario. Devuelve el hash de la transacción.

## 3. Llamada al backend para procesar tickets.

### Funcionalidaes

Envia tickets en formato File | Blob | RNFileType (Ver definicion de types) a la API de backend.

#### Método

- processTicketImage(aid_id: BenefitCodeTypeNum, imageFile: TicketProcessingFileType, authorization: string): Envía una imagen de un ticket al backend para procesar sus productos y calcular la ayuda económica.

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
