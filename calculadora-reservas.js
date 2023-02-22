function reservas(mesas_disponibles, reservas) {
  const mesas_ocupadas = [];

  // Ordenamos las reservas por tamaño
  reservas.sort((a, b) => b - a);

  for (let i = 0; i < reservas.length; i++) {
    let reserva = reservas[i];
    let mesa_encontrada = false;

    // Buscamos una mesa disponible que pueda acomodar la reserva
    for (let j = 0; j < mesas_disponibles.length; j++) {
      if (mesas_disponibles[j] >= reserva) {
        mesas_ocupadas.push(reserva);
        mesas_disponibles[j] -= reserva;
        mesa_encontrada = true;
        break;
      }
    }

    // Si no encontramos una mesa disponible, juntamos mesas para acomodar la reserva
    if (!mesa_encontrada) {
      let nuevas_mesas = 0;

      for (let k = 0; k < mesas_disponibles.length; k++) {
        if (mesas_disponibles[k] === 4) {
          nuevas_mesas += 1;
          mesas_disponibles[k] = 0;
        }
      }

      if (nuevas_mesas > 0) {
        mesas_ocupadas.push(reserva);
        mesas_disponibles.push(nuevas_mesas * 4 - reserva);
      } else {
        let mesas_grandes = Math.ceil(reserva / 6);
        mesas_ocupadas.push(reserva);
        mesas_disponibles.push(mesas_grandes * 6 - reserva);
      }
    }
  }

  return mesas_ocupadas;
}

// Ejemplo de uso
const mesas_disponibles = [6, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
const reservas = [8, 12, 4, 4, 5];

const mesas_ocupadas = reservas(mesas_disponibles, reservas);

console.log(mesas_ocupadas); // Output esperado: [8, 12, 4, 4, 5]
