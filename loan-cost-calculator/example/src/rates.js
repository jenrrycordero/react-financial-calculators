const Rates = {
    us: {
        "fifteenYearsFixedRateMortgage": {
            years: 15,
            rates: {
                "760-850": 2.794,
                "700-759": 3.016,
                "680-699": 3.193,
                "660-679": 3.407,
                "640-659": 3.837,
                "620-639": 4.383,
            }
        },
        "thirtyYearsFixedRateMortgage": {
            years: 30,
            rates: {
                "760-850": 3.354,
                "700-759": 3.576,
                "680-699": 3.753,
                "660-679": 3.967,
                "640-659": 4.397,
                "620-639": 4.943,
            }
        },
        "threeYearsAutoLoan": {
            years: 3,
            rates: {
                "760-850": 4.449,
                "700-759": 5.768,
                "680-699": 7.989,
                "660-679": 10.762,
                "640-659": 15.463,
                "620-639": 16.739,
            }
        },
        "fourYearsAutoLoan": {
            years: 4,
            rates: {
                "760-850": 4.483,
                "700-759": 5.801,
                "680-699": 8.021,
                "660-679": 10.802,
                "640-659": 15.516,
                "620-639": 16.769,
            }
        },
        "fiveYearsAutoLoan": {
            years: 5,
            rates: {
                "760-850": 4.522,
                "700-759": 5.842,
                "680-699": 8.073,
                "660-679": 10.873,
                "640-659": 15.584,
                "620-639": 16.881,
            }
        },
        "oneYearPersonalLoan": {
            years: 1,
            rates: {
                "760-850": 5.99,
                "700-759": 7.99,
                "680-699": 13.99,
                "660-679": 15.99,
                "640-659": 17.99,
                "620-639": 19.99,
            }
        },
        "threeYearsPersonalLoan": {
            years: 3,
            rates: {
                "760-850": 9.99,
                "700-759": 11.99,
                "680-699": 15.99,
                "660-679": 17.99,
                "640-659": 19.99,
                "620-639": 21.99,
            }
        },
        "fiveYearsPersonalLoan": {
            years: 5,
            rates: {
                "760-850": 11.99,
                "700-759": 13.990,
                "680-699": 17.990,
                "660-679": 19.990,
                "640-659": 21.990,
                "620-639": 24.990,
            }
        }
    },
    ca: {
        "sevenYearsNewCarLoan": {
            years: 7,
            rates: {
                "780-900": 3.49,
                "720-779": 3.99,
                "680-719": 4.5,
                "620-679": 5.5,
                "580-619": 10,
                "500-579": 15,
            }
        },
        "fiveYearsPersonalLoan": {
            years: 5,
            rates: {
                "780-900": 5.99,
                "720-779": 11.99,
                "680-719": 15.99,
                "620-679": 21.99,
                "580-619": 29.99,
                "500-579": 35.99,
            }
        }
    }
};

export default function getRates(region) {

    if (!region)
    return [];

    return Rates[region];
}