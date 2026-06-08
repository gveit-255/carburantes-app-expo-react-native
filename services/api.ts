const BASE_URL =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes";

async function fetchWithTimeout(url: string, timeout = 30000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function getEstacionesCCAA(idCCAA: string) {
  try {
    const url = `${BASE_URL}/PreciosCarburantes/EstacionesTerrestres/FiltroCCAA/${idCCAA}`;
    console.log(`Obteniendo estaciones de CCAA: ${idCCAA} desde ${url}`);

    const response = await fetchWithTimeout(url, 30000);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    console.log(`Respuesta recibida: ${text.length} caracteres`);

    const data = JSON.parse(text);
    console.log(
      `Datos parseados: ${JSON.stringify(data).substring(0, 200)}...`,
    );

    // Validar que la respuesta tenga datos
    if (!data || typeof data !== "object") {
      console.warn("Respuesta no es un objeto válido");
      return { ListaEESSPrecio: [] };
    }

    if (!Array.isArray(data.ListaEESSPrecio)) {
      console.warn(
        `ListaEESSPrecio no es un array. Tipo: ${typeof data.ListaEESSPrecio}`,
      );
      return { ListaEESSPrecio: [] };
    }

    console.log(`Estaciones encontradas: ${data.ListaEESSPrecio.length}`);
    return data;
  } catch (error) {
    const mensaje =
      error instanceof Error ? error.message : "Error desconocido";
    console.error(`Error en getEstacionesCCAA: ${mensaje}`);
    throw new Error(`Error obteniendo estaciones: ${mensaje}`);
  }
}

export async function getMaritimosProvincia(idProvincia: number) {
  const response = await fetch(
    `${BASE_URL}/PreciosCarburantes/PostesMaritimos/FiltroProvincia/${idProvincia}`,
  );

  if (!response.ok) {
    throw new Error("Error obteniendo postes marítimos");
  }

  return response.json();
}

export async function getPrecios(
  fecha: string,
  provincia: number,
  producto: number,
) {
  const response = await fetch(
    `${BASE_URL}/PreciosCarburantes/EstacionesTerrestresHist/FiltroProvinciaProducto/${fecha}/${provincia}/${producto}`,
  );

  if (!response.ok) {
    throw new Error("Error obteniendo precios");
  }

  return response.json();
}
export async function getComunidades() {
  const response = await fetch(
    `${BASE_URL}/PreciosCarburantes/Listados/ComunidadesAutonomas/`,
  );

  if (!response.ok) {
    throw new Error("Error obteniendo comunidades");
  }

  return response.json();
}
export async function getEstaciones() {
  const response = await fetch(
    `${BASE_URL}/PreciosCarburantes/EstacionesTerrestres/`,
  );

  if (!response.ok) {
    throw new Error("Error obteniendo estaciones");
  }

  return response.json();
}
