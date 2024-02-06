-- ************** creacio de tabla viajes **************

CREATE TABLE viajes (
  id SERIAL, 
  destino VARCHAR(50) NOT NULL, 
  presupuesto INT NOT NULL
);

-- ************** agrego las columnas faltantes para implementar marcas de tiempo **************

ALTER TABLE viajes ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE viajes ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();

-- ************** agrego trigger para la la columna update_at para mantener cuando se actualizo por ulitma vez el registro **************
CREATE FUNCTION update_updated_at_viajes()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_viajes_updated_at
    BEFORE UPDATE
    ON
        viajes
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_viajes();

-- ************** fin tabla viajes **************
-- ************** creacion de tabla viajes_equipamiento **************

CREATE TABLE equipamiento (
  id SERIAL, 
  nombre VARCHAR(50)
  );

-- ************** agrego las columnas faltantes para implementar marcas de tiempo **************

ALTER TABLE equipamiento ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE equipamiento ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();

-- ************** agrego trigger para la la columna update_at para mantener cuando se actualizo por ulitma vez el registro **************

CREATE FUNCTION update_updated_at_equipamiento()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_equipamiento_updated_at
    BEFORE UPDATE
    ON
        equipamiento
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_equipamiento();

-- ************** fin tabla viajes_equipamiento **************

-- ************** creacion de tabla usuarios **************

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL, 
    apellido VARCHAR(50) NOT NULL, 
    email VARCHAR(50) NOT NULL, 
    password VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ************** agrego trigger para la la columna update_at para mantener cuando se actualizo por ulitma vez el registro **************

CREATE FUNCTION update_updated_at_usuarios()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_usuarios_updated_at
    BEFORE UPDATE
    ON
        usuarios
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_usuarios();

-- ************** fin tabla usuarios **************