export const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export const monthOptions = monthNames.map((item) => ({
    value: item,
    label: item
}));

export const genders = ['male', 'female']

export const genderOptions = genders.map((item) => ({
    value: item,
    label: item[0].toUpperCase() + item.slice(1, item.length)
}))

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export const bloodGroupOntions = bloodGroups.map((item) => ({
    value: item,
    label: item
}))