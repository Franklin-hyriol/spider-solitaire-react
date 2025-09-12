#include <stdint.h>
#include <emscripten/emscripten.h>

// -----------------------------
// Clé fixe utilisée pour le cryptage/décryptage
// C'est un simple caractère ici pour l'exemple (0x5A)
// -----------------------------
const char KEY = 0x5A; 

// -----------------------------
// Fonction exposée à JavaScript via EMSCRIPTEN_KEEPALIVE
// Elle prend en entrée :
//   - data : pointeur vers le tableau de caractères à crypter/décrypter
//   - length : nombre de caractères dans le tableau
// -----------------------------
EMSCRIPTEN_KEEPALIVE
void encrypt_decrypt(char* data, int length) {
    for (int i = 0; i < length; i++) {
        // XOR chaque caractère avec la clé
        // 1ère fois → cryptage
        // 2ème fois → décryptage (grâce à la propriété magique de XOR)
        data[i] ^= KEY;
    }
}
