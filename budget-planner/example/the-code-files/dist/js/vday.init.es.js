VTBudgetPlanner.init({
  selector: 'vtbuget',
  lan: 'es',
  stepsInfo: [
    {
      title: "¿Cuál es su ingreso anual bruto?",
      content: "Una buena regla general para establecer un plan de gastos de manera práctica, es ver cuánto debe gastar en función de lo que gana. Incluya su ingreso anual bruto total a continuación. Ese es su ingreso antes de impuestos. Esto le dará un buen punto de partida para determinar cuánto quiere gastar este año."
    },
    {
      title: "Elija un porcentaje que se ajuste a sus metas",
      content: "En general, la mayoría de las personas gastan alrededor del 0.2% de sus ingresos brutos anuales en el día de san Valentín. Sin embargo, si tiene un presupuesto ajustado, o si tiene pocas personas para quienes comprar, es posible que desee gastar menos. Por otro lado, si tiene grandes planes como un compromiso, es posible que desee gastar más. Pero, aun así, deseará planificar basándose en sus ingresos para asegurarse de no exagerar. Seleccione el porcentaje de sus ingresos que desea gastar en el día de san Valentín de este año."
    },
    {
      title: "Decida lo que su presupuesto necesita cubrir",
      content: "Es posible que deba cubrir cinco tipos de gastos básicos en el día de San Valentín. Sin embargo, la mayoría de los presupuestos solo tienen que cubrir dos eventos (obsequios y la noche de cita). Por lo tanto, el siguiente paso para configurar su plan de gastos del día de San Valentín es seleccionar aquellos que necesite cubrir. Para agregar un gasto, primero debe disminuir el porcentaje en uno de los dos gastos predeterminados. Su presupuesto total restante nunca puede exceder la cantidad total que haya establecido como su objetivo de gasto."
    },
    {
      title: "Divida su presupuesto a través de todas las categorías",
      content:"Ahora que ha establecido un límite de gasto para cada categoría, es hora de obtener información específica sobre lo que necesita comprar. Complete las notas para cada tipo de gasto con el costo estimado de los artículos que necesita comprar. Esto lo ayudará a mantenerse dentro del presupuesto y a la vez asegurarse de que pueda pagar todos los gastos que necesita cubrir este año. Si se da cuenta de que olvidó algo, presione el botón Anterior para regresar y ajustar sus gastos."
    },
    {
      title: "Totalice hasta ajustar su presupuesto",
      content: "Aquí está el total de todo lo que planea comprar y el dinero a gastar para el día de san Valentín. Al ver el resultado, es posible que desee o necesite regresar y hacer algunos cambios para equilibrar las cosas, de esta manera podrá alcanzar el objetivo de gasto que desea. Presione los botones de edición en cada categoría a continuación para regresar y cambiar lo que escribió inicialmente. Una vez que esté satisfecho, puede guardar su planificador de gastos del día de san Valentín como un PDF o descargarlo para imprimirlo."
    }
  ],
  percentageList: [
    {
      id: 0,
      title: "0.1%",
      subtitle: "$0",
      selected: false
    },
    {
      id: 1,
      title: "0.2%",
      subtitle: "$0",
      selected: true
    },
    {
      id: 2,
      title: "0.5%",
      subtitle: "$0",
      selected: false
    },
    {
      id: 3,
      title: "1.0%",
      subtitle: "$0",
      selected: false
    }
  ],
  categories: [
    {
      id: "decorations",
      title: "Decoraciones",
      subtitle: "Divida su presupuesto a través de todas las categorías",
      content: "Decorar puede brindarle una inmensa alegría durante los festejos, pero también es muy fácil dejarse llevar y sobrepasar su presupuesto. Seleccione todos los artículos que necesita comprar para desglosar su presupuesto de decoración. Si planea hacer decoraciones este año, también deberá asignar dinero para suministros de artesanía.",
      icon: "fal fa-badge",
      color: "#c91e36",
      darkercolor: "#821423",
      value: 0,
      limit: 0,
      moneyValue: 0,
      focusInput: 'decorations_0_amount',
      columns: ['Decoraciones'],
      rows: [
        {
          id: 0,
          td: ['Inflables / Adornos de Jardín'],
          amount: 0
        },
        {
          id: 1,
          td: ['Dirección de Interiores'],
          amount: 0
        },
        {
          id: 2,
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
      content: "Si viaja para el día de san Valentín, puede ser uno de sus mayores gastos junto con los regalos. Los boletos de avión y las reservas de hotel pueden consumir rápidamente su presupuesto. Asegúrese de buscar formas de reducir los costos de viaje como reservar con anticipación y encontrar boletos de avión con descuento.",
      icon: "fal fa-plane",
      color: "#af2b5b",
      darkercolor: "#7d1f41",
      value: 0,
      limit: 0,
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
      content: "Ya sea que planee hacer una recepción, o simplemente asistir a fiestas, hay gastos que acompañan a las actividades de los festejos. Seleccione los tipos de gastos que cree que tendrá para cualquier celebración del día de san Valentín (colaboraciones con comida o bebida) y establezca un presupuesto de cuánto cree que costará cada evento.",
      icon: "fal fa-cocktail",
      color: "#e84779",
      darkercolor: "#b3385e",
      value: 0,
      limit: 0,
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
          td: ['juegos'],
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
      id: "datenight",
      title: "Noche de Cita",
      subtitle: "Haga un plan para la noche del día de san Valentín",
      content: "La cita nocturna es generalmente uno de los mayores gastos que enfrenta la gente en el día de san Valentín. Ya sea que esté saliendo a cenar, cocinando en casa o efectuando una experiencia completa, detalle qué planea hacer y cuánto costará cada una de las partes que la componen.",
      icon: "fal fa-hand-holding-heart",
      color: "#ed3fb2",
      darkercolor: "#a02c79",
      value: 50,
      limit: 50,
      moneyValue: 0,
      focusInput: 'datenight_0_amount',
      columns: ['Título'],
      rows: [
        {
          id: 0,
          td: ['Cena'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "gifts",
      title: "Regalos",
      subtitle: "Ahora es el momento de configurar su lista de regalos",
      content: "¡Ya casi está terminando! Solo necesita configurar su lista de regalos, para que su planificador de presupuesto esté completo. Para la mayoría de las personas, los regalos serán su mayor gasto durante el día de san Valentín. Recomendamos solo obsequiar regalos únicos a la familia inmediata y a su pareja y, establecer a su vez, un límite de precio. Para cualquier otra persona, considere los regalos universales, como son las tarjetas del día de san Valentín, o bien comprando artículos al mayor para hacer cestas de regalo.",
      icon: "fal fa-gift",
      color: "#aa2daa",
      darkercolor: "#711f71",
      value: 50,
      limit: 50,
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
]
});