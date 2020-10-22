VTBudgetPlanner.init({
  selector: 'vtDMPcalc',
  lan: 'en',
  stepsInfo: [
    {
      title: "What is your gross annual Income?",
      content: "A good rule of thumb to start your vacation budget is to see how much you should spend based on how much you make. So, enter your total gross annual income below. That’s the income you make as a household before taxes get taken out. This will give you a good starting point to determine how much you want to spend."
    },
    {
      title: "Pick a percentage that fits your goals",
      content: "In general, most people spend about 5% of their gross annual income on Vacations. However, if you’re on a tight budget or you have few people to buy for, then you may want to spend less. On the other hand, if you have a big big plans, such as an engagement, then you may want to spend more. But you still want to plan based on your income to help ensure you don’t go overboard. Select the percentage of your income that you want to spend on vacations this year."
    },
    {
      title: "Decide what your budget needs to cover",
      content: "There are five basic types of expenses that you may need to cover on Vacations. However, most budgets only need to cover two – gifts and date night. So, the next step in setting your Valentine’s Day spending plan is to select the expenses you need to cover. To add an expense, you must first decrease percentage on one of the two default expenses. Your total budget remaining can never exceed the total amount you set as your spending target."
    },
    {
      title: "Divide your Budget through all the Categories",
      content:"Now that you've set a spending limit for each category, it's time to get specific about what you need to buy. Fill in notes for each type of expense with the estimated cost of the items you need to purchase. This will help you stay on budget and make sure that you can pay for all the expenses you need to cover this year. If you realize that you forgot something, hit the Previous button to go back and adjust your spending."
    },
    {
      title: "Total it up to tweak your budget",
      content: "Here’s a snapshot of everything you plan to buy and spend money on for vacations. Seeing everything laid out, you may want or need to go back and make some changes to balance things out and hit the spending target you want. Hit the edit buttons on each category below to go back and change what you initially wrote down. Once you’re satisfied. You can save your Vacations spending planner as a PDF or download it to print it out."
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
      content: "Decorating can bring you immense joy around a holiday, but it’s also really easy to go overboard and over budget. Select all the items that you need to buy to breakdown your decorating budget. If you plan on making decorations this year, you’ll also need to allocate money for craft supplies.",
      icon: "fal fa-plane",
      color: "#d4261d",
      darkercolor: "#821423",
      value: 20,
      limit: 20,
      moneyValue: 0,
      focusInput: 'transportation_0_amount',
      columns: ['Title'],
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
      content: "If you travel for Valentine’s Day, it can be one of your biggest expenses, along with gifts. Airline tickets and hotel reservations can quickly eat-up your budget. Make sure to look for ways to cut travel costs, such as booking early and finding discount airfare.",
      icon: "fal fa-hotel",
      color: "#ffb90c",
      darkercolor: "#b78200",
      value: 20,
      limit: 20,
      moneyValue: 0,
      focusInput: 'accommodations_0_amount',
      columns: ['Accomodations'],
      rows: [
        {
          id: 0,
          td: ['Hotel/Cabanna'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "food",
      title: "Food",
      subtitle: "Start making your holiday meal plan",
      content: "Holiday meals can get expensive if you’re hosting a big family gathering at your home. The first step to setting a good holiday meal plan is to know how many meals you need to cover and how much food you’ll be making for each.",
      icon: "fal fa-utensils",
      color: "#4ba545",
      darkercolor: "#025015",
      value: 30,
      limit: 30,
      moneyValue: 0,
      focusInput: 'food_0_amount',
      columns: ['Title', '# of Guests', '# of Courses'],
      rows: [
        {
          id: 0,
          td: ['', '', ''],
          amount: 0
        },
      ],
      tableHasRows: false,
      moneyBudget: 0,
    },
    {
      id: "excursionsTours",
      title: "Excursions/Tours",
      subtitle: "Plan your Excursions and Tours",
      content: "Whether you plan on hosting or simply attending parties, there are expenses that go along with holiday parties. Select the types of expenses you think you’ll have for any Valentine’s Day celebrations and set a budget for how much you think each event will cost.",
      icon: "fal fa-shoe-prints",
      color: "#3ec0c9",
      darkercolor: "#037b84",
      value: 20,
      limit: 20,
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
      subtitle: "Take care of your expenses when buy the Souvenirs",
      content: "Date night is usually one of people’s biggest expenses for Valentine’s Day. Whether you’re just going out to dinner, cooking at home or giving a whole experience, detail what you plan to do and how much each part of the date will cost.",
      icon: "fal fa-tshirt",
      color: "#0884bc",
      darkercolor: "#0d4e78",
      value: 5,
      limit: 5,
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
      subtitle: "Now it’s time to set your Miscelaneas",
      content: "You’re almost done! You just need to set up your gift list and your budget planner will be complete. For most people, gifts will be your biggest expense during the Valentine’s Day. We recommend only giving unique gifts to immediate family and your significant other and setting a price limit. For anyone else, consider universal presents, Valentine’s Day cards, or buy bulk items to make gift baskets.",
      icon: "fal fa-badge-dollar",
      color: "#df884d",
      darkercolor: "#96603b",
      value: 5,
      limit: 5,
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