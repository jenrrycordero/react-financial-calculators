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
        content: "In general, most people spend about 1.5% of their gross annual income on the holidays. However, if you’re on a tight budget or you have few people to buy for, then you may want to spend less. On the other hand, if you have a big immediate family and you really like to do it up each year, then you may want to spend more. Select the percentage of your income that you want to spend on the holidays this year."
      },
      {
        title: "Decide what your budget needs to cover",
        content: "There are six basic types of expenses that most people need to cover during the holidays. However, not every budget needs to cover all of them. For instance, you may not need to travel or you might not be hosting or attending any parties this year. So, the next step in setting your holiday spending plan is to select all the expenses you need to cover. Based on how many expenses you select the holiday planner will tell you roughly how much money you should allocate for each expense."
      },
      {
        title: "Divide your Budget through all the Categories",
        content:"Now that you've set a spending limit for each category, it's time to get specific about what you need to buy. Fill in notes for each type of expense with the estimated cost of the items you need to purchase. This will help you make sure that you can cover all the expenses you need to cover this year, so you can stay on budget. If you realize that you forgot something, hit the Previous button to go back and adjust your spending."
      },
      {
        title: "Total it up to tweak your budget",
        content: "Here’s a snapshot of everything you plan to buy and spend money on this holiday season. Seeing everything laid out, you may want or need to go back and make some changes to balance things out and hit the spending target you want. Hit the edit buttons on each category below to go back and change what you initially wrote down. Once you’re satisfied. You can save your holiday planner as a PDF or download it to print it out."
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
        title: "Decorations",
        subtitle: "Divide your decorating budget",
        content: "Decorating can bring you immense joy during the holiday season, but it’s also really easy to go overboard and overbudget. Select all the items that you need to buy this year to deck the halls to break up your decorating budget. If you plan on making any decorations this year, you’ll also need to allocate money for craft supplies.",
        icon: "fal fa-tree",
        color: "#a01741",
        darkercolor: "#5f0e27",
        value: 10,
        limit: 10,
        moneyValue: 0,
        focusInput: 'decorations_0_amount',
        columns: ['Decorations'],
        rows: [
          {
            id: 0,
            td: ['Christmas Tree'],
            amount: 0
          },
          {
            id: 1,
            td: ['Ornaments'],
            amount: 0
          },
          {
            id: 2,
            td: ['Lights'],
            amount: 0
          },
          {
            id: 3,
            td: ['Inflatables / Yard Art'],
            amount: 0
          },
          {
            id: 4,
            td: ['Indoor Decorations'],
            amount: 0
          },
          {
            id: 5,
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
        content: "If you travel during the holidays, it will usually be one of your biggest expenses, along with gifts. Airline tickets and hotel reservations can quickly eat up everything you want to spend. Make sure to look for ways to cut travel costs, such as booking early and finding discount airfare.",
        icon: "fal fa-plane",
        color: "#be2241",
        darkercolor: "#560314",
        value: 30,
        limit: 30,
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
        content: "Whether you plan on hosting or simply attending parties, there are expenses that go along with holiday parties. Select the types of expenses you think you’ll have this holiday season and set a budget for how much you think each event will cost.",
        icon: "fal fa-cocktail",
        color: "#e79c22",
        darkercolor: "#c57b03",
        value: 10,
        limit: 10,
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
        id: "food",
        title: "Food",
        subtitle: "Start making your holiday meal plan",
        content: "Holiday meals can get expensive if you’re hosting a big family gathering at your home. The first step to setting a good holiday meal plan is to know how many meals you need to cover and how much food you’ll be making for each.",
        icon: "fal fa-utensils",
        color: "#4ba545",
        darkercolor: "#025015",
        value: 15,
        limit: 15,
        moneyValue: 0,
        focusInput: 'food_0_amount',
        columns: ['Title', '# of Guests', '# of Courses'],
        rows: [
          {
            id: 0,
            td: ['Holiday Dinner', '', ''],
            amount: 0
          },
          {
            id: 1,
            td: ['Holiday Brunch', '', ''],
            amount: 0
          }
        ],
        tableHasRows: true,
        moneyBudget: 0,
      },
      {
        id: "gifts",
        title: "Gifts",
        subtitle: "Now it’s time to set your gift list",
        content: "You’re almost done! You just need to set up your gift list and your holiday planner will be complete. For most people, gifts will be your biggest expense during the holiday season. We recommend only giving unique gifts to immediate family and setting a price limit. For everyone else, consider universal presents or buy bulk items to make gift baskets.",
        icon: "fal fa-gift",
        color: "#0e6e25",
        darkercolor: "#025015",
        value: 30,
        limit: 30,
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
      {
        id: "donations",
        title: "Donations",
        subtitle: "Decide on this year’s donations",
        content: "If you believe the holidays are a time for giving back, then you need to plan ahead for all the charitable donations you want to make this year. Even if you’re giving items instead of cash, there’s usually still a cost involved. The only donations you should not include on this list are donations that you’re making in someone’s name as a gift.",
        icon: "fal fa-donate",
        color: "#0f5599",
        darkercolor: "#013363",
        value: 5,
        limit: 5,
        moneyValue: 0,
        focusInput: 'donations_0_amount',
        columns: ['Donate to'],
        rows: [
          {
            id: 0,
            td: ['Food Drives'],
            amount: 0
          },
          {
            id: 1,
            td: ['Toy Drives'],
            amount: 0
          },
          {
            id: 2,
            td: ['Cash Donations'],
            amount: 0
          },
        ],
        tableHasRows: true,
        moneyBudget: 0,
      },
  ]
});