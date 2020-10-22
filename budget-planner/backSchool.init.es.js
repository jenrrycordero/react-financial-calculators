VTBudgetPlanner.init({
  selector: 'vtbuget',
  lan: 'es',
  stepsInfo: [
    {
      title: "¿Cuál es su ingreso bruto anual?",
      content: "Una buena regla general para comenzar a planificar su presupuesto de compras de regreso a clases es ver cuánto debe gastar en función a cuánto gana. Por lo tanto, introduzca su ingreso bruto anual total a continuación. Ese es el ingreso que usted gana como hogar antes de que los impuestos se eliminen de sus cheques de pago. Esto le dará un buen punto de partida para determinar cuánto quiere gastar."
    },
    {
      title: "Elija un porcentaje que se ajuste a sus metas",
      content: "En general, la mayoría de las personas gastan entre el 1 y el 2 por ciento de sus ingresos brutos anuales durante la temporada de compras de regreso a clases. Establecer el objetivo correcto depende de su presupuesto y de la lista de suministros que sus hijos necesiten. Revise la lista de útiles escolares de sus hijos y hable con sus hijos sobre lo que necesitan para este año. Luego, elija un porcentaje de sus ingresos que se ajuste a esa cantidad."
    },
    {
      title: "Decida lo que su presupuesto necesita cubrir",
      content: "Hay cuatro categorías básicas de gastos que normalmente necesita comprar durante la temporada de compras de regreso a clases. El mayor gasto suele ser la ropa y accesorios, seguido por los dispositivos electrónicos. Sin embargo, su gasto puede variar según lo que ya tenga y lo que sus hijos necesitan para este año. Para aumentar la cantidad que desea gastar en una categoría, primero deberá disminuir los gastos en otra. Su presupuesto total restante nunca puede exceder el monto total que estableció como un objetivo de gasto."
    },
    {
      title: "Divida su presupuesto en todas las categorías",
      content:"Ahora que ha establecido un límite de gasto para cada categoría, es hora de obtener información específica sobre lo que necesita comprar. Complete las categorías para cada tipo de gasto con el costo estimado de los artículos que necesita comprar. Esto le ayudará a mantenerse dentro del presupuesto y a asegurarse de que pueda pagar todos los gastos que necesita cubrir este año. Si se da cuenta de que olvidó algo y necesita aumentar el gasto total en una categoría, presione el botón “Anterior” para regresar y ajustar sus gastos."
    },
    {
      title: "Aquí está su presupuesto de regreso a clases",
      content: "¡Felicitaciones por establecer un presupuesto de regreso a clases! Esto lo ayudará a evitar gastos excesivos este año que pueden llevar a la deuda de tarjetas de crédito. Idealmente, querrá comenzar a ahorrar ahora para poder cubrir todos estos gastos en efectivo. Si usa una tarjeta de crédito porque desea ganar recompensas por sus compras, asegúrese de pagar los saldos rápidamente. De lo contrario, ¡los cargos por intereses compensarán rápidamente la devolución de efectivo o los puntos que gane!"
    }
  ],
  percentageList: [
    {
      id: 0,
      title: "0.5%",
      subtitle: "$0",
      selected: false
    },
    {
      id: 1,
      title: "1.0%",
      subtitle: "$0",
      selected: true
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
      id: "ca",
      title: "Ropa y accesorios",
      subtitle: "Establezca un presupuesto para ropa y accesorios",
      content: "El mayor gasto para el regreso a clases suele ser su presupuesto de ropa. Decida qué artículos necesita comprar ahora para el semestre. Si hay artículos que puede comprar más adelante en el semestre, como abrigos y ropa de invierno, eso puede ayudar a mantener bajo su presupuesto de compras de regreso a clases. También tenga en cuenta que los zapatos son una categoría separada, así que no los incluya aquí. Pero incluya otros accesorios como cinturones, alhajas y sombreros o accesorios para el cabello.",
      icon: "fal fa-tshirt",
      color: "#d4261d",
      darkercolor: "#821423",
      value: 35,
      limit: 35,
      moneyValue: 0,
      focusInput: 'ca_0_amount',
      columns: ['Artículos de ropa'],
      rows: [
        {
          id: 0,
          td: ['Camisas y blusas'],
          amount: 0
        },
        {
          id: 1,
          td: ['Jeans, shorts y pantalones'],
          amount: 0
        },
        {
          id: 2,
          td: ['Faldas y vestidos'],
          amount: 0
        },
        {
          id: 3,
          td: ['Abrigos'],
          amount: 0
        },
        {
          id: 4,
          td: ['Ropa interior'],
          amount: 0
        },
        {
          id: 5,
          td: ['Calcetines'],
          amount: 0
        },
        {
          id: 6,
          td: ['Accesorios'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "shoes",
      title: "Zapatos",
      subtitle: "Establezca un presupuesto de zapatos",
      content: "Los niños crecen constantemente, por lo que es muy probable que sus hijos necesiten zapatos para comenzar el año escolar. Asegúrese de incluir los zapatos que puedan necesitar para actividades deportivas, así como para eventos especiales.",
      icon: "fal fa-shoe-prints",
      color: "#ffb90c",
      darkercolor: "#b78200",
      value: 27,
      limit: 27,
      moneyValue: 0,
      focusInput: 'shoes_0_amount',
      columns: ['Zapatos'],
      rows: [
        {
          id: 0,
          td: ['Zapatos de diario'],
          amount: 0
        },
        {
          id: 1,
          td: ['Zapatos de vestir'],
          amount: 0
        },
        {
          id: 2,
          td: ['Zapatos deportivos'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "electronics",
      title: "Electrónicos",
      subtitle: "Planifique con anticipación las compras de dispositivos electrónicos",
      content: "Los dispositivos electrónicos suele ser el segundo gasto más grande para los padres durante la temporada de compras de regreso a clases. Para mantener este presupuesto bajo, solo compre los aparatos electrónicos que sus hijos realmente necesitan para la escuela, como las calculadoras o los dispositivos que necesitan para estudiar. El hecho de que sus hijos quieran el último teléfono inteligente (smartphones, en inglés) no significa que deba agregarlo a su presupuesto.",
      icon: "fal fa-laptop",
      color: "#4ba545",
      darkercolor: "#025015",
      value: 20,
      limit: 20,
      moneyValue: 0,
      focusInput: 'electronics_0_amount',
      columns: ['Dispositivos electrónicos'],
      rows: [
        {
          id: 0,
          td: ['Calculadoras'],
          amount: 0
        },
        {
          id: 1,
          td: ['Computadoras'],
          amount: 0
        },
        {
          id: 2,
          td: ['Tablets / smartphones'],
          amount: 0
        },
        {
          id: 3,
          td: ['Accesorios para la computadora o tablet'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "supplies",
      title: "Útiles escolares",
      subtitle: "Decida qué útiles escolares necesita",
      content: "Para establecer un presupuesto preciso para los útiles escolares, primero recopile todo el material que le ha sobrado del año escolar pasado. Luego revise la lista de útiles de la escuela, si la tiene a la mano. Esto ayudará a garantizar que no compre nuevos útiles escolares cuando aún tiene varios del año anterior.",
      icon: "fal fa-pencil-ruler",
      color: "#3ec0c9",
      darkercolor: "#037b84",
      value: 18,
      limit: 18,
      moneyValue: 0,
      focusInput: 'supplies_0_amount',
      columns: ['Útiles escolares'],
      rows: [
        {
          id: 0,
          td: ['Mochilas / bolsos'],
          amount: 0
        },
        {
          id: 1,
          td: ['Bolígrafos, lápices, borradores / goma de borrar'],
          amount: 0
        },
        {
          id: 2,
          td: ['Resaltadores, marcadores, crayones'],
          amount: 0
        },
        {
          id: 3,
          td: ['Tijeras'],
          amount: 0
        },
        {
          id: 4,
          td: ['Pegamento'],
          amount: 0
        },
        {
          id: 5,
          td: ['Bolsas / cajas de útiles'],
          amount: 0
        },
        {
          id: 6,
          td: ['Cuadernos / papel'],
          amount: 0
        },
        {
          id: 7,
          td: ['Carpetas / archivadores'],
          amount: 0
        },
        {
          id: 8,
          td: ['Hojas de notas'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "misc",
      title: "Varios",
      subtitle: "¿Tiene otro gasto para el regreso a clases que necesita cubrir?",
      content: "Si hay otro gasto que no cubrió en las primeras cuatro categorías, enumérelo aquí en gastos varios. Esto asegurará que pueda abarcar todo lo que necesita para cubrir las compras de regreso a las clases este año.",
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