import getTranslations from './language';

export default function getLoanTypes(region, language) {

    const languages = getTranslations(language);

    const LoanTypes = {
        us: [
            {
                id: 'fifteenYearsFixedRateMortgage',
                title: languages.fifteenYearsFixedRateMortgage,
                value: 15
            },
            {
                id: 'thirtyYearsFixedRateMortgage',
                title: languages.thirtyYearsFixedRateMortgage,
                value: 30
            },
            {
                id: 'threeYearsAutoLoan',
                title: languages.threeYearsAutoLoan,
                value: 3
            },
            {
                id: 'fourYearsAutoLoan',
                title: languages.fourYearsAutoLoan,
                value: 4
            },
            {
                id: 'fiveYearsAutoLoan',
                title: languages.fiveYearsAutoLoan,
                value: 5
            },
            {
                id: 'oneYearPersonalLoan',
                title: languages.oneYearPersonalLoan,
                value: 1
            },
            {
                id: 'threeYearsPersonalLoan',
                title: languages.threeYearsPersonalLoan,
                value: 3
            },
            {
                id: 'fiveYearsPersonalLoan',
                title: languages.fiveYearsPersonalLoan,
                value: 5
            }
        ],
        ca: [
            {
                id: 'sevenYearsNewCarLoan',
                title: languages.sevenYearsNewCarLoan,
                value: 7
            },
            {
                id: 'fiveYearsPersonalLoan',
                title: languages.fiveYearsPersonalLoan,
                value: 5
            }
        ]
    };

    if (!region)
        return [];

    return LoanTypes[region];
}