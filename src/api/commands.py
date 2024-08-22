
import click
from api.models import City, Speciality, State, db, User, Professional
import random

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            name = f"Test User {x}"
            email = "test_user" + str(x) + "@test.com"
            password = "12345678"
            
            new_user = User(name=name, email=email, password=password, is_active=True)

            db.session.add(new_user)
            db.session.commit()
            print("User: ", new_user.email, " created.")
        print("All test users created")

    @app.cli.command("insert-test-professionals")
    @click.argument("count")
    def insert_test_professionals(count):
        print("Creating test professionals")
        for x in range(1, int(count) + 1):
            first_name = "Test"
            last_name = "Professional" + str(x)
            email = "test_professional" + str(x) + "@test.com"
            password = "12345678"  
            
            new_professional = Professional(first_name=first_name, last_name=last_name, email=email, password=password, is_active=True)

            db.session.add(new_professional)
            db.session.commit()
            print("Professional: ", new_professional.email, " created.")

    @app.cli.command("insert-test-states")
    def insert_test_states():
        print("Creating test states")

        artigas = State(name="Artigas")
        bella_union = City(name="Bella Unión", state_id=artigas.id)
        artigas.cities.append(bella_union)
        las_piedras = City(name="Las Piedras", state_id=artigas.id)
        artigas.cities.append(las_piedras)
        tomass_gomensoro = City(name="Tomás Gomensoro", state_id=artigas.id)
        artigas.cities.append(tomass_gomensoro)
        piedra_pintada = City(name="Piedra Pintada", state_id=artigas.id)
        artigas.cities.append(piedra_pintada)
        la_azotea = City(name="La Azotea", state_id=artigas.id)
        artigas.cities.append(la_azotea)
        baltasar_brum = City(name="Baltasar Brum", state_id=artigas.id)
        artigas.cities.append(baltasar_brum)
        
        db.session.add(artigas)
        db.session.commit()

        canelones = State(name="Canelones")
        aguas_corrientes = City(name="Aguas Corrientes", state_id=canelones.id)
        canelones.cities.append(aguas_corrientes)
        atlantida = City(name="Atlántida", state_id=canelones.id)
        canelones.cities.append(atlantida)
        barra_de_carrasco = City(name="Barra de Carrasco", state_id=canelones.id)
        canelones.cities.append(barra_de_carrasco)
        barros_blancos = City(name="Barros Blancos", state_id=canelones.id)
        canelones.cities.append(barros_blancos)
        canelones_city = City(name="Canelones", state_id=canelones.id)
        canelones.cities.append(canelones_city)
        ciudad_de_la_costa = City(name="Ciudad de la Costa", state_id=canelones.id)
        canelones.cities.append(ciudad_de_la_costa)
        el_pinar = City(name="El Pinar", state_id=canelones.id)
        canelones.cities.append(el_pinar)
        la_floresta = City(name="La Floresta", state_id=canelones.id)
        canelones.cities.append(la_floresta)
        lagomar = City(name="Lagomar", state_id=canelones.id)
        canelones.cities.append(lagomar)
        
        db.session.add(canelones)
        db.session.commit()

        cerro_largo = State(name="Cerro Largo")
        acegua = City(name="Aceguá", state_id=cerro_largo.id)
        cerro_largo.cities.append(acegua)
        la_pedrera = City(name="La Pedrera", state_id=cerro_largo.id)
        cerro_largo.cities.append(la_pedrera)
        melo = City(name="Melo", state_id=cerro_largo.id)
        cerro_largo.cities.append(melo)
        quebracho = City(name="Quebracho", state_id=cerro_largo.id)
        cerro_largo.cities.append(quebracho)
        rio_branco = City(name="Río Branco", state_id=cerro_largo.id)
        cerro_largo.cities.append(rio_branco)
        sarandi = City(name="Sarandí", state_id=cerro_largo.id)
        cerro_largo.cities.append(sarandi)
        toledo = City(name="Toledo", state_id=cerro_largo.id)
        cerro_largo.cities.append(toledo)
        
        db.session.add(cerro_largo)
        db.session.commit()

        colonia = State(name="Colonia")
        carmelo = City(name="Carmelo", state_id=colonia.id)
        colonia.cities.append(carmelo)
        colonia_del_sacramento = City(name="Colonia del Sacramento", state_id=colonia.id)
        colonia.cities.append(colonia_del_sacramento)
        colonia_valdense = City(name="Colonia Valdense", state_id=colonia.id)
        colonia.cities.append(colonia_valdense)
        colonia_suiza = City(name="Colonia Suiza", state_id=colonia.id)
        colonia.cities.append(colonia_suiza)
        juan_lacaze = City(name="Juan Lacaze", state_id=colonia.id)
        colonia.cities.append(juan_lacaze)
        nueva_helvecia = City(name="Nueva Helvecia", state_id=colonia.id)
        colonia.cities.append(nueva_helvecia)
        nueva_palmira = City(name="Nueva Palmira", state_id=colonia.id)
        colonia.cities.append(nueva_palmira)
        ombues_de_lavalle = City(name="Ombúes de Lavalle", state_id=colonia.id)
        colonia.cities.append(ombues_de_lavalle)
        
        db.session.add(colonia)
        db.session.commit()
        
        durazno = State(name="Durazno")
        durazno_city = City(name="Durazno", state_id=durazno.id)
        durazno.cities.append(durazno_city)
        baygorria = City(name="Baygorria", state_id=durazno.id)
        durazno.cities.append(baygorria)
        el_chaco = City(name="El Chaco", state_id=durazno.id)
        durazno.cities.append(el_chaco)
        sarandi_del_yi = City(name="Sarandí del Yi", state_id=durazno.id)
        durazno.cities.append(sarandi_del_yi)
        sauce = City(name="Sauce", state_id=durazno.id)
        durazno.cities.append(sauce)
        
        db.session.add(durazno)
        db.session.commit()
        
        flores = State(name="Flores")
        trinidad = City(name="Trinidad", state_id=flores.id)
        flores.cities.append(trinidad)
        el_tala = City(name="El Tala", state_id=flores.id)
        flores.cities.append(el_tala)
        cerro_colorado = City(name="Cerro Colorado", state_id=flores.id)
        flores.cities.append(cerro_colorado)
        ismael_cortinas = City(name="Ismael Cortinas", state_id=flores.id)
        flores.cities.append(ismael_cortinas)
        la_casilla = City(name="La Casilla", state_id=flores.id)
        flores.cities.append(la_casilla)
        el_coronilla = City(name="El Coronilla", state_id=flores.id)
        flores.cities.append(el_coronilla)
        
        db.session.add(flores)
        db.session.commit()

        florida = State(name="Florida")
        casupa = City(name="Casupá", state_id=florida.id)
        florida.cities.append(casupa)
        capilla_del_sauce = City(name="Capilla del Sauce", state_id=florida.id)
        florida.cities.append(capilla_del_sauce)
        puntas_de_maciel = City(name="Puntas de Maciel", state_id=florida.id)
        florida.cities.append(puntas_de_maciel)
        
        db.session.add(florida)
        db.session.commit()

        lavalleja = State(name="Lavalleja")
        minas = City(name="Minas", state_id=lavalleja.id)
        lavalleja.cities.append(minas)
        mariscala = City(name="Mariscala", state_id=lavalleja.id)
        lavalleja.cities.append(mariscala)
        solis_de_mataojo = City(name="Solís de Mataojo", state_id=lavalleja.id)
        lavalleja.cities.append(solis_de_mataojo)
        villa_serrana = City(name="Villa Serrana", state_id=lavalleja.id)
        lavalleja.cities.append(villa_serrana)
        estacion_solis = City(name="Estación Solís", state_id=lavalleja.id)
        lavalleja.cities.append(estacion_solis)
        piraraja = City(name="Pirarajá", state_id=lavalleja.id)
        lavalleja.cities.append(piraraja)
        zapican = City(name="Zapicán", state_id=lavalleja.id)
        lavalleja.cities.append(zapican)
        jose_batlle_y_ordonez = City(name="José Batlle y Ordóñez", state_id=lavalleja.id)
        lavalleja.cities.append(jose_batlle_y_ordonez)
        jose_pedro_varela = City(name="José Pedro Varela", state_id=lavalleja.id)
        lavalleja.cities.append(jose_pedro_varela)
        villa_del_rosario = City(name="Villa del Rosario", state_id=lavalleja.id)
        lavalleja.cities.append(villa_del_rosario)
        
        db.session.add(lavalleja)
        db.session.commit()
        
        maldonado = State(name="Maldonado")
        maldonado_city = City(name="Maldonado", state_id=maldonado.id)
        maldonado.cities.append(maldonado_city)
        aigua = City(name="Aiguá", state_id=maldonado.id)
        maldonado.cities.append(aigua)
        garzon = City(name="Garzón", state_id=maldonado.id)
        maldonado.cities.append(garzon)
        jose_ignacio = City(name="José Ignacio", state_id=maldonado.id)
        maldonado.cities.append(jose_ignacio)
        la_barra = City(name="La Barra", state_id=maldonado.id)
        maldonado.cities.append(la_barra)
        punta_del_este = City(name="Punta del Este", state_id=maldonado.id)
        maldonado.cities.append(punta_del_este)
        san_carlos = City(name="San Carlos", state_id=maldonado.id)
        maldonado.cities.append(san_carlos)
        piriapolis = City(name="Piriápolis", state_id=maldonado.id)
        maldonado.cities.append(piriapolis)
        
        db.session.add(maldonado)
        db.session.commit()

        montevideo = State(name="Montevideo")
        piedras_blancas = City(name="Piedras Blancas", state_id=montevideo.id)
        montevideo.cities.append(piedras_blancas)
        pajas_blancas = City(name="Pajas Blancas", state_id=montevideo.id)
        montevideo.cities.append(pajas_blancas)
        santiago_vazquez = City(name="Santiago Vázquez", state_id=montevideo.id)
        montevideo.cities.append(santiago_vazquez)
        abayuba = City(name="Abayubá", state_id=montevideo.id)
        montevideo.cities.append(abayuba)
        montevideo_city = City(name="Montevideo", state_id=montevideo.id)
        montevideo.cities.append(montevideo_city)
        
        db.session.add(montevideo)
        db.session.commit()

        paysandu = State(name="Paysandú")
        
        
        db.session.add(paysandu)
        db.session.commit()

        rio_negro = State(name="Río Negro")
        db.session.add(rio_negro)
        db.session.commit()
        
        rivera = State(name="Rivera")
        db.session.add(rivera)
        db.session.commit()
        
        rocha = State(name="Rocha")
        db.session.add(rocha)
        db.session.commit()

        salto = State(name="Salto")
        db.session.add(salto)
        db.session.commit()

        san_jose = State(name="San José")
        db.session.add(san_jose)
        db.session.commit()

        soriano = State(name="Soriano")
        db.session.add(soriano)
        db.session.commit()
        
        tacuarembo = State(name="Tacuarembó")
        db.session.add(tacuarembo)
        db.session.commit()
        
        treinta_y_tres = State(name="Treinta y Tres")
        db.session.add(treinta_y_tres)
        db.session.commit()
        
        print("All states created")

    @app.cli.command("insert-test-specialities")
    def insert_test_specialities():
        psicologo = Speciality(name="Psicólogo")
        db.session.add(psicologo)
        db.session.commit()
        
        dermatologo = Speciality(name="Dermatólogo")
        db.session.add(dermatologo)
        db.session.commit()
        
        nutricionista = Speciality(name="Nutricionista")
        db.session.add(nutricionista)
        db.session.commit()
        
        odontologo = Speciality(name="Odontólogo")
        db.session.add(odontologo)
        db.session.commit()
        
        kinesiologo = Speciality(name="Kinesiólogo")
        db.session.add(kinesiologo)
        db.session.commit()
        
        fisioterapeuta = Speciality(name="Fisioterapeuta")
        db.session.add(fisioterapeuta)
        db.session.commit()
        print("All specialities created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        insert_test_users(5)
        insert_test_professionals(5)
        print("All test data created")