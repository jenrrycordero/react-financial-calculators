VTBudgetPlanner.init({
  selector: 'vtbuget',
  lan: 'en',
  stepsInfo: [
    {
      title: "What is your gross annual Income?",
      content: "A good rule of thumb to start your holiday budget is to see how much you should spend based on how much you make. So, enter your total gross annual income below. That’s the income you make as a household before taxes get taken out. This will give you a good starting point to determine how much you want to spend."
    },
    {
      title: "Pick a percentage that fits your goals",
      content: "In general, most people spend about 0.2% of their gross annual income on Valentine’s Day. However, if you’re on a tight budget or you have few people to buy for, then you may want to spend less. On the other hand, if you have a big big plans, such as an engagement, then you may want to spend more. But you still want to plan based on your income to help ensure you don’t go overboard. Select the percentage of your income that you want to spend on Valentine’s Day this year."
    },
    {
      title: "Decide what your budget needs to cover",
      content: "There are five basic types of expenses that you may need to cover on Valentine’s Day. However, most budgets only need to cover two – gifts and date night. So, the next step in setting your Valentine’s Day spending plan is to select the expenses you need to cover. To add an expense, you must first decrease percentage on one of the two default expenses. Your total budget remaining can never exceed the total amount you set as your spending target."
    },
    {
      title: "Divide your Budget through all the Categories",
      content:"Now that you've set a spending limit for each category, it's time to get specific about what you need to buy. Fill in notes for each type of expense with the estimated cost of the items you need to purchase. This will help you stay on budget and make sure that you can pay for all the expenses you need to cover this year. If you realize that you forgot something, hit the Previous button to go back and adjust your spending."
    },
    {
      title: "Total it up to tweak your budget",
      content: "Here’s a snapshot of everything you plan to buy and spend money on for Valentine’s Day. Seeing everything laid out, you may want or need to go back and make some changes to balance things out and hit the spending target you want. Hit the edit buttons on each category below to go back and change what you initially wrote down. Once you’re satisfied. You can save your Valentine’s Day spending planner as a PDF or download it to print it out."
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
      title: "Decorations",
      subtitle: "Divide your decorating budget",
      content: "Decorating can bring you immense joy around a holiday, but it’s also really easy to go overboard and over budget. Select all the items that you need to buy to breakdown your decorating budget. If you plan on making decorations this year, you’ll also need to allocate money for craft supplies.",
      icon: "fal fa-badge",
      color: "#c91e36",
      darkercolor: "#821423",
      value: 0,
      limit: 0,
      moneyValue: 0,
      focusInput: 'decorations_0_amount',
      columns: ['Decorations'],
      rows: [
        {
          id: 0,
          td: ['Inflatables / Yard Art'],
          amount: 0
        },
        {
          id: 1,
          td: ['Indoor Decorations'],
          amount: 0
        },
        {
          id: 2,
          td: ['Lights'],
          amount: 0
        },
        {
          id: 3,
          td: ['Roses and candles'],
          amount: 0
        },
        {
          id: 4,
          td: ['Craft Supplies'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "travel",
      title: "Travel",
      subtitle: "Set your travel budget",
      content: "If you travel for Valentine’s Day, it can be one of your biggest expenses, along with gifts. Airline tickets and hotel reservations can quickly eat-up your budget. Make sure to look for ways to cut travel costs, such as booking early and finding discount airfare.",
      icon: "fal fa-plane",
      color: "#af2b5b",
      darkercolor: "#7d1f41",
      value: 0,
      limit: 0,
      moneyValue: 0,
      focusInput: 'travel_0_amount',
      columns: ['Travel Expenses'],
      rows: [
        {
          id: 0,
          td: ['Airline Tickets'],
          amount: 0
        },
        {
          id: 1,
          td: ['Hotel Reservations'],
          amount: 0
        },
        {
          id: 2,
          td: ['Rental Car'],
          amount: 0
        },
        {
          id: 3,
          td: ['Baggage Costs'],
          amount: 0
        },
        {
          id: 4,
          td: ['Gas'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "party",
      title: "Party",
      subtitle: "Plan your party schedule",
      content: "Whether you plan on hosting or simply attending parties, there are expenses that go along with holiday parties. Select the types of expenses you think you’ll have for any Valentine’s Day celebrations and set a budget for how much you think each event will cost.",
      icon: "fal fa-cocktail",
      color: "#e84779",
      darkercolor: "#b3385e",
      value: 0,
      limit: 0,
      moneyValue: 0,
      focusInput: 'party_0_amount',
      columns: ['Party Expenses'],
      rows: [
        {
          id: 0,
          td: ['Party Supplies'],
          amount: 0
        },
        {
          id: 1,
          td: ['Party Spread'],
          amount: 0
        },
        {
          id: 2,
          td: ['Alcohol & Mixers'],
          amount: 0
        },
        {
          id: 3,
          td: ['Games'],
          amount: 0
        },
        {
          id: 4,
          td: ['Hosting Gifts'],
          amount: 0
        },
        {
          id: 5,
          td: ['Transportation / Valet'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "datenight",
      title: "Date Night",
      subtitle: "Make a plan for date night on Valentine’s Day",
      content: "Date night is usually one of people’s biggest expenses for Valentine’s Day. Whether you’re just going out to dinner, cooking at home or giving a whole experience, detail what you plan to do and how much each part of the date will cost.",
      icon: "fal fa-hand-holding-heart",
      color: "#ed3fb2",
      darkercolor: "#a02c79",
      value: 50,
      limit: 50,
      moneyValue: 0,
      focusInput: 'datenight_0_amount',
      columns: ['Title'],
      rows: [
        {
          id: 0,
          td: ['Dinner'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "gifts",
      title: "Gifts",
      subtitle: "Now it’s time to set your gift list",
      content: "You’re almost done! You just need to set up your gift list and your budget planner will be complete. For most people, gifts will be your biggest expense during the Valentine’s Day. We recommend only giving unique gifts to immediate family and your significant other and setting a price limit. For anyone else, consider universal presents, Valentine’s Day cards, or buy bulk items to make gift baskets.",
      icon: "fal fa-gift",
      color: "#aa2daa",
      darkercolor: "#711f71",
      value: 50,
      limit: 50,
      moneyValue: 0,
      focusInput: 'gifts_0_amount',
      columns: ['Name', 'Gift'],
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