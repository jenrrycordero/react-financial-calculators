
const translations = {
    en : {
        loanType: 'Type of loan',
        principalAmount: 'Principal amount',
        fifteenYearsFixedRateMortgage: '15-year fixed-rate mortgage',
        thirtyYearsFixedRateMortgage: '30-year fixed-rate mortgage',
        threeYearsAutoLoan: '3-year auto loan',
        fourYearsAutoLoan: '4-year auto loan',
        fiveYearsAutoLoan: '5-year auto loan',
        oneYearPersonalLoan: '1-year personal loan',
        threeYearsPersonalLoan: '3-year personal loan',
        fiveYearsPersonalLoan: '5-year personal loan',
        sevenYearsNewCarLoan: '7-year new car loan',

        ficoScoreLabel: 'FICO Score',
        aprLabel: 'APR',
        monthlyPaymentLabel: 'Monthly Payment',
        totalInterestLabel: 'Total Interest Paid',
        amountSavedLabel: 'Amount Saved',
        calc_saved: 'saved',
        calc_added: 'added',

        help_loan_type: 'Loan or mortgage type and term',
        help_principal_amount: 'Loan or mortgage total amount',
        help_fico_core: 'Your current credit score',
        help_general: "All interest rates shown are estimates based on average rates available.",

        moneyFieldError: 'Use positive numbers less than 1 million.'
    },
    es : {
        loanType: 'Tipo de préstamo',
        principalAmount: 'Monto del principal',
        fifteenYearsFixedRateMortgage: 'Hipoteca de tasa fija a 15 años',
        thirtyYearsFixedRateMortgage: 'Hipoteca de tasa fija a 30 años',
        threeYearsAutoLoan: 'Préstamo de auto a 3 años',
        fourYearsAutoLoan: 'Préstamo de auto a 4 años',
        fiveYearsAutoLoan: 'Préstamo de auto a 5 años',
        oneYearPersonalLoan: 'Préstamo personal a 1 año',
        threeYearsPersonalLoan: 'Préstamo personal a 3 años',
        fiveYearsPersonalLoan: 'Préstamo personal a 5 años',
        sevenYearsNewCarLoan: 'Préstamo de auto a 7 años',

        ficoScoreLabel: 'Calificación FICO',
        aprLabel: 'APR',
        monthlyPaymentLabel: 'Pago mensual',
        totalInterestLabel: 'Total interés pagado',
        amountSavedLabel: 'Cantidad ahorrada',
        calc_saved: 'ahorrado',
        calc_added: 'adicionado',

        help_loan_type: 'Tipo y plazo de préstamo o hipoteca',
        help_principal_amount: 'Monto total del préstamo o hipoteca',
        help_fico_core: 'Su puntaje de crédito actual',
        help_general: "Todas las tasas de interés mostradas son estimaciones basadas en las tasas promedio disponibles.",

        moneyFieldError: 'Inserte un número mayor que 0 y menor que 1 millón.'
    },
    ca : {
        loanType: 'Type of loan',
        principalAmount: 'Principal amount',
        fifteenYearsFixedRateMortgage: '15-year fixed-rate mortgage',
        thirtyYearsFixedRateMortgage: '30-year fixed-rate mortgage',
        threeYearsAutoLoan: '3-year auto loan',
        fourYearsAutoLoan: '4-year auto loan',
        fiveYearsAutoLoan: '5-year auto loan',
        oneYearPersonalLoan: '1-year personal loan',
        threeYearsPersonalLoan: '3-year personal loan',
        fiveYearsPersonalLoan: '5-year personal loan',
        sevenYearsNewCarLoan: '7-year new car loan',

        ficoScoreLabel: 'FICO Score',
        aprLabel: 'APR',
        monthlyPaymentLabel: 'Monthly Payment',
        totalInterestLabel: 'Total Interest Paid',
        amountSavedLabel: 'Amount Saved',
        calc_saved: 'saved',
        calc_added: 'added',

        help_loan_type: 'Loan type and term',
        help_principal_amount: 'Loan total amount',
        help_fico_core: 'Your current credit score',
        help_general: "All interest rates shown are estimates based on average rates available.",

        moneyFieldError: 'Use positive numbers less than 1 million.',
    },
    fr : {
        loanType: 'Type de prêt',
        principalAmount: 'Le montant principal',
        fifteenYearsFixedRateMortgage: 'Hypothèque à taux fixe de 15 ans',
        thirtyYearsFixedRateMortgage: 'Hypothèque à taux fixe de 30 ans',
        threeYearsAutoLoan: 'Prêt auto de 3 ans',
        fourYearsAutoLoan: 'Prêt automobile de 4 ans',
        fiveYearsAutoLoan: 'Prêt auto de 5 ans',
        oneYearPersonalLoan: 'Prêt personnel d\'un an',
        threeYearsPersonalLoan: 'Prêt personnel de 3 ans',
        fiveYearsPersonalLoan: 'Prêt personnel de 5 ans',
        sevenYearsNewCarLoan: 'Prêt automobile de 7 ans',

        ficoScoreLabel: 'Score FICO',
        aprLabel: 'APR',
        monthlyPaymentLabel: 'Paiement mensuel',
        totalInterestLabel: 'Total des intérêts payés',
        amountSavedLabel: 'Montant enregistré',
        calc_saved: 'enregistré',
        calc_added: 'ajoutée',

        help_loan_type: 'Type et durée du prêt',
        help_principal_amount: 'Montant total du prêt ou de l\'hypothèque',
        help_fico_core: 'Votre pointage de crédit actuel',
        help_general: "Tous les taux d\'intérêt indiqués sont des estimations basées sur les taux moyens disponibles.",

        moneyFieldError: 'Utilisez des nombres positifs inférieurs à 1 million.'
    },

};

export default function getTranslations(lan) {
    return translations[lan];
}