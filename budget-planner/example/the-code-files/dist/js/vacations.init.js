VTBudgetPlanner.init({
  selector: 'vtbuget',
  lan: 'en',
  stepsInfo: [
    {
      title: "What is your gross annual Income?",
      content: "A good rule of thumb to start your vacation budget is to see how much you should spend based on how much you make. So, enter your total gross annual income below. That’s the income you make as a household before taxes get taken out. This will give you a good starting point to determine how much you want to spend."
    },
    {
      title: "Pick a percentage that fits your goals",
      content: "On average, people spend about 3% of their annual gross income on domestic vacations and about 5% of international vacations. You may spend more or less, depending on the size of your household and the type of trip you want to take. Choose one of the options below to select the percentage of your income that you want to spend on this trip."
    },
    {
      title: "Decide what your budget needs to cover",
      content: "There are five basic types of expenses that your vacation budget needs to cover, plus miscellaneous costs. Use the sliders below to adjust your spending on each type of vacation expense. To increase the spending in one category, you will first need to decrease the spend in another. Your total budget remaining can never exceed the total budget you selected based on your income."
    },
    {
      title: "Divide Your Budget within Each Category",
      content: "Now that you’ve set spending targets for each type of vacation expense, it’s time to get specific about what that money needs to cover. Fill in notes for each type of expense with estimated costs. This will help you stay on budget and make sure you can cover all your vacation expenses without going into debt. If you realize you forgot something, hit Previous to go back and adjust your spending."
    },
    {
      title: "Here’s your vacation budget",
      content: "Congratulations on setting a budget for your vacation! This is the first step to ensuring you can minimize the amount of credit card debt you’ll take on when you travel. Ideally, you want to start saving up, so you can pay for all your vacation expenses in cash. Even if you make reservations with a credit card, try to pay off the charges as quickly as possible. Otherwise, your trip will be even more expensive with credit card interest charges added."
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
      title: "Transportation",
      subtitle: "Divide your transportation budget",
      content: "If you’re flying to your destination, then up to half of your vacation budget may go to plane tickets, especially for international flights. Also make sure to include costs for car rentals and mass transit. If you’re driving to your destination, include costs for gas and parking.",
      icon: "fal fa-plane",
      color: "#d4261d",
      darkercolor: "#821423",
      value: 50,
      limit: 50,
      moneyValue: 0,
      focusInput: 'transportation_0_amount',
      columns: ['Expenses'],
      rows: [
        {
          id: 0,
          td: ['Plane Tickets'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "accommodations",
      title: "Accommodations",
      subtitle: "Set your accomodation budget",
      content: "Most people spend about a quarter of their vacation budget on hotel reservations. You may have extra expenses if you plan on booking a cabana by the hotel pool or you want to take advantage of in-room or guest services.",
      icon: "fal fa-hotel",
      color: "#ffb90c",
      darkercolor: "#b78200",
      value: 25,
      limit: 25,
      moneyValue: 0,
      focusInput: 'accommodations_0_amount',
      columns: ['Accommodations'],
      rows: [
        {
          id: 0,
          td: ['Hotel Reservations'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "food",
      title: "Food",
      subtitle: "Plan your vacation food budget",
      content: "Meals can get expensive when you’re on vacation, so you need to plan for them. You also need to make sure that you cover all those incidental food costs, including snacks for any road trips, vending machine purchases (which are expensive in hotels) and room service.",
      icon: "fal fa-utensils",
      color: "#4ba545",
      darkercolor: "#025015",
      value: 15,
      limit: 15,
      moneyValue: 0,
      focusInput: 'food_0_amount',
      columns: ['Expenses'],
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
      id: "excursionsTours",
      title: "Excursions/Tours",
      subtitle: "Plan for excursions and tours",
      content: "Many of the activities you’ll want to do on your trip will need funds to cover them. Use travel guides to check out events and activities that you may want to enjoy while you’re there. Then record those costs here to make sure you can have all the fun you want without pulling out a credit card to cover it.",
      icon: "fal fa-shoe-prints",
      color: "#3ec0c9",
      darkercolor: "#037b84",
      value: 9,
      limit: 9,
      moneyValue: 0,
      focusInput: 'excursionsTours_0_amount',
      columns: ['Expenses'],
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
      title: "Souvenirs",
      subtitle: "Don’t forget about souvenirs!",
      content: "One expense that people often forget to include in their vacation budget is money for souvenirs. If you plan on buying gifts for family, friends, or coworkers, make sure to set a budget for those gift purchases.",
      icon: "fal fa-tshirt",
      color: "#0884bc",
      darkercolor: "#0d4e78",
      value: 1,
      limit: 1,
      moneyValue: 0,
      focusInput: 'souvenirs_0_amount',
      columns: ['Souvenirs'],
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
      title: "Misc.",
      subtitle: "Have another vacation expense you need to cover?",
      content: "If there’s another expense that you didn’t cover in the first five categories, list it here in your miscellaneous expenses. This will allow you to capture everything you need to cover your vacation.",
      icon: "fal fa-badge-dollar",
      color: "#df884d",
      darkercolor: "#96603b",
      value: 0,
      limit: 0,
      moneyValue: 0,
      focusInput: 'misc_0_amount',
      columns: ['Expenses'],
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