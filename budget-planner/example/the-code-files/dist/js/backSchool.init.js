VTBudgetPlanner.init({
  selector: 'vtbuget',
  lan: 'en',
  stepsInfo: [
    {
      title: "What is your gross annual income?",
      content: "A good rule of thumb to start planning your back to school shopping budget is to see how much you should spend based on how much you make. So, please enter your total gross annual income below. That’s the income you make as a household before taxes get taken out of your paychecks. This will give you a good starting point to determine how much you want to spend."
    },
    {
      title: "Pick a percentage that fits your goals",
      content: "In general, most people spend between 1-2 percent of their gross annual income during the back to school shopping season. Setting the right target depends on your budget and the list of supplies your children need. Review your children’s school supply list and talk to your kids about what they need for this year. Then choose a percentage of your income that will fit that amount."
    },
    {
      title: "Decide what your budget needs to cover",
      content: "There are four basic categories of expenses that you typically need to buy during the back to school shopping season. The biggest expense is usually clothing and accessories, following by electronics. However, your spending may vary based on what you already have and what your children need for this year. To increase the amount you want to spend in one category, you will first need to decrease the spending in another. Your total budget remaining can never exceed to the total amount you set as a spending target."
    },
    {
      title: "Divide your budget through all the categories",
      content:"Now that you’ve set a spending limit for each category, it’s time to get specific about what you need to buy. Fill in notes for each type of expense with the estimated cost of the items you need to purchase. This will help you stay on budget and make sure that you can pay for all the expenses you need to cover this year. If you realize that you forgot something and need to increase the total spending in a category, hit the Previous button to go back and adjust your spending."
    },
    {
      title: "Here’s your back to school budget",
      content: "Congratulations on setting a back to school budget! This will help you avoid overspending this year that can lead to credit card debt. Ideally, you want to start saving up now so you can cover all of these expenses in cash. If you use a credit card because you want to earn rewards on your purchases, make sure to pay off the balances quickly. Otherwise, interest charges will quickly offset the cash back or points that you earn!"
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
      title: "1.0%",
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
      id: "ca",
      title: "Clothing & accessories",
      subtitle: "Set a budget for clothing and accessories",
      content: "The biggest expense for back to school is usually your clothing budget. Decide what items you need to buy now for the fall semester. If there are items that you can buy later in the semester, such as coats and winter clothing, that can help keep your back to school shopping budget low. Also note that shoes is a separate category, so don’t include those here. But include other accessories such as belts, jewelry and hats or hair accessories.",
      icon: "fal fa-tshirt",
      color: "#d4261d",
      darkercolor: "#821423",
      value: 35,
      limit: 35,
      moneyValue: 0,
      focusInput: 'ca_0_amount',
      columns: ['Clothing Item'],
      rows: [
        {
          id: 0,
          td: ['Shirts and blouses'],
          amount: 0
        },
        {
          id: 1,
          td: ['Jeans, shorts and pants'],
          amount: 0
        },
        {
          id: 2,
          td: ['Skirts and dresses'],
          amount: 0
        },
        {
          id: 3,
          td: ['Coats'],
          amount: 0
        },
        {
          id: 4,
          td: ['Undergarments'],
          amount: 0
        },
        {
          id: 5,
          td: ['Socks'],
          amount: 0
        },
        {
          id: 6,
          td: ['Accessories'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "shoes",
      title: "Shoes",
      subtitle: "Set a shoe budget",
      content: "Kids are constantly growing, so there’s a good chance your kids will need shoes to start the school year. Make sure to include shoes they may need for athletic activities, as well as special events.",
      icon: "fal fa-shoe-prints",
      color: "#ffb90c",
      darkercolor: "#b78200",
      value: 27,
      limit: 27,
      moneyValue: 0,
      focusInput: 'shoes_0_amount',
      columns: ['Shoes'],
      rows: [
        {
          id: 0,
          td: ['Everyday shoes'],
          amount: 0
        },
        {
          id: 1,
          td: ['Dress shoes'],
          amount: 0
        },
        {
          id: 2,
          td: ['Athletic shoes'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "electronics",
      title: "Electronics",
      subtitle: "Plan ahead for electronic purchases",
      content: "Electronics are usually the second biggest expense for parents during the back to school shopping season. To keep this budget low, only buy electronics that your children actually need for school, such as calculators or devices they need for studying. Just because your children may want the latest smartphone, it doesn’t mean you need to add that into your budget!",
      icon: "fal fa-phone-laptop",
      color: "#4ba545",
      darkercolor: "#025015",
      value: 20,
      limit: 20,
      moneyValue: 0,
      focusInput: 'electronics_0_amount',
      columns: ['Electronic device'],
      rows: [
        {
          id: 0,
          td: ['Calculators'],
          amount: 0
        },
        {
          id: 1,
          td: ['Computers'],
          amount: 0
        },
        {
          id: 2,
          td: ['Tablets / smartphones'],
          amount: 0
        },
        {
          id: 3,
          td: ['Computer accessories'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "supplies",
      title: "School supplies",
      subtitle: "Decide what school supplies you need",
      content: "To set an accurate budget for school supplies, first take stock of what you have leftover from last year. Then review the supply list from the school if it was provided. This will help ensure that you don’t purchase new supplies when you still have leftovers.",
      icon: "fal fa-pencil-ruler",
      color: "#3ec0c9",
      darkercolor: "#037b84",
      value: 18,
      limit: 18,
      moneyValue: 0,
      focusInput: 'supplies_0_amount',
      columns: ['Title'],
      rows: [
        {
          id: 0,
          td: ['Backpacks / bookbags'],
          amount: 0
        },
        {
          id: 1,
          td: ['Pens, pencils, erasers'],
          amount: 0
        },
        {
          id: 2,
          td: ['Highlighters, markers, crayons'],
          amount: 0
        },
        {
          id: 3,
          td: ['Scissors'],
          amount: 0
        },
        {
          id: 4,
          td: ['Glue'],
          amount: 0
        },
        {
          id: 5,
          td: ['Pouches / supply boxes'],
          amount: 0
        },
        {
          id: 6,
          td: ['Notebooks / paper'],
          amount: 0
        },
        {
          id: 7,
          td: ['Binders / folders'],
          amount: 0
        },
        {
          id: 8,
          td: ['Notecards'],
          amount: 0
        },
      ],
      tableHasRows: true,
      moneyBudget: 0,
    },
    {
      id: "misc",
      title: "Misc.",
      subtitle: "Have another back to school expense you need to cover?",
      content: "If there’s another expense that you didn’t cover in the first four categories, list it here in miscellaneous expenses. This will make sure you can capture everything you need to cover for back to school shopping this year.",
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