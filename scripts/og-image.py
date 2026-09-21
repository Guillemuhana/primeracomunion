"""Arma public/share.jpg, la imagen que se ve al compartir el link de la app.

WhatsApp, Instagram y Facebook piden 1200x630 apaisado; la tapa de la tarjeta
es vertical (700x1050), asi que si se la deja cruda la recortan al centro y se
pierde el titulo. Aca la tapa entra entera, como tarjeta apoyada a la
izquierda, y al lado van los datos del evento.

    python scripts/og-image.py

Las tipografias son las mismas que usa la pagina (Cormorant Garamond y
Nunito). Si no estan en scripts/fonts/ se bajan solas una vez.
"""

import os
import urllib.request

from PIL import Image, ImageDraw, ImageFilter, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FUENTES = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts')
TAPA = os.path.join(RAIZ, 'public', 'cover-boy.jpg')
LOGO = os.path.join(RAIZ, 'public', 'logo.png')
SALIDA = os.path.join(RAIZ, 'public', 'share.jpg')

# Variables de Google Fonts: un solo archivo por familia y el peso se elige
# despues con set_variation_by_axes.
FUENTES_URL = {
    'cormorant.ttf': 'https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf',
    'nunito.ttf': 'https://raw.githubusercontent.com/google/fonts/main/ofl/nunito/Nunito%5Bwght%5D.ttf',
}

W, H = 1200, 630

# La paleta del nene, la misma que pinta la tarjeta en la pagina.
BG_ALTO = (247, 251, 254)
BG_BAJO = (214, 233, 246)
INK = (35, 58, 72)
INK_SUAVE = (74, 101, 119)
AZUL = (61, 108, 143)
ORO = (201, 162, 75)
ORO_HONDO = (156, 122, 46)
CREMA = (255, 253, 248)


def fuente(archivo, tam, peso):
    ruta = os.path.join(FUENTES, archivo)
    if not os.path.exists(ruta):
        os.makedirs(FUENTES, exist_ok=True)
        urllib.request.urlretrieve(FUENTES_URL[archivo], ruta)
    f = ImageFont.truetype(ruta, tam)
    f.set_variation_by_axes([peso])
    return f


def ancho(draw, texto, font, espaciado=0):
    if not espaciado:
        return draw.textlength(texto, font=font)
    return sum(draw.textlength(c, font=font) for c in texto) + espaciado * (len(texto) - 1)


def escribir(draw, xy, texto, font, color, espaciado=0):
    """Igual que draw.text, pero con letter-spacing, que Pillow no trae."""
    x, y = xy
    if not espaciado:
        draw.text((x, y), texto, font=font, fill=color)
        return
    for c in texto:
        draw.text((x, y), c, font=font, fill=color)
        x += draw.textlength(c, font=font) + espaciado


