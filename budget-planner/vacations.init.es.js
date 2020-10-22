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
      content: "En general, la mayoría de las personas gastan alrededor del 5% de sus ingresos brutos anuales en vacaciones. Sin embargo, si tiene un presupuesto ajustado o si tiene algunas personas por las cuales debe pagar, es posible que desee gastar menos. Por otro lado, si tiene grandes planes, como un compromiso, es posible que desee gastar más. Pero aun así deseará planificar en función de sus ingresos para asegurarse de no exagerar. Seleccione el porcentaje de sus ingresos que desea gastar en vacaciones este año."
    },
    {
      title: "Decida lo que su presupuesto necesita cubrir",
      content: "Hay cinco tipos básicos de gastos que puede necesitar cubrir en vacaciones. Entonces, el siguiente paso para establecer su plan para las vacaciones es seleccionar los distintos tipos de gastos. Para agregar un gasto, primero debe disminuir el porcentaje en uno de los dos gastos predeterminados. Su presupuesto total restante nunca puede exceder la cantidad total que establece como su objetivo de gasto."
    },
    {
      title: "Divida su presupuesto entre cada categoría",
      content: "Ahora que ha establecido los objetivos de gasto para cada tipo de gasto de vacaciones, es hora de obtener información específica sobre lo que ese dinero debe cubrir. Complete las notas para cada tipo de gasto con los costos estimados. Esto lo ayudará a mantenerse dentro del presupuesto y asegurará que pueda cubrir todos sus gastos de vacaciones sin endeudarse. Si se da cuenta de que olvidó algo, presione “Anterior” para regresar y ajustar sus gastos."
    },
    {
      title: "Aquí está su presupuesto de vacaciones",
      content: "¡Felicitaciones por establecer un presupuesto para sus vacaciones! Este es el primer paso para asegurarse de que puede minimizar la cantidad de deuda de tarjeta de crédito que asumirá cuando viaje. Idealmente, usted deseará comenzar a ahorrar para poder pagar todos sus gastos de vacaciones en efectivo. Incluso si hace reservaciones con una tarjeta de crédito, intente pagar los cargos lo más rápido posible. De lo contrario, su viaje será aún más costoso si se agregan cargos por intereses de tarjetas de crédito."
    }
  ],
  percentageList: [
    {
      id: 0,
      title: "1%",
      subtitle: "$0",
      selected: false
    },
    {
      id: 1,
      title: "3%",
      subtitle: "$0",
      selected: false
    },
    {
      id: 2,
      title: "5%",
      subtitle: "$0",
      selected: true
    },
    {
      id: 3,
      title: "7%",
      subtitle: "$0",
      selected: false
    }
  ],
  categories: [
    {
      id: "transportation",
      title: "Transporte",
      subtitle: "Divida su presupuesto de transporte",
      content: "Si va a volar a su destino, hasta la mitad de su presupuesto de vacaciones puede irse en boletos de avión, especialmente para vuelos internacionales. También asegúrese de incluir los costos de alquiler de automóviles y transporte público. Si está conduciendo a su destino, incluya los costos de gasolina y estacionamiento.",
      icon: "fal fa-plane",
      color: "#d4261d",
      darkercolor: "#821423",
      value: 50,
      limit: 50,
      moneyValue: 0,
      focusInput: 'transportation_0_amount',
      columns: ['Gastos'],
      rows: [
        {
          id: 0,
          td: ['Boleto de avión'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "accommodations",
      title: "Alojamiento",
      subtitle: "Establezca su presupuesto para alojamiento",
      content: "La mayoría de las personas gastan alrededor de un cuarto de su presupuesto de vacaciones en reservas de hotel. Es posible que tenga gastos adicionales si planea reservar una cabaña junto a la piscina del hotel o si desea aprovechar los servicios a la habitación o los servicios de huéspedes.",
      icon: "fal fa-hotel",
      color: "#ffb90c",
      darkercolor: "#b78200",
      value: 25,
      limit: 25,
      moneyValue: 0,
      focusInput: 'accommodations_0_amount',
      columns: ['Alojamiento'],
      rows: [
        {
          id: 0,
          td: ['Reservaciones de Hotel'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "food",
      title: "Comida",
      subtitle: "Planifique su presupuesto de comida de vacaciones",
      content: "Las comidas pueden ser caras cuando está de vacaciones, por lo que necesita planificarlas. También debe asegurarse de cubrir todos los costos ocasionales de los alimentos, incluidos los refrigerios para cualquier viaje por carretera, las compras en máquinas expendedoras (que son caras en hoteles) y el servicio de habitaciones.",
      icon: "fal fa-utensils",
      color: "#4ba545",
      darkercolor: "#025015",
      value: 15,
      limit: 15,
      moneyValue: 0,
      focusInput: 'food_0_amount',
      columns: ['Gastos'],
      rows: [
        {
          id: 0,
          td: ['Cenas'],
          amount: 0
        },
        {
          id: 1,
          td: ['Servicio de habitación'],
          amount: 0
        },
        {
          id: 2,
          td: ['Máquina expendedora'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "excursionsTours",
      title: "Excursiones",
      subtitle: "Plan de excursiones y paseos",
      content: "Muchas de las actividades que querrá hacer en su viaje necesitarán fondos para cubrirlas. Use las guías de viaje para ver los eventos y actividades que puede disfrutar mientras está allí. Luego registre esos costos aquí para asegurarse de que puede tener toda la diversión que desea sin tener que sacar una tarjeta de crédito para cubrirla.",
      icon: "fal fa-shoe-prints",
      color: "#3ec0c9",
      darkercolor: "#037b84",
      value: 9,
      limit: 9,
      moneyValue: 0,
      focusInput: 'excursionsTours_0_amount',
      columns: ['Gastos'],
      rows: [
        {
          id: 0,
          td: [''],
          amount: 0
        },
      ],
      tableHasRows: false,
      moneyBudget: 0,
    },
    {
      id: "souvenirs",
      title: "Recuerdos",
      subtitle: "¡No se olvide de los recuerdos!",
      content: "Un gasto que la gente a menudo olvida incluir en su presupuesto de vacaciones es el dinero para comprar recuerdos o suvenires. Si planea comprar regalos para familiares, amigos o compañeros de trabajo, asegúrese de establecer un presupuesto para esas compras de regalos.",
      icon: "fal fa-tshirt",
      color: "#0884bc",
      darkercolor: "#0d4e78",
      value: 1,
      limit: 1,
      moneyValue: 0,
      focusInput: 'souvenirs_0_amount',
      columns: ['Souvenirs / Recuerdos'],
      rows: [
        {
          id: 0,
          td: [''],
          amount: 0
        },
      ],
      tableHasRows: false,
      moneyBudget: 0,
    },
    {
      id: "misc",
      title: "Varios",
      subtitle: "¿Tiene otro gasto de vacaciones que necesita cubrir?",
      content: "Si hay otro gasto que no cubrió en las primeras cinco categorías, indíquelo aquí en sus gastos varios. Esto le permitirá capturar todo lo que necesita para cubrir sus vacaciones.",
      icon: "fal fa-badge-dollar",
      color: "#df884d",
      darkercolor: "#96603b",
      value: 0,
      limit: 0,
      moneyValue: 0,
      focusInput: 'misc_0_amount',
      columns: ['Gastos'],
      rows: [
        {
          id: 0,
          td: [''],
          amount: 0
        },
      ],
      tableHasRows: false,
      moneyBudget: 0,
    },
]
});