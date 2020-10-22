VTBudgetPlanner.init({
    selector: 'vtbuget',
    lan: 'es',
    stepsInfo: [
      {
        title: "¿Cuál es su ingreso anual bruto?",
        content: "Una buena regla general para comenzar su presupuesto de vacaciones es ver cuánto debe gastar en función de cuánto gana. Por lo tanto, ingrese su ingreso bruto anual total a continuación. Ese es el ingreso que usted gana como hogar antes de que se retiren los impuestos. Esto le dará un buen punto de partida para determinar cuánto quiere gastar."
      },
      {
        title: "Elija un porcentaje que se ajuste a sus metas",
        content: "En general, la mayoría de las personas gasta alrededor del 1.5% de su ingreso bruto anual en las vacaciones. Sin embargo, si tiene un presupuesto ajustado o si tiene pocas personas para comprar, es posible que desee gastar menos. Por otro lado, si tienes una gran familia inmediata y realmente te gusta hacerlo cada año, es posible que desees gastar más. Seleccione el porcentaje de sus ingresos que desea gastar en las vacaciones de este año."
      },
      {
        title: "Decida lo que su presupuesto necesita cubrir",
        content: "Hay seis tipos básicos de gastos que la mayoría de las personas deben cubrir durante las vacaciones. Sin embargo, no todos los presupuestos deben cubrirlos todos. Por ejemplo, es posible que no necesite viajar o que no esté hospedando o asistiendo a ninguna fiesta este año. Por lo tanto, el siguiente paso para establecer su plan de gastos de vacaciones es seleccionar todos los gastos que necesita cubrir. Según la cantidad de gastos que seleccione, el planificador de vacaciones le dirá aproximadamente la cantidad de dinero que debe asignar para cada gasto."
      },
      {
        title: "Divida su presupuesto a través de todas las categorías",
        content:"Ahora que ha establecido un límite de gasto para cada categoría, es hora de obtener información específica sobre lo que necesita comprar. Complete las notas para cada tipo de gasto con el costo estimado de los artículos que necesita comprar. Esto lo ayudará a mantenerse dentro del presupuesto y a la vez asegurarse de que pueda pagar todos los gastos que necesita cubrir este año. Si se da cuenta de que olvidó algo, presione el botón Anterior para regresar y ajustar sus gastos."
      },
      {
        title: "Totalice hasta ajustar su presupuesto",
        content: "Aquí hay una instantánea de todo lo que planea comprar y gastar dinero en esta temporada de vacaciones. Al ver todo lo que se presenta, es posible que desee o necesite regresar y hacer algunos cambios para equilibrar las cosas y alcanzar el objetivo de gasto que desea. Presiona los botones de edición en cada categoría a continuación para regresar y cambiar lo que escribiste inicialmente. Una vez que estés satisfecho. Puede guardar su planificador de vacaciones como un PDF o descargarlo para imprimirlo."
      }
    ],
    percentageList: [
      {
        id: 0,
        title: "0.5%",
        subtitle: "$0",
        selected: true
      },
      {
        id: 1,
        title: "1%",
        subtitle: "$0",
        selected: false
      },
      {
        id: 2,
        title: "1.5%",
        subtitle: "$0",
        selected: false
      },
      {
        id: 3,
        title: "2.0%",
        subtitle: "$0",
        selected: false
      }
    ],
    categories: [
      {
        id: "decorations",
        title: "Decoraciones",
        subtitle: "Divida su presupuesto de decoración",
        content: "Decorar puede brindarle una inmensa alegría durante los festejos, pero también es muy fácil dejarse llevar y sobrepasar su presupuesto. Seleccione todos los artículos que necesita comprar para desglosar su presupuesto de decoración. Si planea hacer decoraciones este año, también deberá asignar dinero para suministros de artesanía.",
        icon: "fal fa-tree",
        color: "#a01741",
        darkercolor: "#5f0e27",
        value: 10,
        limit: 10,
        moneyValue: 0,
        focusInput: 'decorations_0_amount',
        columns: ['Decoraciones'],
        rows: [
          {
            id: 0,
            td: ['Árbol de Navidad'],
            amount: 0
          },
          {
            id: 1,
            td: ['Adornos'],
            amount: 0
          },
          {
            id: 2,
            td: ['Luces'],
            amount: 0
          },
          {
            id: 3,
            td: ['Inflables / Adornos de Jardín'],
            amount: 0
          },
          {
            id: 4,
            td: ['Dirección de Interiores'],
            amount: 0
          },
          {
            id: 5,
            td: ['Suministros de artesanía'],
            amount: 0
          },
        ],
        tableHasRows: true,
        moneyBudget: 0,
      },
      {
        id: "travel",
        title: "Viajes",
        subtitle: "Establezca su presupuesto de viaje",
        content: "Si viaja durante las vacaciones, generalmente será uno de sus mayores gastos, junto con los regalos. Los billetes de avión y las reservas de hotel pueden consumir rápidamente todo lo que quiera gastar. Asegúrese de buscar formas de reducir los costos de viaje, como reservar con anticipación y encontrar tarifas aéreas con descuento.",
        icon: "fal fa-plane",
        color: "#be2241",
        darkercolor: "#560314",
        value: 30,
        limit: 30,
        moneyValue: 0,
        focusInput: 'travel_0_amount',
        columns: ['Gastos de Viajes'],
        rows: [
          {
            id: 0,
            td: ['Tickets de Avión'],
            amount: 0
          },
          {
            id: 1,
            td: ['Reservaciones de hoteles'],
            amount: 0
          },
          {
            id: 2,
            td: ['Renta de Carros'],
            amount: 0
          },
          {
            id: 3,
            td: ['Costos de Equipajes'],
            amount: 0
          },
          {
            id: 4,
            td: ['Combustible'],
            amount: 0
          },
        ],
        tableHasRows: true,
        moneyBudget: 0,
      },
      {
        id: "party",
        title: "Fiestas",
        subtitle: "Planifique su programación de las fiestas",
        content: "Ya sea que planee hospedar o simplemente asistir a fiestas, hay gastos que acompañan a las fiestas navideñas. Seleccione los tipos de gastos que cree que tendrá esta temporada de vacaciones y establezca un presupuesto de cuánto cree que costará cada evento.",
        icon: "fal fa-cocktail",
        color: "#e79c22",
        darkercolor: "#c57b03",
        value: 10,
        limit: 10,
        moneyValue: 0,
        focusInput: 'party_0_amount',
        columns: ['Gastos de Fiestas'],
        rows: [
          {
            id: 0,
            td: ['Suministros para fiestas'],
            amount: 0
          },
          {
            id: 1,
            td: ['Extensión de la fiesta'],
            amount: 0
          },
          {
            id: 2,
            td: ['Bebidas'],
            amount: 0
          },
          {
            id: 3,
            td: ['Juegos'],
            amount: 0
          },
          {
            id: 4,
            td: ['Regalos para invitados'],
            amount: 0
          },
          {
            id: 5,
            td: ['Transporte y parqueo'],
            amount: 0
          },
        ],
        tableHasRows: true,
        moneyBudget: 0,
      },
      {
        id: "food",
        title: "Comida",
        subtitle: "Comience a hacer su plan de comidas para las vacaciones",
        content: "Las comidas de los días festivos pueden ser caras si organiza una gran reunión familiar en su hogar. El primer paso para establecer un buen plan de comidas festivas es saber cuántas comidas necesita cubrir y cuánta comida preparará para cada una.",
        icon: "fal fa-utensils",
        color: "#4ba545",
        darkercolor: "#025015",
        value: 15,
        limit: 15,
        moneyValue: 0,
        focusInput: 'food_0_amount',
        columns: ['Título', '# de invitados', '# Entrantes'],
        rows: [
          {
            id: 0,
            td: ['Gastos de Cenas', '', ''],
            amount: 0
          },
          {
            id: 1,
            td: ['Brunch de Vacaciones', '', ''],
            amount: 0
          }
        ],
        tableHasRows: true,
        moneyBudget: 0,
      },
      {
        id: "gifts",
        title: "Regalos",
        subtitle: "Ahora es el momento de configurar su lista de regalos",
        content: "¡Ya casi terminas! Solo necesita configurar su lista de regalos y su planificador de vacaciones estará completo. Para la mayoría de las personas, los regalos serán su mayor gasto durante la temporada de vacaciones. Recomendamos solo dar regalos únicos a la familia inmediata y establecer un límite de precio. Para todos los demás, considera los regalos universales o compra artículos a granel para hacer cestas de regalo.",
        icon: "fal fa-gift",
        color: "#0e6e25",
        darkercolor: "#025015",
        value: 30,
        limit: 30,
        moneyValue: 0,
        focusInput: 'gifts_0_amount',
        columns: ['Nombre', 'Regalos'],
        rows: [
          {
            id: 0,
            td: ['', ''],
            amount: 0
          },
        ],
        tableHasRows: false,
        moneyBudget: 0,
      },
      {
        id: "donations",
        title: "Donaciones",
        subtitle: "Decidir sobre las donaciones de este año",
        content: "Si cree que los días festivos son un momento para retribuir, entonces debe planificar con anticipación todas las donaciones caritativas que desea hacer este año. Incluso si está dando artículos en lugar de efectivo, por lo general, todavía hay un costo involucrado. Las únicas donaciones que no debe incluir en esta lista son las donaciones que está haciendo en nombre de alguien como regalo.",
        icon: "fal fa-donate",
        color: "#0f5599",
        darkercolor: "#013363",
        value: 5,
        limit: 5,
        moneyValue: 0,
        focusInput: 'donations_0_amount',
        columns: ['Donar a'],
        rows: [
          {
            id: 0,
            td: ['Comida'],
            amount: 0
          },
          {
            id: 1,
            td: ['Juguetes'],
            amount: 0
          },
          {
            id: 2,
            td: ['Donaciones en Efectivo'],
            amount: 0
          },
        ],
        tableHasRows: true,
        moneyBudget: 0,
      },
  ]
});