def fondo():
    """Degrade vertical con un resplandor calido arriba, como el header."""
    img = Image.new('RGB', (W, H), BG_ALTO)
    px = img.load()
    for y in range(H):
        t = y / (H - 1)
        fila = tuple(round(BG_ALTO[i] + (BG_BAJO[i] - BG_ALTO[i]) * t) for i in range(3))
        for x in range(W):
            px[x, y] = fila

    brillo = Image.new('L', (W, H), 0)
    ImageDraw.Draw(brillo).ellipse([-200, -430, W + 200, 330], fill=120)
    brillo = brillo.filter(ImageFilter.GaussianBlur(150))
    img.paste(Image.new('RGB', (W, H), (255, 252, 240)), (0, 0), brillo)

    # Vineta apenas marcada, para que la tarjeta se despegue del fondo.
    vineta = Image.new('L', (W, H), 0)
    ImageDraw.Draw(vineta).ellipse([-260, -200, W + 260, H + 200], fill=255)
    vineta = vineta.filter(ImageFilter.GaussianBlur(180)).point(lambda v: 255 - v)
    img.paste(Image.new('RGB', (W, H), (120, 150, 172)), (0, 0), vineta.point(lambda v: v // 4))
    return img


def tarjeta(alto):
    """La tapa con esquinas redondeadas, filete dorado y sombra propia."""
    src = Image.open(TAPA).convert('RGB')
    ancho_t = round(alto * src.width / src.height)
    src = src.resize((ancho_t, alto), Image.LANCZOS)

    radio = 20
    mascara = Image.new('L', (ancho_t, alto), 0)
    ImageDraw.Draw(mascara).rounded_rectangle([0, 0, ancho_t - 1, alto - 1], radio, fill=255)

    carta = Image.new('RGBA', (ancho_t, alto))
    carta.paste(src, (0, 0))
    carta.putalpha(mascara)

    d = ImageDraw.Draw(carta)
    d.rounded_rectangle([0, 0, ancho_t - 1, alto - 1], radio, outline=(255, 255, 255, 210), width=3)
    d.rounded_rectangle([3, 3, ancho_t - 4, alto - 4], radio - 3, outline=ORO + (120,), width=1)
    return carta


def pegar_con_sombra(fondo_img, carta, pos):
    sombra = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    capa = Image.new('RGBA', carta.size, (20, 34, 48, 115))
    capa.putalpha(Image.eval(carta.split()[3], lambda v: v * 115 // 255))
    sombra.paste(capa, (pos[0] + 6, pos[1] + 22), capa)
    sombra = sombra.filter(ImageFilter.GaussianBlur(26))
    fondo_img.paste(Image.new('RGB', (W, H), (20, 34, 48)), (0, 0), sombra.split()[3])
    fondo_img.paste(carta.convert('RGB'), pos, carta)


def main():
    img = fondo()
    d = ImageDraw.Draw(img)

    # ---- Tapa a la izquierda ----
    alto_tapa = 522
    carta = tarjeta(alto_tapa)
    x_tapa, y_tapa = 68, (H - alto_tapa) // 2
    pegar_con_sombra(img, carta, (x_tapa, y_tapa))

    # ---- Columna de la derecha ----
    x = x_tapa + carta.width + 58
    disponible = W - x - 64

    f_ojo = fuente('nunito.ttf', 17, 800)
    f_titulo = fuente('cormorant.ttf', 86, 600)
    f_grado = fuente('cormorant.ttf', 34, 500)
    f_fecha = fuente('nunito.ttf', 25, 700)
    f_lugar = fuente('nunito.ttf', 21, 600)
    f_dir = fuente('nunito.ttf', 18, 400)
    f_pill = fuente('nunito.ttf', 20, 800)

    # Alto total del bloque, para centrarlo a ojo contra la tapa.
    alto_bloque = 52 + 16 + 22 + 20 + 92 + 6 + 40 + 24 + 14 + 22 + 34 + 30 + 26 + 30 + 52
    y = (H - alto_bloque) // 2

    logo = Image.open(LOGO).convert('RGBA')
    logo = logo.resize((52, round(52 * logo.height / logo.width)), Image.LANCZOS)
    img.paste(logo, (x, y), logo)
    y += logo.height + 16

    escribir(d, (x, y), 'INSTITUTO NUESTRA SEÑORA DE FÁTIMA', f_ojo, AZUL, espaciado=2.2)
    y += 22 + 20

    d.text((x, y), 'Primera Comunión', font=f_titulo, fill=INK)
    y += 92

    d.text((x, y), '5° Grado B', font=f_grado, fill=INK_SUAVE)
    y += 40 + 24

    # Filete dorado con un rombo al medio, como el de la tarjeta.
    d.line([x, y, x + 96, y], fill=ORO, width=2)
    d.regular_polygon((x + 112, y, 7), 4, rotation=0, fill=ORO)
    d.line([x + 128, y, x + 224, y], fill=ORO, width=2)
    y += 14 + 22

    d.text((x, y), 'Viernes 25 de septiembre de 2026 · 19:00 hs', font=f_fecha, fill=INK)
    y += 34

    d.text((x, y), 'Parroquia Nuestra Señora de Fátima y San Pío V', font=f_lugar, fill=INK_SUAVE)
    y += 30

    d.text((x, y), 'Rufino Varela Ortiz 2600 – B° Matienzo', font=f_dir, fill=INK_SUAVE)
    y += 26 + 30

    # ---- Chapita: lo que la app hace ----
    texto = 'Armá tu invitación en un minuto'
    pad_x, alto_pill = 26, 52
    ancho_pill = round(ancho(d, texto, f_pill)) + pad_x * 2
    d.rounded_rectangle([x, y, x + ancho_pill, y + alto_pill], alto_pill // 2, fill=ORO_HONDO)
    caja = d.textbbox((0, 0), texto, font=f_pill)
    d.text((x + pad_x, y + (alto_pill - (caja[3] - caja[1])) // 2 - caja[1]), texto, font=f_pill, fill=CREMA)

    assert ancho_pill <= disponible, 'la chapita se sale del ancho'
    img.save(SALIDA, 'JPEG', quality=92, optimize=True, progressive=True)
    print('listo:', SALIDA, img.size, os.path.getsize(SALIDA) // 1024, 'kB')


if __name__ == '__main__':
    main()
